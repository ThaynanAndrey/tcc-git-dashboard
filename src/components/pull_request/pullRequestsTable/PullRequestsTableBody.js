import React from 'react';
import Tooltip from "react-simple-tooltip";
import { Link } from 'react-router-dom';

/**
 * Stateless Component with the function of displaying the body of
 * a table with the Pull Requests added in the project.
 * 
 * @author Thaynan Nunes
 */
const PullRequestsTableBody = ({ pullRequests, removePullRequest }) => {
    const pullRequestElements = pullRequests.map((pullRequest, indice) => (
        <tr key={indice}>
            <td>{ pullRequest.nome }</td>
            <td>{ pullRequest.dataCriacao }</td>
            <td>{ pullRequest.status }</td>
            <td>{ pullRequest.responsavel.nome }</td>
            <td>{ pullRequest.repositorio.nome }</td>
            <td>
                <Link to="/adicionarPullRequests">
                    <Tooltip content="Detalhes do PR" style={{whiteSpace: "nowrap"}}>
                        <i className="material-icons left" style={{cursor: "pointer"}}>open_in_browser</i>
                    </Tooltip>
                </Link>
            </td>
            <td>
                <Tooltip content="Excluir PR" style={{whiteSpace: "nowrap"}}>
                    <i className="material-icons left red-text" style={{cursor: "pointer"}}
                        onClick={() => removePullRequest(pullRequest)}>
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