import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import RegisterScreen from './app/Screens/RegisterScreen';
import HomeScreen from './app/Screens/HomeScreen';
import LoginScreen from './app/Screens/LoginScreen';
import Tabs from './app/Screens/Tabs';
import Watching from './app/Screens/Watching';
import Completed from './app/Screens/Completed';
import YetToWatch from './app/Screens/YetToWatch';
console.disableYellowBox = true;

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Register: {screen: RegisterScreen},
  Login: {screen: LoginScreen},
  Tabs: {screen: Tabs},
  Watching: {screen: Watching},
  Completed: {screen: Completed},
  YetToWatch: {screen: YetToWatch}
});

const App = createAppContainer(MainNavigator);

export default App; 