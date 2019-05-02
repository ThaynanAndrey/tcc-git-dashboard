import axios from 'axios';
import firebase from 'firebase/app';

import { mapearAtributosPullRequest, getDataElemsFirestore, getUrlAuthenticated } from '../../utils/utils';
import { LOAD_PROJECT_PULL_REQUESTS_SUCCESS } from './types';

const PULL_REQUEST_FIRESTORE_COLLECTION = "pullRequests";

/**
 * Gets Project's Pull Requests.
 * 
 * @param {String} idProject Project id
 * @returns {Function} Dispatch used to invoke the pullRequest's redux
 */
export const getProjectPullRequests = idProject => {
    return async dispatch => {
        let pullRequestsFirestore = await _getPullRequestsFirestore();
        pullRequestsFirestore = getDataElemsFirestore(pullRequestsFirestore);
        const filterPullRequestsByProject = _filterPullRequestsByProject(pullRequestsFirestore, idProject);
        
        const promises = filterPullRequestsByProject
            .map(pullRequest => _getGitHubPullRequest(pullRequest));
        
        const pullRequestsResult = await Promise.all(promises);
        const projectPullRequests = pullRequestsResult
            .map((result, index) => 
                mapearAtributosPullRequest(result.data, filterPullRequestsByProject, index));

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
 * Filter Pull Requests by Project id.
 * 
 * @param {Array} pullRequests
 *      Pull Requests to be filtered
 * @param {String} idProject
 *      Project id
 * @returns {Array} filtered Pull Requests by Project id
 */
const _filterPullRequestsByProject = (pullRequests, idProject) =>
    pullRequests.filter(pullRequest => pullRequest.project.id === idProject);