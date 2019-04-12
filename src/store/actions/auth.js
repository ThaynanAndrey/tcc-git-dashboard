import firebase from 'firebase/app';

import { USER_LOGIN_SUCCESS, USER_LOGIN_ERROR } from './types';

export const login = () => {
    return dispatch => {
        const provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            const { currentUser } = firebase.auth();
            const accessToken = result.credential.accessToken;
            dispatch({
                type: USER_LOGIN_SUCCESS,
                accessToken
            });
        }).catch(function(error) {
            console.log("erro: ", error);
            dispatch({
                type: USER_LOGIN_ERROR
            });
        });
    }
}