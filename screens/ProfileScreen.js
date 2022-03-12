import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'

var colors = require('./../assets/colors/color')
var data = require('./../store/data');

export default class ProfileScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{data.email}</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.default.QUIZ_BG
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