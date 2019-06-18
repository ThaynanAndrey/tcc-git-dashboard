import React from 'react';
import renderer from 'react-test-renderer';

import Collapsible from '../../components/layout/Collapsible';

it('renders correctly collapsible component', () => {
    const tree = renderer.create(
        <Collapsible />
        ).toJSON();

    expect(tree).toMatchSnapshot();
});