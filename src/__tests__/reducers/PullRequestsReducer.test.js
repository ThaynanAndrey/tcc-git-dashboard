import pullRequestsReducer from '../../store/reducers/PullRequestsReducer';
import { initState } from '../../store/reducers/PullRequestsReducer';

describe('PullRequestsReducer', () => {
    it('should return the initial state', () => {
        const state = pullRequestsReducer(undefined, {});
        
        expect(state).toMatchSnapshot();
        expect(state).toEqual(initState);
    });

    it('should handle LOAD_PROJECT_PULL_REQUESTS_SUCCESS', () => {
        const projectPullRequests = [ { name: "Old PR", date:"10/12/2015" } ];
        
        const action = {
            type: 'LOAD_PROJECT_PULL_REQUESTS_SUCCESS',
            projectPullRequests
        };
        
        const newState = {
            ...initState,
            projectPullRequests
        };

        const state = pullRequestsReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(newState);
    });

    it('should handle LOAD_PULL_REQUEST_SUCCESS', () => {
        const selectedPullRequest = [ { name: "Old PR", date:"10/12/2015",
            responsavel: { name: "Joao" }, repositorio: { name: "GitRepo" } } ];
        
        const action = {
            type: 'LOAD_PULL_REQUEST_SUCCESS',
            selectedPullRequest
        };
        
        const newState = {
            ...initState,
            selectedPullRequest
        };

        const state = pullRequestsReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(newState);
    });

    it('should handle RESET_PROJECT_PULL_REQUESTS', () => {
        const action = {
            type: 'RESET_PROJECT_PULL_REQUESTS'
        };
        
        const newState = {
            ...initState,
            projectPullRequests: []
        };

        const state = pullRequestsReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(newState);
    });
});