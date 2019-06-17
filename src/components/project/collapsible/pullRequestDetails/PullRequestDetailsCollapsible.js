import React from 'react';
import Collapsible from '../../../layout/Collapsible';
import PullRequestCommitsCollapsible from './PullRequestCommitsCollapsible';
import PullRequestDescriptionCollapsible from './PullRequestDescriptionCollapsible';
import PullRequestCommentsCollapsible from './PullRequestCommentsCollapsible';

/**
 * Stateless component with the function of presenting a Collapsible to Pull Request Details.
 * 
 * @author Thaynan Nunes
 */
const PullRequestDetailsCollapsible = ({ pullRequest  }) => (
    <Collapsible>
        <PullRequestDescriptionCollapsible
            pullRequest={pullRequest}
        />

        <PullRequestCommitsCollapsible
            pullRequest={pullRequest}
        />

        <PullRequestCommentsCollapsible
            pullRequest={pullRequest}
        />
    </Collapsible>
);

export default PullRequestDetailsCollapsible;