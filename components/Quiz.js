import { StyleSheet, Text, View, VirtualizedList } from 'react-native'
import React, { Component } from 'react'
import Card from '@paraboly/react-native-card/build/dist/components/Card/Card'
import { Dimensions } from 'react-native'
import { Navigation } from 'react-native-navigation';

var colors = require('./../assets/colors/color');

export default class Quiz extends Component {
  constructor(props) {
      super(props)
      this.state = {
        data: [],
        isLoading: true,
        currentQuestion: "",
        options: [],
        questions: [],
        answers: [],
        questionIndex: 0,
        answerIndex: 0,
        correct_counter: 0,
        total_counter: 0,
        answered: false,
        selectedAnswerIndex: 0,
      }
  }

  async componentDidMount() {
    await this.fetchQuestions(this.props.category)
  }
  
  async fetchQuestions(category){
      var questionsdata = [];
      //setting our topic based on selection with category_id
      if (category === 'random') {
        var url = "https://opentdb.com/api.php?amount=10&category=" + "&type=multiple"
      } else {
        var url = "https://opentdb.com/api.php?amount=10&category=" + category + "&type=multiple"
      }
    try {
      await fetch(url)
    .then(response => response.json())
    .then(data => {
      questionsdata = data.results;
    })
    .catch(err => console.error(err));
    } catch(e) {
        console.log(e)
    }
    await this.setQuestionData(questionsdata);
    this.setState({
      data: questionsdata,
      isLoading: false,
    })
  }

  //Manipulating and getting the questions ready to render the screen
  async setQuestionData(questionsdata) {
    var question_List = questionsdata.map(({question}) => question);
    await this.fixQuestionsFromApi(question_List);
    let i = 0;
    var answerList = [];
    var shuffled_answerlist =[];
    for (i; i < question_List.length; i++) {
      answerList = questionsdata[i]['incorrect_answers'];
      answerList.push(questionsdata[i]['correct_answer']);
      await shuffled_answerlist.push(this.shuffleAnswers(answerList));
      answerList = [];
    }
    await this.fixAnswersFromApi(shuffled_answerlist);
    this.setState({questions: question_List, answers: shuffled_answerlist});
  }

  fixQuestionsFromApi(list) {
    let i = 0;
    let encoded, decoded = '';
    for (i; i < list.length ; i++) {
      encoded = encodeURI(list[i]);
      decoded = decodeURI(encoded);
      list[i] = decoded;
      if (list[i].includes("&quot")) {
        list[i] = list[i].replaceAll("&quot", "'");
      }
    }
  }

  fixAnswersFromApi(list) {
    let i, j = 0;
    let encoded, decoded = '';
    for (i; i < list.length; i++) {
      for (j; j < 4; j++) {
        encoded = encodeURI(list[i]);
        decoded = decodeURI(encoded);
        list[i] = decoded;
      }
    }
  }

  //shuffling correct answer and others
  shuffleAnswers(answerList) {
    var currentIndex = answerList.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = answerList[currentIndex];
      answerList[currentIndex] = answerList[randomIndex];
      answerList[randomIndex] = temporaryValue;
    }
    return answerList;
  }

  //method for rendering question
  _renderQuestion() {
    return (
      <View style={styles.question}>
        <Text style={styles.text}>{this.state.questions[this.state.questionIndex]}</Text>
        {this.renderOptions()}
      </View>
    )
  }

  //When user makes his choice..
  _onAnswer(answer, index) {
    if (this.state.questionIndex <= (this.state.questions.length - 1)) {
      this.setState({
        answered: true,
        selectedAnswerIndex: index
      })
      if (answer === this.state.data[this.state.questionIndex]['correct_answer']) {
        this.setState({
          correct_counter: this.state.correct_counter + 1
        })
      }
      
      setTimeout(() => {
        this.setState({
          answered: false
        })
        if (this.state.questionIndex == (this.state.questions.length - 1)){
          Navigation.push(this.props.componentId, {
            component: {
              name: "ResultsScreen",
              passProps: {
                counter: this.state.correct_counter,
                title: this.props.title,
                total: this.state.questions.length
              },
              options: {
                topBar: {
                  title: {
                    text: "Congratulations!"
                  },
                  backButton: {
                    visible: false
                  }
                }
              }
            }
          })
        } else {
          this.setState( {
            questionIndex: this.state.questionIndex + 1
          })
        }
      }, 1000);

    } 
  }

  //method for rendering options
  renderOptions() {
    var correct_answer = this.state.data[this.state.questionIndex]['correct_answer'];
    return (
          <View>
            <View style={styles.optionContainer}>
              <Card 
                iconDisable
                style={styles.options}
                backgroundColor={(this.state.answered) ? (this.state.answers[this.state.questionIndex][this.state.answerIndex] == correct_answer ? colors.default.CORRECT_ANSWER : (this.state.selectedAnswerIndex == this.state.answerIndex) ? colors.default.WRONG_ANSWER : 'white') : 'white'}
                onPress={() => this._onAnswer(this.state.answers[this.state.questionIndex][this.state.answerIndex], this.state.answerIndex)}
                title={this.state.answers[this.state.questionIndex][this.state.answerIndex]}/>
              <Card
                iconDisable
                style={styles.options}
                backgroundColor={(this.state.answered) ? (this.state.answers[this.state.questionIndex][this.state.answerIndex + 1] == correct_answer ? colors.default.CORRECT_ANSWER : (this.state.selectedAnswerIndex == this.state.answerIndex + 1) ? colors.default.WRONG_ANSWER : 'white') : 'white'}
                onPress={() => this._onAnswer(this.state.answers[this.state.questionIndex][this.state.answerIndex + 1], (this.state.answerIndex + 1))}
                title={this.state.answers[this.state.questionIndex][this.state.answerIndex + 1]}/>
          </View>
          <View style={styles.optionContainer}>
              <Card 
                iconDisable
                style={styles.options}
                backgroundColor={(this.state.answered) ? (this.state.answers[this.state.questionIndex][this.state.answerIndex + 2] == correct_answer ? colors.default.CORRECT_ANSWER : (this.state.selectedAnswerIndex == this.state.answerIndex + 2) ? colors.default.WRONG_ANSWER : 'white') : 'white'}
                onPress={() => this._onAnswer(this.state.answers[this.state.questionIndex][this.state.answerIndex + 2], (this.state.answerIndex + 2))}
                title={this.state.answers[this.state.questionIndex][this.state.answerIndex + 2]}/>
              <Card
                iconDisable
                style={styles.options}
                backgroundColor={(this.state.answered) ? (this.state.answers[this.state.questionIndex][this.state.answerIndex + 3] == correct_answer ? colors.default.CORRECT_ANSWER : (this.state.selectedAnswerIndex == this.state.answerIndex + 3) ? colors.default.WRONG_ANSWER : 'white') : 'white'}
                onPress={() => this._onAnswer(this.state.answers[this.state.questionIndex][this.state.answerIndex + 3], (this.state.answerIndex + 3))}
                title={this.state.answers[this.state.questionIndex][this.state.answerIndex + 3]}/>
          </View>
          </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ?
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.loading}>Loading...</Text>
          </View> 
          : this._renderQuestion()
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00B4D8',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 70
  },
  loading: {
    fontFamily: 'Verdana',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 30
  },
  text: {
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    letterSpacing: -0.02,
    fontWeight: "600"
  },
  options: {
    height: 50,
    width: Dimensions.get('window').width/2.1,
    paddingRight: 5,
    marginRight: 5,
    marginLeft: 4
  },
  optionContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    paddingTop: 8
  },
  question: {
    flex: 1,
  }
})