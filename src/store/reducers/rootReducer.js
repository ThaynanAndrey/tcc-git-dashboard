import { combineReducers } from 'redux';
import pullRequestsReducer from './PullRequestsReducer';
import newPullRequestsReducer from './NewPullRequestsReducer';
import authReducer from './AuthReducer';

const rootReducer = combineReducers({
    pullRequests: pullRequestsReducer,
    newPullRequests: newPullRequestsReducer,
    auth: authReducer
});

export default rootReducer;