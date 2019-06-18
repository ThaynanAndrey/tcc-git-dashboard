import React from 'react';
import { shallow, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import PullRequestCollapsibleBody from '../../components/project/collapsible/pullRequest/PullRequestCollapsibleBody';

describe('Test RepositoriesNoProject', () => {
  it('renders correctly a component to show PullRequestCollapsibleBody', () => {
    const openPullRequest = jest.fn();
    const idProject = '123';

    const tree = shallow(
      <PullRequestCollapsibleBody 
        idProject={idProject}
        openPullRequest={openPullRequest}
      />
    );

    expect(toJson(tree)).toMatchSnapshot();
  });

  
  it('the component should have classes collapsible-body body-collapsible-project', () => {
    const tree = shallow(
      <PullRequestCollapsibleBody />
    );

    expect(tree.find(".collapsible-body.body-collapsible-project").exists()).toBeTruthy();
  });
})