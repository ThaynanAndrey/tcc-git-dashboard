import { USER_LOGIN_SUCCESS, USER_LOGIN_ERROR  } from '../actions/types';

const initState = {
    user: undefined,
    accessToken: undefined,
    error: undefined
};
  
const authReducer = (state = initState, action) => {
    switch(action.type) {
        case USER_LOGIN_SUCCESS:
            console.log('User logged');
            return {
                ...state,
                user: action.user
            };
        case USER_LOGIN_ERROR:
            console.log("Error to log user");
            return {
                ...state,
                user: undefined,
                error: action.error
            }
        default:
          return state
    }
};
  
export default authReducer;