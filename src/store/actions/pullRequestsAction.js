import axios from 'axios';
import firebase from 'firebase/app';

import { mapearAtributosPullRequest, getDataElemsFirestore, getUrlAuthenticated } from '../../utils/utils';
import { getRepositoriesFirestore } from './repositoriesAction';
import { LOAD_PROJECT_PULL_REQUESTS_SUCCESS } from './types';

const PULL_REQUEST_FIRESTORE_COLLECTION = "pullRequests";

/**
 * Gets Project's Pull Requests.
 * 
 * @returns {Function} Dispatch used to invoke the pullRequest's redux
 */
export const getProjectPullRequests = () => {
    return async dispatch => {
        const promisesFirestore = [];
        promisesFirestore.push(_getPullRequestsFirestore());
        promisesFirestore.push(getRepositoriesFirestore());
        
        const result = await Promise.all(promisesFirestore);
        const pullRequestsFirestore = getDataElemsFirestore(result[0]);
        const repositoriesFirestore = getDataElemsFirestore(result[1]);

        const filterPullRequestsByRepositories = 
            _filterPullRequestByRepostiries(pullRequestsFirestore, repositoriesFirestore);
        
        const promises = filterPullRequestsByRepositories
            .map(pullRequest => _getGitHubPullRequest(pullRequest));
        
        const pullRequestsResult = await Promise.all(promises);
        const projectPullRequests = pullRequestsResult
            .map((result, index) => 
                mapearAtributosPullRequest(result.data, pullRequestsFirestore, index));

        dispatch({
            type: LOAD_PROJECT_PULL_REQUESTS_SUCCESS,
            projectPullRequests
        });
    };
};

/**
 * Removes the Pull Request of Project.
 * 
 * @param {Object} removedPullRequest
 *      Pull Request to be removed
 * @returns {Function} Dispatch used to invoke the pullRequest's redux
 */
export const removePullRequestProject = (removedPullRequest) => {
    return (dispatch, getState) => {
        const firestore = firebase.firestore();
        return firestore.collection(PULL_REQUEST_FIRESTORE_COLLECTION).doc(removedPullRequest.idFirestore)
            .delete().then(() => {
                const projectPullRequests = getState().pullRequests.projectPullRequests
                    .filter(pullRequest => pullRequest.idFirestore !== removedPullRequest.idFirestore);

                dispatch({
                    type: LOAD_PROJECT_PULL_REQUESTS_SUCCESS,
                    projectPullRequests
                });
            });
    }
};

/**
 * Requests to GitHub the Pull Request.
 * 
 * @param {Object} pullRequest
 *      Pull Request to be requested
 * @returns {Promise} request's promise
 */
const _getGitHubPullRequest = pullRequest => {
    const method = 'GET';
    const url = `https://api.github.com/repos/${pullRequest.nomePropietario}/${pullRequest.nomeRepositorioGitHub}/pulls/${pullRequest.numeroPullRequestGitHub}`;
    const accessToken = sessionStorage.getItem('authAccessToken');
    const authUrl = getUrlAuthenticated(url, method, accessToken);

    return axios(authUrl);
}

/**
 * Requests to Firestore all Project's Pull Requests.
 * 
 * @returns {Promise} request's promise
 */
const _getPullRequestsFirestore = () => {
    const firestore = firebase.firestore();
    return firestore.collection(PULL_REQUEST_FIRESTORE_COLLECTION).get();
};

/**
 * Gets the Pull Requests that in Project's Repositories.
 * 
 * @param {Array} pullRequests 
 *      Pull Requests to be filtered
 * @param {Array} repositories 
 *      Project's repositories
 * @return {Array} Filtered Pull Requests
 */
const _filterPullRequestByRepostiries = (pullRequests, repositories) => {
    const idRepositories = repositories.map(repo => repo.id);
    return pullRequests.filter(pr => idRepositories.includes(pr.repository.id));
};