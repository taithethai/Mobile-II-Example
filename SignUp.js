import Expo from 'expo';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native';
import axios from 'axios';
import { NativeRouter, Route, Link } from 'react-router-native';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.signUp = this.signUp.bind(this);
  }

  signUp() {
    const promise = axios.post('https://mobile-server-ii.herokuapp.com/users', {
      email: this.state.email,
      password: this.state.password,
    });
    promise.then((response) => {
      if (response.data.code === 11000) {
        return this.setState({
          error: 'Email already taken',
        });
      }
      AsyncStorage.setItem('token', response.data.token).then(() => {
        this.props.navigate('Test');
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign In</Text>
        <Text>{this.state.error && this.state.error.length ? this.state.error : null}</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
        />
        <Button
          title="Submit"
          onPress={this.signUp}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default SignUp;
