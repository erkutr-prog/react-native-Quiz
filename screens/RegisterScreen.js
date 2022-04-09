import { Text, View, StyleSheet, TextInput, Button, Alert } from 'react-native'
import React, { Component } from 'react'
import auth from "@react-native-firebase/auth";
import { Navigation } from 'react-native-navigation';

export default class RegisterScreen extends Component {
    constructor() {
        super();
        state = {
            email: '',
            password: '',
            name: '',
        }
    }

    componentWillUnmount() {
        this.navigationEventListener.remove();
    }

    componentDidAppear() {
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                title: {
                    text: 'Register'
                },
                background: {
                    color: '#FFFFFF'
                }
            }
        })
    }

    componentDidMount() {
        this.navigationEventListener = Navigation.events().bindComponent(this);
    }
    async register() {
        let success = true
        await auth().createUserWithEmailAndPassword(this.state.email.toLowerCase(), this.state.password)
        .catch((error) => {
            success = false;
            var errorMessage = error.message;
            // ..
            alert(errorMessage);
        })

        if (success) {
            Alert.alert("You have registered successfully!");
            Navigation.pop(this.props.componentId)
        }
    }

  render() {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.register}
                placeholder='Enter your name'
                placeholderTextColor={'gray'}
                label='Name'
                value={this.name}
                onChangeText={text => this.setState({name: text})}
            />
            <TextInput
                style={styles.register}
                placeholder='Enter your email'
                placeholderTextColor={'gray'}
                label='Email'
                value={this.email}
                onChangeText={text => this.setState({email: text})}
            />
            <TextInput
                style={styles.register}
                placeholder='Enter your password'
                placeholderTextColor={'gray'}
                label='Password'
                value={this.password} onChangeText={text => this.setState({password: text})}
                secureTextEntry
            />
            <Button
                title="register" style={styles.button} onPress={this.register.bind(this)}
            />
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#ffffff'
    },
    button: {
        width: 370,
        marginTop: 10
    },
    register: {
        height: 40,
        width: '90%',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        borderWidth: 0.2,
        borderColor: 'blue',
        margin: 12,
        padding: 10
    },
    inputContainer: {
        justifyContent: 'space-evenly',
        flexDirection: 'column'
    }
})