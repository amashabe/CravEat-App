import React from 'react';
import TabNavigator from './TabNavigator'
import AuthNavigator from './AuthNavigator'
import Loading from "../screens/Loading";

import { createSwitchNavigator, createAppContainer } from 'react-navigation';

const SwitchNavigator = createSwitchNavigator(
  {
    Home: {
      screen: TabNavigator
    },
    Auth: {
      screen: AuthNavigator
    },
    Loading: {
      screen: Loading
    }
  },
  {
    initialRouteName: 'Loading',
  }
);

export default createAppContainer(SwitchNavigator);