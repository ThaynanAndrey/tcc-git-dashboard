import axios from 'axios';
import firebase from 'firebase/app';

import { binarySearch, mapearAtributosPullRequest } from '../../utils/utils';
import { LOAD_PULL_REQUESTS_NO_PROJECT_SUCCESS, ADDED_PULL_REQUEST_SUCCESS, ADDED_PULL_REQUEST_ERROR } from './types';

const INDEX_PR_GIT = 0;
const INDEX_PR_FIRESTORE = 1;

export const getPullRequestsNoProject = () => {
    return dispatch => {
        const promises = [];
        promises.push(_getPromisePullRequestsGit());
        promises.push(_getPromisePullRequestsFirestore());

        Promise.all(promises).then((results) => {
            const pullRequestsGit = results[INDEX_PR_GIT].data;
            const pullRequestsFirestore = results[INDEX_PR_FIRESTORE].docs.map(doc => doc.data());
            
            const pullRequestsNoProject = _getPullRequests(pullRequestsGit, pullRequestsFirestore);
            dispatch({
                type: LOAD_PULL_REQUESTS_NO_PROJECT_SUCCESS,
                pullRequestsNoProject
            });
        });
    };
};

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

const _getPromisePullRequestsGit = () => axios.get('https://api.github.com/repos/octocat/Hello-World/pulls');

const _getPromisePullRequestsFirestore = () => {
    const firestore = firebase.firestore();
    return firestore.collection('pullRequests').orderBy('idPullRequestGitHub').get();
};

const _getPullRequests = (pullRequestsGit, pullRequestsFirestore) => {
    return pullRequestsGit
            .filter((pullRequest) => !_isPullRequestInFirestore(pullRequest, pullRequestsFirestore))
            .map((pullRequest) => mapearAtributosPullRequest(pullRequest));
};

const _isPullRequestInFirestore = (pullRequest, pullRequestsFirestore) => {
    const index = binarySearch(pullRequestsFirestore, 0, pullRequestsFirestore.length-1, pullRequest.id);
    if(index !== -1) {
        //pullRequest.idFirestore = pullRequestsFirestore[index].id;
        return true;
    }
    return false
};