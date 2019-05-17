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

/**
 * Gets formatted date to DD/MM/YYYY HH:MM
 * 
 * @param {Date} date
 *      Date to be formatted
 */
export const getFormattedDate = date =>
    `${_formatNumberTwoDigits(date.getDate())}/${_formatNumberTwoDigits(date.getMonth() + 1)}/${date.getFullYear()}, 
    ${_formatNumberTwoDigits(date.getHours())}:${_formatNumberTwoDigits(date.getMinutes())}`;

/**
 * Formats number to two digits. For example, the number 2 becomes 02.
 * 
 * @param {Number} number 
 *      Number to be formatted
 */
const _formatNumberTwoDigits = (number) =>
    ("0" + number).slice(-2);

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
        dataAtualizacao: getFormattedDate(new Date(pullRequestGitHub.updated_at)),
        dataCriacao: getFormattedDate(new Date(pullRequestGitHub.created_at)),
        numero: pullRequestGitHub.number,
        status: (pullRequestGitHub.state === "open" ? "aberto": "fechado"),
        description: pullRequestGitHub.body,
        merge: {
            isMerged: pullRequestGitHub.merged,
            merged_at: pullRequestGitHub.merged_at,
            merged_by: pullRequestGitHub.merged_by
        },
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
        },
        comments: {
            number: pullRequestGitHub.comments,
            url: pullRequestGitHub.comments_url
        },
        commits: {
            number: pullRequestGitHub.commits,
            url: pullRequestGitHub.commits_url
        }
    };
    pullRequest.idFirestore = pullRequestsFirestore && pullRequestsFirestore[indexFirestore].id;

    return pullRequest;
};