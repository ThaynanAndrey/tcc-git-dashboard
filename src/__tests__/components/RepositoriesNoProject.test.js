import React from 'react';
import { shallow, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import * as auth from '../../store/actions/authAction';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import RepositoriesNoProject from '../../components/repository/RepositoriesNoProject';

describe('Test RepositoriesNoProject', () => {
  beforeEach(() => {
    const spy = jest.spyOn(auth, 'isAuthenticated');
    spy.mockReturnValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly a component to show Repositories are not in Project', () => {
    const [getRepositoriesNoProject, addRepositoryInProject,
            searchExternalRepository, resetRepositoriesNoProject] = new Array(4).fill(jest.fn());
    const idProject = '123';
    const repositoriesNoProject = [];
    const externalRepositories = [];
    const msgExternalRepositories = '';

    const tree = shallow(
      <RepositoriesNoProject 
        getRepositoriesNoProject={getRepositoriesNoProject} addRepositoryInProject={addRepositoryInProject}
        searchExternalRepository={searchExternalRepository} resetRepositoriesNoProject={resetRepositoriesNoProject}
        idProject={idProject} repositoriesNoProject={repositoriesNoProject}
        externalRepositories={externalRepositories} msgExternalRepositories={msgExternalRepositories}
      />
    );

    expect(toJson(tree)).toMatchSnapshot();
  });
})