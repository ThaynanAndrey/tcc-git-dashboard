import { combineReducers } from 'redux';
import pullRequestsReducer from './PullRequestsReducer';

const rootReducer = combineReducers({
    pullRequests: pullRequestsReducer
});

export default rootReducer;