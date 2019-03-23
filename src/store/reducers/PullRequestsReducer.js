import { LOAD_PROJECT_PULL_REQUESTS_SUCCESS, LOAD_PULL_REQUESTS_NO_PROJECT_SUCCESS, ADDED_PULL_REQUEST_SUCCESS, ADDED_PULL_REQUEST_ERROR } from '../actions/types';

const initState = {
    projectPullRequests: [],
    pullRequestsNoProject: []
};
  
const pullRequestsReducer = (state = initState, action) => {
    switch(action.type) {
        case LOAD_PROJECT_PULL_REQUESTS_SUCCESS:
            console.log('get all pull requests from project!');
            return {
                ...state,
                projectPullRequests: action.projectPullRequests
            };
        case LOAD_PULL_REQUESTS_NO_PROJECT_SUCCESS:
            console.log('pull requests no project loaded!');
            return {
                ...state,
                pullRequestsNoProject: action.pullRequestsNoProject
            };
        case ADDED_PULL_REQUEST_SUCCESS:
            console.log("Pull request added");
            return state;
        case ADDED_PULL_REQUEST_ERROR:
            console.log("Error to add pull request");
            return state;
        default:
          return state
    }
};
  
export default pullRequestsReducer;