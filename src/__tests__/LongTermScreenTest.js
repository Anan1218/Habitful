import 'react-native';
import React from 'react';

import LongTermGoal from "../classes/LongTermGoal";

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <LongTermGoal />
    ).toJSON();
  expect(tree).toMatchSnapshot();
});
