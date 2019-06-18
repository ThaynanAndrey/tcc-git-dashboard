import React from 'react';
import { mount, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import NewPullRequestsTableBody from '../../components/pull_request/pullRequestsTable/NewPullRequestsTableBody';

describe('Test NewPullRequestsTableBody', () => {
  it('renders correctly a NewPullRequestsTableBody\'s component with correct props', () => {
    const pullRequests = [ { name: "Tests", dataCriacao: "10/10/1010", status: "open",
        responsavel: { nome: "Ze" }, repositorio: { nome: "Repo" } } ];
    const addPullRequest = jest.fn();

    const tree = mount(
      <NewPullRequestsTableBody
        pullRequests={pullRequests}
        addPullRequest={addPullRequest}
      />
    );

    expect(toJson(tree)).toMatchSnapshot();

    expect(tree.prop('pullRequests')).toEqual(pullRequests);
    expect(tree.prop('addPullRequest')).toEqual(addPullRequest);
  });

  it('renders correctly a NewPullRequestsTableBody\'s component with correct classes', () => {
    const pullRequests = [ { name: "Tests", dataCriacao: "10/10/1010", status: "open",
        responsavel: { nome: "Ze" }, repositorio: { nome: "Repo" } } ];
    const addPullRequest = jest.fn();

    const tree = mount(
      <NewPullRequestsTableBody
        pullRequests={pullRequests}
        addPullRequest={addPullRequest}
      />
    );

    expect(tree.find('tbody').exists()).toBeTruthy();
    expect(tree.find('tr').exists()).toBeTruthy();
  });
})