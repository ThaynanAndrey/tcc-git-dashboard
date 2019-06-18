import React from 'react';
import { shallow, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import PullRequestCommitsCollapsible from '../../components/project/collapsible/pullRequestDetails/PullRequestCommitsCollapsible';

describe('Test PullRequestCommitsCollapsible', () => {
  let tree;
  
  beforeEach(() => {
    const pullRequest = {};

    tree = shallow(
      <PullRequestCommitsCollapsible
        pullRequest={pullRequest}
      />
    );
  });

  it('renders correctly a component to show PullRequestCommitsCollapsible', () => {
    expect(toJson(tree)).toMatchSnapshot();
  });

  
  it('the component should have class collapsible-header', () => {
    expect(tree.find(".collapsible-header").exists()).toBeTruthy();
  });

  it('the component should not have classes collapsible-body body-collapsible-project', () => {
    expect(tree.find(".collapsible-body.body-collapsible-project").exists()).toBeFalsy();
    expect(tree.find("table").exists()).toBeFalsy();
  });

  it('the component should have classes collapsible-body body-collapsible-project when pullRequest prop has commits', () => {
    const pullRequest = {
        commits: [{
            author: {name: "Teste"},
            date: "10/10/2010",
            message: "nada"
        }]
    };

    tree = shallow(
      <PullRequestCommitsCollapsible
        pullRequest={pullRequest}
      />
    );

    expect(tree.find(".collapsible-body.body-collapsible-project").exists()).toBeTruthy();
    expect(tree.find("table").exists()).toBeTruthy();
  });
})