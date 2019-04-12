import axios from 'axios';
import firebase from 'firebase/app';

import { binarySearch, mapearAtributosPullRequest } from '../../utils/utils';
import { LOAD_PULL_REQUESTS_NO_PROJECT_SUCCESS, ADDED_PULL_REQUEST_SUCCESS, ADDED_PULL_REQUEST_ERROR } from './types';

const INDEX_PR_GIT = 0;
const INDEX_PR_FIRESTORE = 1;

/**
 * Gets all Pull Request that not added to user's Project.
 * 
 * @returns {Function} Dispatch used to invoke the newPullRequest's redux
 */
export const getPullRequestsNoProject = () => {
    return dispatch => {
        const promises = [];
        promises.push(_getPromisePullRequestsGit());
        promises.push(_getPromisePullRequestsFirestore());

        Promise.all(promises).then((results) => {
            const pullRequestsGit = results[INDEX_PR_GIT].data;
            const pullRequestsFirestore = results[INDEX_PR_FIRESTORE].docs.map(doc => doc.data());
            
            const pullRequestsNoProject = _getPullRequestsNoProject(pullRequestsGit, pullRequestsFirestore);
            dispatch({
                type: LOAD_PULL_REQUESTS_NO_PROJECT_SUCCESS,
                pullRequestsNoProject
            });
        });
    };
};

/**
 * Add a new Pull Request to user's Project.
 * 
 * @param {Object} pullRequest
 *      Pull Request to be added
 * @returns {Function} Dispatch used to invoke the newPullRequest's redux
 */
export const addPullRequestInProject = (pullRequest) => {
    return dispatch => {
        const firestore = firebase.firestore();
        return firestore.collection('pullRequests').add({
            idProjeto: 1,
            idPullRequestGitHub: pullRequest.id,
            idRepositorioGitHub: pullRequest.repositorio.id,
            nomeRepositorioGitHub: pullRequest.repositorio.nome,
            numeroPullRequestGitHub: pullRequest.numero
        }).then(() => {
            dispatch({ type: ADDED_PULL_REQUEST_SUCCESS });
        }).catch(err => {
            dispatch({ type: ADDED_PULL_REQUEST_ERROR }, err);
        });
    };
};

/**
 * Removes the Pull Request from list of Pull Request without linked project.
 * 
 * @param {Object} pullRequestRemoved
 *      Pull request to be removed
 * @returns {Function} Dispatch used to invoke the newPullRequest's redux
 */
export const removePullRequestNoProject = (pullRequestRemoved) => {
    return (dispatch, getState) => {
        let pullRequestsNoProject = getState().newPullRequests.pullRequestsNoProject;
        pullRequestsNoProject = pullRequestsNoProject
            .filter(pullRequest => pullRequest !== pullRequestRemoved);
        
        dispatch({
            type: LOAD_PULL_REQUESTS_NO_PROJECT_SUCCESS,
            pullRequestsNoProject
        });
    };
};

/**
 * Requests to GitHub Repository's Pull Requests.
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
 * Gets all Pull Requests with datas of Github and that isn't linked Project.
 * 
 * @param {Array} pullRequestsGit
 *      Array with Pull Requests from GitHub
 * @param {Array} pullRequestsFirestore 
 *      Array with PullRequests from Firestore
 * @returns {Array} Pull Requests' array without Project
 */
const _getPullRequestsNoProject = (pullRequestsGit, pullRequestsFirestore) => {
    return pullRequestsGit
            .filter((pullRequest) => !_isPullRequestInFirestore(pullRequest, pullRequestsFirestore))
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
    return index !== -1;
};