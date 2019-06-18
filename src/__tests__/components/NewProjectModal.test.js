import React from 'react';
import { mount, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import NewProjectModal from '../../components/project/modal/NewProjectModal';

describe('Test NewProjectModal', () => {
  it('renders correctly a component to show NewProjectModal', () => {
    const tree = mount(
        <NewProjectModal />
    );

    expect(toJson(tree)).toMatchSnapshot();
  });

  it('renders correctly a component to show NewProjectModal with correct props', () => {
    const [handleChange, closeModal, createProject, loadingCreateProject] = new Array(4).fill(jest.fn());

    const tree = mount(
        <NewProjectModal
            handleChange={handleChange} closeModal={closeModal}
            createProject={createProject} loadingCreateProject={loadingCreateProject}
        />
    );

    expect(toJson(tree)).toMatchSnapshot();
    expect(tree.prop('handleChange')).toEqual(handleChange);
    expect(tree.prop('closeModal')).toEqual(closeModal);
    expect(tree.prop('createProject')).toEqual(createProject);
    expect(tree.prop('loadingCreateProject')).toEqual(loadingCreateProject);
  });
})