import React from 'react';

/**
 * Stateless component with the function to presenting the Footer Modal.
 * 
 * @author Thaynan Nunes
 */
const PullRequestFooterModal = ({ closePullRequestDetails }) => {
    return (
        <div className="modal-footer">
            <div className="modal-close waves-effect waves-green btn-flat"
                onClick={() => closePullRequestDetails()}>
                Fechar
            </div>
        </div>
    );
}

export default PullRequestFooterModal;