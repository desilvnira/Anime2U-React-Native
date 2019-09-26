import * as firebase from "firebase";
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

class RegisterScreen extends Component {

  state = {
    email: '',
    password: '',
    confirmPassword: '',
    favAnime: '',
    city: '',
    country: '',
    authenticating: false,
    user: null,
    error: '',
  }

  static navigationOptions = {
    header: null
  }

  /**
   * Uses firebase authentication servive to register a user using their email and password.
   * Also sends a few personal information parameters to firebase for later personalization,
   * on the profile tab inside the application.
   * @param {*} email 
   * @param {*} favAnime 
   * @param {*} city 
   * @param {*} country 
   * @param {*} pass 
   */

  async signup(email, favAnime, city, country, pass) {

    if (this.state.password != this.state.confirmPassword) {
      Alert.alert('Passwords do not match, try again')
      return
    }
    try {
      await firebaseAuth.createUserWithEmailAndPassword(email + '@niran.com', pass)
      let userMobilePath = "/users/" + email;

      firebase.database().ref(userMobilePath).set({
        username: email,
        favAnime: favAnime,
        city: city,
        country: country
      })
      Alert.alert("Account creation succssfull");
      this.props.navigation.navigate('Tabs')

    } catch (error) {
      Alert.alert(error.toString())
    }

  }

  /**
   * Sends the user relevant states to signup function.
   * Also sends some personl information through for personalization.
   */

  registerPressed = () => {
    this.signup(this.state.email, this.state.favAnime, this.state.city, this.state.country, this.state.password)
  }

  /**
   * Takes care of tmost of the redner functionality.
   * Gives the user a place to put in their personal information ino order to register themselves.
   * Into the app.
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
        <Input
          placeholder='Enter your password...'
          label='Confirm Password'
          secureTextEntry
          onChangeText={confirmPassword => this.setState({ confirmPassword })}
          value={this.state.confirmPassword}
        />
        <Input
          placeholder='Enter Your City...'
          label='City'
          onChangeText={city => this.setState({ city })}
          value={this.state.city}
        />
        <Input
          placeholder='Enter Your Country...'
          label='Country'
          onChangeText={country => this.setState({ country })}
          value={this.state.country}
        />
        <Input
          placeholder='Enter Your Favourite Anime...'
          label='Favourite Anime'
          onChangeText={favAnime => this.setState({ favAnime })}
          value={this.state.favAnime}
        />
        <Button onPress={this.registerPressed}>Register</Button>
        <Button onPress={() => this.props.navigation.navigate('Home')}>Home</Button>
        <Text>{this.state.error}</Text>
      </View>
    )
  }

  /**
   * Renders the current state 
   */

  render() {
    return (
      <View style={styles.container}>
        {this.renderCurrentState()}
      </View>
    );
  }
}
export default RegisterScreen;

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