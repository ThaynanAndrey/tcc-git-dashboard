import { USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_LOGOUT_SUCCESS, USER_LOGOUT_ERROR } from '../actions/types';

export const initState = {
    user: undefined,
    accessToken: undefined,
    errorLogin: undefined,
    errorLogout: undefined
};
  
const authReducer = (state = initState, action) => {
    switch(action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                user: action.user,
                idUser: action.idUser,
                accessToken: action.accessToken
            };
        case USER_LOGIN_ERROR:
            return {
                ...state,
                errorLogin: action.errorLogin
            }
        case USER_LOGOUT_SUCCESS:
            return initState;
        case USER_LOGOUT_ERROR:
            return {
                ...state,
                errorLogout: action.errorLogout
            }
        default:
          return state
    }
};
  
export default authReducer;