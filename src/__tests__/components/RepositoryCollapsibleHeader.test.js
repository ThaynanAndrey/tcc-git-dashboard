import React from 'react';
import { mount, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import RepositoryCollapsibleHeader from '../../components/project/collapsible/repository/RepositoryCollapsibleHeader';

describe('Test RepositoryCollapsibleHeader', () => {
  it('renders correctly a component to show RepositoryCollapsibleHeader', () => {
    const tree = mount(
        <RepositoryCollapsibleHeader />
    );

    expect(toJson(tree)).toMatchSnapshot();
  });

  it('renders correctly a component to show RepositoryCollapsibleHeader with correct props', () => {
    const idProject = "123";
    const redirectPage = jest.fn();

    const tree = mount(
        <RepositoryCollapsibleHeader
            idProject={idProject}
            redirectPage={redirectPage}
        />
    );

    expect(toJson(tree)).toMatchSnapshot();
    expect(tree.prop('idProject')).toEqual(idProject);
    expect(tree.prop('redirectPage')).toEqual(redirectPage);
  });

  it('renders correctly a component to show RepositoryCollapsibleHeader with correct classes', () => {
    const idProject = "123";
    const redirectPage = jest.fn();

    const tree = mount(
        <RepositoryCollapsibleHeader
            idProject={idProject}
            redirectPage={redirectPage}
        />
    );

    expect(toJson(tree)).toMatchSnapshot();
    expect(tree.find(".collapsible-header").exists()).toBeTruthy();
    expect(tree.find('.btn-small.waves-effect.waves-light.green.darken-2').exists()).toBeTruthy();
  });
})