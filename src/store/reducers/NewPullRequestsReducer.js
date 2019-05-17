import { LOAD_PULL_REQUESTS_NO_PROJECT_SUCCESS, ADDED_PULL_REQUEST_SUCCESS, ADDED_PULL_REQUEST_ERROR,
    LOAD_EXTERNAL_PULL_REQUESTS_NO_PROJECT_SUCCESS } from '../actions/types';

const initState = {
    pullRequestsNoProject: [],
    externalPullRequestsNoProject: [],
};
  
const newPullRequestsReducer = (state = initState, action) => {
    switch(action.type) {
        case LOAD_PULL_REQUESTS_NO_PROJECT_SUCCESS:
            console.log('pull requests no project loaded!');
            return {
                ...state,
                pullRequestsNoProject: action.pullRequestsNoProject
            };
        case ADDED_PULL_REQUEST_SUCCESS:
            console.log("Pull request added");
            return {
                ...state,
                pullRequestsNoProject: action.pullRequestsNoProject,
                externalPullRequestsNoProject: action.externalPullRequestsNoProject
            };
        case ADDED_PULL_REQUEST_ERROR:
            console.log("Error to add pull request: " + action.erro);
            return state;
        case LOAD_EXTERNAL_PULL_REQUESTS_NO_PROJECT_SUCCESS:
            console.log("Load external pull requests");
            return {
                ...state,
                externalPullRequestsNoProject: action.externalPullRequestsNoProject
            }
        default:
          return state
    }
};
  
export default newPullRequestsReducer;