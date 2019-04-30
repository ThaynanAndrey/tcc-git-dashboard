import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import M from "materialize-css";

import Navbar from './components/layout/Navbar';
import ProjectDetails from './components/project/ProjectDetails';
import ProjectPullRequests  from './components/pull_request/ProjectPullRequests';
import NewPullRequestsProject from './components/pull_request/NewPullRequestsProject';
import ProjectRepositoryList from './components/repository/ProjectRepositoryList';
import RepositoriesNoProject from './components/repository/RepositoriesNoProject';
import Projects from './components/project/Projects';
import Login from './components/login/Login';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fab);

const styles = {
  height: "89vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start"
};

class App extends Component {
  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <div className="App" style={styles}>
            <Switch>
              <Route exact path='/'component={Projects} />
              <Route path='/projetos'component={Projects} />
              <Route path='/projeto/:id'component={ProjectDetails} />
              <Route path='/pullRequests'component={ProjectPullRequests} />
              <Route path='/adicionarPullRequests'component={NewPullRequestsProject} />
              <Route path='/repositories'component={ProjectRepositoryList} />
              <Route path='/adicionarRepositorios'component={RepositoriesNoProject} />
              <Route path='/login'component={Login} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
