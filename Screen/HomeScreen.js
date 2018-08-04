import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { LinearGradient } from 'expo';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home'
  }
  constructor(props) {
    super(props)

    setTimeout(() => {
      const { navigate } = this.props.navigation
      navigate('Login')
    }, 3000) 
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <LinearGradient 
        start={[0.5,0]}
        end={[0.5,1]}
        colors={['#E30072', '#AD0EB2', '#5800F0']}
        style={styles.container}>
        <View style={styles.transpareantBlock}>

          <View style={{flexDirection: 'row', width: '100%', height: '25%', justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{width: '25%', height: '100%', resizeMode: 'contain', marginRight: 16}} source={require('../img/boy_icon.png')} />
            <Image style={{width: '25%', height: '100%', resizeMode: 'contain'}} source={require('../img/girl_icon.png')} />
          </View>
          
          <Text style={{fontSize: 24, fontWeight: 'bold', color: '#000', textAlign: 'center'}}>ระบบติดตามตำแหน่งเด็กนักเรียน</Text>
          <Text style={{fontSize: 24, fontWeight: 'bold', color: '#000', textAlign: 'center'}}>อนุบาลในรถโรงเรียน</Text>

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
  transpareantBlock: {
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%', 
    height: '100%', 
    backgroundColor: 'rgba(255,255,255,0.35)'
  }
});