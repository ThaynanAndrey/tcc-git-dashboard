import axios from 'axios';
import firebase from 'firebase/app';

import { getRepositoriesFirestoreByIdProject } from './repositoriesAction';
import { binarySearch, mapearAtributosPullRequest, getUrlAuthenticated, getDataElemsFirestore } from '../../utils/utils';
import { LOAD_PULL_REQUESTS_NO_PROJECT_SUCCESS, ADDED_PULL_REQUEST_SUCCESS, ADDED_PULL_REQUEST_ERROR,
        LOAD_EXTERNAL_PULL_REQUESTS_NO_PROJECT_SUCCESS, LOAD_EXTERNAL_PULL_REQUESTS_NO_PROJECT_ERROR,
        RESET_PULL_REQUESTS_NO_PROJECT } from './types';

const COLLECTION_PULL_REQUESTS_FIRESTORE = "pullRequests";
const COLLECTION_PROJECTS_FIRESTORE = "projects";

const INDEX_REPOSITORIES_FIRESTORE = 0;
const INDEX_PR_FIRESTORE = 1;

/**
 * Gets all Pull Request that not added to user's Project.
 * 
 * @param {String} idProject Project id
 * @returns {Function} Dispatch used to invoke the newPullRequest's redux
 */
export const getPullRequestsNoProject = idProject => {
    return async dispatch => {
        const promises = [];
        promises.push(getRepositoriesFirestoreByIdProject(idProject));
        promises.push(_getPullRequestsFirestoreByIdProject(idProject));

        const results = await Promise.all(promises);
        const repositoriesFirestore = results[INDEX_REPOSITORIES_FIRESTORE];
        const pullRequestsFirestore = results[INDEX_PR_FIRESTORE];

        const gitHubPromises = repositoriesFirestore.map(repository => _getPullRequestsRepository(repository.idGitHub));
        const pullRequestsGitHubResult = await Promise.all(gitHubPromises);
        let nextPullRequests = await _getNextPullRequests(pullRequestsGitHubResult);
        
        let pullRequestsGit = pullRequestsGitHubResult.reduce((array, result) => array.concat(result.data), []);
        nextPullRequests = nextPullRequests.reduce((array, pr) => array.concat(pr.data), []);
        pullRequestsGit = pullRequestsGit.concat(nextPullRequests);
        pullRequestsGit = _addIdFirestoreRepository(pullRequestsGit, repositoriesFirestore);

        const pullRequestsNoProject = _getPullRequestsNoProject(pullRequestsGit, pullRequestsFirestore);

        dispatch({
            type: LOAD_PULL_REQUESTS_NO_PROJECT_SUCCESS,
            pullRequestsNoProject
        });
    };
};

/**
 * Add a new Pull Request to user's Project.
 * 
 * @param {Object} pullRequest
 *      Pull Request to be added
 * @param {String} idProject 
 *      Project id
 * @returns {Function} Dispatch used to invoke the newPullRequest's redux
 */
export const addPullRequestInProject = (pullRequest, idProject) => {
    return (dispatch, getState) => {
        const firestore = firebase.firestore();
        return firestore.collection(COLLECTION_PULL_REQUESTS_FIRESTORE).add({
            idPullRequestGitHub: pullRequest.id,
            idRepositorioGitHub: pullRequest.repositorio.id,
            nomeRepositorioGitHub: pullRequest.repositorio.nome,
            numeroPullRequestGitHub: pullRequest.numero,
            nomePropietario: pullRequest.propietario.nome,
            project: firestore.doc(`${COLLECTION_PROJECTS_FIRESTORE}/${idProject}`)
        }).then(() => {
            let pullRequestsNoProject = getState().newPullRequests.pullRequestsNoProject;
            pullRequestsNoProject = pullRequestsNoProject
                .filter(pr => pr.id !== pullRequest.id);
            
            let externalPullRequestsNoProject = getState().newPullRequests.externalPullRequestsNoProject;
            externalPullRequestsNoProject = externalPullRequestsNoProject
                .filter(pr => pr.id !== pullRequest.id);

            dispatch({
                type: ADDED_PULL_REQUEST_SUCCESS,
                pullRequestsNoProject,
                externalPullRequestsNoProject
            });
        }).catch(erro => {
            dispatch({ type: ADDED_PULL_REQUEST_ERROR , erro });
        });
    };
};

/**
 * Searches for Pull Request that aren't in the repositories added in the Project.
 * 
 * @param {String} ownerName
 *      Repository's qwner name
 * @param {String} repositoryName
 *      Repository name where are the Pull Requests searched
 * @param {String} prNumber
 *      Number Pull Request to be searched
 * @param {String} idProject
 *      Project's id
 * @returns {Function} Dispatch used to invoke the newPullRequest's redux
 */
export const searchExternalPullRequest = (ownerName, repositoryName, prNumber, idProject) => {
    return dispatch => {
        const promises = [];
        promises.push(_getGitHubPullRequests(ownerName, repositoryName, prNumber));
        promises.push(_getPullRequestsFirestoreByIdProject(idProject));

        return Promise.all(promises)
            .then(result => {
                let pullRequests = result[0];
                const isArray = pullRequests.data instanceof Array;
                let externalPullRequestsNoProject = isArray ? pullRequests.data.map(pr => mapearAtributosPullRequest(pr))
                    : new Array(mapearAtributosPullRequest(pullRequests.data));
                
                _getNextPullRequestsSimpleObject(pullRequests).then(nextPullRequests => {
                    nextPullRequests = nextPullRequests.reduce((array, pr) => array.concat(pr.data), []);
                    nextPullRequests = nextPullRequests.map(pr => mapearAtributosPullRequest(pr));
                    externalPullRequestsNoProject = externalPullRequestsNoProject.concat(nextPullRequests);

                    const projectPullRequests = result[1];

                    externalPullRequestsNoProject = externalPullRequestsNoProject.filter(externalPR =>
                        !_containsPullRequest(projectPullRequests, externalPR));
                        
                    dispatch({
                        type: LOAD_EXTERNAL_PULL_REQUESTS_NO_PROJECT_SUCCESS,
                        externalPullRequestsNoProject
                    });
                });
            })
            .catch(error => {
                dispatch({ type: LOAD_EXTERNAL_PULL_REQUESTS_NO_PROJECT_ERROR })
            });
    };
};

