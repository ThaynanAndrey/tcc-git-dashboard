import React, { Component } from 'react';
//import RepositoryList from '../repository/RepositoryList';
import ProjectPullRequests from '../pull_request/ProjectPullRequests';

const styles = {
  marginRight: "50px",
  marginLeft: "50px"
};

class Dashboard extends Component {
  render() {
    return (
      <div style={styles}>
        <ProjectPullRequests />
      </div>
    );
  }
}

export default Dashboard;