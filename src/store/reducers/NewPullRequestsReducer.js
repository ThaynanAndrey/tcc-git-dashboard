import { LOAD_PULL_REQUESTS_NO_PROJECT_SUCCESS, ADDED_PULL_REQUEST_SUCCESS, ADDED_PULL_REQUEST_ERROR,
    LOAD_EXTERNAL_PULL_REQUESTS_NO_PROJECT_SUCCESS, LOAD_EXTERNAL_PULL_REQUESTS_NO_PROJECT_ERROR,
    RESET_PULL_REQUESTS_NO_PROJECT } from '../actions/types';

export const initState = {
    pullRequestsNoProject: [],
    externalPullRequestsNoProject: [],
};
  
const newPullRequestsReducer = (state = initState, action) => {
    switch(action.type) {
        case LOAD_PULL_REQUESTS_NO_PROJECT_SUCCESS:
            return {
                ...state,
                pullRequestsNoProject: action.pullRequestsNoProject
            };
        case ADDED_PULL_REQUEST_SUCCESS:
            return {
                ...state,
                pullRequestsNoProject: action.pullRequestsNoProject,
                externalPullRequestsNoProject: action.externalPullRequestsNoProject
            };
        case ADDED_PULL_REQUEST_ERROR:
            return state;
        case LOAD_EXTERNAL_PULL_REQUESTS_NO_PROJECT_SUCCESS:
            return {
                ...state,
                externalPullRequestsNoProject: action.externalPullRequestsNoProject
            }
        case LOAD_EXTERNAL_PULL_REQUESTS_NO_PROJECT_ERROR:
            return {
                ...state,
                externalPullRequestsNoProject: []
            }
        case RESET_PULL_REQUESTS_NO_PROJECT:
            return {
                ...state,
                pullRequestsNoProject: [],
                externalPullRequestsNoProject: []
            }
        default:
          return state
    }
};
  
export default newPullRequestsReducer;