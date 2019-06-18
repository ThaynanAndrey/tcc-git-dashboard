import React from 'react';
import { mount, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import PullRequestsTable from '../../components/pull_request/pullRequestsTable/PullRequestsTable';

describe('Test PullRequestsTable', () => {
  it('renders correctly a PullRequestsTable\'s component with correct props', () => {
    const pullRequests = [ { name: "Tests", dataCriacao: "10/10/1010", status: "open",
        responsavel: { nome: "Ze" }, repositorio: { nome: "Repo" } } ];
    const [addPullRequest, removePullRequest, openPullRequest] = Array(3).fill(jest.fn());
    const isListNewPullRequests = true;

    const tree = mount(
      <PullRequestsTable
        pullRequests={pullRequests}
        isListNewPullRequests={isListNewPullRequests}
        addPullRequest={addPullRequest}
        removePullRequest={removePullRequest}
        openPullRequest={openPullRequest}
      />
    );

    expect(toJson(tree)).toMatchSnapshot();

    expect(tree.prop('pullRequests')).toEqual(pullRequests);
    expect(tree.prop('isListNewPullRequests')).toEqual(isListNewPullRequests);
    expect(tree.prop('addPullRequest')).toEqual(addPullRequest);
    expect(tree.prop('removePullRequest')).toEqual(removePullRequest);
    expect(tree.prop('openPullRequest')).toEqual(openPullRequest);
  });

  it('renders correctly a PullRequestsTable\'s component with correct classes', () => {
    const pullRequests = [ { name: "Tests", dataCriacao: "10/10/1010", status: "open",
        responsavel: { nome: "Ze" }, repositorio: { nome: "Repo" } } ];
    const [addPullRequest, removePullRequest, openPullRequest] = Array(3).fill(jest.fn());
    const isListNewPullRequests = false;

    const tree = mount(
      <PullRequestsTable
        pullRequests={pullRequests}
        isListNewPullRequests={isListNewPullRequests}
        addPullRequest={addPullRequest}
        removePullRequest={removePullRequest}
        openPullRequest={openPullRequest}
      />
    );

    expect(toJson(tree)).toMatchSnapshot();

    expect(tree.prop('pullRequests')).toEqual(pullRequests);
    expect(tree.prop('isListNewPullRequests')).toEqual(isListNewPullRequests);
    expect(tree.prop('addPullRequest')).toEqual(addPullRequest);
    expect(tree.prop('removePullRequest')).toEqual(removePullRequest);
    expect(tree.prop('openPullRequest')).toEqual(openPullRequest);
  });
});