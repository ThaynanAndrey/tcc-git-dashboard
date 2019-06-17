import React from 'react';
import { shallow, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import ProjectRepositoryList from '../../components/repository/ProjectRepositoryList';

describe('Test ProjectRepositoryList', () => {
  it('renders correctly a component to show Repositorie Project\'s list', () => {
    const [getProjectRepositories, deleteRepositoryProject, resetProjectRepositories] = new Array(3).fill(jest.fn());
    const projectRepositories = [];

    const tree = shallow(
      <ProjectRepositoryList
        projectRepositories={projectRepositories}
        getProjectRepositories={getProjectRepositories}
        deleteRepositoryProject={deleteRepositoryProject}
        resetProjectRepositories={resetProjectRepositories}
        />
    );

    expect(toJson(tree)).toMatchSnapshot();
  });
})