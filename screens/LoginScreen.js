import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity, Alert, Platform } from 'react-native'
import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import auth, { firebase } from "@react-native-firebase/auth";
import { Navigation } from 'react-native-navigation';
import { Icon } from 'react-native-elements';
import { GoogleSignin, GoogleSigninButton,statusCodes } from '@react-native-community/google-signin';

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

    componentDidMount() {
        SplashScreen.hide();
        if (Platform.OS == 'ios') {
            GoogleSignin.configure({
                iosClientId: '721363196314-s7pmf63ahf5q5s0132q4r73uqod7t2b3.apps.googleusercontent.com',
                webClientId: '721363196314-s7pmf63ahf5q5s0132q4r73uqod7t2b3.apps.googleusercontent.com',
                offlineAccess: false
            })
        } else {
            console.log("android")
            GoogleSignin.configure({
                webClientId: '986263855568-h08p8jphvv7hk4addtuplfrbm16fg66m.apps.googleusercontent.com',
                offlineAccess: false
            })
            console.log("android2")
        }
    }

    _loginSuccess(isGoogle) {
        data.isLoggedIn = true;
        data.email = isGoogle ? '' : this.state.mail;
        data.isGoogleUser = isGoogle ? true : false;
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
    }

    async _onloginPress() {        
        await auth().signInWithEmailAndPassword(this.state.mail.toLowerCase(), this.state.password).then(() => {
            this._loginSuccess(false);
        }).catch((error) => {
            var errorMessage = error.message
            Alert.alert(errorMessage);
        })
    }

    _signInWithGoogle = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const {accessToken, idToken} = await GoogleSignin.signIn();
          const credential = auth.GoogleAuthProvider.credential(
            idToken,
            accessToken,
          );
          await auth().signInWithCredential(credential);
          this._loginSuccess(true);
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            console.log("1")
            alert('Cancel');
          } else if (error.code === statusCodes.IN_PROGRESS) {
              console.log("2")
            alert('Signin in progress');
            // operation (f.e. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              console.log("3");
            alert('PLAY_SERVICES_NOT_AVAILABLE');
            // play services not available or outdated
          } else {
              console.log("4")
            // some other error happened
          }
        }
      };

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
            <GoogleSigninButton
                style={{ width: 192, height: 48, alignSelf: 'center' }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this._signInWithGoogle}
                disabled={false}
            />
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