import React from 'react';

const styleCollapsibleHeader = {
    display: "flex",
    justifyContent: "space-between"
};

const styleCollapsibleHeaderText = {
    display: "flex"
};

/**
 * Stateless component with the function of presenting a Collapsible Header to Pull Requests.
 * 
 * @author Thaynan Nunes
 */
const PullRequestCollapsibleHeader = ({ redirectPage, idProject }) => (
    <div className="collapsible-header" style={styleCollapsibleHeader}>
        <div style={styleCollapsibleHeaderText}>
            <i className="material-icons">dehaze</i>
            Pull Requests
        </div>
        <div>
            <button className="btn-small waves-effect waves-light green darken-2"
                    type="button" name="cadastrar-pr"
                    onClick={() => redirectPage(`${idProject}/adicionarPullRequests`)}>
                Adicionar
                <i className="material-icons left">add</i>
            </button>
        </div>
    </div>
);

export default PullRequestCollapsibleHeader;