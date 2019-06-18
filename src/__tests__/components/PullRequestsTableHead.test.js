import React from 'react';
import { mount, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import PullRequestsTableHead from '../../components/pull_request/pullRequestsTable/PullRequestsTableHead';

describe('Test PullRequestsTableHead', () => {
  it('renders correctly a PullRequestsTableHead\'s component with correct props', () => {
    const tree = mount(
      <PullRequestsTableHead />
    );

    expect(toJson(tree)).toMatchSnapshot();
  });

  it('renders correctly a PullRequestsTableHead\'s component with correct classes', () => {
    const tree = mount(
        <PullRequestsTableHead />
      );

    expect(tree.find('thead').exists()).toBeTruthy();
    expect(tree.find('tr').exists()).toBeTruthy();
  });
})