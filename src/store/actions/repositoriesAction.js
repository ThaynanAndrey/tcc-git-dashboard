import axios from 'axios';
import firebase from 'firebase/app';
import moment from 'moment';

import { LOAD_PROJECT_REPOSITORIES_SUCCESS, LOAD_REPOSITORIES_NO_PROJECT_SUCCESS,
    ADDED_REPOSITORY_SUCCESS, ADDED_REPOSITORY_ERROR, LOAD_EXTERNAL_REPOSITORIES, LOAD_EXTERNAL_REPOSITORIES_ERROR } from './types';
import { getUrlAuthenticated } from '../../utils/utils';

moment.locale('pt-BR');

const COLLECTION_REPOSITORY_FIRESTORE = "repositories";

/**
 * Gets Project's Repositories.
 * 
 * @returns {Function} Dispatch used to invoke the repositories' redux
 */
export const getProjectRepositories = () => {
    return async dispatch => {
        const projectRepositories = await _getProjectRepositories();

        dispatch({
            type: LOAD_PROJECT_REPOSITORIES_SUCCESS,
            projectRepositories
        });
    };
};

/**
 * Gets user's repositories that isn't in project repositories.
 * 
 * @returns {Function} Dispatch used to invoke the repositories' redux
 */
export const getRepositoriesNoProject = () => {
    return async dispatch => {
        const promises = [];
        promises.push(_getProjectRepositories());
        promises.push(_getAllUserRepositories());
        
        const response = await Promise.all(promises);
        const projectRepositories = response[0];
        const userRepositories = response[1];

        const repositoriesNoProject = _getRepositoriesNoProject(projectRepositories, userRepositories);

        dispatch({
            type: LOAD_REPOSITORIES_NO_PROJECT_SUCCESS,
            repositoriesNoProject
        });
    };
};

/**
 * Deletes the Repositories of Project.
 * 
 * @param {Object} deletedRepository
 *      Repository to be deleted.
 * @returns {Function} Dispatch used to invoke the repositories' redux
 */
export const deleteRepositoryProject = (deletedRepository) => {
    return (dispatch, getState) => {
        const firestore = firebase.firestore();
        return firestore.collection(COLLECTION_REPOSITORY_FIRESTORE).doc(deletedRepository.idFirestore)
            .delete().then(() => {
                const projectRepositories = getState().repositories.projectRepositories
                    .filter(repository => repository.idFirestore !== deletedRepository.idFirestore);

                dispatch({
                    type: LOAD_PROJECT_REPOSITORIES_SUCCESS,
                    projectRepositories
                });
            });
    }
};

/**
 * Add a new Repository on user's Project.
 * 
 * @param {Object} repository
 *      Repository to be added
 * @returns {Function} dispatch used to invoke the repositories' redux
 */
export const addRepositoryInProject = (repository) => {
    return (dispatch, getState) => {
        const firestore = firebase.firestore();
        return firestore.collection(COLLECTION_REPOSITORY_FIRESTORE).add({
            idProjeto: 1,
            idGitHub: repository.id,
            name: repository.name,
            ownerName: repository.owner.name
        }).then(() => {
            let dispatchObject = { 
                type: ADDED_REPOSITORY_SUCCESS,
                repositoriesNoProject: getState().repositories.repositoriesNoProject,
                externalRepositories: getState().repositories.externalRepositories
            };
            if(_containsRepository(getState().repositories.repositoriesNoProject, repository)) {
                const repositoriesNoProject = getState().repositories.repositoriesNoProject
                    .filter(currentRepository => currentRepository.id !== repository.id);
                dispatchObject.repositoriesNoProject = repositoriesNoProject;
            } else {
                const externalRepositories = getState().repositories.externalRepositories
                    .filter(currentRepository => currentRepository.id !== repository.id);

                dispatchObject.externalRepositories = externalRepositories;
            }
            
            dispatch(dispatchObject);
        }).catch(erro => {
            dispatch({ type: ADDED_REPOSITORY_ERROR , erro });
        });
    };
};

/**
 * Searches by repositories that isn't shared with user.
 * 
 * @param {String} ownerName 
 *      Repository's owner name
 * @param {String} repositoryName 
 *      Repository name
 * @return {Function} dispatch used to invoke the repositories' redux
 */
export const searchExternalRepository = (ownerName, repositoryName) => {
    return (dispatch, getState) => {
        _getGitHubRepositories(ownerName, repositoryName)
            .then(repositoriesResult => {
                const isArray = repositoriesResult.data instanceof Array;
                let externalRepositories = isArray ? repositoriesResult.data.map(result => _mapRepositoryAttr(result))
                    : new Array(_mapRepositoryAttr(repositoriesResult.data));
                externalRepositories = externalRepositories.filter(externalRepository =>
                    !_containsRepository(getState().repositories.projectRepositories, externalRepository));

                const msgExternalRepositories = externalRepositories.length === 0
                    ? "Não existem repositórios para cadastro" : "";
                dispatch({
                    type: LOAD_EXTERNAL_REPOSITORIES,
                    externalRepositories,
                    msgExternalRepositories
                })
            })
            .catch(error => {
                dispatch({
                    type: LOAD_EXTERNAL_REPOSITORIES_ERROR,
                    externalRepositories: [],
                    msgExternalRepositories: "Não foi possível encontrar repositórios"
                })
            });
    }
};

