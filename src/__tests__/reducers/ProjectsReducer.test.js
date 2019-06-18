import projectsReducer from '../../store/reducers/ProjectsReducer';
import { initState } from '../../store/reducers/ProjectsReducer';

describe('ProjectsReducer', () => {
    it('should return the initial state', () => {
        const state = projectsReducer(undefined, {});
        
        expect(state).toMatchSnapshot();
        expect(state).toEqual(initState);
    });

    it('should handle LOAD_PROJECTS_SUCCESS', () => {
        const projects = [ {name: "Project test", creationDate:"12/12/2012" } ];
        
        const action = {
            type: 'LOAD_PROJECTS_SUCCESS',
            projects
        };
        
        const newState = {
            ...initState,
            projects
        };

        const state = projectsReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(newState);
    });

    it('should handle LOAD_PROJECTS_ERROR', () => {        
        const action = {
            type: 'LOAD_PROJECTS_ERROR',
            error: 'Crazy error!'
        };
        
        const newState = {
            ...initState,
            projects: [],
            error: 'Crazy error!'
        };

        const state = projectsReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(newState);
    });

    it('should handle CREATE_PROJECT_SUCCESS', () => {
        const projects = [ {name: "New Project test!!!", creationDate:"13/11/2013" } ];
        
        const action = {
            type: 'CREATE_PROJECT_SUCCESS',
            projects
        };
        
        const newState = {
            ...initState,
            projects
        };

        const state = projectsReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(newState);
    });

    it('should handle GET_PROJECT_SUCCESS', () => {
        const project = { name: "Lonely test", creationDate:"10/02/2012" };
        
        const action = {
            type: 'GET_PROJECT_SUCCESS',
            project
        };
        
        const newState = {
            ...initState,
            project
        };

        const state = projectsReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(newState);
    });

    it('should handle CREATE_PROJECT_ERROR', () => {
        const action = {
            type: 'CREATE_PROJECT_ERROR'
        };

        const state = projectsReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(initState);
    });
});