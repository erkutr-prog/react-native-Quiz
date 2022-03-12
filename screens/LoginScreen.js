import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { Component } from 'react';
import auth from "@react-native-firebase/auth";
import { Navigation } from 'react-native-navigation';
import { Icon } from 'react-native-elements';

var setMainRoot = require('./../index');
var data = require('./../store/data');
var colors = require('./../assets/colors/color');
var quizIcon = require('./../assets/icons/quiz.png')

export default class LoginScreen extends Component {
    constructor() {
        super();
        state = {
            mail: '',
            password: ''
        }
    }


    async _onloginPress() {
        await auth().signInWithEmailAndPassword(this.state.mail.toLowerCase(), this.state.password).then(() => {
            data.isLoggedIn = true;
            data.email = this.state.mail;
            setMainRoot();
            setTimeout(() => {
                Navigation.push(this.props.componentId, {
                    component: {
                        name: 'Ana Sayfa',
                        options: {
                            topBar: {
                                backButton: {
                                    visible: false
                                }
                            }
                        }
                    },
                })
            }, 1000)
        }).catch((error) => {
            var errorMessage = error.message
            Alert.alert(errorMessage);
        })
    }

    _onRegisterPress() {
        Navigation.push(this.props.componentId, {
            component: {
                name: "RegisterScreen"
            }
        })
    }
    
  render() {
    return (
        <View style= {styles.container}>
        <View style={{flex: 1, backgroundColor: colors.default.QUIZ_BG, }}>
            <Image source={quizIcon} style={styles.iconStyle}/>
            <TextInput style={styles.input} placeholder="Username" value={this.username} onChangeText={text => this.setState({mail: text})}></TextInput>
            <TextInput style={styles.input} secureTextEntry placeholder="Password" value={this.password} onChangeText={text => this.setState({password: text})}></TextInput>
            <TouchableOpacity style={styles.btn} onPress={() => this._onloginPress()}>
                <Text>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => this._onRegisterPress()}>
                <Text>Register</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.default.QUIZ_BG,
    },
    input: {
        backgroundColor: '#fff',
        height: 40,
        width: '90%',
        margin: 12,
        borderWidth: 0.2,
        padding: 10,
        alignSelf: 'flex-start',
        borderRadius: 5
    },
    iconStyle: {
        width:150, 
        height: 150, 
        alignSelf: 'center', 
        marginTop: 50, 
        marginBottom: 20
    },
    btn: {
        backgroundColor: colors.default.HOMECARD_BG,
        height: 40,
        width: '90%',
        margin: 12,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        alignSelf: 'center',
    },
    imgContainer: {
        flex: 0.3,
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center'
    }
})