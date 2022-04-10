import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import Card from '@paraboly/react-native-card/build/dist/components/Card/Card'
import { Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { color } from 'react-native-elements/dist/helpers';
import { Picker, PickerIOS } from '@react-native-picker/picker';

var colors = require('./../assets/colors/color')

export default class QuizPreview extends Component {
  constructor(props) {
      super(props);
      this.state = {
        visibleFilterModal: false,
        selectedDiff: 'medium'
      }
      this.filterButtonPressed = this.filterButtonPressed.bind(this);
  }

  filterButtonPressed (){
      console.log("********");
    this.setState({visibleFilterModal: true})
  }
  componentDidAppear(){
      console.log("*******");
    Navigation.mergeOptions(this.props.componentId, {
        topBar: {
            rightButtons: [
                {
                    id: '3',
                    component: {
                        name: 'HeaderButton',
                        passProps: {
                            iconName: 'dots-three-horizontal',
                            onPress: this.filterButtonPressed
                        }
                    }
                }
            ]
        }
    })
  }

  componentWillUnmount(){
      this.navigationEventListener.remove();
  }

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this)
  }

  startQuiz(id) {
    Navigation.push(this.props.componentId, {
        component: {
            name: "QuizScreen",
            passProps: {
                category: id,
                topic: this.props.title,
                selectedDiff: this.state.selectedDiff
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

  getItems(){
      var items = [];
      var diffs = [{key: '1', value: 'easy'}, {key: '2', value: 'medium'}, {key: '3', value: 'hard'}];
      for (i=0; i < diffs.length; i++) {
          console.log("iteration", i);
          items.push(<Picker.Item key={diffs[i].key} value={diffs[i].value} label={diffs[i].value}/>);
      }
      console.log(items);
      return items;
  }

  createPreview() {
      return (
          <View style={styles.container}>
              <Modal
                animationType='fade'
                visible={this.state.visibleFilterModal}
                transparent={true}
                onRequestClose={() => this.setState({visibleFilterModal: false})}
                >
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={styles.modal}>
                                <Text style={{alignSelf: 'center'}}>Difficulty Level</Text>
                            <View style={{flex: 0.5, justifyContent: 'center'}}>
                                <Picker 
                                    style={styles.pickerStyle}
                                    selectedValue={this.state.selectedDiff}
                                    onValueChange={(itemValue, itemIndex) => this.setState({selectedDiff: itemValue})}
                                > 
                                {this.getItems()}
                                </Picker>
                            </View>
                            <View style={{flex: 0.5, flexDirection: 'row'}}>
                                <TouchableOpacity style={styles.btnSelect} onPress={() => this.setState({visibleFilterModal: false})}>
                                    <Text style={{alignSelf: 'center'}}>
                                        SELECT
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
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
    },
    modal: {
        flex: 0.5,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        width: 350,
        height: 350,
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: 'column'
    },
    btnSelect: {
        width: 200, 
        height: 50, 
        alignSelf: 'flex-end', 
        borderRadius: 20, 
        backgroundColor: colors.default.CORRECT_ANSWER, 
        justifyContent: 'center'
    },
    pickerStyle: {
        alignSelf: 'flex-start',
        height: 100, 
        width: 300
    }
})