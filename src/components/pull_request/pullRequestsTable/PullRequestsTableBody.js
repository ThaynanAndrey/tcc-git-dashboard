import React from 'react';
import Tooltip from "react-simple-tooltip";

/**
 * Stateless Component with the function of displaying the body of
 * a table with the Pull Requests added in the project.
 * 
 * @author Thaynan Nunes
 */
const PullRequestsTableBody = ({ pullRequests, removePullRequest, openPullRequest }) => {
    const pullRequestElements = pullRequests.map((pullRequest, indice) => (
        <tr key={indice} onClick={() => openPullRequest(pullRequest)} style={{cursor: "pointer"}}>
            <td>{ pullRequest.nome }</td>
            <td>{ pullRequest.dataCriacao }</td>
            <td>{ pullRequest.status }</td>
            <td>{ pullRequest.responsavel.nome }</td>
            <td>{ pullRequest.repositorio.nome }</td>
            <td>
                <Tooltip content="Excluir PR" style={{whiteSpace: "nowrap"}}>
                    <i className="material-icons left red-text" style={{cursor: "pointer"}}
                        onClick={removePullRequest.bind(this, pullRequest)}>
                        delete
                    </i>
                </Tooltip>
            </td>
        </tr>
    ));

    return (
        <tbody>
            {pullRequestElements}
        </tbody>
    )
}

export default PullRequestsTableBody;