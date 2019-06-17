import React from 'react';
import ProjectRepositoryList from '../../../repository/ProjectRepositoryList';

/**
 * Stateless component with the function of presenting a Collapsible Body to Repositories.
 * 
 * @author Thaynan Nunes
 */
const RepositoryCollapsibleBody = ({ idProject }) => (
    <div className="collapsible-body body-collapsible-project">
        <ProjectRepositoryList idProject={idProject} />
    </div>
);

export default RepositoryCollapsibleBody;