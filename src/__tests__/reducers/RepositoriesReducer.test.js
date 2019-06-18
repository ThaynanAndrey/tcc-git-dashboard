import repositoriesReducer from '../../store/reducers/RepositoriesReducer';
import { initState } from '../../store/reducers/RepositoriesReducer';

describe('RepositoriesReducer', () => {
    it('should return the initial state', () => {
        const state = repositoriesReducer(undefined, {});
        
        expect(state).toMatchSnapshot();
        expect(state).toEqual(initState);
    });

    it('should handle LOAD_PROJECT_REPOSITORIES_SUCCESS', () => {
        const projectRepositories = [
            { name: "My repo", date: "10/11/2012" },
            { name: "My second repo", date: "11/11/2012" }
        ];
        
        const action = {
            type: 'LOAD_PROJECT_REPOSITORIES_SUCCESS',
            projectRepositories
        };
        
        const newState = {
            ...initState,
            projectRepositories
        };

        const state = repositoriesReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(newState);
    });

    it('should handle LOAD_REPOSITORIES_NO_PROJECT_SUCCESS', () => {
        const repositoriesNoProject = [
            { name: "out repo, not mine", date: "10/11/2012" }
        ];
        
        const action = {
            type: 'LOAD_REPOSITORIES_NO_PROJECT_SUCCESS',
            repositoriesNoProject
        };
        
        const newState = {
            ...initState,
            repositoriesNoProject
        };

        const state = repositoriesReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(newState);
    });

    it('should handle ADDED_REPOSITORY_SUCCESS', () => {
        const repositoriesNoProject = [
            { name: "My repo", date: "10/11/2012" },
            { name: "My second repo", date: "11/11/2012" }
        ];
        const externalRepositories = [
            { name: "My external repo", date: "13/11/2012" }
        ];
        
        const action = {
            type: 'ADDED_REPOSITORY_SUCCESS',
            repositoriesNoProject,
            externalRepositories
        };
        
        const newState = {
            ...initState,
            repositoriesNoProject,
            externalRepositories
        };

        const state = repositoriesReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(newState);
    });

    it('should handle ADDED_REPOSITORY_ERROR', () => {
        const action = {
            type: 'ADDED_REPOSITORY_ERROR',
            error: 'Shiiiii'
        };
        
        const newState = {
            ...initState,
            error: 'Shiiiii'
        };

        const state = repositoriesReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(newState);
    });

    it('should handle LOAD_EXTERNAL_REPOSITORIES', () => {
        const externalRepositories = [
            { name: "My repo", date: "10/11/2012" },
            { name: "My second repo", date: "11/11/2012" }
        ];
        const msgExternalRepositories = "";
        
        const action = {
            type: 'LOAD_EXTERNAL_REPOSITORIES',
            externalRepositories,
            msgExternalRepositories
        };
        
        const newState = {
            ...initState,
            externalRepositories,
            msgExternalRepositories
        };

        const state = repositoriesReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(newState);
    });

    it('should handle LOAD_EXTERNAL_REPOSITORIES_ERROR', () => {
        const externalRepositories = [
            { name: "My repo", date: "10/11/2012" },
            { name: "My second repo", date: "11/11/2012" }
        ];
        const msgExternalRepositories = "Oppss, its wrong...";
        
        const action = {
            type: 'LOAD_EXTERNAL_REPOSITORIES_ERROR',
            externalRepositories,
            msgExternalRepositories
        };
        
        const newState = {
            ...initState,
            externalRepositories,
            msgExternalRepositories
        };

        const state = repositoriesReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(newState);
    });

    it('should handle RESET_PROJECT_REPOSITORIES', () => {
        const action = {
            type: 'RESET_PROJECT_REPOSITORIES'
        };
        
        const newState = {
            ...initState,
            projectRepositories: []
        };

        const state = repositoriesReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(newState);
    });

    it('should handle RESET_REPOSITORIES_NO_PROJECT', () => {
        const action = {
            type: 'RESET_REPOSITORIES_NO_PROJECT'
        };
        
        const newState = {
            ...initState,
            repositoriesNoProject: [],
            externalRepositories: []
        };

        const state = repositoriesReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(newState);
    });
});