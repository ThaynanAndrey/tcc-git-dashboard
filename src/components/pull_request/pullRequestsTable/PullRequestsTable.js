import React from 'react';
import PullRequestsTableHead from './PullRequestsTableHead';
import PullRequestsTableBody from './PullRequestsTableBody';
import NewPullRequestsTableBody from './NewPullRequestsTableBody';

const PullRequestsTable = ({ pullRequests, isListNewPullRequests, addPullRequest, removePullRequest }) => {
    const pullRequestTableBody = isListNewPullRequests
        ? <NewPullRequestsTableBody pullRequests={pullRequests} addPullRequest={addPullRequest}/>
        : <PullRequestsTableBody pullRequests={pullRequests} removePullRequest={removePullRequest}/>;

    return (
        <table className="striped highlight responsive-table">
            <PullRequestsTableHead />
            {pullRequestTableBody}
        </table>
    )
}

export default PullRequestsTable;