import 'react-native';
import React from 'react';
import homePage from '../components/HomePage'

import renderer from 'react-test-renderer'
jest.mock('react-native-vector-icons/SimpleLineIcons', () => 'Icon')
jest.mock('react-native-vector-icons/FontAwesome5', () => 'Icon')
it('renders correctly', () => {
    const tree = renderer.create(
        <homePage/>
    ).toJSON();
    expect(tree).toMatchSnapshot();
});