import React from 'react';
import ProjectPullRequests from '../../../pull_request/ProjectPullRequests';

/**
 * Stateless component with the function of presenting a Collapsible Body to Pull Requests.
 * 
 * @author Thaynan Nunes
 */
const PullRequestCollapsibleBody = ({ idProject, openPullRequest }) => (
    <div className="collapsible-body body-collapsible-project">
        <ProjectPullRequests idProject={idProject} openPullRequest={openPullRequest} />
    </div> 
);

export default PullRequestCollapsibleBody;