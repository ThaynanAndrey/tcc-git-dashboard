import React from 'react';
import { shallow, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

import CollapsibleCard from '../../components/layout/CollapsibleCard';

configure({ adapter: new Adapter() });

describe('Test CollapsibleCard', () => {
  it('renders correctly a collapsible without props isActive', () => {
    const tree = shallow(
        <CollapsibleCard />
    );

    expect(toJson(tree)).toMatchSnapshot();
  });

  it('renders correctly a collapsible with props isActive', () => {
    const tree = shallow(
        <CollapsibleCard isActive={true}/>
    );

    expect(toJson(tree)).toMatchSnapshot();
  });

  it('the component should have class active when props isActive is true', () => {
    const tree = shallow(
        <CollapsibleCard isActive={true}/>
    );

    expect(tree.find(".active").exists()).toBeTruthy();
  });

  it('the component shouldn\'t have class active when props isActive is false', () => {
    const tree = shallow(
        <CollapsibleCard isActive={false}/>
    );

    expect(tree.find(".active").exists()).toBeFalsy();
  });
});