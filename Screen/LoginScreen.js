import React, { Component } from 'react';
import { View, StyleSheet, Alert, Image, AsyncStorage, BackHandler } from 'react-native';

import  BtnFull  from '../components/BtnFull'
import  BtnTransparent  from '../components/BtnTransparent'
import  Input  from '../components/Input'
import  Title  from '../components/Title'

import { LinearGradient } from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';
import Logocyh from '../components/Logocyh';

import { inject, observer } from 'mobx-react'


class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login'
  }
  constructor(props) {
    super(props);

    BackHandler.addEventListener('hardwareBackPress', function() {
      BackHandler.exitApp()
      return true;
    })    

    this.state = {
      waitLogin: false,
      username: 'none',
      password: 'none'
    }
  }

  SetUsernameVal(val) {
    this.setState({
      username: val
    })
  }

  SetPasswordVal(val) {
    this.setState({
      password: val
    })
  }

  LogIn() {
    this.setState({
      waitLogin: true
    })
    let url = 'https://kiddatabase.herokuapp.com/user/'+this.state.username+'/'+this.state.password
    fetch(url, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          waitLogin: false
        })
        if(responseJson[0]==null) {
          Alert.alert('Username หรือ Password ไม่ถูกต้อง')
        }else {
          console.log(responseJson[0].mac_address)
          let member = responseJson[0].mac_address
          AsyncStorage.setItem('member', member)
          const { navigate } = this.props.navigation
          this.props.CarState.mac_address = responseJson[0].mac_address
          navigate('Profile')
        }
      })
      .catch((error) => {
         console.error(error);
         this.setState({
          waitLogin: false
        })
      });
    
  }


  render() {
    const { navigate } = this.props.navigation
    return (
      <LinearGradient 
        start={[0.5,0]}
        end={[0.5,1]}
        colors={['#E30072', '#AD0EB2', '#5800F0']}
        style={styles.container}>

        <Spinner 
          cancelable={true}
          visible={this.state.waitLogin} 
          textContent={"Loading..."} 
          overlayColor='rgba(0,0,0,0.25)'
          textStyle={{color: '#FFF'}} />
      
        <Logocyh />
        {/* <Title text="CYH" />*/} 
        
        <View style={styles.inputPlace}>
          
          <Input 
            name='account-outline'
            type='material-community'
            size={42}
            textChange={this.SetUsernameVal.bind(this)}
            holder='Username'
            isPassword={false}
            />

          <Input 
            name='lock-outline'
            type='material-community'
            size={42}
            textChange={this.SetPasswordVal.bind(this)}
            holder='Password'
            isPassword={true}
            />

          <BtnFull
            btnText="Sign In" 
            Method={this.LogIn.bind(this)}
            />

          {/*
          <BtnTransparent 
            btnText="Sign Up"
            signUpMethod={this.SignUp.bind(this)}
            />
          */} 
          
        </View>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'column',
    backgroundColor: 'rgba(210, 37, 37, 0.74)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputPlace: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
})
  
export default inject('CarState')(observer(LoginScreen))