import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from "materialize-css";
import showdown from 'showdown';

import ProjectPullRequests from '../pull_request/ProjectPullRequests';
import ProjectRepositoryList from '../repository/ProjectRepositoryList';
import { requireAuthentication } from '../../high-order-components/RequireAuthentication';
import { getDetailsPullRequest } from '../../store/actions/pullRequestsAction';
import { getProject } from '../../store/actions/projectsAction';

const styles = {
    fontSize: "17px",
    marginRight: "50px",
    marginLeft: "50px"
};

const styleCollapsibleHeader = {
    display: "flex",
    justifyContent: "space-between"
};

const styleCollapsibleHeaderText = {
    display: "flex"
};

const modalContentStyles = {
    padding: "0",
    backgroundColor: "#FFFAFA"
}

const modalHeaderStyles = {
    textAlign: "center",
    margin: "0",
    padding: "18px"
};

const modalBodyStyles = {
    padding: "0px 18px 18px 18px"
};

const markedCardStyles = {
    margin: 0,
    paddingRight: 0,
    fontWeight: "bold"
};

const propertyCardStyles = {
    margin: 0
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
        this.getHtmlMarkdownText = this.getHtmlMarkdownText.bind(this);
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

    /**
     * Gets the html desciption from Markdown text.
     */
    getHtmlMarkdownText(textMD) {
        if(textMD && document.getElementById("markdown-description")) {
            const converter = new showdown.Converter();
            const html = converter.makeHtml(textMD);
            document.getElementById("markdown-description").innerHTML = html;
        } else if(document.getElementById("markdown-description")) {
            document.getElementById("markdown-description").innerHTML = "<div>Não há descrição para esse Pull Request!</div>"
        }
    }

    render() {
        const getItems = (items) => items && items.map((item, index) => (
                <tr key={index}>
                    <td>{ item.author.name }</td>
                    <td>{ item.date }</td>
                    <td>{ item.message }</td>
                </tr>
            ));
        
        const getNumberStyles = () => ({
            width: "2rem",
            height: "27px",
            marginRight: "1rem",
            backgroundColor: (this.props.selectedPullRequest.commits && this.props.selectedPullRequest.commits.length > 0)
                ? "green" : "red",
            textAlign: "center",
            color: "white",
            borderRadius: "0.5rem"
        });

        return (
            <div style={styles}>
                <h3>Detalhes de {this.props.project ? this.props.project.name : "Projeto"}</h3>

                <div className="modal modal-fixed-footer modal-styles">
                    <div className="modal-content" style={modalContentStyles}>
                        <h5 style={modalHeaderStyles}>{this.props.selectedPullRequest.nome}</h5>
                        
                        <div style={modalBodyStyles}>
                            <div className="card">
                                <div className="card-content" style={{paddingBottom: "0", paddingTop: "10px"}}>
                                    <span className="card-title">Detalhes</span>
                                </div>
                                <div className="card-action" style={{ maxHeight: "30vh", overflow: "auto", paddingTop: "0" }}>
                                    <ul>
                                        <li className="row" style={{ marginBottom: 0 }}>
                                            <p className="col" style={markedCardStyles}>Status:</p> 
                                            <p className="col" style={propertyCardStyles}> {this.props.selectedPullRequest.status} </p>
                                        </li>
                                        <li className="row" style={{ marginBottom: 0 }}>
                                            <p className="col" style={markedCardStyles}>Data de criação:</p> 
                                            <p className="col" style={propertyCardStyles}> {this.props.selectedPullRequest.dataCriacao} </p>
                                        </li>
                                        <li className="row" style={{ marginBottom: 0 }}>
                                            <p className="col" style={markedCardStyles}>Última atualização:</p> 
                                            <p className="col" style={propertyCardStyles}> {this.props.selectedPullRequest.dataAtualizacao} </p>
                                        </li>
                                        <li className="row" style={{ marginBottom: 0 }}>
                                            <p className="col" style={markedCardStyles}>Login responsável:</p> 
                                            <p className="col" style={propertyCardStyles}> {this.props.selectedPullRequest.responsavel.nome} </p>
                                        </li>
                                        <li className="row" style={{ marginBottom: 0 }}>
                                            <p className="col" style={markedCardStyles}>Repositório:</p> 
                                            <p className="col" style={propertyCardStyles}> {this.props.selectedPullRequest.repositorio.nome} </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <ul className="collapsible">
                                <li>
                                    <div className="collapsible-header" style={styleCollapsibleHeader}>
                                        <div style={styleCollapsibleHeaderText}>
                                            <i className="material-icons">dehaze</i>
                                            Descrição
                                        </div>
                                    </div>
                                    <div id="markdown-description"
                                         className="collapsible-body body-collapsible-project descriptionPullRequestContent">
                                        {this.getHtmlMarkdownText(this.props.selectedPullRequest.description)}
                                    </div>
                                </li>
                                <li>
                                    <div className="collapsible-header" style={styleCollapsibleHeader}>
                                        <div style={styleCollapsibleHeaderText}>
                                            <div style={getNumberStyles()}>
                                                {this.props.selectedPullRequest.commits && this.props.selectedPullRequest.commits.length}
                                            </div>
                                            Commits
                                        </div>
                                    </div>
                                    { this.props.selectedPullRequest.commits && this.props.selectedPullRequest.commits.length > 0 &&
                                        <div className="collapsible-body body-collapsible-project">
                                            <table className="striped highlight responsive-table">
                                                <thead>
                                                    <tr>
                                                        <th>Responsável</th>
                                                        <th>Data Criação</th>
                                                        <th>Mensagem</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {getItems(this.props.selectedPullRequest.commits)}
                                                </tbody>
                                            </table>
                                        </div>
                                    }
                                </li>
                                <li>
                                    <div className="collapsible-header" style={styleCollapsibleHeader}>
                                        <div style={styleCollapsibleHeaderText}>
                                            <div style={getNumberStyles()}>
                                                {this.props.selectedPullRequest.comments && this.props.selectedPullRequest.comments.length}
                                            </div>
                                            Comentários
                                        </div>
                                    </div>
                                    { this.props.selectedPullRequest.comments && this.props.selectedPullRequest.comments > 0 &&
                                        <div className="collapsible-body body-collapsible-project">
                                            <table className="striped highlight responsive-table">
                                                <thead>
                                                    <tr>
                                                        <th>Responsável</th>
                                                        <th>Data Criação</th>
                                                        <th>Mensagem</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {getItems(this.props.selectedPullRequest.comments)}
                                                </tbody>
                                            </table>
                                        </div>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a className="modal-close waves-effect waves-green btn-flat"
                           onClick={this.closePullRequestDetails}>
                            Fechar
                        </a>
                    </div>
                </div>

                <ul className="collapsible">
                    <li className="active">
                        <div className="collapsible-header" style={styleCollapsibleHeader}>
                            <div style={styleCollapsibleHeaderText}>
                                <i className="material-icons">dehaze</i>
                                Pull Requests
                            </div>
                            <div>
                                <button className="btn-small waves-effect waves-light green darken-2"
                                        type="button" name="cadastrar-pr"
                                        onClick={() => this.redirectPage(`${this.props.idProject}/adicionarPullRequests`)}>
                                    Adicionar
                                    <i className="material-icons left">add</i>
                                </button>
                            </div>
                        </div>
                        <div className="collapsible-body body-collapsible-project">
                            <ProjectPullRequests idProject={this.props.idProject} openPullRequest={this.openPullRequest} />
                        </div>
                    </li>
                </ul>

                <ul className="collapsible">
                    <li className="active">
                        <div className="collapsible-header" style={styleCollapsibleHeader}>
                            <div style={styleCollapsibleHeaderText}>
                                <i className="material-icons">dehaze</i>
                                Repositórios
                            </div>
                            <div>
                                <button className="btn-small waves-effect waves-light green darken-2"
                                        type="button" name="cadastrar-pr"
                                        onClick={() => this.redirectPage(`${this.props.idProject}/adicionarRepositorios`)}>
                                    Adicionar
                                    <i className="material-icons left">add</i>
                                </button>
                            </div>
                        </div>
                        <div className="collapsible-body body-collapsible-project">
                            <ProjectRepositoryList idProject={this.props.idProject} />
                        </div>
                    </li>
                </ul>
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