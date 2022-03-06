import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import Card from '@paraboly/react-native-card/build/dist/components/Card/Card'
import { color } from 'react-native-elements/dist/helpers';

var colors = require('./../assets/colors/color');

export default class CategoryCard extends Component {
    constructor(props) {
        super(props);
    }
  render() {
    return (
      <View>
          <Card
            iconName={this.props.iconName}
            iconColor='black'
            onPress={this.props.onPress}
            backgroundColor={colors.default.HOMECARD_BG}
            title={this.props.title}
            description={this.props.description}
            borderRadius={30} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    }
})