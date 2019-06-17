import React from 'react';

const styleCollapsibleHeader = {
    display: "flex",
    justifyContent: "space-between"
};

const styleCollapsibleHeaderText = {
    display: "flex"
};

/**
 * Stateless component with the function of presenting a Header Collapsible to Repositories.
 * 
 * @author Thaynan Nunes
 */
const RepositoryCollapsibleHeader = ({ idProject, redirectPage }) => (
    <div className="collapsible-header" style={styleCollapsibleHeader}>
        <div style={styleCollapsibleHeaderText}>
            <i className="material-icons">dehaze</i>
            Repositórios
        </div>
        <div>
            <button className="btn-small waves-effect waves-light green darken-2"
                    type="button" name="cadastrar-pr"
                    onClick={() => redirectPage(`${idProject}/adicionarRepositorios`)}>
                Adicionar
                <i className="material-icons left">add</i>
            </button>
        </div>
    </div>
);

export default RepositoryCollapsibleHeader;