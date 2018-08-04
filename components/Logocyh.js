import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';

class Logocyh extends Component {
    render() {
        return (
            <View style={styles.imgContain}>
                <Image style={styles.img} source={require('../img/cyh_logo.png')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imgContain: {
        marginBottom: 70, 
        width: '100%', 
        height: '25%'
    },
    img: {
        width: '100%', 
        height: '100%', 
        resizeMode: 'contain'
    }
})

export default Logocyh;