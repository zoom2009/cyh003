import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { LinearGradient } from 'expo';
import Map from '../../components/Map'
import TextBlock from '../../components/TextBlock'
import BtnBottom from '../../components/BtnBottom'

import { inject, observer } from 'mobx-react'


class Sub1Screen extends Component {
  static navigationOptions = {
    title: 'Sub1'
  }
  constructor(props) {
    super(props)

    var { CarState } = this.props
    CarState.setlat(5)
    console.log('###')
    console.log(CarState)

  }
  
  render() {
    const { CarState } = this.props
    console.log(CarState)
    
    const { navigate } = this.props.navigation
   
    if(CarState.carStatus == 'รถไม่เคลื่อนที่' || CarState.carStatus == 'ไม่พบสัญญาณ') {
      CarState.carStatusColor = '#d9534f'
    }else if(CarState.carStatus == 'รถกำลังเคลื่อนที่'){ 
      CarState.carStatusColor = '#5cb85c'
    }
    console.log('car color:', CarState.carStatusColor)
    
    //console.log('data :', btAddr)
    return (
      <LinearGradient 
        start={[0.5,0]}
        end={[0.5,1]}
        colors={['#E30072', '#AD0EB2', '#5800F0']}
        style={styles.container}>

        <View style={styles.fieldText}>
          <Text style={[styles.textInField, {backgroundColor: CarState.carStatusColor}]}>สถานะ: {CarState.carStatus}</Text>
        </View>

        <Map 
          lat={CarState.lat}
          lng={CarState.lng}
          title="Title"
          des="Description"
        />

        <TextBlock text={'สถานะ: '+ CarState.kidStatus} />
        <TextBlock text={'อุณหภูมิ: '+ CarState.temp+' องศา'} />

        <BtnBottom 
          Method={()=>{
            navigate('Profile')
          }}
          text='ย้อนกลับ'
          />

      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    flexDirection: 'column'
  },
  fieldText: {
    width: '100%', 
    paddingVertical: 4, 
    paddingHorizontal: 8, 
    alignItems: 'flex-end'
  },
  textInField: {
    marginHorizontal: 20, 
    borderRadius: 8, 
    borderColor: '#27ae60', 
    borderWidth: 2,  
    paddingVertical: 8, 
    paddingHorizontal: 16, 
    textAlign: 'center', 
    fontSize: 24,
    color: '#fff', 
    backgroundColor: '#d9534f'
  },
});

export default inject('CarState')(observer(Sub1Screen))