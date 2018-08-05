import React, { Component } from 'react';
import { Asset } from 'expo'
import 'es6-symbol/implement'

import { NavigationActions, createStackNavigator } from 'react-navigation'

import { Provider } from 'mobx-react'
import CarState from './Stores/CarState'


import HomeScreen from './Screen/HomeScreen'
import LoginScreen from './Screen/LoginScreen'
import ProfileScreen from './Screen/ProfileScreen'
  import Sub1Screen from './Screen/SubProfile/Sub1Screen';
  import Sub2Screen from './Screen/SubProfile/Sub2Screen';
  import Sub3Screen from './Screen/SubProfile/Sub3Screen';
  import Sub4Screen from './Screen/SubProfile/Sub4Screen';

const  NavigationApp = createStackNavigator({
  Home: { screen: HomeScreen,  },
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
})
/*
const NavigationApp = StackNavigator({
  Home: { screen: HomeScreen,  },
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
      gesturesEnabled: false,
      header: {
        left: null
      },
      headerLeft: null
    }
});*/


export default class App extends Component {
  async componentWillMount() {

    await Asset.loadAsync([
      require('./img/boy_icon.png'),
      require('./img/girl_icon.png'),
      require('./img/icon.png'),
      require('./img/van_icon.png'),
    ]);
  }


  constructor(props) {
    super(props)

  }

  render() {
    
    return (
      <Provider CarState={CarState}>
        <NavigationApp />
      </Provider>
    )
  }
}