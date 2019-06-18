import React from 'react';
import StripedTable from '../../layout/StripedTable';
import TableHead from '../../layout/TableHead';
import ProjectItensTable from './ProjectItensTable';

/**
 * Stateless component with the function to presenting the New Project Modal.
 * 
 * @author Thaynan Nunes
 */
const ProjectsTable = ({ projects, openProject, deleteProject }) => {
    return (
        projects.length > 0 && 
        <StripedTable>
            <TableHead headsNames={["Nome", "Data de Criação", ""]}/>
            <ProjectItensTable
                projects={projects}
                openProject={openProject}
                deleteProject={deleteProject} />
        </StripedTable>
    );
}

export default ProjectsTable;