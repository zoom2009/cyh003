import React, { Component } from 'react';
import 'es6-symbol/implement'

import { StackNavigator } from 'react-navigation'

import { Provider } from 'mobx-react'
import CarState from './Stores/CarState'


import HomeScreen from './Screen/HomeScreen'
import LoginScreen from './Screen/LoginScreen'
import ProfileScreen from './Screen/ProfileScreen'
  import Sub1Screen from './Screen/SubProfile/Sub1Screen';
  import Sub2Screen from './Screen/SubProfile/Sub2Screen';
  import Sub3Screen from './Screen/SubProfile/Sub3Screen';
  import Sub4Screen from './Screen/SubProfile/Sub4Screen';

const NavigationApp = StackNavigator({
  Home: { screen: HomeScreen, },
  Login: { screen: LoginScreen },
  Profile: { screen: ProfileScreen },
    Sub1: { screen: Sub1Screen },
    Sub2: { screen: Sub2Screen },
    Sub3: { screen: Sub3Screen },
    Sub4: { screen: Sub4Screen }
  }, {
    index: 0,
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false
    }
});


export default class App extends Component {
  render() {
    return (
      <Provider CarState={CarState}>
        <NavigationApp />
      </Provider>
    )
  }
}