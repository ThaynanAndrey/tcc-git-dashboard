import React from 'react';
import { mount, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import PullRequestModal from '../../components/project/pullRequestModal/PullRequestModal';

describe('Test PullRequestModal', () => {
  let tree;
  let pullRequest;
  let closePullRequestDetails;
  
  beforeEach(() => {
    pullRequest = {
        commits: [],
        comments: [],
        description: "nothing",
        responsavel: { nome: "ze" },
        repositorio: { nome: "eh" }
    };
    closePullRequestDetails = jest.fn();

    tree = mount(
        <PullRequestModal
            pullRequest={pullRequest}
            closePullRequestDetails={closePullRequestDetails}
        />
    );
  });

  it('renders correctly a component to show PullRequestModal', () => {
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('renders correctly a component to show PullRequestModal with correct props', () => {
    expect(toJson(tree)).toMatchSnapshot();
    expect(tree.prop('pullRequest')).toEqual(pullRequest);
    expect(tree.prop('closePullRequestDetails')).toEqual(closePullRequestDetails);
  });
});