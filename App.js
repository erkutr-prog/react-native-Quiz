import { Text, View,StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import CategoryCard from './components/CategoryCard'
import { Navigation } from 'react-native-navigation';


const cards = [
  {'id': '0','title': "Random", 'description': "Select a random topic", 'icon': 'shuffle', 'category_id': 'random'},
  {'id': '1','title': "General Knowledge", 'description': "Test your general knowledge", 'icon': 'network', 'category_id': '9'},
  {'id': '2', 'title': "Sports", 'description': "Football,Basketball,Tennis etc", 'icon': 'trophy', 'category_id': '21'},
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
        <FlatList
          data={cards}
          renderItem={this.renderCards}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
      margin: 10,
      paddingTop: 10,
  },
  listView: {
    paddingBottom: 10
  }
})