import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

class BtnBottom extends Component {
    render() {
        return (
            <TouchableHighlight 
                onPress={this.props.Method}
                underlayColor = "#ccc"
                style={styles.button}
                >
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute', 
        bottom: '3%'
    },
    buttonText: {
        fontSize: 20, 
        textAlign: 'center', 
        color: '#fff', 
        borderRadius: 8, 
        paddingHorizontal:16, 
        paddingVertical:8, 
        backgroundColor: '#E30072'
    },
})

export default BtnBottom;