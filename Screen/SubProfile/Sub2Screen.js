import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo';
import BtnBottom from '../../components/BtnBottom'
import TextBlock from '../../components/TextBlock'
import MapNoMark from '../../components/MapNoMark'

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
    

    AsyncStorage.getItem('curID', (error, result) => {
      var request = new XMLHttpRequest();
      request.onreadystatechange = (e) => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          console.log('success', request.responseText);
          let myJson = JSON.parse(request.responseText)
          console.log('myJSON is :', myJson)
            CarState.firstName = myJson.firstName
            CarState.picURL = myJson.picURL
            CarState.phone_number = myJson.phone_number
            CarState.home_lat = parseFloat(myJson.homeLocation.lat)
            CarState.home_lng = parseFloat(myJson.homeLocation.lng)
            CarState.school_lat = parseFloat(myJson.schoolLocation.lat)
            CarState.school_lng = parseFloat(myJson.schoolLocation.lng)
        } else {
          console.warn('error');
        }
      };

      request.open('GET', 'https://kiddatabase.herokuapp.com/userbyid/cyh001');
      request.send();
      // let url = 'https://kiddatabase.herokuapp.com/userbyid/cyh001' 
      // fetch(url, {
      //     method: 'GET'
      //   })
      //   .then((response) => { 
      //     console.log('--------------------------')
      //     console.log('my res:', JSON.stringify(response))
      //     //response.json() 
      //   })
        // .then((responseJson) => {
        //   console.log('res is :', responseJson)
        //   this.props.CarState.firstName = responseJson.firstName
        //   this.props.CarState.lastName = responseJson.lastName
        //   this.props.CarState.picURL = responseJson.picURL
        //   this.props.CarState.phone_number = responseJson.phone_number
        //   this.props.CarState.home_lat = parseFloat(responseJson.homeLocation.lat)
        //   this.props.CarState.home_lng = parseFloat(responseJson.homeLocation.lng)
        //   this.props.CarState.school_lat = parseFloat(responseJson.schoolLocation.lat)
        //   this.props.CarState.school_lng = parseFloat(responseJson.schoolLocation.lng)
        // })
        // .catch((error) => {
        //   console.error(error)
        // });
    })
    
  }

  render() {
    
    const { navigate } = this.props.navigation
    var { CarState } = this.props
    var myPic = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Flag_of_Taliban_%28original%29.svg/1200px-Flag_of_Taliban_%28original%29.svg.png'
    console.log(CarState)
    if(CarState.picURL!='') {
      myPic = CarState.picURL
    }
    return (
      <LinearGradient 
        start={[0.5,0]}
        end={[0.5,1]}
        colors={['#E30072', '#AD0EB2', '#5800F0']}
        style={styles.container}>

        <Image 
          style={{width: '22%', height: '22%', resizeMode: 'contain', borderRadius: 8}} 
          source={{uri: myPic}} />

        <TextBlock text={'ชื่อ: '+ CarState.firstName + ' ' + CarState.lastName} />
        <TextBlock text={'เบอร์โทรผู้ปกครอง: '+ CarState.phone_number} />
        
        <View style={{marginTop: 7,flexDirection: 'row', height: '18%', width: '96%', justifyContent: 'space-evenly'}}>
          <View style={{flexDirection: 'column', width: '36%'}}>
            <Text style={{textAlign: 'center', color: '#fff', fontSize: 18}}>จุดรับ:</Text>
            <MapNoMark
              w={"100%"}
              h={"100%"}
              lat={CarState.home_lat}
              lng={CarState.home_lng}
            />
          </View>

          <View style={{flexDirection: 'column', width: '36%'}}>
            <Text style={{textAlign: 'center', color: '#fff', fontSize: 18}}>จุดส่ง:</Text>
            <MapNoMark
              w={"100%"}
              h={"100%"}
              lat={CarState.school_lat}
              lng={CarState.school_lng}
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
    alignItems: 'center',
    paddingBottom: 40
  },
});

export default inject('CarState')(observer(Sub2Screen))