import React from 'react';
import { shallow, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import PullRequestDescriptionCollapsible from '../../components/project/collapsible/pullRequestDetails/PullRequestDescriptionCollapsible';

describe('Test PullRequestDescriptionCollapsible', () => {
  let tree;
  
  beforeEach(() => {
    const pullRequest = {};

    tree = shallow(
      <PullRequestDescriptionCollapsible
        pullRequest={pullRequest}
      />
    );
  });

  it('renders correctly a component to show PullRequestDescriptionCollapsible', () => {
    expect(toJson(tree)).toMatchSnapshot();
  });

  
  it('the component should have class collapsible-header', () => {
    expect(tree.find(".collapsible-header").exists()).toBeTruthy();
  });

  it('the component should have classes collapsible-body, body-collapsible-project and descriptionPullRequestContent', () => {
    const pullRequest = {
        description: "###Apenas um teste!"
    };

    tree = shallow(
      <PullRequestDescriptionCollapsible
        pullRequest={pullRequest}
      />
    );

    expect(tree.find(".collapsible-body.body-collapsible-project.descriptionPullRequestContent").exists()).toBeTruthy();
  });
})