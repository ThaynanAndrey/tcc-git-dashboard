import React from 'react';
import renderer from 'react-test-renderer';

import TableHead from '../../components/layout/TableHead';

it('renders correctly when there are no headsNames', () => {
    const headsNames = [];
    const tree = renderer.create(
        <TableHead headsNames={headsNames} />
        ).toJSON();

    expect(tree).toMatchSnapshot();
});

it('renders correctly when there are multiple headsNames', () => {
    const headsNames = ["Casa", "carro", ""];
    const tree = renderer.create(<TableHead headsNames={headsNames} />).toJSON();

    expect(tree).toMatchSnapshot();
});