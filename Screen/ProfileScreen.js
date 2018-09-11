import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert, AsyncStorage, BackHandler } from 'react-native';
import { LinearGradient } from 'expo';
import Logocyh from '../components/Logocyh'
import BtnNormal from '../components/BtnNormal'
import BtnFull from '../components/BtnFull'
import BtnBottom from '../components/BtnBottom'

import { inject, observer } from 'mobx-react'

import SocketIOClient from 'socket.io-client';

import { Permissions, Notifications } from 'expo';
import { setInterval } from 'core-js';


async function registerForPushNotificationsAsync(fn) {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return;
  }
  let token = await Notifications.getExpoPushTokenAsync();
  console.log('make new token got : ', token)
  AsyncStorage.setItem('token', token)
  fn(token)
}


class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  }
  
  
 
  constructor(props) {
    super(props)

    BackHandler.addEventListener('hardwareBackPress', function() {
      BackHandler.exitApp()
      return true;
    })    
    
    this.socket = SocketIOClient('https://kiddatabase.herokuapp.com/'); 

    var { CarState } = this.props
    // Is not have token 
    // but have mac_address
    console.log('before everythings token is : ', CarState.token)
    if(CarState.token == 'none' ) {
      registerForPushNotificationsAsync(function(token) {
        CarState.token = token
        console.log('this macAddress: ', CarState.mac_address, ' is make new token:', CarState.token)
      })
    }

    var inter = setInterval(() => {
      console.log('running interval...')
      //console.log('length : ', ''+CarState.token)
      if('null' == ''+CarState.token) {
        console.log('fucking same')
      }
      if(CarState.token!='none') {
        let obj = {token: CarState.token, mac_address: CarState.mac_address}
        this.socket.emit('push_token', obj)
        console.log('is push : ', CarState.token)
        clearInterval(inter);
      }
    }, 100)
    

    //======================= Socket.io ===========================
    
    this.socket.on('alert', (mac_address) => {
      if(CarState.mac_address == mac_address) {
        Alert.alert('ฉุกเฉิน! ลูกของคุณกำลังติดอยู่ในรถ')
      }
    })

    this.socket.on('finish school', (mac_address) => {
      if(CarState.mac_address == mac_address) {
        Alert.alert('ลูกของคุณเดินทางถึง โรงเรียนแล้ว')
      }
    })

    this.socket.on('finish home', (mac_address) => {
      if(CarState.mac_address == mac_address) {
        Alert.alert('ลูกของคุณเดินทางถึง บ้านแล้ว')
      }
    })

    //=============================================================

    var CheckConnect

    this.socket.on('carPost', (data) => {
      if(this.isHaveMacAddr(data.watch, CarState.mac_address)) {
        clearTimeout(CheckConnect);
        console.log('is found ', CarState.mac_address)
        console.log(data)
        
        data = {
          date: data.date,
          time: parseInt(data.time),
          carID: data.id,
          lat: parseFloat(data.lat),
          lng: parseFloat(data.lng),
          temp: parseFloat(data.temp),
          carStatus: 'รถกำลังเคลื่อนที่',
          kidStatus: 'เด็กอยู่ในรถ'
        }
        CarState.setCarState(data)

        CheckConnect = setTimeout(() => {
          data = {
            //date: '',
            //time: '',
            //carID: '',
            //lat: 99.99,
            //lng: 99.99,
            //temp: 99.99,
            carStatus: 'ไม่พบสัญญาณ',
            kidStatus: 'ไม่พบสัญญาณ',
            carStatusColor: '#d9534f'
          }
          Alert.alert('ไม่พบสัญญาณ')
          CarState.setCarState(data)
        }, 30000)
      }else {
        console.log('not found this addr:', CarState.mac_address)
        console.log("data is", data)
      }
    })  
  }

  isHaveMacAddr (data, macAddr) {
    for(let i=0;i<data.length;i++) {
      if(data[i].mac_address == macAddr) {
        return true
      }
    }
    return false
  }

  moveTo(target) {
    const { navigate } = this.props.navigation
    navigate(target)
  }

  render() {
    const { navigation } = this.props;
    const { CarState } = this.props

    return (
      <LinearGradient 
        start={[0.5,0]}
        end={[0.5,1]}
        colors={['#E30072', '#AD0EB2', '#5800F0']}
        style={styles.container}>

        <Text 
          style={{position: 'absolute', right: 0, top:0,  marginRight: 15, marginTop: 25, fontSize: 18, color: '#fff'}}>
          Login in addr: {CarState.mac_address}
        </Text>

        <Logocyh />

        <BtnNormal
          btnText="สถานะนักเรียน" 
          Method={() => {
            this.moveTo('Sub1')
          }}
          />

        <BtnNormal
          btnText="ข้อมูลนักเรียน" 
          Method={() => {
            this.moveTo('Sub2')
          }}
          />

        <BtnNormal
          btnText="ติดต่อคนขับรถ" 
          Method={() => {
            this.moveTo('Sub3')
          }}
          />

        <BtnFull
          btnText="ติดต่อขอความช่วยเหลือ" 
          Method={() => {
            this.moveTo('Sub4')
          }}
          />

        
        <BtnBottom 
          text='ออกจากระบบ'
          Method={() => {
            // POP TOKEN
            let obj = {token: CarState.token, mac_address: CarState.mac_address}
            this.socket.emit('pop_token', obj)
           
            console.log('token is ', CarState.token)
            AsyncStorage.setItem('member', 'none')
            CarState.mac_address = 'none'
            AsyncStorage.setItem('token', 'none')
            CarState.token = 'none'
            this.moveTo('Login')
          }}/>

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
});

export default inject('CarState')(observer(ProfileScreen))