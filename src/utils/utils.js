import moment from 'moment';

moment.locale('pt-BR');

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

export const mapearAtributosPullRequest = (pullRequest) => {
    return {
        id: pullRequest.id,
        idFirestore: pullRequest.idFirestore,
        nome: pullRequest.title,
        dataAtualizacao: pullRequest.updated_at,
        dataCriacao: moment(pullRequest.created_at).format('DD/MM/YYYY, HH:mm'),
        numero: pullRequest.number,
        status: (pullRequest.state === "open" ? "aberto": "fechado"),
        repositorio: {
            nome: pullRequest.base.repo.name,
            id: pullRequest.base.repo.id
        },
        responsavel: {
            id: pullRequest.user.id,
            nome: pullRequest.user.login
        }
    }
};