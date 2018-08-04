import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default class TextBlock extends Component {
    render() {
        return (
            <View style={styles.fieldText2}>
                <Text style={styles.textInField2}>{this.props.text}</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    title: {
        fontSize: 50, 
        fontWeight: 'bold', 
        color: '#fff',
        paddingVertical: 25
    },
    fieldText2: {
        width: '80%', 
        borderRadius: 14, 
        paddingVertical: 8, 
        marginVertical: 8, 
        backgroundColor: 'rgba(255,255,255,0.8)',
        marginVertical: 10
      },
      textInField2: {
        textAlign: 'center', 
        fontSize: 24
      }
})