import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from "materialize-css";
import { Link } from 'react-router-dom';

import ProjectPullRequests from '../pull_request/ProjectPullRequests';
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

const styleCollapsibleBody = {
    paddingTop: "0"
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
    }

    /**
     * 
     */
    componentDidMount() {
        const elems = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elems, {});
    }

    render() {
        return (
            <div style={styles}>
                <h3>Detalhes do Projeto</h3>

                <ul className="collapsible">
                    <li className="active">
                        <div className="collapsible-header" style={styleCollapsibleHeader}>
                            <div style={styleCollapsibleHeaderText}>
                                <i className="material-icons">add</i>
                                Pull Requests
                            </div>
                            <div>
                                <Link to="/adicionarPullRequests">
                                    <button className="btn-small waves-effect waves-light green darken-2"
                                            type="button" name="cadastrar-pr">
                                        Adicionar
                                        <i className="material-icons left">add</i>
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="collapsible-body body-collapsible-project" style={styleCollapsibleBody}>
                            <ProjectPullRequests />
                        </div>
                    </li>
                </ul>

                <ul className="collapsible">
                    <li>
                        <div className="collapsible-header" style={styleCollapsibleHeader}>
                            <div style={styleCollapsibleHeaderText}>
                                <i className="material-icons col right">add</i>
                                Repositórios
                            </div>
                            <div>
                                <Link to="/adicionarPullRequests">
                                    <button className="btn-small waves-effect waves-light green darken-2"
                                            type="button" name="cadastrar-pr">
                                        Adicionar
                                        <i className="material-icons left">add</i>
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="collapsible-body body-collapsible-project" style={styleCollapsibleBody}>
                            <h2>Ainda não implementado</h2>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    // projectPullRequests: state.pullRequests.projectPullRequests
});

const mapDispatchToProps = (dispatch) => ({
    // getProjectPullRequests: () => dispatch(getProjectPullRequests())
});

export default requireAuthentication(connect(mapStateToProps, mapDispatchToProps)(ProjectDetails));