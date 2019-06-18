import React from 'react';
import { mount, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import PullRequestsTableBody from '../../components/pull_request/pullRequestsTable/PullRequestsTableBody';

describe('Test PullRequestsTableBody', () => {
  it('renders correctly a PullRequestsTableBody\'s component with correct props', () => {
    const pullRequests = [ { name: "Tests", dataCriacao: "10/10/1010", status: "open",
        responsavel: { nome: "Ze" }, repositorio: { nome: "Repo" } } ];
    const removePullRequest = jest.fn();
    const openPullRequest = jest.fn();

    const tree = mount(
      <PullRequestsTableBody
        pullRequests={pullRequests}
        removePullRequest={removePullRequest}
        openPullRequest={openPullRequest}
      />
    );

    expect(toJson(tree)).toMatchSnapshot();

    expect(tree.prop('pullRequests')).toEqual(pullRequests);
    expect(tree.prop('removePullRequest')).toEqual(removePullRequest);
    expect(tree.prop('openPullRequest')).toEqual(openPullRequest);
  });

  it('renders correctly a PullRequestsTableBody\'s component with correct classes', () => {
    const pullRequests = [ { name: "Tests", dataCriacao: "10/10/1010", status: "open",
        responsavel: { nome: "Ze" }, repositorio: { nome: "Repo" } } ];
    const removePullRequest = jest.fn();
    const openPullRequest = jest.fn();

    const tree = mount(
      <PullRequestsTableBody
        pullRequests={pullRequests}
        removePullRequest={removePullRequest}
        openPullRequest={openPullRequest}
      />
    );

    expect(tree.find('tbody').exists()).toBeTruthy();
    expect(tree.find('tr').exists()).toBeTruthy();
  });
});