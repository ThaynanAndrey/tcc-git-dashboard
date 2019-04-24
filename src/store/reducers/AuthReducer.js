import { USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_LOGOUT_SUCCESS, USER_LOGOUT_ERROR } from '../actions/types';

const initState = {
    user: undefined,
    accessToken: undefined,
    errorLogin: undefined,
    errorLogout: undefined
};
  
const authReducer = (state = initState, action) => {
    switch(action.type) {
        case USER_LOGIN_SUCCESS:
            console.log('User logged');
            return {
                ...state,
                user: action.user,
                idUser: action.idUser,
                accessToken: action.accessToken
            };
        case USER_LOGIN_ERROR:
            console.log("Error to log user");
            return {
                ...state,
                errorLogin: action.errorLogin
            }
        case USER_LOGOUT_SUCCESS:
            console.log("log out user");
            return initState;
        case USER_LOGOUT_ERROR:
            console.log("Error to log out user");
            return {
                ...state,
                errorLogout: action.errorLogout
            }
        default:
          return state
    }
};
  
export default authReducer;