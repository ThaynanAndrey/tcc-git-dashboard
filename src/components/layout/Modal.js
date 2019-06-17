import React from 'react';

/**
 * Stateless component with the function to presenting the Modal.
 * 
 * @author Thaynan Nunes
 */
const Modal = ({ children, isFixed }) =>
    (
        <div className={isFixed ? "modal modal-fixed-footer modal-styles" : "modal"}>
            { children }
        </div>
    );

export default Modal;