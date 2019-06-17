import React from 'react';
import Tooltip from "react-simple-tooltip";

/**
 * Stateless component with the function of presenting a striped table.
 * 
 * @author Thaynan Nunes
 */
const ProjectItensTable = ({ projects, openProject, deleteProject }) => {
    const projectItens = projects.map((project, index) => (
        <tr key={index} onClick={openProject(project)} style={{cursor: "pointer"}}>
            <td>{ project.name }</td>
            <td>{ project.creationDate }</td>
            <td>
                <Tooltip content="Remover Projeto" placement="left" radius={10} style={{whiteSpace: "nowrap"}}>
                    <i className="material-icons left delete-text red-text" style={{cursor: "pointer"}}
                        onClick={deleteProject(project)}>
                        delete
                    </i>
                </Tooltip>
            </td>
        </tr>
    ))

    return (
        <tbody>
            {projectItens}
        </tbody>
    )
};

export default ProjectItensTable;