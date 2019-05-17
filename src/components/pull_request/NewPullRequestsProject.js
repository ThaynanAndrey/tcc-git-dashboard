import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { requireAuthentication } from '../../high-order-components/RequireAuthentication';
import { getPullRequestsNoProject, addPullRequestInProject, searchExternalPullRequest } from '../../store/actions/newPullRequestsAction';
import PullRequestsTable from './pullRequestsTable/PullRequestsTable';

const styles = {
    fontSize: "17px",
    marginRight: "50px",
    marginLeft: "50px"
};

const styleCardContent = {
  maxHeight: "48vh",
  overflow: "auto"
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

    this.state = {
      ownerName: "",
      repositoryName: "",
      prNumber: "",
      isSearchedExternalPR: false,
    };

    this.addPullRequest = this.addPullRequest.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.searchExternalPullRequest = this.searchExternalPullRequest.bind(this);
  }

  /**
   * Function loaded just after the rendering of the component, in which
   * all Pull Requests not yet linked to the Project will be obtained.
   */
  componentDidMount() {
    this.props.getPullRequestsNoProject(this.props.idProject);
  }

  /**
   * Add new Pull Request to Project, and shows a toast if
   * is added successfully.
   * 
   * @param {Object} pullRequest
   *      Pull Request to be added to Project
   */
  addPullRequest(pullRequest) {
    this.props.addPullRequestInProject(pullRequest, this.props.idProject).then(() => {
      toast.success("Pull Request adicionado!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    });
  }

  /**
   * Changes the component's state from event.
   */
  handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    });
  }

  /**
   * Searches Pull Requests that isn't shared with user.
   */
  searchExternalPullRequest() {
    this.props.searchExternalPullRequest(this.state.ownerName, this.state.repositoryName, this.state.prNumber)
      .then(() => {
        this.setState({ isSearchedExternalPR: true });
      });
  }

  render() {
    return (
        <div style={styles}>
            <h3>Adicionar Pull Requests ao Projeto</h3>
            
            <ToastContainer />
          
            <div style={{display: "flex", marginBottom: "15px", justifyContent: "flex-end"}}>
              <button className="btn waves-effect waves-light green darken-2"
                      type="button" name="cadastrar-pr"
                      onClick={this.props.history.goBack}>
                  Voltar
                  <i className="material-icons left">arrow_back</i>
              </button>
            </div>

            <div className="card">
              <div className="card-content" style={{paddingBottom: "0", paddingTop: "20px"}}>
                  <span className="card-title">Buscar Pull Requests externos</span>
                  <div className="row" style={{marginBottom: "0"}}>
                      <form className="col s12">
                          <div className="row" style={{marginBottom: "0"}}>
                              <div className="input-field col s4">
                                  <i className="material-icons prefix">account_circle</i>
                                  <input name="ownerName" type="text" placeholder="Propietário Repositório" 
                                          onChange={this.handleChange}/>
                              </div>
                              <div className="input-field col s4">
                                  <i className="material-icons prefix">insert_drive_file</i>
                                  <input name="repositoryName" type="text" 
                                          placeholder="Nome Repositório"
                                          onChange={this.handleChange} />
                              </div>
                              <div className="input-field col s3">
                                  <i className="material-icons prefix">create</i>
                                  <input name="prNumber" type="text" 
                                          placeholder="Número PR"
                                          onChange={this.handleChange} />
                              </div>
                              <div className="input-field col s1">
                                  <button className="btn waves-effect waves-light blue darken-2"
                                          type="button" name="search-pr"
                                          onClick={this.searchExternalPullRequest}>
                                      Buscar
                                  </button>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
              { this.state.isSearchedExternalPR && 
                <div className="card-action" style={styleCardContent}>
                  <PullRequestsTable pullRequests={this.props.externalPullRequestsNoProject} 
                    isListNewPullRequests={true} addPullRequest={this.addPullRequest}/>
                </div>
              }
          </div>
          <div className="card">
            <div className="card-content" style={{paddingBottom: "0", paddingTop: "20px"}}>
              <span className="card-title">Pull Requests dos meus repositórios</span>
            </div>
            <div className="card-action" style={styleCardContent}>
              <PullRequestsTable pullRequests={this.props.pullRequestsNoProject} 
                isListNewPullRequests={true} addPullRequest={this.addPullRequest}/>
            </div>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
    pullRequestsNoProject: state.newPullRequests.pullRequestsNoProject,
    externalPullRequestsNoProject: state.newPullRequests.externalPullRequestsNoProject,
    idProject: ownProps.match.params.id
});

const mapDispatchToProps = (dispatch) => ({
    getPullRequestsNoProject: idProject => dispatch(getPullRequestsNoProject(idProject)),
    addPullRequestInProject: (pullRequest, idProject) => dispatch(addPullRequestInProject(pullRequest, idProject)),
    searchExternalPullRequest: (ownerName, repositoryName, prNumber) => dispatch(searchExternalPullRequest(ownerName, repositoryName, prNumber))
});

export default requireAuthentication(connect(mapStateToProps, mapDispatchToProps)(NewPullRequestsProject));