import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from "react-simple-tooltip";

import { requireAuthentication } from '../../high-order-components/RequireAuthentication';

const styles = {
    fontSize: "17px",
    marginRight: "50px",
    marginLeft: "50px"
};

/**
 * Component to show user Projects.
 * 
 * @author Thaynan Nunes
 */
export class Projects extends Component {
    constructor(props) {
        super(props);

        this.openProject = this.openProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.createProject = this.createProject.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getSalutation() {
        let userName; // = this.props.user && this.props.user.additionalUserInfo.profile.login;
        const salutation = userName ? `Olá, ${userName}!` : "Seja bem-vindo";
        return <h3>{salutation}</h3>;
    }

    openProject() {

    }

    deleteProject() {

    }

    createProject() {

    }

    handleChange() {

    }
    
    render() {
        const projectElements = () => this.props.projects.map((project, index) => (
            <tr key={index}>
                <td>{ project.name }</td>
                <td>{ project.creationDate }</td>
                <td>
                    <Tooltip content="Abri Projeto" style={{whiteSpace: "nowrap"}}>
                        <i className="material-icons left" style={{cursor: "pointer"}}
                            onClick={() => this.openProject(project)}>
                            open_in_browser
                        </i>
                    </Tooltip>
                </td>
                <td>
                    <Tooltip content="Adicionar" style={{whiteSpace: "nowrap"}}>
                        <i className="material-icons left delete-text" style={{cursor: "pointer"}}
                            onClick={() => this.deleteProject(project)}>
                            delete
                        </i>
                    </Tooltip>
                </td>
            </tr>
        ));

        const projects = this.props.projects
            ? (<table className="striped highlight responsive-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Data de Criação</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectElements()}
                    </tbody>
                </table>)
            : (<span>Ainda não existem projetos cadastrados!</span>);

        return (
            <div style={styles}>
                {this.getSalutation()}
                
                <div className="card">
                    <div className="card-content" style={{paddingBottom: "0", paddingTop: "20px"}}>
                        <span className="card-title">Meus Projetos</span>
                    </div>
                    <div className="card-action">
                        {projects}
                    </div>
                </div>

                <div className="card">
                    <div className="card-content" style={{paddingBottom: "0", paddingTop: "20px"}}>
                        <span className="card-title">Criar Projeto</span>
                        <div className="row" style={{marginBottom: "0"}}>
                            <form className="col s12">
                                <div className="row" style={{marginBottom: "0"}}>
                                    <div className="input-field col s5">
                                        <i className="material-icons prefix">insert_drive_file</i>
                                        <input name="repositoryName" type="tel" 
                                                placeholder="Nome Projeto"
                                                onChange={this.handleChange} />
                                    </div>
                                    <div className="input-field col s2">
                                        <button className="btn waves-effect waves-light green darken-2"
                                                type="button" name="create-project"
                                                onClick={this.createProject}>
                                            Criar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => ({
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
    // getProjectPullRequests: () => dispatch(getProjectPullRequests())
});

export default requireAuthentication(connect(mapStateToProps, mapDispatchToProps)(Projects));