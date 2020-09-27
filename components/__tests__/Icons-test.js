import * as React from "react";
import renderer from "react-test-renderer";
import WeatherIcons,{CameraTrigger} from "../Icons";

jest.mock("react-native", () => {
  return {
    StyleSheet: {
      create: () => ({}),
    },
  };
});

it(`renders correctly`, () => {
  const tree = renderer.create(<CameraTrigger style={{}} uri="" />).toJSON();

  expect(tree).toMatchSnapshot();
});