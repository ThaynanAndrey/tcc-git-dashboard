import React from 'react';

/**
 * Stateless component with the function of displaying the head of a
 * Pull Requests table.
 * 
 * @author Thaynan Nunes
 */
const PullRequestsTableHead = () => {
    return (
        <thead>
            <tr>
                <th>Pull Request</th>
                <th>Data</th>
                <th>Status</th>
                <th>Responsável</th>
                <th>Repositório</th>
                <th></th>
            </tr>
        </thead>
    )
}

export default PullRequestsTableHead;