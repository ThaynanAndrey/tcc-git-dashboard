import React from 'react';
import { shallow, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import ProjectDetails from '../../components/project/ProjectDetails';

describe('Test ProjectDetails', () => {
  it('renders correctly a ProjectDetails\'s component', () => {
    const tree = shallow(
      <ProjectDetails/>
    );

    expect(toJson(tree)).toMatchSnapshot();
  });
})