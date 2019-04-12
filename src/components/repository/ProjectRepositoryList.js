import React, { Component } from 'react';
import { connect } from 'react-redux';

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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectRepositoryList);