import { Text, View,StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import CategoryCard from './components/CategoryCard'
import { Navigation } from 'react-native-navigation';

var colors = require('./assets/colors/color')

const cards = [
  {'id': '0','title': "Random", 'description': "Select a random topic", 'icon': 'shuffle', 'category_id': 'random'},
  {'id': '1','title': "General Knowledge", 'description': "Test your general knowledge", 'icon': 'network', 'category_id': '9'},
  {'id': '2', 'title': "Sports", 'description': "Football,Basketball,Tennis etc", 'icon': 'trophy', 'category_id': '21'},
  {'id': '3', 'title': "Computer Science", 'description': "Computer science challenge!", 'icon': 'code', 'category_id': '18'},
  {'id': '4', 'title': "Politics", 'description': "A test of politics knowledge", 'icon': 'mic', 'category_id': '24'},
  {'id': '5', 'title': "Art", 'description': "Art challenge", 'icon': 'brush', 'category_id': '25'},
  {'id': '6', 'title': "Books", 'description': "For the bookworms!", 'icon': 'book', 'category_id': '10'},
  {'id': '7', 'title': "Animals", 'description': "We love animals", 'icon': 'baidu', 'category_id': '27'}
]

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  

  navigateToQuizScreen(selection) {
    let text = "A quiz to test your knowledge on " + selection.title;
    Navigation.push(this.props.componentId, 
      {
        component: {
          name: "PreviewPage",
          passProps: {
            category: selection.category_id,
            iconName: selection.icon,
            title: selection.title,
            description: text
          },
          options: {
            topBar: {
              background: {
                color: colors.default.HEADER_BG
              }
            }
          }
        }
      })
  }

  renderCards = ({item}) => {
    return(
      <View style={styles.listView}>
        <CategoryCard
          iconName={item.icon}
          onPress={() => this.navigateToQuizScreen(item)}
          title={item.title}
          description={item.description}/>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
              <View style={styles.flatlistContainer}>
        <FlatList
          data={cards}
          renderItem={this.renderCards}
          keyExtractor={item => item.id}
        />
      </View>
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