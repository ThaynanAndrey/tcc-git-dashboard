import React from 'react';
import { shallow, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import PullRequestCollapsibleHeader from '../../components/project/collapsible/pullRequest/PullRequestCollapsibleHeader';

describe('Test RepositoriesNoProject', () => {
  it('renders correctly a component to show PullRequestCollapsibleHeader', () => {
    const redirectPage = jest.fn();
    const idProject = '123';

    const tree = shallow(
      <PullRequestCollapsibleHeader 
        idProject={idProject}
        redirectPage={redirectPage}
      />
    );

    expect(toJson(tree)).toMatchSnapshot();
  });

  
  it('the component should have class collapsible-header', () => {
    const tree = shallow(
      <PullRequestCollapsibleHeader />
    );

    expect(tree.find(".collapsible-header").exists()).toBeTruthy();
  });
})