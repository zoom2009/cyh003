import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

class btnNormal extends Component {
    render() {
        return (
            <TouchableHighlight 
                onPress={this.props.Method}
                underlayColor = "#ccc"
                style={styles.touch}
                >
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{this.props.btnText}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 14,
        paddingVertical: 8,
        marginVertical: 8,
        backgroundColor: 'rgba(255,255,255,0.8)',
        width: '100%',
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center'
    },
    touch: {
        borderRadius: 14,
        width: '75%', 
        justifyContent: 'center', 
        alignItems: 'center'
       
      }
})

export default btnNormal;