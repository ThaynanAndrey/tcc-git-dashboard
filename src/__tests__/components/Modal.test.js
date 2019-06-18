import React from 'react';
import { shallow, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import Modal from '../../components/layout/Modal';

describe('Test Modal', () => {
  it('renders correctly a modal without props isFixed', () => {
    const tree = shallow(
        <Modal />
    );

    expect(toJson(tree)).toMatchSnapshot();
  });

  it('renders correctly a modal with props isFixed', () => {
    const tree = shallow(
        <Modal isFixed={true}/>
    );

    expect(toJson(tree)).toMatchSnapshot();
  });

  it('the component should have classes modal-fixed-footer and modal-styles when props isFixed is true', () => {
    const tree = shallow(
        <Modal isFixed={true}/>
    );

    expect(tree.find(".modal-fixed-footer.modal-styles").exists()).toBeTruthy();
  });

  it('the component shouldn\'t have classes modal-fixed-footer and modal-styles when props isFixed is false', () => {
    const tree = shallow(
        <Modal isFixed={false}/>
    );

    expect(tree.find(".modal-fixed-footer.modal-styles").exists()).toBeFalsy();
  });
})