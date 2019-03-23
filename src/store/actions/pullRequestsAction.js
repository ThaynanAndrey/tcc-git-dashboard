import axios from 'axios';
import firebase from 'firebase/app';
import moment from 'moment';

import { LOAD_PROJECT_PULL_REQUESTS_SUCCESS, LOAD_PULL_REQUESTS_NO_PROJECT_SUCCESS, ADDED_PULL_REQUEST_SUCCESS, ADDED_PULL_REQUEST_ERROR} from './types';

moment.locale('pt-BR');

const INDEX_PR_GIT = 0;
const INDEX_PR_FIRESTORE = 1;

export const getProjectPullRequests = () => {
    return dispatch => {
        const promises = [];
        promises.push(_getPromisePullRequestsGit());
        promises.push(_getPromisePullRequestsFirestore());

        Promise.all(promises).then((results) => {
            const pullRequestsGit = results[INDEX_PR_GIT].data;
            const pullRequestsFirestore = results[INDEX_PR_FIRESTORE].docs
                .filter(doc => doc.exists)
                .map(doc => {
                    let pullRequest = doc.data();
                    pullRequest.id = doc.id;
                    return pullRequest;
                });
            
            const isFromProject = true;
            const projectPullRequests = _getPullRequests(pullRequestsGit, pullRequestsFirestore, isFromProject);
            dispatch({
                type: LOAD_PROJECT_PULL_REQUESTS_SUCCESS,
                projectPullRequests
            });
        });
    };
};

export const getPullRequestsNoProject = () => {
    return dispatch => {
        const promises = [];
        promises.push(_getPromisePullRequestsGit());
        promises.push(_getPromisePullRequestsFirestore());

        Promise.all(promises).then((results) => {
            const pullRequestsGit = results[INDEX_PR_GIT].data;
            const pullRequestsFirestore = results[INDEX_PR_FIRESTORE].docs.map(doc => doc.data());
            
            const isFromProject = false;
            const pullRequestsNoProject = _getPullRequests(pullRequestsGit, pullRequestsFirestore, isFromProject);
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
            nomeRepositorioGitHub: pullRequest.nome,
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
        let pullRequestsNoProject = getState().pullRequests.pullRequestsNoProject;
        pullRequestsNoProject = pullRequestsNoProject
            .filter(pullRequest => pullRequest !== pullRequestRemoved);
        
        dispatch({
            type: LOAD_PULL_REQUESTS_NO_PROJECT_SUCCESS,
            pullRequestsNoProject
        });
    };
};

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


const _getPromisePullRequestsGit = () => axios.get('https://api.github.com/repos/octocat/Hello-World/pulls');

const _getPromisePullRequestsFirestore = () => {
    const firestore = firebase.firestore();
    return firestore.collection('pullRequests').orderBy('idPullRequestGitHub').get();
}

const _getPullRequests = (pullRequestsGit, pullRequestsFirestore, isFromProject) => {
    const filterPullRequest = (pullRequest, pullRequestsFirestore) => isFromProject ?
        _isPullRequestInFirestore(pullRequest, pullRequestsFirestore) : !_isPullRequestInFirestore(pullRequest, pullRequestsFirestore);
    return pullRequestsGit
            .filter((pullRequest) => filterPullRequest(pullRequest, pullRequestsFirestore))
            .map((pullRequest) => _mapearAtributosPullRequest(pullRequest));
};

const _isPullRequestInFirestore = (pullRequest, pullRequestsFirestore) => {
    const index = _binarySearch(pullRequestsFirestore, 0, pullRequestsFirestore.length-1, pullRequest.id);
    if(index !== -1) {
        pullRequest.idFirestore = pullRequestsFirestore[index].id;
        return true;
    }
    return false
}

const _binarySearch = (pullRequests, start, end, idPullRequest) => {
    if(start > end) {
        return -1;
    }
    const mid = Math.trunc((start + end) / 2);
    if(pullRequests[mid].idPullRequestGitHub === idPullRequest) {
        return mid;
    } else if(pullRequests[mid].idPullRequestGitHub > idPullRequest) {
        return _binarySearch(pullRequests, start, mid-1, idPullRequest);
    } else {
        return _binarySearch(pullRequests, mid+1, end, idPullRequest);
    }
}

const _mapearAtributosPullRequest = (pullRequest) => {
    return {
        id: pullRequest.id,
        idFirestore: pullRequest.idFirestore,
        nome: pullRequest.title,
        dataAtualizacao: pullRequest.updated_at,
        dataCriacao: moment(pullRequest.created_at).format('DD/MM/YYYY, HH:mm'),
        numero: pullRequest.number,
        status: (pullRequest.state === "open" ? "aberto": "fechado"),
        repositorio: {
            nome: pullRequest.base.repo.name,
            id: pullRequest.base.repo.id
        },
        responsavel: {
            id: pullRequest.user.id,
            nome: pullRequest.user.login
        }
    }
};