import { LOAD_PROJECT_REPOSITORIES_SUCCESS, LOAD_REPOSITORIES_NO_PROJECT_SUCCESS, ADDED_REPOSITORY_SUCCESS,
    ADDED_REPOSITORY_ERROR, LOAD_EXTERNAL_REPOSITORIES, LOAD_EXTERNAL_REPOSITORIES_ERROR } from '../actions/types';

const initState = {
    projectRepositories: [],
    repositoriesNoProject: [],
    externalRepositories: undefined,
    msgExternalRepositories: undefined,
    error: undefined
};
  
const repositoriesReducer = (state = initState, action) => {
    switch(action.type) {
        case LOAD_PROJECT_REPOSITORIES_SUCCESS:
            console.log('get all project\'s respositories!');
            return {
                ...state,
                projectRepositories: action.projectRepositories
            };
        case LOAD_REPOSITORIES_NO_PROJECT_SUCCESS:
            console.log('get repositories no project!');
            return {
                ...state,
                repositoriesNoProject: action.repositoriesNoProject
            }
        case ADDED_REPOSITORY_SUCCESS:
            console.log('added new repository on project!');
            return {
                ...state,
                repositoriesNoProject: action.repositoriesNoProject,
                externalRepositories: action.externalRepositories
            }
        case ADDED_REPOSITORY_ERROR:
            console.log('erro to adding a new repository on project: ', action.error);
            return {
                ...state,
                error: action.error
            }
        case LOAD_EXTERNAL_REPOSITORIES:
        case LOAD_EXTERNAL_REPOSITORIES_ERROR:
            console.log("load external repositories");
            return {
                ...state,
                externalRepositories: action.externalRepositories,
                msgExternalRepositories: action.msgExternalRepositories
            }
        default:
          return state
    }
};
  
export default repositoriesReducer;