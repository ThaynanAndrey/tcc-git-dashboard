import firebase from 'firebase/app';

import { USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_LOGOUT_SUCCESS, USER_LOGOUT_ERROR } from './types';

/**
 * Realize login with firebase authentication.
 * 
 * @returns {Function} Dispatch used to invoke the auth's redux
 */
export const login = () => {
    return dispatch => {
        return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                const provider = new firebase.auth.GithubAuthProvider();
                provider.addScope('repo');
                
                return firebase.auth().signInWithPopup(provider)
                    .then(result => {
                        const { currentUser } = firebase.auth();
                        const accessToken = result.credential.accessToken;
                        sessionStorage.setItem('authAccessToken', accessToken);
                        
                        dispatch({
                            type: USER_LOGIN_SUCCESS,
                            user: currentUser,
                            idUser: currentUser.uid,
                            accessToken
                        });
                    }).catch(error => {
                        console.log("erro: ", error);
                        dispatch({
                            type: USER_LOGIN_ERROR,
                            errorLogin: error
                        });
                    });
            }).catch(error => {
                console.log("erro: ", error);
                dispatch({
                    type: USER_LOGIN_ERROR,
                    errorLogin: error
                });
            })
    };
}

/**
 * Realize log out user.
 * 
 * @returns {Function} Dispatch used to invoke the auth's redux
 */
export const logout = () => {
    return dispatch => {
        return firebase.auth().signOut().then(() => {
            sessionStorage.removeItem('authAccessToken');
            dispatch({
                type: USER_LOGOUT_SUCCESS
            });
          }, error => {
            dispatch({
                type: USER_LOGOUT_ERROR,
                errorLogout: error
            });
          });
    };
};

/**
 * Check if exists an user authenticated on system.
 * 
 * @returns {Boolean} {@code true} if exists an user authenticated, otherwise {@code false}
 */
export const isAuthenticated = () => {
    return sessionStorage.getItem('authAccessToken') !== null;
}