import React from 'react';
import { mount, configure } from "enzyme";
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import PullRequestFooterModal from '../../components/project/pullRequestModal/PullRequestFooterModal';

describe('Test PullRequestFooterModal', () => {
  let tree;
  let closePullRequestDetails;

  beforeEach(() => {
    closePullRequestDetails = jest.fn();  

    tree = mount(
        <PullRequestFooterModal
        closePullRequestDetails={closePullRequestDetails}
        />
    );
  });

  it('renders correctly a component to show PullRequestFooterModal', () => {
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('renders correctly a component to show PullRequestFooterModal with correct props', () => {
    expect(tree.prop('closePullRequestDetails')).toEqual(closePullRequestDetails);
  });

  it('renders correctly a component to show PullRequestFooterModal with correct classes', () => {
    expect(tree.find('.modal-footer').exists()).toBeTruthy();
    expect(tree.find('.modal-close.waves-effect.waves-green.btn-flat').exists()).toBeTruthy();
  });
});