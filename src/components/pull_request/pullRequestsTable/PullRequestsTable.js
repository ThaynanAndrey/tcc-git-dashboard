import React from 'react';
import PullRequestsTableHead from './PullRequestsTableHead';
import PullRequestsTableBody from './PullRequestsTableBody';
import NewPullRequestsTableBody from './NewPullRequestsTableBody';

/**
 * Stateless component with the function of presenting a table of Pull Requests.
 * 
 * @author Thaynan Nunes
 */
const PullRequestsTable = ({ pullRequests, isListNewPullRequests, addPullRequest, removePullRequest, openPullRequest }) => {
    const pullRequestTableBody = isListNewPullRequests
        ? <NewPullRequestsTableBody pullRequests={pullRequests} addPullRequest={addPullRequest}/>
        : <PullRequestsTableBody pullRequests={pullRequests} removePullRequest={removePullRequest}
            openPullRequest={openPullRequest}/>;

    if(!pullRequests || pullRequests.length === 0 ) {
        const message = isListNewPullRequests ? "Não foram encontrados Pull Requests!" : "Não há Pull Requests cadastrados!";
        return (
            <div> {message} </div>
        )
    }
    return (
        <table className="striped highlight responsive-table">
            <PullRequestsTableHead />
            {pullRequestTableBody}
        </table>
    )
}

export default PullRequestsTable;