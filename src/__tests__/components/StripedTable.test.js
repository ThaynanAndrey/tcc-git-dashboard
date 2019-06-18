import React from 'react';
import { shallow, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import StripedTable from '../../components/layout/StripedTable';

describe('Test StripedTable', () => {
  let tree;

  beforeEach(() => {
    tree = shallow(
      <StripedTable />
    );
  });

  it('renders correctly a table', () => {
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('the component should have class striped', () => {
    expect(tree.find(".striped").exists()).toBeTruthy();
  });

  it('the component should have class responsive-table', () => {
    expect(tree.find(".responsive-table").exists()).toBeTruthy();
  });
})