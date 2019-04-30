import moment from 'moment';

moment.locale('pt-BR');

/**
 * Gets url with auth headers.
 * 
 * @param {String} url
 *      URL to be requested
 * @param {String} method
 *      REST's method
 * @param {String} accessToken
 *      User's access token
 */
export const getUrlAuthenticated = (url, method, accessToken) => (
    {
        method,
        url,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    }
);

/**
 * Gets data in Firestore's array.
 * 
 * @param {Array} elemsFirestore
 *      Array to be gotten the data
 * @returns {Array} array with data Firestore's elements
 */
export const getDataElemsFirestore = elemsFirestore => {
    return elemsFirestore.length === 0 ? [] :
        elemsFirestore.docs
            .filter(doc => doc.exists)
            .map(doc => {
                let dataDoc = doc.data();
                dataDoc.id = doc.id;
                return dataDoc;
            });
};

export const binarySearch = (list, start, end, element) => {
    if(start > end) {
        return -1;
    }
    const mid = Math.trunc((start + end) / 2);
    if(list[mid].idPullRequestGitHub === element) {
        return mid;
    } else if(list[mid].idPullRequestGitHub > element) {
        return binarySearch(list, start, mid-1, element);
    }
    return binarySearch(list, mid+1, end, element);
};

export const mapearAtributosPullRequest = (pullRequestGitHub, pullRequestsFirestore, indexFirestore) => {
    const pullRequest = {
        id: pullRequestGitHub.id,
        idFirestore: pullRequestGitHub.idFirestore,
        nome: pullRequestGitHub.title,
        dataAtualizacao: pullRequestGitHub.updated_at,
        dataCriacao: moment(pullRequestGitHub.created_at).format('DD/MM/YYYY, HH:mm'),
        numero: pullRequestGitHub.number,
        status: (pullRequestGitHub.state === "open" ? "aberto": "fechado"),
        repositorio: {
            nome: pullRequestGitHub.base.repo.name,
            id: pullRequestGitHub.base.repo.id,
            idFirestore: pullRequestGitHub.idFirestoreRepository
        },
        responsavel: {
            id: pullRequestGitHub.user.id,
            nome: pullRequestGitHub.user.login
        },
        propietario: {
            id: pullRequestGitHub.base.repo.owner.id,
            nome: pullRequestGitHub.base.repo.owner.login
        }
    };
    pullRequest.idFirestore = pullRequestsFirestore && pullRequestsFirestore[indexFirestore].id;

    return pullRequest;
};