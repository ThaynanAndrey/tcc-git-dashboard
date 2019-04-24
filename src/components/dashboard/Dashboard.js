import React, { Component } from 'react';
import ProjectPullRequests from '../pull_request/ProjectPullRequests';

/**
 * Component with the function of presenting a dashboard for the
 * monitoring of user projects.
 * 
 * @author Thaynan Nunes
 */
class Dashboard extends Component {
  render() {
    return (
      <ProjectPullRequests />
    );
  }
}

export default Dashboard;