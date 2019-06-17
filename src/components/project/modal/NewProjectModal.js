import React from 'react';
import BlockUi from 'react-block-ui';

import Modal from '../../layout/Modal';
import ContenteNewProjectModal from './ContentNewProjectModal';
import ProjectModalFooter from './ProjectModalFooter';

/**
 * Stateless component with the function to presenting the New Project Modal.
 * 
 * @author Thaynan Nunes
 */
const NewProjectModal = ({ handleChange, closeModal, createProject, loadingCreateProject }) => {
    return (
        <Modal>
            <BlockUi tag="div" blocking={loadingCreateProject}>
                <ContenteNewProjectModal handleChange={handleChange}/>
                <ProjectModalFooter closeModal={closeModal} createProject={createProject}/>
            </BlockUi>
        </Modal>
    );
}

export default NewProjectModal;