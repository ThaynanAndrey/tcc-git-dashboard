import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from "materialize-css";

import ProjectPullRequests from '../pull_request/ProjectPullRequests';
import ProjectRepositoryList from '../repository/ProjectRepositoryList';
import { requireAuthentication } from '../../high-order-components/RequireAuthentication';

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

/**
 * Component with the function of presenting all Project's details, that is the Project's
 * Repositories and Pull Requests.
 * 
 * @author Thaynan Nunes
 */
class ProjectDetails extends Component {
    constructor(props) {
        super(props);

        this.redirectPage = this.redirectPage.bind(this);
    }

    /**
     * 
     */
    componentDidMount() {
        const elems = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elems, {});
    }

    redirectPage(path) {
        this.props.history.push(path);
    }

    render() {
        return (
            <div style={styles}>
                <h3>Detalhes do Projeto</h3>

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
                            <ProjectPullRequests idProject={this.props.idProject} />
                        </div>
                    </li>
                </ul>

                <ul className="collapsible">
                    <li>
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
    idProject: ownProps.match.params.id
});

const mapDispatchToProps = (dispatch) => ({ });

export default requireAuthentication(connect(mapStateToProps, mapDispatchToProps)(ProjectDetails));