import React from 'react';
import { shallow, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import NewPullRequestsProject from '../../components/pull_request/NewPullRequestsProject';

describe('Test NewPullRequestsProject', () => {
  it('renders correctly a NewPullRequestsProject\'s component', () => {
    const tree = shallow(
      <NewPullRequestsProject/>
    );

    expect(toJson(tree)).toMatchSnapshot();
  });
})