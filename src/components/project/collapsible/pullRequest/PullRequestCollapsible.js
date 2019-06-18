import React from 'react';
import Collapsible from '../../../layout/Collapsible';
import CollapsibleCard from '../../../layout/CollapsibleCard';
import PullRequestCollapsibleHeader from './PullRequestCollapsibleHeader';
import PullRequestCollapsibleBody from './PullRequestCollapsibleBody';

/**
 * Stateless component with the function of presenting a Collapsible to Pull Requests.
 * 
 * @author Thaynan Nunes
 */
const PullRequestCollapsible = ({ idProject, redirectPage, openPullRequest }) => (
    <Collapsible>
        <CollapsibleCard isActive={true}>
            
            <PullRequestCollapsibleHeader
                idProject={idProject}
                redirectPage={redirectPage}
            />

            <PullRequestCollapsibleBody
                idProject={idProject}
                openPullRequest={openPullRequest}
            />

        </CollapsibleCard>
    </Collapsible>
);

export default PullRequestCollapsible;