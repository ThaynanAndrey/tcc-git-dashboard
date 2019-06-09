import axios from 'axios';
import firebase from 'firebase/app';

import { LOAD_PROJECT_REPOSITORIES_SUCCESS, LOAD_REPOSITORIES_NO_PROJECT_SUCCESS,
    ADDED_REPOSITORY_SUCCESS, ADDED_REPOSITORY_ERROR, LOAD_EXTERNAL_REPOSITORIES,
    LOAD_EXTERNAL_REPOSITORIES_ERROR, RESET_PROJECT_REPOSITORIES, RESET_REPOSITORIES_NO_PROJECT } from './types';
import { getUrlAuthenticated, getFormattedDate, getDataElemsFirestore } from '../../utils/utils';

const COLLECTION_REPOSITORY_FIRESTORE = "repositories";
const COLLECTION_PROJECT_FIRESTORE = "projects";

/**
 * Gets Project's Repositories.
 * 
 * @param {String} idProject Project id
 * @returns {Function} Dispatch used to invoke the repositories' redux
 */
export const getProjectRepositories = idProject => {
    return async dispatch => {
        const projectRepositories = await getRepositoriesByIdProject(idProject);

        dispatch({
            type: LOAD_PROJECT_REPOSITORIES_SUCCESS,
            projectRepositories
        });
    };
};

/**
 * Gets user's repositories that isn't in project repositories.
 * 
 * @param {String} idProject Project id
 * @returns {Function} Dispatch used to invoke the repositories' redux
 */
export const getRepositoriesNoProject = idProject => {
    return async dispatch => {
        const promises = [];
        promises.push(getRepositoriesByIdProject(idProject));
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
 * @param {String} idProject
 *      Project id to be added th repository
 * @returns {Function} dispatch used to invoke the repositories' redux
 */
export const addRepositoryInProject = (repository, idProject) => {
    return (dispatch, getState) => {
        const firestore = firebase.firestore();
        return firestore.collection(COLLECTION_REPOSITORY_FIRESTORE).add({
            idGitHub: repository.id,
            name: repository.name,
            ownerName: repository.owner.name,
            project: firestore.doc(`${COLLECTION_PROJECT_FIRESTORE}/${idProject}`)
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
export const searchExternalRepository = (ownerName, repositoryName, idProject) => {
    return (dispatch) => {
        const promises = [];
        promises.push(_getGitHubRepositories(ownerName, repositoryName));
        promises.push(getRepositoriesByIdProject(idProject));

        return Promise.all(promises)
            .then(result => {
                const repositoriesResult = result[0];
                const projectRepositories = result[1];

                const isArray = repositoriesResult.data instanceof Array;
                let externalRepositories = isArray ? repositoriesResult.data.map(result => _mapRepositoryAttr(result))
                    : new Array(_mapRepositoryAttr(repositoriesResult.data));
                externalRepositories = externalRepositories.filter(externalRepository =>
                    !_containsRepository(projectRepositories, externalRepository));
                
                const msgExternalRepositories = externalRepositories.length === 0
                    ? "Não existem repositórios para cadastro" : undefined;
                dispatch({
                    type: LOAD_EXTERNAL_REPOSITORIES,
                    externalRepositories,
                    msgExternalRepositories
                })
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: LOAD_EXTERNAL_REPOSITORIES_ERROR,
                    externalRepositories: [],
                    msgExternalRepositories: "Houve um erro na busca. Tente novamente!"
                })
            });
    }
};

/**
 * Resets external repositories' array.
 * 
 * @returns {Function} dispatch used to invoke the repositories' redux
 */
export const resetRepositoriesNoProject = () => 
    dispatch =>
        dispatch({
            type: RESET_REPOSITORIES_NO_PROJECT
        });

/**
 * Resets project repositories list.
 * 
 * @returns {Function} dispatch used to invoke the repositories' redux
 */
export const resetProjectRepositories = () =>
    dispatch => dispatch({ type: RESET_PROJECT_REPOSITORIES});

/**
 * Gets Project's Repositories in Firestore
 * 
 * @param {String} idProject Project id
 * @returns {Array} project repositories
 */
export const getRepositoriesFirestoreByIdProject = async idProject => {
    let repositoriesFirestore = await _getRepositoriesFirestore();
    repositoriesFirestore = getDataElemsFirestore(repositoriesFirestore);

    return _filterRepositoriesByProject(repositoriesFirestore, idProject);
};

/**
 * Gets Project's Repositories.
 * 
 * @param {String} idProject Project id
 * @returns {Array} Project repositories' array
 */
export const getRepositoriesByIdProject = async idProject => {
    const repositoriesFirestoreFilteredProject = await getRepositoriesFirestoreByIdProject(idProject);

    const promises = repositoriesFirestoreFilteredProject
        .map(repository => _getGitHubRepositories(repository.ownerName, repository.name));

    const repositoriesResult = await Promise.all(promises);
    const projectRepositories = repositoriesResult
        .map((result, index) => 
            _mapRepositoryAttr(result.data, repositoriesFirestoreFilteredProject, index));

    return projectRepositories;
};

/**
 * Filter repositories by Project id.
 * 
 * @param {Array} repositories
 *      Repositories to be filtered
 * @param {String} idProject
 *      Project id
 * @returns {Array} filtered respositories by Project id
 */
const _filterRepositoriesByProject = (repositories, idProject) =>
    repositories.filter(repository => repository.project.id === idProject);

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

    let repositoriesResult = await axios(authUrl);
    let nextRepositories = await _getNextRepositories(repositoriesResult);
    nextRepositories = nextRepositories.reduce((array, repo) => array.concat(repo.data), []);
    repositoriesResult = repositoriesResult.data.concat(nextRepositories);

    const userRepositories = repositoriesResult
        .map(result => _mapRepositoryAttr(result));

    return userRepositories;
};

/**
 * Get next pages of Repositories.
 * 
 * @param {Array} repositoriesGitHub
 *      Array with GitHub's Repositories
 * @returns {Promise} Promise with next pages of Repositories
 */
const _getNextRepositories = repositoriesGitHub => {
    console.log(repositoriesGitHub)
    const promises = [];
    const nextPages = repositoriesGitHub.headers.link;
    if(nextPages) {
        const endPage = Number(nextPages.substring(
            nextPages.lastIndexOf("page=") + 5, 
            nextPages.lastIndexOf(">")
        ));
        for(let page = 2; page <= endPage; page++) {
            promises.push(_getRepositoriesByPage(page));
        }
    }
    return Promise.all(promises);
};

/**
 * Requests to GitHub by Repositories.
 * 
 * @param {Number} page
 *      Repositories' page
 * @returns {Promise} request's promise
 */
const _getRepositoriesByPage = page => {
    const method = 'GET';
    const url = `https://api.github.com/user/repos?sort=updated&page=${page}`;
    const accessToken = sessionStorage.getItem('authAccessToken');
    const authUrl = getUrlAuthenticated(url, method, accessToken);

    return axios(authUrl);
};

/**
 * Requests to Firestore all Project's Repositories.
 * 
 * @returns {Promise} request's promise
 */
const _getRepositoriesFirestore = () => {
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
};

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
        creationDate: getFormattedDate(new Date(repositoryGitHub.created_at)),
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
 * @param {Array} respositories
 *      List of repositories
 * @param {Object} repository
 *      Repository to be searched
 * @return {Boolean} {@code true} if repostiories' list contains repository, otherwise {@code false}
 */
const _containsRepository = (respositories, repository) => (
    respositories.reduce((contains, currentRepository) => 
        contains || currentRepository.id === repository.id, false)
);