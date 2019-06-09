import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import BlockUi from 'react-block-ui';

import { requireAuthentication } from '../../high-order-components/RequireAuthentication';
import { getProjectPullRequests, removePullRequestProject, resetProjectPullRequests } from '../../store/actions/pullRequestsAction';
import PullRequestsTable from './pullRequestsTable/PullRequestsTable';

const styles = {
    paddingTop: "0"
};

/**
 * Component with the function of presenting all the Pull Requests of the project.
 * 
 * @author Thaynan Nunes
 */
class ProjectPullRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            loadingDelete: false
        }

        this.removePullRequest = this.removePullRequest.bind(this);
    }

    /**
     * Function loaded just after the rendering of the component, in which
     * all Pull Requests linked to the Project will be obtained.
     */
    componentDidMount() {
        this.setState({ loading: true })
        this.props.getProjectPullRequests(this.props.idProject)
            .finally(() => this.setState({ loading: false }));
    }

    componentWillUnmount() {
        this.props.resetProjectPullRequests();
    }

    /**
     * Deletes the Pull Request from user's Project, and shows a toast if
     * is deleted successfully.
     * 
     * @param {Object} pullRequest
     *        Pull Request to be deleted
     */
    async removePullRequest(pullRequest, event) {
        event.stopPropagation();
        this.setState({ loadingDelete: true })
        await this.props.removePullRequestProject(pullRequest);
        toast.success("Pull Request removido!", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
        this.setState({ loadingDelete: false })
    }

    render() {
        if(!this.state.loading && this.props.projectPullRequests.length === 0) {
            return (
                <div style={{paddingTop: "5px"}}>
                    <h6>Não existem Pull Requests cadastrados!</h6>
                </div>
            )
        }
        return (
            <BlockUi tag="div" blocking={this.state.loading || this.state.loadingDelete}>
                {!this.state.loading &&
                    <div style={styles}>
                        <ToastContainer />

                        <PullRequestsTable pullRequests={this.props.projectPullRequests}
                            isListNewPullRequests={false} removePullRequest={this.removePullRequest}
                            openPullRequest={this.props.openPullRequest}/>
                    </div>
                }
            </BlockUi>
        )
    }
}

const mapStateToProps = (state) => ({
    projectPullRequests: state.pullRequests.projectPullRequests
});

const mapDispatchToProps = (dispatch) => ({
    getProjectPullRequests: idProject => dispatch(getProjectPullRequests(idProject)),
    removePullRequestProject: (pullRequest) => dispatch(removePullRequestProject(pullRequest)),
    resetProjectPullRequests: () => dispatch(resetProjectPullRequests()),
});

export default requireAuthentication(connect(mapStateToProps, mapDispatchToProps)(ProjectPullRequests));