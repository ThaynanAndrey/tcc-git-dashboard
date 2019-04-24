import axios from 'axios';
import firebase from 'firebase/app';

import { mapearAtributosPullRequest, getDataPullRequestsFirestore } from '../../utils/utils';
import { LOAD_PROJECT_PULL_REQUESTS_SUCCESS } from './types';

const PULL_REQUEST_FIRESTORE_COLLECTION = "pullRequests";

/**
 * Gets Project's Pull Requests.
 * 
 * @returns {Function} Dispatch used to invoke the pullRequest's redux
 */
export const getProjectPullRequests = () => {
    return async (dispatch, getState) => {
        let pullRequestsFirestore = await _getPullRequestsFirestore();
        pullRequestsFirestore = getDataPullRequestsFirestore(pullRequestsFirestore);
        
        const promises = pullRequestsFirestore
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
 * Get all user's Repositories.
 * 
 * @returns {Function} Dispatch used to invoke the repositories's redux
 */
export const getAllUserRepositories = () => {
    return (dispatch, getState) => {
        const authOptions = {
            method: 'GET',
            url: 'https://api.github.com/user/repos',
            headers: {
                'Authorization': `Bearer ${getState().pullRequests.accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        
        return axios(authOptions).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
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
const _getGitHubPullRequest = pullRequest => 
    axios.get(`https://api.github.com/repos/${pullRequest.nomePropietario}/${pullRequest.nomeRepositorioGitHub}/pulls/${pullRequest.numeroPullRequestGitHub}`);

/**
 * Requests to Firestore all Project's Pull Requests.
 * 
 * @returns {Promise} request's promise
 */
const _getPullRequestsFirestore = () => {
    const firestore = firebase.firestore();
    return firestore.collection(PULL_REQUEST_FIRESTORE_COLLECTION).get();
};