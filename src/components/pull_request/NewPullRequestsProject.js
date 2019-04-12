import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getPullRequestsNoProject, addPullRequestInProject, removePullRequestNoProject } from '../../store/actions/newPullRequestsAction';
import PullRequestsTable from './pullRequestsTable/PullRequestsTable';

const styles = {
    fontSize: "17px",
    marginRight: "50px",
    marginLeft: "50px"
};

class NewPullRequestsProject extends Component {
  constructor(props) {
    super(props);

    this.addPullRequest = this.addPullRequest.bind(this);
  }

  componentDidMount() {
    this.props.getPullRequestsNoProject();
  }

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
            
            <Link to="/pullRequests">
              <div className="col right">
                <button className="btn waves-effect waves-light green accent-3"
                        type="button" name="cadastrar-pr">
                    Pulls Requests do Projeto
                    <i className="material-icons left">arrow_back</i>
                </button>
              </div>
            </Link>

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

export default connect(mapStateToProps, mapDispatchToProps)(NewPullRequestsProject);