/**
 * Resets external repositories' array.
 * 
 * @returns {Function} dispatch used to invoke the repositories' redux
 */
export const resetExternalRepositories = () => 
    dispatch =>
        dispatch({
            type: LOAD_EXTERNAL_REPOSITORIES,
            externalRepositories: undefined
        });

/**
 * Gets Project's Repositories.
 * 
 * @returns {Array} Project repositories' array
 */
const _getProjectRepositories = async () => {
    let repositoriesFirestore = await getRepositoriesFirestore();
    repositoriesFirestore = _getDataRepositoriesFirestore(repositoriesFirestore);

    const promises = repositoriesFirestore
        .map(repository => _getGitHubRepositories(repository.ownerName, repository.name));

    const repositoriesResult = await Promise.all(promises);
    const projectRepositories = repositoriesResult
        .map((result, index) => 
            _mapRepositoryAttr(result.data, repositoriesFirestore, index));

    return projectRepositories;
};

/**
 * Get all user's Repositories.
 * 
 * @param {String} accessToken
 *      User's access token
 * @returns {Function} Dispatch used to invoke the repositories's redux
 */
const _getAllUserRepositories = async () => {
    const method = 'GET';
    const url = 'https://api.github.com/user/repos?sort=updated';
    const accessToken = sessionStorage.getItem('authAccessToken');
    const authUrl = getUrlAuthenticated(url, method, accessToken);

    const repositoriesResult = await axios(authUrl);
    const repositoriesNoProject = repositoriesResult.data
        .map(result => _mapRepositoryAttr(result));

    return repositoriesNoProject;
};

/**
 * Requests to Firestore all Project's Repositories.
 * 
 * @returns {Promise} request's promise
 */
export const getRepositoriesFirestore = () => {
    const firestore = firebase.firestore();
    return firestore.collection(COLLECTION_REPOSITORY_FIRESTORE).get();
};

/**
 * Requests to GitHub the data's Repository.
 * 
 * @param {String} ownerName
 *      Owner's name
 * @param {Object} repositoryName
 *      Repository's name
 * @returns {Promise} request's promise
 */
const _getGitHubRepositories = (ownerName, repositoryName) => {
    const method = 'GET';
    const url = repositoryName ? `https://api.github.com/repos/${ownerName}/${repositoryName}`
        : `https://api.github.com/users/${ownerName}/repos`;
    const accessToken = sessionStorage.getItem('authAccessToken');
    const authUrl = getUrlAuthenticated(url, method, accessToken);

    return axios(authUrl);
}

/**
 * Gets repositories' firestore data.
 * 
 * @param {Array} repositoriesFirestore 
 *      Array with firestore's repositories response
 * @returns {Array} array with repositories' firestore data
 */
const _getDataRepositoriesFirestore = (repositoriesFirestore) => {
    return repositoriesFirestore.docs.map(doc => {
        let repository = doc.data();
        repository.id = doc.id;
        return repository;
    });
}

/**
 * Maps the GitHub's repository response to necessary datas to System.
 * 
 * @param {Object} repositoryGitHub
 *      GitHub's repository response
 * @param {Array} repositoriesFirestore 
 *      Repositories's Firestore array
 * @param {Number} index
 *      Index's GitHub repository response into repositoriesFirestore
 * @returns {Object} Repository with mapped data
 */
const _mapRepositoryAttr = (repositoryGitHub, repositoriesFirestore, index) => (
    {
        id: repositoryGitHub.id,
        name: repositoryGitHub.name,
        owner: {
            name: repositoryGitHub.owner.login
        },
        creationDate: moment(repositoryGitHub.created_at).format('DD/MM/YYYY, HH:mm'),
        idFirestore: repositoriesFirestore && repositoriesFirestore[index].id
    }
);

/**
 * Gets user's repositories that isn't in project repositories.
 * 
 * @param {Array} projectRepositories
 *      Project repositories's list
 * @param Array} userRepositories
 *      User's repostiories
 * @returns {Array} repositories that isn't in project repositories.
 */
const _getRepositoriesNoProject = (projectRepositories, userRepositories) =>
    userRepositories.filter(repository => !_containsRepository(projectRepositories, repository));

/**
 * Returns a boolean indicating if the repository is in repositories list.
 * 
 * @param {*} respositories
 *      List of repositories
 * @param {*} repository
 *      Repository to be searched
 * @return {Boolean} {@code true} if repostiories' list contains repository, otherwise {@code false}
 */
const _containsRepository = (respositories, repository) => (
    respositories.reduce((contains, currentRepository) => 
        contains || currentRepository.id === repository.id, false)
);