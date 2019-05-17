import axios from 'axios';
import firebase from 'firebase/app';

import { getFormattedDate } from '../../utils/utils';

import { mapearAtributosPullRequest, getDataElemsFirestore, getUrlAuthenticated } from '../../utils/utils';
import { LOAD_PROJECT_PULL_REQUESTS_SUCCESS, LOAD_PULL_REQUEST_SUCCESS, LOAD_PULL_REQUEST_ERROR } from './types';

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
            .map(pullRequest => 
                _getGitHubPullRequest(pullRequest.nomePropietario, pullRequest.nomeRepositorioGitHub, pullRequest.numeroPullRequestGitHub));
        
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
 * Gets all details of Pull Request.
 * 
 * @param {Object} pullRequest
 *      Pull Request to be requested
 * @returns {Function} Dispatch used to invoke the pullRequest's redux
 */
export const getDetailsPullRequest = pullRequest => {
    return dispatch => {
        const promises = [];
        const urlCommits = getUrlAuthenticated(pullRequest.commits.url, "GET", sessionStorage.getItem('authAccessToken'));
        promises.push(axios(urlCommits));
        const urlComments = getUrlAuthenticated(pullRequest.comments.url, "GET", sessionStorage.getItem('authAccessToken'));
        promises.push(axios(urlComments));

        return Promise.all(promises)
            .then(result => {
                const selectedPullRequest = { ...pullRequest };
                const COMMITS_INDEX = 0;
                const commits = result[COMMITS_INDEX].data;
                selectedPullRequest.commits = commits.map(commit => _mapCommitProperties(commit));

                const COMMENTS_INDEX = 1;
                const comments = result[COMMENTS_INDEX].data;
                selectedPullRequest.comments = comments.map(comment => _mapCommentProperties(comment));

                dispatch({
                    type: LOAD_PULL_REQUEST_SUCCESS,
                    selectedPullRequest
                });
            })
            .catch(error => dispatch({
                type: LOAD_PULL_REQUEST_ERROR,
                error
            }));
    };
};

/**
 * Gets the necessary properties in commit to be shown.
 * 
 * @param {Object} commit
 *      Commit to be gotten the propeties
 * @returns {Object} mapped commit
 */
const _mapCommitProperties = commit => ({
    date: getFormattedDate(new Date(commit.commit.author.date)),
    author: {
        name: commit.commit.author.name,
        email: commit.commit.author.email
    },
    message: commit.commit.message
});

/**
 * Gets the necessary properties in comment to be shown.
 * 
 * @param {Object} comment
 *      Comment to be gotten the propeties
 * @returns {Object} mapped comment
 */
const _mapCommentProperties = comment => ({
    date: getFormattedDate(new Date(comment.created_at)),
    updated_at: getFormattedDate(new Date(comment.updated_at)),
    author: {
        name: comment.user.login
    },
    message: comment.body
});

/**
 * Requests to GitHub the Pull Request.
 * 
 * @param {String} ownerName
 *      Repository owner's name
 * @param {String} repositoryName
 *      Repository name
 * @param {String} numberPullRequest
 *      Number Pull Request
 * @returns {Promise} request's promise
 */
const _getGitHubPullRequest = (ownerName, repositoryName, numberPullRequest) => {
    const method = 'GET';
    const url = `https://api.github.com/repos/${ownerName}/${repositoryName}/pulls/${numberPullRequest}`;
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