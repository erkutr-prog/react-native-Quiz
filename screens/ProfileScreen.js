import { Text, View, StyleSheet, Button, Alert, Image, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { Navigation } from 'react-native-navigation';
import auth, { firebase } from "@react-native-firebase/auth";
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';


var colors = require('./../assets/colors/color')
var data = require('./../store/data');
var profileIcon = require('./../assets/icons/anon.png')

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this._loginScreen = this._loginScreen.bind(this);
    this._onLogout = this._onLogout.bind(this);
    this.createAlert = this.createAlert.bind(this);
  }

 
  componentDidMount() {
    var user = auth().currentUser;
    auth().onAuthStateChanged(function (user)  {
      if (user) {
        data.email = user.displayName;
        data.userPhoto = user.photoUrl
      } else {

      }
    })
  }

  _loginScreen() {
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: 'LoginScreen'
              }
            }
          ]
        }
      }
    })
  }

  createAlert() {
    Alert.alert("Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Yes",
          onPress: () => this._onLogout()
        },
        {
          text: "No",
          onPress: () => console.log("Cancel pressed")
        }
      ]
    )
  }

  

  async _onLogout() {
    if (data.isGoogleUser) {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    }
    await auth().signOut()
    await this._loginScreen();
    setTimeout(() => {
      Navigation.popToRoot();
    }, 1000);
    data.isLoggedIn = true;
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={data.userPhoto == '' ? profileIcon : {uri: data.userPhoto}} style={styles.ppIcon}/>
        <Text style={styles.text}>{data.email}</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={this.createAlert}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.default.QUIZ_BG,
    alignItems: 'center',
    paddingTop: 30
  },
  ppIcon: {
    width: 200,
    height: 200,
  },
  logoutText: {
    color: colors.default.QUIZ_TEXT
  },
  logoutBtn: {
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.default.WRONG_ANSWER,
    borderRadius: 20,
    width: 200,
    height: 50
  },
  text: {
    paddingTop: 70,
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.default.QUIZ_TEXT
  },
  flatlistContainer: {
      flex: 1,
      flexDirection: 'column',
      margin: 10,
      paddingTop: 10,
  },
  listView: {
    paddingBottom: 10
  }
})