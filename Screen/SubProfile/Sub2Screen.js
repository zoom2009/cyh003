import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { LinearGradient } from 'expo';
import BtnBottom from '../../components/BtnBottom'

import { inject, observer } from 'mobx-react'

class Sub2Screen extends Component {
  static navigationOptions = {
    title: 'Sub2'
  }
  constructor(props) {
    super(props)

  }

  render() {
    
    const { navigate } = this.props.navigation
    var { CarState } = this.props
    console.log(CarState)
    return (
      <LinearGradient 
        start={[0.5,0]}
        end={[0.5,1]}
        colors={['#E30072', '#AD0EB2', '#5800F0']}
        style={styles.container}>

        <Text>Sub2</Text>

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
    flexDirection: 'column',
    backgroundColor: 'rgba(210, 37, 37, 0.74)',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default inject('CarState')(observer(Sub2Screen))