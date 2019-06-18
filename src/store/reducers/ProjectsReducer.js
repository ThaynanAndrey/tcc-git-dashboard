import { LOAD_PROJECTS_SUCCESS, LOAD_PROJECTS_ERROR, CREATE_PROJECT_SUCCESS,
    CREATE_PROJECT_ERROR, GET_PROJECT_SUCCESS } from '../actions/types';

export const initState = {
    projects: [],
    project: undefined,
    currentProject: undefined,
    error: undefined
};
  
const projectsReducer = (state = initState, action) => {
    switch(action.type) {
        case LOAD_PROJECTS_SUCCESS:
            return {
                ...state,
                projects: action.projects
            };
        case LOAD_PROJECTS_ERROR:
            return {
                ...state,
                projects: [],
                error: action.error
            };
        case CREATE_PROJECT_SUCCESS:
            return {
                ...state,
                projects: action.projects
            };
        case GET_PROJECT_SUCCESS:
            return {
                ...state,
                project: action.project
            }
        case CREATE_PROJECT_ERROR:
            return state;
        default:
          return state;
    }
};
  
export default projectsReducer;