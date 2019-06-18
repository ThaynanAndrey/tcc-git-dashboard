import React from 'react';
import { shallow, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import SignedOutLinks from '../../components/layout/SignedOutLinks';

describe('Test SignedOutLinks', () => {
  it('renders correctly a component SignedOutLinks with classes right hide-on-med-and-down', () => {
    const tree = shallow(
        <SignedOutLinks />
    );

    expect(toJson(tree)).toMatchSnapshot();
    expect(tree.find(".right.hide-on-med-and-down").exists()).toBeTruthy();
  });
})