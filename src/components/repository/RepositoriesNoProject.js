import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from "react-simple-tooltip";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { requireAuthentication } from '../../high-order-components/RequireAuthentication';

import { getRepositoriesNoProject, addRepositoryInProject, searchExternalRepository, resetExternalRepositories } from '../../store/actions/repositoriesAction';

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
            repositoryName: ""
        };

        this.addRepository = this.addRepository.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.searchExternalRepository = this.searchExternalRepository.bind(this);
        this.resetExternalRepositories = this.resetExternalRepositories.bind(this);
    }

    /**
     * Function loaded just after the rendering of the component, in which
     * all Repositories linked to the Project will be obtained.
     */
    componentDidMount() {
        this.props.getRepositoriesNoProject();
    }

    /**
     * Adds the repository into Project.
     * 
     * @param {Object} repository
     *      Repository to be added
     */
    async addRepository(repository) {
        await this.props.addRepositoryInProject(repository);

        toast.success("Repositório adicionado!", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          }); 
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
     * Searches by repositories that isn't shared with user.
     */
    searchExternalRepository() {
        this.props.searchExternalRepository(this.state.ownerName, this.state.repositoryName);
    }

    /**
     * Resets external repositories' array.
     */
    resetExternalRepositories() {
        this.props.resetExternalRepositories();
    }

    render() {
        const repositoryElements = (repo) => repo.map((repository, indice) => (
            <tr key={indice}>
                <td>{ repository.name }</td>
                <td>{ repository.creationDate }</td>
                <td>{ repository.owner.name }</td>
                <td>
                    <Tooltip content="Adicionar" style={{whiteSpace: "nowrap"}}>
                        <i className="material-icons left green-text" style={{cursor: "pointer"}}
                            onClick={() => this.addRepository(repository)}>
                            add_box
                        </i>
                    </Tooltip>
                </td>
            </tr>
        ));
        
        const repositoryExternalElements = this.props.msgExternalRepositories !== ""
            ? <div className="card-action" style={styleCardContent}>{this.props.msgExternalRepositories}</div>
            : (<div className="card-action" style={styleCardContent}>
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
                        {repositoryElements(this.props.externalRepositories)}
                    </tbody>
                </table>
            </div>);

        return (
            <div style={styles}>
                
                <h3>Adicionar Repositórios ao Projeto</h3>
            
                <ToastContainer />
                
                <div style={{display: "flex", marginBottom: "15px", justifyContent: "flex-end"}}>
                    <Link to="/">
                        <div className="col right">
                            <button className="btn waves-effect waves-light green darken-2"
                                    type="button" name="voltar"
                                    onClick={this.resetExternalRepositories}>
                                Voltar
                                <i className="material-icons left">arrow_back</i>
                            </button>
                        </div>
                    </Link>
                </div>

                <div className="card">
                    <div className="card-content" style={{paddingBottom: "0", paddingTop: "20px"}}>
                        <span className="card-title">Buscar repositórios externos</span>
                        <div className="row" style={{marginBottom: "0"}}>
                            <form className="col s12">
                                <div className="row" style={{marginBottom: "0"}}>
                                    <div className="input-field col s5">
                                        <i className="material-icons prefix">account_circle</i>
                                        <input name="ownerName" type="text" placeholder="Responsável" 
                                               onChange={this.handleChange}/>
                                    </div>
                                    <div className="input-field col s5">
                                        <i className="material-icons prefix">insert_drive_file</i>
                                        <input name="repositoryName" type="tel" 
                                               placeholder="Repositório (Opicional)"
                                               onChange={this.handleChange} />
                                    </div>
                                    <div className="input-field col s2">
                                        <button className="btn waves-effect waves-light blue darken-2"
                                                type="button" name="cadastrar-pr"
                                                onClick={this.searchExternalRepository}>
                                            Buscar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    {this.props.externalRepositories && repositoryExternalElements}
                </div>
                
                <div className="card">
                    <div className="card-content" style={{paddingBottom: "0", paddingTop: "20px"}}>
                        <span className="card-title">Repositórios compartilhados</span>
                    </div>
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
                                {repositoryElements(this.props.repositoriesNoProject)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    };
}

const mapStateToProps = (state) => ({
    repositoriesNoProject: state.repositories.repositoriesNoProject,
    externalRepositories: state.repositories.externalRepositories,
    msgExternalRepositories: state.repositories.msgExternalRepositories
});

const mapDispatchToProps = (dispatch) => ({
    getRepositoriesNoProject: () => dispatch(getRepositoriesNoProject()),
    addRepositoryInProject: repository => dispatch(addRepositoryInProject(repository)),
    searchExternalRepository: (ownerName, repositoryName) => dispatch(searchExternalRepository(ownerName, repositoryName)),
    resetExternalRepositories: () => dispatch(resetExternalRepositories())
});

export default requireAuthentication(connect(mapStateToProps, mapDispatchToProps)(RepositoriesNoProject));