/**
 * Resets pull requests no Project list.
 * 
 * @returns {Function} Dispatch used to invoke the newPullRequest's redux
 */
export const resetPullRequestsNoProject = () =>
    dispatch => dispatch({ type: RESET_PULL_REQUESTS_NO_PROJECT });

/**
 * Returns a boolean indicating if the Pull Request is in pullRequests list.
 * 
 * @param {Array} pullRequests
 *      List of Pull Requests
 * @param {Object} pullRequest
 *      Pull Request to be searched
 * @return {Boolean} {@code true} if pull requests' list contains pull request, otherwise {@code false}
 */
const _containsPullRequest = (pullRequests, pullRequest) =>
    pullRequests.reduce((contains, currentPR) => 
        contains || currentPR.idPullRequestGitHub === pullRequest.id, false)

/**
 * Requests to GitHub the data's Pull Requests for: owner name, pull request name and pull request number.
 * 
 * @param {String} ownerName
 *      Owner's name
 * @param {Object} repositoryName
 *      Repository's name
 * @param {Object} prNumber
 *      Pull request number
 * @returns {Promise} request's promise
 */
const _getGitHubPullRequests = (ownerName, repositoryName, prNumber) => {
    const method = 'GET';
    const url = `https://api.github.com/repos/${ownerName}/${repositoryName}/pulls` 
        + (prNumber ? ("/" + prNumber) : "");
    const accessToken = sessionStorage.getItem('authAccessToken');
    const authUrl = getUrlAuthenticated(url, method, accessToken);

    return axios(authUrl);
};

/**
 * Requests to GitHub Repository's Pull Requests.
 * 
 * @param {Number} id
 *      ID of GitHub repository
 * @param {Number} page
 *      Pull Request's page
 * @returns {Promise} request's promise
 */
const _getPullRequestsRepository = (id, page) => {
    const method = 'GET';
    const url = `https://api.github.com/repositories/${id}/pulls?page=${page ? page : 1}`;
    const accessToken = sessionStorage.getItem('authAccessToken');
    const authUrl = getUrlAuthenticated(url, method, accessToken);

    return axios(authUrl);
};

/**
 * Requests to Firestore all Project's Pull Requests.
 * 
 * @returns {Promise} request's promise
 */
const _getPullRequestsFirestore = () => {
    const firestore = firebase.firestore();
    return firestore.collection(COLLECTION_PULL_REQUESTS_FIRESTORE).orderBy('idPullRequestGitHub').get();
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

/**
 * Gets Pull Requets' Repositories in Firestore
 * 
 * @param {String} idProject Project id
 * @returns {Array} project Pull Requests
 */
const _getPullRequestsFirestoreByIdProject = async idProject => {
    let pullRequestsFirestore = await _getPullRequestsFirestore();
    pullRequestsFirestore = getDataElemsFirestore(pullRequestsFirestore);

    return _filterPullRequestsByProject(pullRequestsFirestore, idProject);
};

/**
 * Get next pages of Pull Request.
 * 
 * @param {Array} pullRequestsGitHub
 *      Array with GitHub's Pull Requests
 * @returns {Promise} Promise with next pages os Pull Requests
 */
const _getNextPullRequests = (pullRequestsGitHub) => {
    const promises = [];
    for(const pullRequests of pullRequestsGitHub) {
        const nextPages = pullRequests.headers.link;
        if(nextPages) {
            const endPage = Number(nextPages.substring(
                nextPages.lastIndexOf("page=") + 5, 
                nextPages.lastIndexOf(">")
            ));
            for(let page = 2; page <= endPage; page++) {
                const id = pullRequests.data[0].base.repo.id;
                promises.push(_getPullRequestsRepository(id, page));
            }
        }
    }

    return Promise.all(promises);
};

/**
 * Get next pages of Pull Request.
 * 
 * @param {Array} pullRequestsGitHub
 *      Array with GitHub's Pull Requests
 * @returns {Promise} Promise with next pages os Pull Requests
 */
const _getNextPullRequestsSimpleObject = pullRequestsGitHub => {
    const promises = [];
    const nextPages = pullRequestsGitHub.headers.link;
    if(nextPages) {
        const endPage = Number(nextPages.substring(
            nextPages.lastIndexOf("page=") + 5, 
            nextPages.lastIndexOf(">")
        ));
        for(let page = 2; page <= endPage; page++) {
            const id = pullRequestsGitHub.data[0].base.repo.id;
            promises.push(_getPullRequestsRepository(id, page));
        }
    }

    return Promise.all(promises);
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

/**
 * Adds Firestore id in repositories array.
 * 
 * @param {Array} pullRequestsGit 
 *      
 * @param {Array} repositoriesFirestore 
 */
const _addIdFirestoreRepository = (pullRequestsGit, repositoriesFirestore) => {
    return pullRequestsGit.map(pr => {
        const mappedPr = pr;
        mappedPr.idFirestoreRepository = repositoriesFirestore
            .filter(repository => repository.idGitHub === pr.base.repo.id)[0].id;
        
        return mappedPr;
    });
};