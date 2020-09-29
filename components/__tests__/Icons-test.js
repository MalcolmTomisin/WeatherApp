import * as React from "react";
import {render} from '@testing-library/react-native';
import WeatherIcons,{CameraTrigger} from "../Icons";

jest.mock("react-native", () => {
  return {
    StyleSheet: {
      create: () => ({}),
    },
  };
});

describe("Icon component", () => {
  it("renders correctly", () => {
    const wrapper = render(<WeatherIcons />);
    expect(wrapper).toMatchSnapshot();
  });
});