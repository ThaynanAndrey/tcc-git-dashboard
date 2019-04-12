import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectPullRequests  from './components/pull_request/ProjectPullRequests';
import ProjectRepositoryList from './components/repository/ProjectRepositoryList';
import NewPullRequestsProject from './components/pull_request/NewPullRequestsProject';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/'component={Dashboard} />
            <Route path='/pullRequests'component={ProjectPullRequests} />
            <Route path='/adicionarPullRequests'component={NewPullRequestsProject} />
            <Route path='/repositories'component={ProjectRepositoryList} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
