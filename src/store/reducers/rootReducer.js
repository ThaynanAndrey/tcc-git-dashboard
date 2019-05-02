import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import pullRequestsReducer from './PullRequestsReducer';
import newPullRequestsReducer from './NewPullRequestsReducer';
import repositoriesReducer from './RepositoriesReducer';
import projectsReducer from './ProjectsReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    pullRequests: pullRequestsReducer,
    newPullRequests: newPullRequestsReducer,
    repositories: repositoriesReducer,
    projects: projectsReducer
});

export default rootReducer;