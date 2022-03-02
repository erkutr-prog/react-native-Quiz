import Icon from 'react-native-vector-icons/Ionicons';
import { Navigation } from "react-native-navigation";
import App from "./App";
import CategoryCard from "./components/CategoryCard"
import ProfileScreen from "./screens/ProfileScreen"
import Quiz from "./components/Quiz"
import QuizPreview from "./screens/QuizPreview"
import ResultsScreen from "./components/ResultScreen"

Navigation.registerComponent('Ana Sayfa', () => App);
Navigation.registerComponent('card', () => CategoryCard);
Navigation.registerComponent('ProfileScreen', () => ProfileScreen);
Navigation.registerComponent('QuizScreen',() => Quiz);
Navigation.registerComponent('PreviewPage', () => QuizPreview);
Navigation.registerComponent('ResultsScreen', () => ResultsScreen);

const homeIcon = Icon.getImageSourceSync('home', 35, 'black');
const playIcon = Icon.getImageSourceSync('md-arrow-back', 24, 'white');
const profileIcon = Icon.getImageSourceSync('cog', 35, 'black');

Navigation.events().registerAppLaunchedListener(() => {
   Navigation.setRoot({
     root: {
       stack: {
         children: [
           {
             component: {
               name: 'Ana Sayfa'
             },
           }
         ],
       },
       bottomTabs: {
        id: 'BOTTOM_TABS_LAYOUT',
        children: [
          {
            stack: {
              id: 'HOME_TAB',
              children: [
                {
                  component: {
                    id: 'HOME_SCREEN',
                    name: 'Ana Sayfa'
                  }
                }
              ],
              options: {
                bottomTab: {
                  icon: homeIcon
                }
              }
            }
          },
          {
            stack: {
              id: 'PROFILE_TAB',
              children: [
                {
                  component: {
                    id: 'PROFILE_SCREEN',
                    name: 'ProfileScreen'
                  }
                }
              ],
              options: {
                bottomTab: {
                  icon: profileIcon
                }
              }
            }
          }
        ]
      }
     }
  });
});

App.options = {
    topBar: {
      title: {
        text: "Quiz",
        color: 'black',
      },
    }
}

ProfileScreen.options = {
  topBar: {
    title: {
      text: "Settings",
      color: 'black',
    },
  }
}