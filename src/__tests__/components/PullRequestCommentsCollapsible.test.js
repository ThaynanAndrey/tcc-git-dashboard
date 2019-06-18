import React from 'react';
import { shallow, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import PullRequestCommentsCollapsible from '../../components/project/collapsible/pullRequestDetails/PullRequestCommentsCollapsible';

describe('Test PullRequestCommentsCollapsible', () => {
  let tree;
  
  beforeEach(() => {
    const pullRequest = {};

    tree = shallow(
      <PullRequestCommentsCollapsible
        pullRequest={pullRequest}
      />
    );
  });

  it('renders correctly a component to show PullRequestCommentsCollapsible', () => {
    expect(toJson(tree)).toMatchSnapshot();
  });

  
  it('the component should have class collapsible-header', () => {
    expect(tree.find(".collapsible-header").exists()).toBeTruthy();
  });

  it('the component should not have classes collapsible-body body-collapsible-project', () => {
    expect(tree.find(".collapsible-body.body-collapsible-project").exists()).toBeFalsy();
    expect(tree.find("table").exists()).toBeFalsy();
  });

  it('the component should have classes collapsible-body body-collapsible-project when pullRequest prop has comments', () => {
    const pullRequest = {
        comments: [{
            author: {name: "Teste"},
            date: "10/10/2010",
            message: "nada"
        }]
    };

    tree = shallow(
      <PullRequestCommentsCollapsible
        pullRequest={pullRequest}
      />
    );

    expect(tree.find(".collapsible-body.body-collapsible-project").exists()).toBeTruthy();
    expect(tree.find("table").exists()).toBeTruthy();
  });
})