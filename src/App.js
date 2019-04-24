import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectPullRequests  from './components/pull_request/ProjectPullRequests';
import ProjectRepositoryList from './components/repository/ProjectRepositoryList';
import NewPullRequestsProject from './components/pull_request/NewPullRequestsProject';
import Login from './components/login/Login';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab);

const styles = {
  height: "92vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start"
};

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <div className="App" style={styles}>
            <Switch>
              <Route exact path='/'component={Dashboard} />
              <Route path='/pullRequests'component={ProjectPullRequests} />
              <Route path='/adicionarPullRequests'component={NewPullRequestsProject} />
              <Route path='/repositories'component={ProjectRepositoryList} />
              <Route path='/login'component={Login} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
