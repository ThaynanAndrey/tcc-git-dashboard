import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import M from "materialize-css";

import Navbar from './components/layout/Navbar';
import ProjectDetails from './components/project/ProjectDetails';
import NewPullRequestsProject from './components/pull_request/NewPullRequestsProject';
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
              <Route exact path='/projetos'component={Projects} />
              <Route exact path='/projeto/:id'component={ProjectDetails} />
              <Route exact path='/projeto/:id/adicionarPullRequests'component={NewPullRequestsProject} />
              <Route exact path='/projeto/:id/adicionarRepositorios'component={RepositoriesNoProject} />
              <Route exact path='/login'component={Login} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
