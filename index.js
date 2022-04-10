import Icon from 'react-native-vector-icons/Ionicons';
import { Navigation } from "react-native-navigation";
import App from "./App";
import CategoryCard from "./components/CategoryCard"
import ProfileScreen from "./screens/ProfileScreen"
import Quiz from "./components/Quiz"
import QuizPreview from "./screens/QuizPreview"
import ResultsScreen from "./components/ResultScreen"
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HeaderButton  from './components/HeaderButton';
import { color } from 'react-native-elements/dist/helpers';

var colors = require('./assets/colors/color')

Navigation.registerComponent('Ana Sayfa', () => App);
Navigation.registerComponent('card', () => CategoryCard);
Navigation.registerComponent('ProfileScreen', () => ProfileScreen);
Navigation.registerComponent('QuizScreen',() => Quiz);
Navigation.registerComponent('PreviewPage', () => QuizPreview);
Navigation.registerComponent('ResultsScreen', () => ResultsScreen);
Navigation.registerComponent('LoginScreen', () => LoginScreen);
Navigation.registerComponent('RegisterScreen', () => RegisterScreen);
Navigation.registerComponent('HeaderButton', () => HeaderButton);

const homeIcon = Icon.getImageSourceSync('home', 35, colors.default.HOMECARD_BG);
const playIcon = Icon.getImageSourceSync('md-arrow-back', 24, 'white');
const profileIcon = Icon.getImageSourceSync('cog', 35, colors.default.HOMECARD_BG);

var data = require('./store/data');

Navigation.events().registerAppLaunchedListener(() => {
  if (data.isLoggedIn) {
    setMainRoot();
  } else {
    setLoginRoot();
  }
});

function setLoginRoot() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'LoginScreen'
            }
          }
        ]
      }
    }
  })
}

function setMainRoot() {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Ana Sayfa'
            }
          }
        ]
      },
      bottomTabs: {
        id: 'BOTTOM_TABS_LAYOUT',
        options: {
          bottomTabs: {
            backgroundColor: colors.default.HEADER_BG
          }
        },
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
  })
}

App.options = {
    topBar: {
      title: {
        text: "Quiz",
        color: colors.default.QUIZ_TEXT,
      },
      background: {
        color: colors.default.HEADER_BG
      }
    }
}

ProfileScreen.options = {
  topBar: {
    title: {
      text: "Settings",
      color: colors.default.QUIZ_TEXT,
    },
    background: {
      color: colors.default.HEADER_BG
    }
  }
}

LoginScreen.options = {
  topBar: {
    title: {
      text: "Quizzy",
      color: colors.default.QUIZ_TEXT,
    },
    background: {
      color: colors.default.HEADER_BG
    }
  }
}

module.exports = setMainRoot;