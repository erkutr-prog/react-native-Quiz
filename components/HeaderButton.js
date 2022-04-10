import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Entypo';
import colors from '../assets/colors/color';

export default class HeaderButton extends Component {
    constructor(props) {
        super();
    }


  render() {
    return (
      <View style={{flex: 1}}>
          <TouchableOpacity style={{flex: 1}}>
              <Icon size={25} color={colors.QUIZ_TEXT} name={this.props.iconName} onPress={this.props.onPress}/>
          </TouchableOpacity>
      </View>
    )
  }
}