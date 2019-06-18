import React from 'react';
import { mount, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import ProjectsTable from '../../components/project/table/ProjectsTable';

describe('Test ProjectsTable', () => {
  let tree, projects, openProject, deleteProject;
  
  beforeEach(() => {
    projects = [{
        name: 'test',
        creationDate: '10/10/1010'
    }];
    openProject = jest.fn();
    deleteProject = jest.fn();

    tree = mount(
        <ProjectsTable
            projects={projects}
            openProject={openProject}
            deleteProject={deleteProject}
        />
    );
  });

  it('renders correctly a component to show ProjectsTable', () => {
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('renders correctly a component to show ProjectsTable with correct props', () => {
    expect(tree.prop('projects')).toEqual(projects);
    expect(tree.prop('openProject')).toEqual(openProject);
    expect(tree.prop('deleteProject')).toEqual(deleteProject);
  });
});