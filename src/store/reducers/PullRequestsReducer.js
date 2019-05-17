import { LOAD_PROJECT_PULL_REQUESTS_SUCCESS, LOAD_PULL_REQUEST_SUCCESS } from '../actions/types';

const initState = {
    projectPullRequests: [],
    selectedPullRequest: { responsavel: {}, repositorio: {} },
};
  
const pullRequestsReducer = (state = initState, action) => {
    switch(action.type) {
        case LOAD_PROJECT_PULL_REQUESTS_SUCCESS:
            console.log('get all pull requests from project!');
            return {
                ...state,
                projectPullRequests: action.projectPullRequests
            };
        case LOAD_PULL_REQUEST_SUCCESS:
            return {
                ...state,
                selectedPullRequest: action.selectedPullRequest
            }
        default:
          return state
    }
};
  
export default pullRequestsReducer;