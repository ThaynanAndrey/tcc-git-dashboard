import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from "materialize-css";

import PullRequestCollapsible from './collapsible/pullRequest/PullRequestCollapsible';
import RepositoryCollapsible from './collapsible/repository/RepositoryCollapsible';

import { requireAuthentication } from '../../high-order-components/RequireAuthentication';
import { getDetailsPullRequest } from '../../store/actions/pullRequestsAction';
import { getProject } from '../../store/actions/projectsAction';
import PullRequestModal from './pullRequestModal/PullRequestModal';

const styles = {
    fontSize: "17px",
    marginRight: "50px",
    marginLeft: "50px"
};

/**
 * Component with the function of presenting all Project's details, that is the Project's
 * Repositories and Pull Requests.
 * 
 * @author Thaynan Nunes
 */
class ProjectDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            detailsPullRequest: {}
        };

        this.redirectPage = this.redirectPage.bind(this);
        this.openPullRequest = this.openPullRequest.bind(this);
        this.closePullRequestDetails = this.closePullRequestDetails.bind(this);
    }

    /**
     * Load Materialize's Collapsible and Modal after load Component.
     */
    componentDidMount() {
        const elemsCollapsible = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elemsCollapsible, {});

        const elemsModal = document.querySelectorAll('.modal');
        this.instanceModal = M.Modal.init(elemsModal, {})[0];

        this.props.getProject(this.props.idProject);
    }

    /**
     * Redirects to page from path passed by parameter
     * 
     * @param {String} path
     *      Page's path 
     */
    redirectPage(path) {
        this.props.history.push(path);
    }

    /**
     * Opens details Pull Request.
     * 
     * @param {Object} pullRequest 
     *      Pull Request to be showed details
     */
    openPullRequest(pullRequest) {
        this.setState({ detailsPullRequest: pullRequest });
        this.props.getDetailsPullRequest(pullRequest)
            .then(() => {
                this.instanceModal.open();
            });
    }

    /**
     * Closes the modal with Pull Request details.
     */
    closePullRequestDetails() {
        this.instanceModal.close();
    }

    render() {
        return (
            <div style={styles}>
                <h3>Detalhes de {this.props.project ? this.props.project.name : "Projeto"}</h3>

                <PullRequestModal
                    pullRequest={this.props.selectedPullRequest}
                    closePullRequestDetails={this.closePullRequestDetails}
                />
                
                <PullRequestCollapsible
                    idProject={this.props.idProject}
                    redirectPage={this.redirectPage}
                    openPullRequest={this.openPullRequest}
                />

                <RepositoryCollapsible
                    idProject={this.props.idProject}
                    redirectPage={this.redirectPage}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    idProject: ownProps.match.params.id,
    selectedPullRequest: state.pullRequests.selectedPullRequest,
    project: state.projects.project
});

const mapDispatchToProps = dispatch => ({
    getDetailsPullRequest: pullRequest => dispatch(getDetailsPullRequest(pullRequest)),
    getProject: idProject => dispatch(getProject(idProject))
});

export default requireAuthentication(connect(mapStateToProps, mapDispatchToProps)(ProjectDetails));