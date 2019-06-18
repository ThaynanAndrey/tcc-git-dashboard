import React from 'react';
import { shallow, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import Projects from '../../components/project/Projects';

describe('Test Projects', () => {
  it('renders correctly a Projects\'s component', () => {
    const tree = shallow(
      <Projects/>
    );

    expect(toJson(tree)).toMatchSnapshot();
  });
})