import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import Card from '@paraboly/react-native-card/build/dist/components/Card/Card'
import { Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { color } from 'react-native-elements/dist/helpers';

var colors = require('./../assets/colors/color')

export default class QuizPreview extends Component {
  constructor(props) {
      super(props);
  }

  startQuiz(id) {
    Navigation.push(this.props.componentId, {
        component: {
            name: "QuizScreen",
            passProps: {
                category: id,
                topic: this.props.title
            },
            options: {
                topBar: {
                    backButton: {
                        visible: false
                    },
                    title: {
                        text: 'Questions',
                        color: colors.default.QUIZ_TEXT
                    },
                    background: {
                        color: colors.default.HEADER_BG
                    }
                }
            }
        }
    })
  }

  createPreview() {
      return (
          <View style={styles.container}>
              <Card
                iconDisable
                backgroundColor='#FFE4C0'
                title={this.props.title}
                description={this.props.description}
                style={styles.previewCard}
                topRightText="10 Questions"
                topRightTextStyle={{fontWeight: 'bold'}}
                bottomRightText="START >>"
                bottomRightTextStyle= {{
                    fontWeight: 'bold',
                    color: '#19282F',
                    justifyContent: 'flex-end',
                    flexDirection: 'column',
                }}
                onPress={() => this.startQuiz(this.props.category)}
                />
          </View>
      )
  }



  render() {
    return (
      <View style={{flex: 1}}>
        {this.createPreview()}
      </View>
    )
  }
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.default.QUIZ_BG
    },
    previewCard: {
        height: 200,
        marginTop: 10
    }
})