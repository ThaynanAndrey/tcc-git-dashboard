import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from "react-simple-tooltip";
import BlockUi from 'react-block-ui';
import { ToastContainer, toast } from 'react-toastify';

import { requireAuthentication } from '../../high-order-components/RequireAuthentication';

import { getProjectRepositories, deleteRepositoryProject, resetProjectRepositories } from '../../store/actions/repositoriesAction';

/**
 * Component that shows all Project's Repositories.
 * 
 * @author Thaynan Nunes
 */
export class ProjectRepositoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            loadingDelete: false
        }

        this.deleteRepository = this.deleteRepository.bind(this);
    }

    /**
     * Function loaded just after the rendering of the component, in which
     * all Repositories linked to the Project will be obtained.
     */
    componentDidMount() {
        this.setState({ loading: true })
        this.props.getProjectRepositories(this.props.idProject)
            .finally(() => this.setState({ loading: false }));
    }

    componentWillUnmount() {
        this.props.resetProjectRepositories();
    }

    /**
     * Deletes the repository in Project.
     * 
     * @param {Object} repository
     *      Repository to be deleted
     */
    async deleteRepository(repository) {
        this.setState({ loadingDelete: true })
        await this.props.deleteRepositoryProject(repository);

        toast.success("Repositório removido!", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
        
        this.setState({ loadingDelete: false })
    }

    render() {
        const repositoryElements = this.props.projectRepositories.map((repository, indice) => (
            <tr key={indice}>
                <td>{ repository.name }</td>
                <td>{ repository.creationDate }</td>
                <td>{ repository.owner.name }</td>
                <td>
                    <Tooltip content="Excluir Repositório" placement="left" radius={10} style={{whiteSpace: "nowrap"}}>
                        <i className="material-icons left red-text" style={{cursor: "pointer"}}
                            onClick={() => this.deleteRepository(repository)}>
                            delete
                        </i>
                    </Tooltip>
                </td>
            </tr>
        ));

        if(!this.state.loading && this.props.projectRepositories.length === 0) {
            return (
                <div>
                    <h6>Não existem Repositórios cadastrados!</h6>
                </div>
            );
        } else {
            return (
                <BlockUi tag="div" blocking={this.state.loading || this.state.loadingDelete}>
                    { !this.state.loading &&
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
                    }
                </BlockUi>
            );
        }
    };
}

const mapStateToProps = (state) => ({
    projectRepositories: state.repositories.projectRepositories
});

const mapDispatchToProps = (dispatch) => ({
    getProjectRepositories: idProject => dispatch(getProjectRepositories(idProject)),
    deleteRepositoryProject: repository => dispatch(deleteRepositoryProject(repository)),
    resetProjectRepositories: () => dispatch(resetProjectRepositories()),
});

export default requireAuthentication(connect(mapStateToProps, mapDispatchToProps)(ProjectRepositoryList));