import React from 'react';

/**
 * Stateless component with the function to presenting the the footer of New Project Modal.
 * 
 * @author Thaynan Nunes
 */
const ProjectModalFooter = ({ closeModal, createProject }) => {
    return (
        <div className="modal-footer">
            <div className="modal-close waves-effect waves-green btn-flat"
                onClick={closeModal}>
                Cancelar
            </div>
            <div className="modal-close waves-effect waves-green btn-flat"
                onClick={createProject}>
                Adicionar
            </div>
        </div>
    );
}

export default ProjectModalFooter;