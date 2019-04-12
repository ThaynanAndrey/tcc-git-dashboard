import axios from 'axios';
import firebase from 'firebase/app';

import { binarySearch, mapearAtributosPullRequest } from '../../utils/utils';
import { LOAD_PROJECT_PULL_REQUESTS_SUCCESS } from './types';

const INDEX_PR_GIT = 0;
const INDEX_PR_FIRESTORE = 1;

/**
 * Gets Project's Pull Requests.
 * 
 * @returns {Function} Dispatch used to invoke the pullRequest's redux
 */
export const getProjectPullRequests = () => {
    return (dispatch, getState) => {         
        const promises = [];
        promises.push(_getPromisePullRequestsGit());
        promises.push(_getPromisePullRequestsFirestore());

        Promise.all(promises).then((results) => {
            console.log(results[INDEX_PR_GIT]);
            console.log(results[INDEX_PR_GIT].headers.link);
            const pullRequestsGit = results[INDEX_PR_GIT].data;
            const pullRequestsFirestore = results[INDEX_PR_FIRESTORE].docs
                .filter(doc => doc.exists)
                .map(doc => {
                    let pullRequest = doc.data();
                    pullRequest.id = doc.id;
                    return pullRequest;
                });
            
            const projectPullRequests = _getPullRequests(pullRequestsGit, pullRequestsFirestore);
            dispatch({
                type: LOAD_PROJECT_PULL_REQUESTS_SUCCESS,
                projectPullRequests
            });
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
        return firestore.collection('pullRequests').doc(removedPullRequest.idFirestore)
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
 * Requests to GitHub the Repository's Pull Requests.
 * 
 * @returns {Promise} request's promise
 */
const _getPromisePullRequestsGit = () => axios.get('https://api.github.com/repos/octocat/Hello-World/pulls');

/**
 * Requests to Firestore all Project's Pull Requests.
 * 
 * @returns {Promise} request's promise
 */
const _getPromisePullRequestsFirestore = () => {
    const firestore = firebase.firestore();
    return firestore.collection('pullRequests').orderBy('idPullRequestGitHub').get();
};

/**
 * Gets all Project's Pull Requests with datas of Github.
 * 
 * @param {Array} pullRequestsGit
 *      Array with Pull Requests from GitHub
 * @param {Array} pullRequestsFirestore 
 *      Array with PullRequests from Firestore
 * @returns {Array} array with Project's Pull Requests
 */
const _getPullRequests = (pullRequestsGit, pullRequestsFirestore) => {
    return pullRequestsGit
            .filter((pullRequest) => _isPullRequestInFirestore(pullRequest, pullRequestsFirestore))
            .map((pullRequest) => mapearAtributosPullRequest(pullRequest));
};

/**
 * Returns {@code true} if pull request is into pullRequestsFirestore, {@code false} otherwise.
 * 
 * @param {Array} pullRequest
 *      Pull Request to be verified
 * @param {Array} pullRequestsFirestore
 *      Array with Firestore's pull requests
 * @returns {@code true} if pull request is into pullRequestsFirestore, {@code false} otherwise
 */
const _isPullRequestInFirestore = (pullRequest, pullRequestsFirestore) => {
    const index = binarySearch(pullRequestsFirestore, 0, pullRequestsFirestore.length-1, pullRequest.id);
    if(index !== -1) {
        pullRequest.idFirestore = pullRequestsFirestore[index].id;
        return true;
    }
    return false
};