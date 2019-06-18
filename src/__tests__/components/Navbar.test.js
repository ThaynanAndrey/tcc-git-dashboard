import React from 'react';
import { shallow, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import Navbar from '../../components/layout/Navbar';

describe('Test Navbar', () => {
  it('renders correctly a Navbar', () => {
    const tree = shallow(
      <Navbar user={{}} logout={jest.fn()} />
    );

    expect(toJson(tree)).toMatchSnapshot();
  });
})