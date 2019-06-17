import React from 'react';
import { mount, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import PullRequestContentModal from '../../components/project/pullRequestModal/PullRequestContentModal';

describe('Test PullRequestContentModal', () => {
  let tree;
  let pullRequest;
  
  beforeEach(() => {
    pullRequest = {
        commits: [],
        comments: [],
        description: "nothing",
        responsavel: { nome: "ze" },
        repositorio: { nome: "eh" }
    };

    tree = mount(
        <PullRequestContentModal
            pullRequest={pullRequest}
        />
    );
  });

  it('renders correctly a component to show PullRequestContentModal', () => {
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('renders correctly a component to show PullRequestContentModal with correct props', () => {
    expect(toJson(tree)).toMatchSnapshot();
    expect(tree.prop('pullRequest')).toEqual(pullRequest);
  });

  it('renders correctly a component to show PullRequestContentModal with correct classes', () => {
    expect(toJson(tree)).toMatchSnapshot();
    expect(tree.find('.modal-content').exists()).toBeTruthy();
  });
});