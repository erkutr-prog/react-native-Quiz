import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import Card from '@paraboly/react-native-card/build/dist/components/Card/Card'
import { Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';

export default class QuizPreview extends Component {
  constructor(props) {
      super(props);
  }

  startQuiz(id) {
    Navigation.push(this.props.componentId, {
        component: {
            name: "QuizScreen",
            passProps: {
                category: id
            },
            options: {
                topBar: {
                    backButton: {
                        visible: false
                    },
                    title: {
                        text: 'Questions'
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
    },
    previewCard: {
        height: 200,
        maxWidth: Dimensions.get('window').width,
        maxHeight: Dimensions.get('window').height,
        position: 'absolute',
        marginTop: Dimensions.get('window').height/5,
        marginLeft: Dimensions.get('window').width/25,
    }
})