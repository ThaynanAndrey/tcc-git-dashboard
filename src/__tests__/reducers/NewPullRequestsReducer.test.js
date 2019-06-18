import newPullRequestsReducer from '../../store/reducers/NewPullRequestsReducer';
import { initState } from '../../store/reducers/NewPullRequestsReducer';

describe('NewPullRequestsReducer', () => {
    it('should return the initial state', () => {
        const state = newPullRequestsReducer(undefined, {});
        
        expect(state).toMatchSnapshot();
        expect(state).toEqual(initState);
    });

    it('should handle LOAD_PULL_REQUESTS_NO_PROJECT_SUCCESS', () => {
        const pullRequestsNoProject = [ { name: "PR Name", date: "10/10/1010" } ];
        
        const action = {
            type: 'LOAD_PULL_REQUESTS_NO_PROJECT_SUCCESS',
            pullRequestsNoProject
        };
        
        const newState = {
            ...initState,
            pullRequestsNoProject
        };

        const state = newPullRequestsReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(newState);
    });

    it('should handle ADDED_PULL_REQUEST_SUCCESS', () => {
        const pullRequestsNoProject = [ { name: "PR Crazy Name", date: "10/10/1010" } ];
        const externalPullRequestsNoProject = [ { name: "PR External Crazy Name", date: "10/12/1201" } ];
        
        const action = {
            type: 'ADDED_PULL_REQUEST_SUCCESS',
            pullRequestsNoProject,
            externalPullRequestsNoProject
        };
        
        const newState = {
            ...initState,
            pullRequestsNoProject,
            externalPullRequestsNoProject
        };

        const state = newPullRequestsReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(newState);
    });

    it('should handle ADDED_PULL_REQUEST_ERROR', () => {
        const action = {
            type: 'ADDED_PULL_REQUEST_ERROR'
        };

        const state = newPullRequestsReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(initState);
    });

    it('should handle LOAD_EXTERNAL_PULL_REQUESTS_NO_PROJECT_SUCCESS', () => {
        const externalPullRequestsNoProject = [ { name: "PR External Crazy Name", date: "10/12/1201" } ];
        
        const action = {
            type: 'LOAD_EXTERNAL_PULL_REQUESTS_NO_PROJECT_SUCCESS',
            externalPullRequestsNoProject
        };
        
        const newState = {
            ...initState,
            externalPullRequestsNoProject
        };

        const state = newPullRequestsReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(newState);
    });

    it('should handle LOAD_EXTERNAL_PULL_REQUESTS_NO_PROJECT_ERROR', () => {        
        const action = {
            type: 'LOAD_EXTERNAL_PULL_REQUESTS_NO_PROJECT_ERROR'
        };
        
        const newState = {
            ...initState,
            externalPullRequestsNoProject: []
        };

        const state = newPullRequestsReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(newState);
    });

    it('should handle RESET_PULL_REQUESTS_NO_PROJECT', () => {        
        const action = {
            type: 'RESET_PULL_REQUESTS_NO_PROJECT'
        };
        
        const newState = {
            ...initState,
            pullRequestsNoProject: [],
            externalPullRequestsNoProject: []
        };

        const state = newPullRequestsReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(newState);
    });
});