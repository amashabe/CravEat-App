import React from 'react';
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const StackNavigator = createStackNavigator(
  {
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        headerShown: false
      }
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        headerShown: false
      }
    }
  }
);

export default createAppContainer(StackNavigator);