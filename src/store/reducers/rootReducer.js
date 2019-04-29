import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import pullRequestsReducer from './PullRequestsReducer';
import newPullRequestsReducer from './NewPullRequestsReducer';
import repositoriesReducer from './RepositoriesReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    pullRequests: pullRequestsReducer,
    newPullRequests: newPullRequestsReducer,
    repositories: repositoriesReducer
});

export default rootReducer;