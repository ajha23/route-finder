import React from 'react';
import renderer from 'react-test-renderer';

import RouteMap from '../route-map/RouteMap';

describe('Direction Form Test', () => {
    it('render correctly', () => {
        const tree = renderer.create(<RouteMap />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
