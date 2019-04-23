import firebase from 'firebase/app';

import { USER_LOGIN_SUCCESS, USER_LOGIN_ERROR } from './types';

/**
 * Realize login with firebase authentication.
 * 
 * @returns {Function} Dispatch used to invoke the auth's redux
 */
export const login = () => {
    return dispatch => {
        const provider = new firebase.auth.GithubAuthProvider();
        return firebase.auth().signInWithPopup(provider)
            .then(result => {
                const { currentUser } = firebase.auth();
                const accessToken = result.credential.accessToken;
                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    user: currentUser,
                    accessToken
                });
            }).catch(error => {
                console.log("erro: ", error);
                dispatch({
                    type: USER_LOGIN_ERROR,
                    error
                });
            });
    }
}

export const isLogged = () => {
    const { currentUser } = firebase.auth();
    return currentUser !== null;
}