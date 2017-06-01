import Expo from 'expo';
import React from 'react';
import {
  View,
  AsyncStorage,
} from 'react-native';
import SignUp from './SignUp';
import Content from './Content';
import { StackNavigator } from 'react-navigation';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Sign Up',
  };

  componentWillMount() {
    AsyncStorage.getItem('token').then((token) => {
      this.props.navigation.navigate('Content');
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <SignUp navigate={this.props.navigation.navigate} />
      </View>
    );
  }
}

const App = StackNavigator({
  Home: { screen: Home },
  Content: { screen: Content },
});

Expo.registerRootComponent(App);
