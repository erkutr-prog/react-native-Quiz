import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';

var colors = require('./../assets/colors/color');

export default class ResultScreen extends Component {
  constructor(props) {
      super(props);
  }

  goToHomePage() {
      Navigation.popToRoot(this.props.componentId)
  }

  render() {
    return (
        <View style={{flex: 1, backgroundColor: colors.default.QUIZ_BG,}}>
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.counter}/{this.props.total}</Text>
            </View>
            <View style={styles.textAndButtons}>
                <Text>You have {this.props.counter} correct answers on topic {this.props.title}</Text>
                <TouchableOpacity style={styles.homeButton} onPress={() => this.goToHomePage()}>
                    <Text>HOMEPAGE</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 0.3,
        marginTop: Dimensions.get('window').height/10,
        alignSelf: 'center'
    },
    text: {
        fontWeight: '900',
        fontSize: 50,
        fontStyle: 'normal',
    },
    textAndButtons: {
        flex: 0.3,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    homeButton: {
        alignSelf: 'center', 
        marginTop: 50
    },
})