import firebase from 'firebase/app';

import { getDataElemsFirestore, getFormattedDate } from '../../utils/utils';
import { LOAD_PROJECTS_SUCCESS, LOAD_PROJECTS_ERROR, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_ERROR } from './types';

const COLLECTION_PROJECTS_FIRESTORE = "projects";
const COLLECTION_USER_FIRESTORE = "users";

/**
 * Loads user's Projects.
 * 
 * @returns {Function} dispatch used to invoke the projects' redux
 */
export const loadProjects = () => {
    return dispatch => {
        return _getPullRequestsFirestore()
            .then(projects => {
                projects = getDataElemsFirestore(projects);
                projects = _filterUserProjects(projects);
                projects = projects.map(project => {
                    let pro = project;
                    const date = new Date(pro.creationDate.seconds * 1000);
                    pro.creationDate = getFormattedDate(date);
                    return pro;
                });

                dispatch({
                    type: LOAD_PROJECTS_SUCCESS,
                    projects
                });
            })
            .catch(error => {
                dispatch({
                    type: LOAD_PROJECTS_ERROR,
                    error
                });
            });
    }
};

/**
 * Creates a new Project in Firestore.
 * 
 * @param {String} projectName
 *      Project name
 * @returns {Function} dispatch used to invoke the projects' redux
 */
export const createProject = projectName => {
    return (dispatch, getState) => {
        const firestore = firebase.firestore();
        const idUser = _getIdUser();
        const creationDate = new Date();
        const newProject = {
            name: projectName,
            creationDate,
            user: firestore.doc(`${COLLECTION_USER_FIRESTORE}/${idUser}`)
        };

        return firestore.collection(COLLECTION_PROJECTS_FIRESTORE).add(newProject)
            .then(project => {
                newProject.id = project.id;
                newProject.creationDate = "10/10/2010";
                let projects = getState().projects.projects;
                projects.push(newProject);

                dispatch({ 
                    type: CREATE_PROJECT_SUCCESS,
                    projects
                });
            }).catch(error => {
                dispatch({ type: CREATE_PROJECT_ERROR , error });
            });
    };
};

/**
 * Deletes project in Firestore.
 * 
 * @param {Object} project 
 *      Project to be deleted
 * @returns {Function} dispatch used to invoke the projects' redux
 */
export const deleteProject = (project) => {
    return (dispatch, getState) => {
        const firestore = firebase.firestore();
        return firestore.collection(COLLECTION_PROJECTS_FIRESTORE).doc(project.id).delete()
            .then(() => {
                const projects = getState().projects.projects
                    .filter(proj => proj.id !== project.id);

                dispatch({
                    type: LOAD_PROJECTS_SUCCESS,
                    projects
                });
            });
    };
};

/**
 * Gets in Firestore all user's Projects.
 * 
 * @returns {Promise} request's promise
 */
const _getPullRequestsFirestore = () => {
    const firestore = firebase.firestore();

    return firestore.collection(COLLECTION_PROJECTS_FIRESTORE).get();
};

/**
 * Filter Projects by current User.
 * 
 * @param {Array} projects
 *      Projects to be filtered
 */
const _filterUserProjects = projects => {
    const idUser = _getIdUser();
    
    return projects.filter(project => project.user.id === idUser);
};

/**
 * Gets the Firestore User id.
 * 
 * @returns {String} User id
 */
const _getIdUser = () => {
    const { currentUser } = firebase.auth();
    return currentUser.uid;
}