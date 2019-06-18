import React from 'react';
import { mount, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import ContenteNewProjectModal from '../../components/project/modal/ContentNewProjectModal';

describe('Test ContenteNewProjectModal', () => {
  it('renders correctly a component to show ContenteNewProjectModal', () => {
    const tree = mount(
        <ContenteNewProjectModal />
    );

    expect(toJson(tree)).toMatchSnapshot();
  });

  it('renders correctly a component to show ContenteNewProjectModal with correct props', () => {
    const handleChange = jest.fn();

    const tree = mount(
        <ContenteNewProjectModal
            handleChange={handleChange}
        />
    );

    expect(toJson(tree)).toMatchSnapshot();
    expect(tree.prop('handleChange')).toEqual(handleChange);
  });

  it('renders correctly a component to show ContenteNewProjectModal with correct classes', () => {
    const handleChange = jest.fn();

    const tree = mount(
        <ContenteNewProjectModal
            handleChange={handleChange}
        />
    );

    expect(toJson(tree)).toMatchSnapshot();
    expect(tree.find(".modal-content").exists()).toBeTruthy();
  });
});