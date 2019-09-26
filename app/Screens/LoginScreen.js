
import React, { Component } from "react";
import { Input } from '../Components/Input';
import { Button } from '../Components/Button';
import { firebaseAuth } from '../Components/Firebase';
import {
  View,
  Text,
  StyleSheet,
  Alert,

} from "react-native";

class LoginScreen extends Component {

  state = {
    email: '',
    password: '',
    authenticating: false,
    user: null,
    error: '',
  }

  static navigationOptions = {
    header: null
  }

  /**
   * Sends the user email and password to firebase authentication function.
   */

  loginPressed = () => {
    this.login(this.state.email, this.state.password)
  }

  /**
   * Confirms with firebase authentication whether the users email and password match.
   * Returns an alery if there is an error with authenticating.
   * @param {*} email 
   * @param {*} pass 
   */

  async login(email, pass) {
    try {
      await firebaseAuth.signInWithEmailAndPassword(email + '@niran.com', pass);
      Alert.alert("Successful log in")
      this.props.navigation.navigate("Tabs")

    } catch (error) {
      Alert.alert(error.toString())
    }
  }

  /**
   * Handles most of the rendering functtionality allowing the user to input the username and password.
   * This username and password is then taken to firebase auth service to check whther they can.
   * Naviage into the application successfully. 
   */

  renderCurrentState() {
    return (
      <View style={styles.form}>
        <Input
          placeholder='Enter your username...'
          label='Username'
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Input
          placeholder='Enter your password...'
          label='Password'
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />

        <Button onPress={this.loginPressed}>Login</Button>
        <Button onPress={() => this.props.navigation.navigate('Home')}>Home</Button>
        <Text>{this.state.error}</Text>
      </View>
    )
  }

  /**
   * Renders the current states
   */

  render() {
    return (
      <View style={styles.container}>
        {this.renderCurrentState()}
      </View>
    );
  }
}
export default LoginScreen;

/**
 * Style sheet for styling various components within the page
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  form: {
    flex: 1
  }
});