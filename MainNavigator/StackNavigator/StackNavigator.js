import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen, DetailScreen, CameraRollScreen } from '../../screens';

const StackNavigator = createStackNavigator();

export default function StackNav() {
  return (
    <StackNavigator.Navigator initialRouteName="Home">
      <StackNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <StackNavigator.Screen
        name="Detail"
        component={DetailScreen}
        options={{ headerShown: false }}
      />
      <StackNavigator.Screen
        name="Camera"
        component={CameraRollScreen}
        options={{ headerShown: false }}
      />
    </StackNavigator.Navigator>
  );
}
