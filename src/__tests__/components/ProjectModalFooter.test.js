import React from 'react';
import { mount, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import ProjectModalFooter from '../../components/project/modal/ProjectModalFooter';

describe('Test ProjectModalFooter', () => {
  it('renders correctly a component to show ProjectModalFooter', () => {
    const tree = mount(
        <ProjectModalFooter />
    );

    expect(toJson(tree)).toMatchSnapshot();
  });

  it('renders correctly a component to show ProjectModalFooter with correct props', () => {
    const [closeModal, createProject] = new Array(2).fill(jest.fn());

    const tree = mount(
        <ProjectModalFooter
            closeModal={closeModal}
            createProject={createProject}
        />
    );

    expect(toJson(tree)).toMatchSnapshot();
    expect(tree.prop('closeModal')).toEqual(closeModal);
    expect(tree.prop('createProject')).toEqual(createProject);
  });

  it('renders correctly a component to show ProjectModalFooter with correct classes', () => {
    const [closeModal, createProject] = new Array(2).fill(jest.fn());

    const tree = mount(
        <ProjectModalFooter
            closeModal={closeModal}
            createProject={createProject}
        />
    );

    expect(toJson(tree)).toMatchSnapshot();
    expect(tree.find('.modal-footer').exists()).toBeTruthy();
    expect(tree.find('.modal-close.waves-effect.waves-green.btn-flat').exists()).toBeTruthy();
  });
})