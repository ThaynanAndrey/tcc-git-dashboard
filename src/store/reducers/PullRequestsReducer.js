import { LOAD_PROJECT_PULL_REQUESTS_SUCCESS } from '../actions/types';

const initState = {
    projectPullRequests: []
};
  
const pullRequestsReducer = (state = initState, action) => {
    switch(action.type) {
        case LOAD_PROJECT_PULL_REQUESTS_SUCCESS:
            console.log('get all pull requests from project!');
            return {
                ...state,
                projectPullRequests: action.projectPullRequests
            };
        default:
          return state
    }
};
  
export default pullRequestsReducer;