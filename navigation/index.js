import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import CitiesWeatherScreen from '../screens/CitiesWeatherScreen';
import DetailWeatherScreen from '../screens/DetailWeatherScreen';
import { NavigationContainer, StackActions } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function Navigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={"Cities"}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Cities" component={CitiesWeatherScreen} />
          <Stack.Screen name="Details" component={DetailWeatherScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}