import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { LinearGradient } from 'expo';
import BtnBottom from '../../components/BtnBottom'
import TextBlock from '../../components/TextBlock'
import Map from '../../components/Map'

import { inject, observer } from 'mobx-react'

class Sub2Screen extends Component {
  static navigationOptions = {
    title: 'Sub2'
  }
  constructor(props) {
    super(props)

    this.GetProfileData()
  }

  GetProfileData() {
    var { CarState } = this.props
    console.log('token in sub2 is', CarState.token)
    let url = 'https://kiddatabase.herokuapp.com/userbytoken/' + CarState.token
    fetch(url, {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log('res is :', responseJson)
         this.props.CarState.firstName = responseJson.firstName
         this.props.CarState.lastName = responseJson.lastName
         this.props.CarState.picURL = responseJson.picURL
         this.props.CarState.phone_number = responseJson.phone_number
         this.props.CarState.home_lat = responseJson.homeLocation.lat
         this.props.CarState.home_lng = responseJson.homeLocation.lng
         this.props.CarState.school_lat = responseJson.schoolLocation.lat
         this.props.CarState.school_lng = responseJson.schoolLocation.lng
      })
      .catch((error) => {
         console.error(error)
      });
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

        <Image 
          style={{width: '25%', height: '25%', resizeMode: 'contain', borderRadius: 8}} 
          source={{uri: CarState.picURL}} />

        <TextBlock text={'ชื่อ: '+ CarState.firstName} />
        <TextBlock text={'นามสกุล: '+ CarState.lastName} />
        <TextBlock text={'เบอร์โทรผู้ปกครอง: '+ CarState.phone_number} />
        
        <View style={{marginTop: 7,flexDirection: 'row', height: '18%', width: '96%', justifyContent: 'space-evenly'}}>
          <View style={{flexDirection: 'column', width: '36%'}}>
            <Text style={{textAlign: 'center', color: '#fff', fontSize: 18}}>จุดรับ:</Text>
            <Map 
              w={"100%"}
              h={"100%"}
              lat={CarState.home_lat}
              lng={CarState.home_lng}
              title="Title"
              des="Description"
            />
          </View>

          <View style={{flexDirection: 'column', width: '36%'}}>
            <Text style={{textAlign: 'center', color: '#fff', fontSize: 18}}>จุดส่ง:</Text>
            <Map 
              w={"100%"}
              h={"100%"}
              lat={CarState.school_lat}
              lng={CarState.school_lng}
              title="Title"
              des="Description"
            />
          </View>
        </View>
        
        

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
// /user/:id/:password
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