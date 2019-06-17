import React from 'react';
import { shallow, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import Login from '../../components/login/Login';

describe('Test Login', () => {
  it('renders correctly a Login\'s component', () => {
    const tree = shallow(
      <Login/>
    );

    expect(toJson(tree)).toMatchSnapshot();
  });
})