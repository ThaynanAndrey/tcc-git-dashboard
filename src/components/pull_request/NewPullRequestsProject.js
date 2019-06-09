import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import BlockUi from 'react-block-ui';

import { requireAuthentication } from '../../high-order-components/RequireAuthentication';
import { getPullRequestsNoProject, addPullRequestInProject, searchExternalPullRequest, resetPullRequestsNoProject } from '../../store/actions/newPullRequestsAction';
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
      loading: false,
      loadingExternalPR: false
    };

    this.addPullRequest = this.addPullRequest.bind(this);
    this.addExternalPullRequest = this.addExternalPullRequest.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.searchExternalPullRequest = this.searchExternalPullRequest.bind(this);
  }

  /**
   * Function loaded just after the rendering of the component, in which
   * all Pull Requests not yet linked to the Project will be obtained.
   */
  componentDidMount() {
    this.setState({ loading: true })
    this.props.getPullRequestsNoProject(this.props.idProject)
      .finally(() => this.setState({ loading: false }));
  }

  componentWillUnmount() {
    this.props.resetPullRequestsNoProject();
  }

  /**
   * Add new Pull Request to Project that isn't at project's repositories,
   * and shows a toast if is added successfully.
   * 
   * @param {Object} pullRequest 
   *      Pull Request to be added in Project
   */
  addExternalPullRequest(pullRequest) {
    this.addPullRequest(pullRequest, true);
  }

  /**
   * Add new Pull Request to Project, and shows a toast if
   * is added successfully.
   * 
   * @param {Object} pullRequest
   *      Pull Request to be added in Project
   * @param {Boolean} isExternalPR
   *      Boolean to be indicate is external PR to be added.
   */
  addPullRequest(pullRequest, isExternalPR) {
    isExternalPR ? this.setState({ loadingExternalPR: true }) : this.setState({ loading: true })

    this.props.addPullRequestInProject(pullRequest, this.props.idProject).then(() => {
      toast.success("Pull Request adicionado!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      
      isExternalPR ? this.setState({ loadingExternalPR: false }) : this.setState({ loading: false })
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
    this.setState({ loadingExternalPR: true });
    this.props.searchExternalPullRequest(this.state.ownerName, this.state.repositoryName,
      this.state.prNumber, this.props.idProject)
      .finally(() => {
        this.setState({ isSearchedExternalPR: true });
        this.setState({ loadingExternalPR: false });
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
                                          placeholder="Número PR (Opcional)"
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
              <BlockUi tag="div" blocking={this.state.loadingExternalPR}>
                { this.state.isSearchedExternalPR && 
                  <div className="card-action" style={styleCardContent}>
                    <PullRequestsTable pullRequests={this.props.externalPullRequestsNoProject} 
                      isListNewPullRequests={true} addPullRequest={this.addExternalPullRequest}/>
                  </div>
                }
              </BlockUi>
          </div>
          <div className="card">
            <div className="card-content" style={{paddingBottom: "0", paddingTop: "20px"}}>
              <span className="card-title">Pull Requests dos meus repositórios</span>
            </div>
            <div className="card-action" style={styleCardContent}>
              <BlockUi tag="div" blocking={this.state.loading}>
                { this.props.pullRequestsNoProject && this.props.pullRequestsNoProject.length > 0 &&
                  <PullRequestsTable pullRequests={this.props.pullRequestsNoProject} 
                    isListNewPullRequests={true} addPullRequest={this.addPullRequest}/>
                }
                { !this.state.loading && this.props.pullRequestsNoProject.length === 0 &&
                  <p>Não foram encontrados Pull Requests!</p>
                }
              </BlockUi>
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
    searchExternalPullRequest: (ownerName, repositoryName, prNumber, idProject) =>
      dispatch(searchExternalPullRequest(ownerName, repositoryName, prNumber, idProject)),
    resetPullRequestsNoProject: () => dispatch(resetPullRequestsNoProject())
});

export default requireAuthentication(connect(mapStateToProps, mapDispatchToProps)(NewPullRequestsProject));