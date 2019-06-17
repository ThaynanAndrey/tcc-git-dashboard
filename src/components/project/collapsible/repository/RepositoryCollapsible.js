import React from 'react';
import Collapsible from '../../../layout/Collapsible';
import CollapsibleCard from '../../../layout/CollapsibleCard';
import RepositoryCollapsibleHeader from './RepositoryCollapsibleHeader';
import RepositoryCollapsibleBody from './RepositoryCollapsibleBody';

/**
 * Stateless component with the function of presenting a Collapsible to Repositories.
 * 
 * @author Thaynan Nunes
 */
const RepositoryCollapsible = ({ idProject, redirectPage }) => (
    <Collapsible>
        <CollapsibleCard isActive={true}>
            
            <RepositoryCollapsibleHeader
                idProject={idProject}
                redirectPage={redirectPage}
            />

            <RepositoryCollapsibleBody
                idProject={idProject}
            />

        </CollapsibleCard>
    </Collapsible>
);

export default RepositoryCollapsible;