import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNav} from './StackNavigator';

export default function Navigation () {
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
}
