import React from 'react';

/**
 * Stateless component with the function to presenting the content to adding new Project.
 * 
 * @author Thaynan Nunes
 */
const ContenteNewProjectModal = ({ handleChange }) => {
    return (
        <div className="modal-content">
            <h4>Novo Projeto</h4>
            <div className="row">
                <form className="col s12">
                    <div className="input-field col s5"  style={{width: "100%"}}>
                        <i className="material-icons prefix">insert_drive_file</i>
                        <input name="projectName" type="tel" 
                                placeholder="Nome Projeto"
                                onChange={handleChange} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ContenteNewProjectModal;