import React from 'react';
import { shallow, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import RepositoryCollapsibleBody from '../../components/project/collapsible/repository/RepositoryCollapsibleBody';

describe('Test RepositoryCollapsibleBody', () => {
  it('renders correctly a component to show RepositoryCollapsibleBody', () => {
    const idProject = "123";
    const tree = shallow(
        <RepositoryCollapsibleBody idProject={idProject}/>
    );

    expect(toJson(tree)).toMatchSnapshot();
    expect(tree.find(".collapsible-body.body-collapsible-project").exists()).toBeTruthy();
  });
});