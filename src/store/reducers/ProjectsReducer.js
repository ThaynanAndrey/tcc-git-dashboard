import { LOAD_PROJECTS_SUCCESS, LOAD_PROJECTS_ERROR, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_ERROR } from '../actions/types';

const initState = {
    projects: [],
    currentProject: undefined,
    error: undefined
};
  
const projectsReducer = (state = initState, action) => {
    switch(action.type) {
        case LOAD_PROJECTS_SUCCESS:
            console.log('Projects loaded');
            return {
                ...state,
                projects: action.projects
            };
        case LOAD_PROJECTS_ERROR:
            console.log("Error to load projects");
            return {
                ...state,
                projects: [],
                error: action.error
            };
        case CREATE_PROJECT_SUCCESS:
            console.log("Create new project!");
            return {
                ...state,
                projects: action.projects
            };
        case CREATE_PROJECT_ERROR:
            console.log("Error to create project!");
            return state;
        default:
          return state;
    }
};
  
export default projectsReducer;