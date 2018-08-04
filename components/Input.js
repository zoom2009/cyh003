import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements'

class Input extends Component {
    render() {
        return (
            <View style={styles.inputPanel}>
                <Icon
                    color='rgba(255,255,255,0.5)'
                    style={styles.inputIcon}
                    size={this.props.size}
                    name={this.props.name}
                    type={this.props.type}
                    />
                <TextInput style={styles.input} 
                    onChangeText={(text) => {
                        this.props.textChange(text)
                    }}
                    underlineColorAndroid="rgba(0,0,0,0)" 
                    placeholder={this.props.holder}
                    secureTextEntry={this.props.isPassword}
                    />
          </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: '80%',
        textAlign: 'left',
        fontSize: 24,
        color: '#fff',
        paddingLeft: 14
      },
      inputIcon: {
        width: '20%',
        alignSelf: 'center'
      },
      inputPanel: {
        flexDirection: 'row', 
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        marginVertical: 10,
        backgroundColor: 'rgba(33,33,33,0.8)',
        borderRadius: 14
      },
})

export default Input;