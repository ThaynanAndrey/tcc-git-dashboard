import React from 'react';
import { shallow, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import ProjectPullRequests from '../../components/pull_request/ProjectPullRequests';

describe('Test ProjectPullRequests', () => {
  it('renders correctly a ProjectPullRequests\'s component', () => {
    const tree = shallow(
      <ProjectPullRequests/>
    );

    expect(toJson(tree)).toMatchSnapshot();
  });
})