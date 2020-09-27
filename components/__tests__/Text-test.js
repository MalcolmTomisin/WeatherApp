import * as React from "react";
import renderer from "react-test-renderer";
import { Text } from '../Text';

jest.mock("react-native", () => {
  return {
    StyleSheet: {
      create: () => ({}),
    },
  };
});

it(`renders correctly`, () => {
  const tree = renderer.create(<Text />).toJSON();

  expect(tree).toMatchSnapshot();
});