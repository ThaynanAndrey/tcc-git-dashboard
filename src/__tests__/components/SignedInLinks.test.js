import React from 'react';
import { shallow, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import SignedInLinks from '../../components/layout/SignedInLinks';

describe('Test SignedInLinks', () => {
  it('renders correctly a component SignedInLinks with classes right hide-on-med-and-down', () => {
    const tree = shallow(
      <SignedInLinks />
    );
    
    expect(toJson(tree)).toMatchSnapshot();
    expect(tree.find(".right.hide-on-med-and-down").exists()).toBeTruthy();
  });
});