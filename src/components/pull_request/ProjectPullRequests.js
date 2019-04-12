import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getProjectPullRequests, removePullRequestProject } from '../../store/actions/pullRequestsAction';
import PullRequestsTable from './pullRequestsTable/PullRequestsTable';

const styles = {
    fontSize: "17px",
    marginRight: "50px",
    marginLeft: "50px"
};

/**
 * Component with the function of presenting all the Pull Requests of the project.
 * 
 * @author Thaynan Nunes
 */
class ProjectPullRequests extends Component {
  constructor(props) {
    super(props);
    
    this.removePullRequest = this.removePullRequest.bind(this);
  }

  /**
   * Function loaded just after the rendering of the component, in which
   * all Pull Requests linked to the Project will be obtained.
   */
  componentDidMount() {
    this.props.getProjectPullRequests();
  }

  /**
   * Deletes the Pull Request from user's Project, and shows a toast if
   * is deleted successfully.
   * 
   * @param {Object} pullRequest
   *        Pull Request to be deleted
   */
  async removePullRequest(pullRequest) {
      await this.props.removePullRequestProject(pullRequest);
      toast.success("Pull Request removido!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
  }

  render() {
    return (
        <div style={styles}>
            <h3>Pull Requests cadastrados no Projeto</h3>
            
            <ToastContainer />
            
            <div className="row">
                <div className="col right">
                    <Link to="/adicionarPullRequests">
                        <button className="btn waves-effect waves-light green accent-3"
                                type="button" name="cadastrar-pr">
                            Cadastrar Pull Requests
                            <i className="material-icons left">add</i>
                        </button>
                    </Link>
                </div>
                <div className="col right">
                    <button className="btn waves-effect waves-light orange accent-3" type="button" name="cadastrar-pr">
                        Cadastrar Repositório
                        <i className="material-icons left">add</i>
                    </button>
                </div>
            </div>

            <PullRequestsTable pullRequests={this.props.projectPullRequests}
                isListNewPullRequests={false} removePullRequest={this.removePullRequest}/>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
    projectPullRequests: state.pullRequests.projectPullRequests
});

const mapDispatchToProps = (dispatch) => ({
    getProjectPullRequests: () => dispatch(getProjectPullRequests()),
    removePullRequestProject: (pullRequest) => dispatch(removePullRequestProject(pullRequest))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPullRequests);