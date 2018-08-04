import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

class BtnTransparent extends Component {
    render() {
        return (
            <TouchableHighlight 
                onPress={this.props.signUpMethod}
                underlayColor = "#fff"
                style={styles.touch}
                >
            <View style={styles.buttonOutline}>
                <Text style={styles.buttonTextOutline}>Sign Up</Text>
            </View>
          </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    buttonOutline: {
        borderRadius: 14,
        paddingVertical: 8,
        marginVertical: 8,
        backgroundColor: 'rgba(0,0,0,0)',
        width: '100%',
    },
    buttonTextOutline: {
        fontSize: 18,
        fontWeight: 'normal',
        color: '#fff',
        textAlign: 'center'
    },
    touch: {
        borderRadius: 14,
        width: '75%', 
        justifyContent: 'center', 
        alignItems: 'center'
       
      }
})

export default BtnTransparent;