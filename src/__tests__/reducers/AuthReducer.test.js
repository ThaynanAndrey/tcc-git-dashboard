import authReducer from '../../store/reducers/AuthReducer';
import { initState } from '../../store/reducers/AuthReducer';

describe('AuthReducer', () => {
    it('should return the initial state', () => {
        const state = authReducer(undefined, {});
        
        expect(state).toMatchSnapshot();
        expect(state).toEqual(initState);
    });

    it('should handle USER_LOGIN_SUCCESS', () => {
        const login = {
            user: { name: "Ze" },
            idUser: "123",
            accessToken: "12345"
        };
        
        const action = {
            type: 'USER_LOGIN_SUCCESS',
            ...login
        };
        
        const newState = {
            ...initState,
            ...login
        };

        const state = authReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(newState);
    });

    it('should handle USER_LOGIN_ERROR', () => {
        const error = {
            errorLogin: "Ihhh, something is wrong"
        };
        
        const action = {
            type: 'USER_LOGIN_ERROR',
            ...error
        };
        
        const newState = {
            ...initState,
            ...error
        };

        const state = authReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(newState);
    });

    it('should handle USER_LOGOUT_SUCCESS', () => {
        const action = {
            type: 'USER_LOGOUT_SUCCESS'
        };

        const state = authReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(initState);
    });

    it('should handle USER_LOGOUT_ERROR', () => {
        const action = {
            type: 'USER_LOGOUT_ERROR',
            errorLogout: 'Something is wrong'
        };

        const newState = {
            ...initState,
            errorLogout: 'Something is wrong'
        };

        const state = authReducer(undefined, action);

        expect(state).toMatchSnapshot();
        expect(state).toEqual(newState);
    });
});