import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from "react-simple-tooltip";
import { ToastContainer, toast } from 'react-toastify';
import BlockUi from 'react-block-ui';

import { requireAuthentication } from '../../high-order-components/RequireAuthentication';

import { getRepositoriesNoProject, addRepositoryInProject, searchExternalRepository, resetRepositoriesNoProject } from '../../store/actions/repositoriesAction';

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
 * Component that shows Repositories that isn't Project.
 * 
 * @author Thaynan Nunes
 */
export class RepositoriesNoProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ownerName: "",
            repositoryName: "",
            loadingMyRepositories: false,
            loadingExternalRepositories: false
        };

        this.addRepository = this.addRepository.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.searchExternalRepository = this.searchExternalRepository.bind(this);
    }

    /**
     * Function loaded just after the rendering of the component, in which
     * all Repositories linked to the Project will be obtained.
     */
    componentDidMount() {
        this.setState({ loadingMyRepositories: true })
        this.props.getRepositoriesNoProject(this.props.idProject)
            .finally(() => this.setState({ loadingMyRepositories: false }));
    }

    componentWillUnmount() {
        this.props.resetRepositoriesNoProject();
    }

    /**
     * Adds the repository into Project.
     * 
     * @param {Object} repository
     *      Repository to be added
     */
    async addRepository(repository, isRepositoryNoProject) {
        isRepositoryNoProject ? this.setState({ loadingMyRepositories: true }) : this.setState({ loadingExternalRepositories: true })
        await this.props.addRepositoryInProject(repository, this.props.idProject);

        toast.success("Repositório adicionado!", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
        isRepositoryNoProject ? this.setState({ loadingMyRepositories: false }) : this.setState({ loadingExternalRepositories: false })
    }

    /**
     * Changes the component's state from event.
     */
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    /**
     * Searches Repositories that isn't shared with user.
     */
    searchExternalRepository() {
        this.setState({ loadingExternalRepositories: true })
        this.props.searchExternalRepository(this.state.ownerName, this.state.repositoryName, this.props.idProject)
            .finally(() => this.setState({ loadingExternalRepositories: false }));
    }

    render() {
        const repositoryElements = (repo, isRepositoryNoProject) => repo.map((repository, indice) => (
            <tr key={indice}>
                <td>{ repository.name }</td>
                <td>{ repository.creationDate }</td>
                <td>{ repository.owner.name }</td>
                <td>
                    <Tooltip content="Adicionar" placement="left" radius={10} style={{whiteSpace: "nowrap"}}>
                        <i className="material-icons left green-text" style={{cursor: "pointer"}}
                            onClick={() => this.addRepository(repository, isRepositoryNoProject)}>
                            add_box
                        </i>
                    </Tooltip>
                </td>
            </tr>
        ));
        
        const repositoryExternalElements = 
            <div className="card-action" style={styleCardContent}>
                <table className="striped highlight responsive-table">
                    <thead>
                        <tr>
                            <th>Repositório</th>
                            <th>Data de Criação</th>
                            <th>Responsável</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {repositoryElements(this.props.externalRepositories, false)}
                    </tbody>
                </table>
            </div>

        return (
            <div style={styles}>
                
                <h3>Adicionar Repositórios ao Projeto</h3>
            
                <ToastContainer />
                
                <div style={{display: "flex", marginBottom: "15px", justifyContent: "flex-end"}}>
                    <div className="col right">
                        <button className="btn waves-effect waves-light green darken-2"
                                type="button" name="voltar"
                                onClick={this.props.history.goBack}>
                            Voltar
                            <i className="material-icons left">arrow_back</i>
                        </button>
                    </div>
                </div>

                <div className="card">
                    <div className="card-content" style={{paddingBottom: "0", paddingTop: "20px"}}>
                        <span className="card-title">Buscar repositórios externos</span>
                        <div className="row" style={{marginBottom: "0"}}>
                            <form className="col s12">
                                <div className="row" style={{marginBottom: "0"}}>
                                    <div className="input-field col s5">
                                        <i className="material-icons prefix">account_circle</i>
                                        <input name="ownerName" type="text" placeholder="Propietário do repositório" 
                                               onChange={this.handleChange}/>
                                    </div>
                                    <div className="input-field col s5">
                                        <i className="material-icons prefix">insert_drive_file</i>
                                        <input name="repositoryName" type="text" 
                                               placeholder="Repositório (Opicional)"
                                               onChange={this.handleChange} />
                                    </div>
                                    <div className="input-field col s2">
                                        <button className="btn waves-effect waves-light blue darken-2"
                                                type="button" name="search-repository"
                                                onClick={this.searchExternalRepository}>
                                            Buscar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <BlockUi tag="div" blocking={this.state.loadingExternalRepositories}>
                        { this.props.externalRepositories.length > 0 && repositoryExternalElements }
                        { this.props.msgExternalRepositories && 
                            <div className="card-action" style={styleCardContent}>
                                {this.props.msgExternalRepositories}
                            </div>
                        }
                    </BlockUi>
                </div>
                
                <div className="card">
                    <div className="card-content" style={{paddingBottom: "0", paddingTop: "20px"}}>
                        <span className="card-title">Repositórios compartilhados</span>
                    </div>
                    <BlockUi tag="div" blocking={this.state.loadingMyRepositories}>
                        {this.props.repositoriesNoProject && this.props.repositoriesNoProject.length > 0 &&
                            <div className="card-action" style={styleCardContent}>
                                <table className="striped highlight responsive-table">
                                    <thead>
                                        <tr>
                                            <th>Repositório</th>
                                            <th>Data de Criação</th>
                                            <th>Responsável</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {repositoryElements(this.props.repositoriesNoProject, true)}
                                    </tbody>
                                </table>
                            </div>
                        }
                        {(!this.props.repositoriesNoProject || this.props.repositoriesNoProject.length === 0) && !this.state.loadingMyRepositories &&
                            <h5>
                                Não existem respositórios novos para cadastrar!
                            </h5>
                        }
                    </BlockUi>
                </div>
            </div>
        )
    };
}

const mapStateToProps = (state, ownProps) => ({
    idProject: ownProps.match.params.id,
    repositoriesNoProject: state.repositories.repositoriesNoProject,
    externalRepositories: state.repositories.externalRepositories,
    msgExternalRepositories: state.repositories.msgExternalRepositories
});

const mapDispatchToProps = (dispatch) => ({
    getRepositoriesNoProject: idProject => dispatch(getRepositoriesNoProject(idProject)),
    addRepositoryInProject: (repository, idProject) => dispatch(addRepositoryInProject(repository, idProject)),
    searchExternalRepository: (ownerName, repositoryName, idProject) => dispatch(searchExternalRepository(ownerName, repositoryName, idProject)),
    resetRepositoriesNoProject: () => dispatch(resetRepositoriesNoProject())
});

export default requireAuthentication(connect(mapStateToProps, mapDispatchToProps)(RepositoriesNoProject));