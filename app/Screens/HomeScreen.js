import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    ImageBackground, 
    Image, 
    TouchableOpacity, 
    Alert
} from "react-native";

class HomeScreen extends Component {

    static navigationOptions = {
      header: null
    }

    /**
     * Navigates to the register page when button is pressed
     */
    registerPressed = ()=>{
        this.props.navigation.navigate('Register')
    }
    
    /**
     * Navigates to the login page when button is pressed
     */
    loginPressed = ()=> {
        this.props.navigation.navigate('Login')
        // Alert.alert("Completed Login!")
    }

    /**
     * Renders a nice looking home page with a textured background and a logo with app name.
     * Lets user choose if they want to navigate to the login or register page.
     */

    render() {
        return (
          <ImageBackground
            source={{uri: 'http://210.211.97.114:84/appimages/images/contents/d/r/drop-shadow-effect-gray-texture-background-vector0.jpg'}}
            style={styles.background}
          >
            <View>
              <Image
                source={{uri: 'https://seeklogo.com/images/S/sharingan-logo-4F6C263C67-seeklogo.com.png'}}
                style={styles.logo}
                resizeMode="contain"
              >
              </Image>
              <Text style={styles.text}>Welcome to Anime2U</Text>
              <TouchableOpacity 
                onPress={this.registerPressed}
              >
                <Text style={styles.signup}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.loginPressed}
              >
                <Text style={styles.login}>Log In</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        );
    }
}
export default HomeScreen;

/**
 * Style sheet for styling various components within the page
 */

const styles = StyleSheet.create({
    background: {
      width: '100%',
      height: '100%'
    },
    logo:{
      width: 280,
      height: 280,
      marginLeft: '15%',
      marginTop: '10%'
    },
    text: {
      color: 'white',
      marginTop: '-10%',
      marginLeft: '25%',
      fontSize:  22,
    },
    signup: {
      backgroundColor: 'white',
      color: '#3A59FF',
      width: "75%",
      borderRadius: 25,
      textAlign: 'center',
      fontWeight: 'bold',
      marginLeft: '11%',
      padding: "2%",
      fontSize:  27,
      marginTop: '40%'
    },
    login: {
      backgroundColor: '#3A59FF',
      color: 'white',
      width: "75%",
      borderRadius: 25,
      textAlign: 'center',
      fontWeight: 'bold',
      marginLeft: '11%',
      padding: "2%",
      fontSize:  27,
      marginTop: '5%'
    }
});