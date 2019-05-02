import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from "react-simple-tooltip";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { requireAuthentication } from '../../high-order-components/RequireAuthentication';

import { loadProjects, createProject, deleteProject } from '../../store/actions/projectsAction';

const styles = {
    fontSize: "17px",
    marginRight: "50px",
    marginLeft: "50px"
};

const styleCardContent = {
    maxHeight: "49vh",
    overflow: "auto"
};

/**
 * Component to show user Projects.
 * 
 * @author Thaynan Nunes
 */
export class Projects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectName: ""
        };

        this.createProject = this.createProject.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Load user's Projetcs after load component.
     */
    componentDidMount() {
        this.props.loadProjects();
    }

    /**
     * Gets the salutation to user.
     * 
     * @returns {String} salutation to user
     */
    getSalutation() {
        let userName; // = this.props.user && this.props.user.additionalUserInfo.profile.login;
        const salutation = userName ? `Olá, ${userName}!` : "Seja bem-vindo";
        return <h3>{salutation}</h3>;
    }

    openProject(project) {
        this.props.history.push(`/projeto/${project.id}`);
    }

    /**
     * Deletes project in Firestore.
     * 
     * @param {Object} project 
     *      Project to be deleted
     */
    deleteProject(project, event) {
        event.stopPropagation();
        this.props.deleteProject(project).then(() => {
            toast.success("Projeto removido!", {
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
     * Creates a new user Project.
     */
    async createProject() {
        if(this.state.projectName !== "") {
            this.props.createProject(this.state.projectName)
                .then(() => {
                    toast.success("Projeto criado!", {
                        position: "top-right",
                        autoClose: 2500,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
        
                    this.setState({ projectName: "" });
                });
        }
    }

    /**
     * Changes the component's state from event.
     */
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    render() {
        const projectElements = () => this.props.projects.map((project, index) => (
            <tr key={index} onClick={this.openProject.bind(this, project)} style={{cursor: "pointer"}}>
                <td>{ project.name }</td>
                <td>{ project.creationDate }</td>
                <td>
                    <Tooltip content="Remover Projeto" style={{whiteSpace: "nowrap"}}>
                        <i className="material-icons left delete-text red-text" style={{cursor: "pointer"}}
                            onClick={this.deleteProject.bind(this, project)}>
                            delete
                        </i>
                    </Tooltip>
                </td>
            </tr>
        ));

        const projects = this.props.projects.length > 0
            ? (<table className="striped highlight responsive-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Data de Criação</th>
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
                
                <ToastContainer />

                <div className="card">
                    <div className="card-content" style={{paddingBottom: "0", paddingTop: "20px"}}>
                        <span className="card-title">Meus Projetos</span>
                    </div>
                    <div className="card-action" style={styleCardContent}>
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
                                        <input name="projectName" type="tel" 
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
    user: state.auth.user,
    projects: state.projects.projects
});

const mapDispatchToProps = (dispatch) => ({
    loadProjects: () => dispatch(loadProjects()),
    createProject: projectName => dispatch(createProject(projectName)),
    deleteProject: project => dispatch(deleteProject(project))
});

export default requireAuthentication(connect(mapStateToProps, mapDispatchToProps)(Projects));