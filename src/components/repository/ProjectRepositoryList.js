import React, { Component } from 'react';
import { connect } from 'react-redux';

import { requireAuthentication } from '../../high-order-components/RequireAuthentication';

const styles = {
    marginRight: "50px",
    marginLeft: "50px"
};

/**
 * Component that shows all Project's Repositories.
 * 
 * @author Thaynan Nunes
 */
export class ProjectRepositoryList extends Component {
    render() {
        return (
            <div style={styles}>
                <h4>Repositórios</h4>
            </div>
        )
    };
}

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default requireAuthentication(connect(mapStateToProps, mapDispatchToProps)(ProjectRepositoryList));