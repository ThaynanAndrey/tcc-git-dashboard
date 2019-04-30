import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { requireAuthentication } from '../../high-order-components/RequireAuthentication';
import { getPullRequestsNoProject, addPullRequestInProject, removePullRequestNoProject } from '../../store/actions/newPullRequestsAction';
import PullRequestsTable from './pullRequestsTable/PullRequestsTable';

const styles = {
    fontSize: "17px",
    marginRight: "50px",
    marginLeft: "50px"
};

/**
 * Component with the list function Pull Requests of the user's registered
 * repositories that have not yet been linked to the project.
 * 
 * @author Thaynan Nunes
 */
class NewPullRequestsProject extends Component {
  constructor(props) {
    super(props);

    this.addPullRequest = this.addPullRequest.bind(this);
  }

  /**
   * Function loaded just after the rendering of the component, in which
   * all Pull Requests not yet linked to the Project will be obtained.
   */
  componentDidMount() {
    this.props.getPullRequestsNoProject();
  }

  /**
   * Add new Pull Request to Project, and shows a toast if
   * is added successfully.
   * 
   * @param {Object} pullRequest
   *      Pull Request to be added to Project
   */
  async addPullRequest(pullRequest) {
    await this.props.addPullRequestInProject(pullRequest);
    toast.success("Pull Request adicionado!", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
    this.props.removePullRequestNoProject(pullRequest);
  };

  render() {
    return (
        <div style={styles}>
            <h3>Adicionar Pull Requests ao Projeto</h3>
            
            <ToastContainer />
          
            <div className="col right">
              <button className="btn waves-effect waves-light green darken-2"
                      type="button" name="cadastrar-pr"
                      onClick={this.props.history.goBack}>
                  Voltar
                  <i className="material-icons left">arrow_back</i>
              </button>
            </div>

            <PullRequestsTable pullRequests={this.props.pullRequestsNoProject} 
              isListNewPullRequests={true} addPullRequest={this.addPullRequest}/>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
    pullRequestsNoProject: state.newPullRequests.pullRequestsNoProject
});

const mapDispatchToProps = (dispatch) => ({
    getPullRequestsNoProject: () => dispatch(getPullRequestsNoProject()),
    addPullRequestInProject: (pullRequest) => dispatch(addPullRequestInProject(pullRequest)),
    removePullRequestNoProject: (pullRequest) => dispatch(removePullRequestNoProject(pullRequest))
});

export default requireAuthentication(connect(mapStateToProps, mapDispatchToProps)(NewPullRequestsProject));