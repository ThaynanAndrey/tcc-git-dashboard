import React from 'react';
import { mount, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import PullRequestDetailsCollapsible from '../../components/project/collapsible/pullRequestDetails/PullRequestDetailsCollapsible';

describe('Test PullRequestDetailsCollapsible', () => {
  let tree;
  
  beforeEach(() => {
    const pullRequest = {};

    tree = mount(
      <PullRequestDetailsCollapsible
        pullRequest={pullRequest}
      />
    );
  });

  it('renders correctly a component to show PullRequestDetailsCollapsible with correct props', () => {
    expect(toJson(tree)).toMatchSnapshot();
    expect(tree.prop('pullRequest')).toEqual({});
  });

  
  it('the component should have class collapsible-header', () => {
    expect(tree.find(".collapsible-header").exists()).toBeTruthy();
  });

  it('the component should have classes collapsible-body, body-collapsible-project and descriptionPullRequestContent, and has correc props', () => {
    const pullRequest = {
        description: "###Apenas um teste!",
        commits: [{
            author: {name: "Teste"},
            date: "10/10/2010",
            message: "nada"
        }],
        comments: [{
            author: {name: "Teste"},
            date: "10/10/2010",
            message: "nada"
        }]
    };

    tree = mount(
      <PullRequestDetailsCollapsible
        pullRequest={pullRequest}
      />
    );

    expect(tree.find(".collapsible-body.body-collapsible-project.descriptionPullRequestContent").exists()).toBeTruthy();
    expect(tree.prop('pullRequest')).toEqual(pullRequest);
  });
})