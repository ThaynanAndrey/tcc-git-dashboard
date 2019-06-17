import React from 'react';
import CollapsibleCard from '../../../layout/CollapsibleCard';

const styleCollapsibleHeader = {
    display: "flex",
    justifyContent: "space-between"
};

const styleCollapsibleHeaderText = {
    display: "flex"
};

/**
 * Stateless component with the function of presenting a Collapsible to Pull Requests.
 * 
 * @author Thaynan Nunes
 */
const PullRequestCommentsCollapsible = ({ pullRequest }) => {
    
    const getNumberStyles = () => ({
        width: "2rem",
        height: "27px",
        marginRight: "1rem",
        backgroundColor: (pullRequest.comments && pullRequest.comments.length > 0)
            ? "green" : "red",
        textAlign: "center",
        color: "white",
        borderRadius: "0.5rem"
    });

    const getItems = (items) => items && items.map((item, index) => (
        <tr key={index}>
            <td>{ item.author.name }</td>
            <td>{ item.date }</td>
            <td>{ item.message }</td>
        </tr>
    ));
    
    return (
        <CollapsibleCard isActive={false}>
            <div className="collapsible-header" style={styleCollapsibleHeader}>
                <div style={styleCollapsibleHeaderText}>
                    <div style={getNumberStyles()}>
                        {pullRequest.comments && pullRequest.comments.length}
                    </div>
                    Comentários
                </div>
            </div>
            { pullRequest.comments && pullRequest.comments.length > 0 &&
                <div className="collapsible-body body-collapsible-project">
                    <table className="striped highlight responsive-table">
                        <thead>
                            <tr>
                                <th>Responsável</th>
                                <th>Data Criação</th>
                                <th>Mensagem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getItems(pullRequest.comments)}
                        </tbody>
                    </table>
                </div>
            }
        </CollapsibleCard>
    );
};

export default PullRequestCommentsCollapsible;