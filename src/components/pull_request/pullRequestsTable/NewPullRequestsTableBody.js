import React from 'react';
import Tooltip from "react-simple-tooltip";

/**
 * Stateless component with the function of presenting the body of
 * a table with Pull Requests not yet added to the project.
 * 
 * @author Thaynan Nunes
 */
const NewPullRequestsTableBody = ({ pullRequests, addPullRequest }) => {
    const pullRequestElements = pullRequests.map((pullRequest, indice) => (
        <tr key={indice}>
            <td>{ pullRequest.nome }</td>
            <td>{ pullRequest.dataCriacao }</td>
            <td>{ pullRequest.status }</td>
            <td>{ pullRequest.responsavel.nome }</td>
            <td>{ pullRequest.repositorio.nome }</td>
            <td>
                <Tooltip content="Adicionar PR" placement="left" radius={10} style={{whiteSpace: "nowrap"}}>
                    <i className="material-icons left green-text" style={{cursor: "pointer"}}
                        onClick={() => addPullRequest(pullRequest)}>
                        add_box
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

export default NewPullRequestsTableBody;