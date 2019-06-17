import React from 'react';

import Modal from '../../layout/Modal';
import PullRequestContentModal from './PullRequestContentModal'
import PullRequestFooterModal from './PullRequestFooterModal';

/**
 * Stateless component with the function to presenting the Pull Request Details in Modal.
 * 
 * @author Thaynan Nunes
 */
const PullRequestModal = ({ pullRequest, closePullRequestDetails }) => {
    return (
        <Modal isFixed={true}>
            <PullRequestContentModal
                pullRequest={pullRequest}
            />

            <PullRequestFooterModal
                closePullRequestDetails={closePullRequestDetails}
            />
        </Modal>
    );
}

export default PullRequestModal;