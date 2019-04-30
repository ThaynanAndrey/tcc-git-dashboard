import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from "react-simple-tooltip";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { requireAuthentication } from '../../high-order-components/RequireAuthentication';

import { getProjectRepositories, deleteRepositoryProject } from '../../store/actions/repositoriesAction';

/**
 * Component that shows all Project's Repositories.
 * 
 * @author Thaynan Nunes
 */
export class ProjectRepositoryList extends Component {
    constructor(props) {
        super(props);

        this.deleteRepository = this.deleteRepository.bind(this);
    }

    /**
     * Function loaded just after the rendering of the component, in which
     * all Repositories linked to the Project will be obtained.
     */
    componentDidMount() {
        this.props.getProjectRepositories(this.props.idProject);
    }

    /**
     * Deletes the repository in Project.
     * 
     * @param {Object} repository
     *      Repository to be deleted
     */
    async deleteRepository(repository) {
        await this.props.deleteRepositoryProject(repository);

        toast.success("Repositório removido!", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          }); 
    }

    render() {
        const repositoryElements = this.props.projectRepositories.map((repository, indice) => (
            <tr key={indice}>
                <td>{ repository.name }</td>
                <td>{ repository.creationDate }</td>
                <td>{ repository.owner.name }</td>
                <td>
                    <Tooltip content="Excluir Repositório" style={{whiteSpace: "nowrap"}}>
                        <i className="material-icons left red-text" style={{cursor: "pointer"}}
                            onClick={() => this.deleteRepository(repository)}>
                            delete
                        </i>
                    </Tooltip>
                </td>
            </tr>
        ));

        if(this.props.projectRepositories.length === 0) {
            return (
                <div>
                    <h6>Não existem Repositórios cadastrados!</h6>
                </div>
            );
        } else {
            return (
                <div>
                    
                    <ToastContainer />
                    
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
                            {repositoryElements}
                        </tbody>
                    </table>
                </div>
            );
        }
    };
}

const mapStateToProps = (state) => ({
    projectRepositories: state.repositories.projectRepositories
});

const mapDispatchToProps = (dispatch) => ({
    getProjectRepositories: idProject => dispatch(getProjectRepositories(idProject)),
    deleteRepositoryProject: repository => dispatch(deleteRepositoryProject(repository))
});

export default requireAuthentication(connect(mapStateToProps, mapDispatchToProps)(ProjectRepositoryList));