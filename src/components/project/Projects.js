import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from "react-simple-tooltip";
import { ToastContainer, toast } from 'react-toastify';
import BlockUi from 'react-block-ui';
import M from "materialize-css";

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
            projectName: "",
            loading: false,
            loadingCreateProject: false
        };

        this.createProject = this.createProject.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    /**
     * Loades user's Projetcs after load component.
     * Loades Materialize's Modal after load Component.
     */
    componentDidMount() {
        const elemsModal = document.querySelectorAll('.modal');
        this.instanceModal = M.Modal.init(elemsModal, {})[0];

        this.setState({ loading: true })
        this.props.loadProjects()
            .finally(() => this.setState({ loading: false }));
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
        this.setState({ loading: true })
        this.props.deleteProject(project)
            .then(() => {
                toast.success("Projeto removido!", {
                    position: "top-right",
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            })
            .finally(() => this.setState({ loading: false }));
    }

    /**
     * Creates a new user Project.
     */
    createProject() {
        if(this.state.projectName !== "") {
            this.setState({ loadingCreateProject: true })
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
                    this.closeModal();
                })
                .finally(() => this.setState({ loadingCreateProject: false }));
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

    /**
     * Opens modal to create new Project.
     */
    openModal() {
        this.myFormRef.reset();
        this.instanceModal.open(); 
    }

    /**
     * Closes the modal.
     */
    closeModal() {
        this.myFormRef.reset();
        this.instanceModal.close();
    }

    render() {
        const projectElements = () => this.props.projects.map((project, index) => (
            <tr key={index} onClick={this.openProject.bind(this, project)} style={{cursor: "pointer"}}>
                <td>{ project.name }</td>
                <td>{ project.creationDate }</td>
                <td>
                    <Tooltip content="Remover Projeto" placement="left" radius={10} style={{whiteSpace: "nowrap"}}>
                        <i className="material-icons left delete-text red-text" style={{cursor: "pointer"}}
                            onClick={this.deleteProject.bind(this, project)}>
                            delete
                        </i>
                    </Tooltip>
                </td>
            </tr>
        ));

        const projects =
            <table className="striped highlight responsive-table">
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
            </table>

        return (
            <div>
                <div className="modal">
                    <BlockUi tag="div" blocking={this.state.loadingCreateProject}>
                        <div className="modal-content">
                            <h4>Novo Projeto</h4>
                            <div className="row">
                                <form className="col s12" ref={el => this.myFormRef = el}>
                                    <div className="input-field col s5"  style={{width: "100%"}}>
                                        <i className="material-icons prefix">insert_drive_file</i>
                                        <input name="projectName" type="tel" 
                                                placeholder="Nome Projeto"
                                                onChange={this.handleChange} />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <a className="modal-close waves-effect waves-green btn-flat"
                                onClick={this.closeModal}>
                                Cancelar
                            </a>
                            <a className="modal-close waves-effect waves-green btn-flat"
                                onClick={this.createProject}>
                                Adicionar
                            </a>
                        </div>
                    </BlockUi>
                </div>

                <div style={styles}>
                    {this.getSalutation()}
                    
                    <ToastContainer />

                    <div className="card">

                        <div className="collapsible-header" style={{display: "flex", justifyContent: "space-between"}}>
                            <div className="card-content" style={{padding: "0", display: "flex"}}>
                                <span className="card-title">Meus Projetos</span>
                            </div>
                            
                            <div style={{paddingBottom: "0", paddingTop: "0px", display: "flex"}}>
                                <button className="btn waves-effect waves-light green darken-2"
                                        type="button" name="create-project"
                                        onClick={this.openModal}>
                                    Novo Projeto
                                    <i className="material-icons left">add</i>
                                </button>
                            </div>
                        </div>

                        <BlockUi tag="div" blocking={this.state.loading}>
                            <div className="card-action" style={styleCardContent}>
                                {this.props.projects.length > 0 && projects}
                                {!this.state.loading && this.props.projects.length === 0 &&  
                                    <span>Não existem projetos cadastrados!</span>
                                }
                            </div>
                        </BlockUi>
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