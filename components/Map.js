import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
//Map
import { MapView } from 'expo';

export default class Map extends Component {
    // width: '83%',
    //     height: '33%',
    render() {
        return (
            <View style={[styles.borderMap, 
                {width: this.props.w, height: this.props.h}]}>
                <MapView 
                    style={styles.map}
                    region={{
                        latitude: this.props.lat,
                        longitude: this.props.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>


                    <MapView.Marker
                        image={require('../img/van_icon.png')}
                        coordinate={{
                            latitude: this.props.lat,
                            longitude: this.props.lng,
                        }}
                        title={this.props.title}
                        description={this.props.des}
                    />

                </MapView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    map: {
        width: '96%',
        height: '95%'
    },
    borderMap: {
        backgroundColor: '#EE36B0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        marginVertical: 20
    }
})