import React from 'react';
import { shallow, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import PullRequestCollapsible from '../../components/project/collapsible/pullRequest/PullRequestCollapsible';

describe('Test RepositoriesNoProject', () => {
  it('renders correctly a component to show PullRequestCollapsible', () => {
    const [redirectPage, openPullRequest] = new Array(2).fill(jest.fn());
    const idProject = '123';

    const tree = shallow(
      <PullRequestCollapsible 
        idProject={idProject}
        redirectPage={redirectPage}
        openPullRequest={openPullRequest}
      />
    );

    expect(toJson(tree)).toMatchSnapshot();
  });
})