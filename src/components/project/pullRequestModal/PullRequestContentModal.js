import React from 'react';
import PullRequestDetailsCollapsible from '../collapsible/pullRequestDetails/PullRequestDetailsCollapsible';

const modalContentStyles = {
    padding: "0",
    backgroundColor: "#FFFAFA"
}

const modalBodyStyles = {
    padding: "0px 18px 18px 18px"
};

const modalHeaderStyles = {
    textAlign: "center",
    margin: "0",
    padding: "18px"
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
 * Stateless component with the function to presenting the Pull Request Details Content Modal.
 * 
 * @author Thaynan Nunes
 */
const PullRequestContentModal = ({ pullRequest }) => {
    return (
        <div className="modal-content" style={modalContentStyles}>
            <h5 style={modalHeaderStyles}> {pullRequest.nome} </h5>
            
            <div style={modalBodyStyles}>
                <div className="card">
                    <div className="card-content" style={{paddingBottom: "0", paddingTop: "10px"}}>
                        <span className="card-title">Detalhes</span>
                    </div>
                    <div className="card-action" style={{ maxHeight: "30vh", overflow: "auto", paddingTop: "0" }}>
                        <ul>
                            <li className="row" style={{ marginBottom: 0 }}>
                                <p className="col" style={markedCardStyles}>Status:</p> 
                                <p className="col" style={propertyCardStyles}> {pullRequest.status} </p>
                            </li>
                            <li className="row" style={{ marginBottom: 0 }}>
                                <p className="col" style={markedCardStyles}>Data de criação:</p> 
                                <p className="col" style={propertyCardStyles}> {pullRequest.dataCriacao} </p>
                            </li>
                            <li className="row" style={{ marginBottom: 0 }}>
                                <p className="col" style={markedCardStyles}>Última atualização:</p> 
                                <p className="col" style={propertyCardStyles}> {pullRequest.dataAtualizacao} </p>
                            </li>
                            <li className="row" style={{ marginBottom: 0 }}>
                                <p className="col" style={markedCardStyles}>Login responsável:</p> 
                                <p className="col" style={propertyCardStyles}> {pullRequest.responsavel.nome} </p>
                            </li>
                            <li className="row" style={{ marginBottom: 0 }}>
                                <p className="col" style={markedCardStyles}>Repositório:</p> 
                                <p className="col" style={propertyCardStyles}> {pullRequest.repositorio.nome} </p>
                            </li>
                        </ul>
                    </div>
                </div>

                <PullRequestDetailsCollapsible
                    pullRequest={pullRequest}
                />
            </div>
        </div>
    );
}

export default PullRequestContentModal;