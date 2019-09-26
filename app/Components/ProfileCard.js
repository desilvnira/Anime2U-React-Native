import React, { Component } from 'react'
import { Card, Icon } from 'react-native-elements'
import { firebaseAuth } from '../Components/Firebase';
import {
  Image,
  ImageBackground,
  Linking,
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native'
import { Button } from './Button';

const ProfileCard = ({name, city, country, favAnime}) => {
    return (
    <Card containerStyle={styles.cardContainer}>
        {this.renderHeader(name, city, country, favAnime)}
    </Card>
        
      
    )
  }


  renderHeader = (name, city, country, favAnime) => {
    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{
            uri: 'https://images2.alphacoders.com/564/thumb-1920-564835.jpg'}}
            >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source=
                {{uri: 'http://www.wallpapermaiden.com/image/2019/04/21/demon-slayer-kimetsu-no-yaiba-kamado-tanjuurou-mask-32384-resized.png'}}
              
            />
            <Text style={styles.userNameText}>{name}</Text>
            <View style={styles.userAddressRow}>
              <View>
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {city}, {country}
                </Text>
                <Text style={styles.userCityText}>
                  Favourite Anime: {favAnime}
                </Text>
                <Text>  </Text>
                
                
              </View>
              
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }

const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: '#FFF',
      borderWidth: 0,
      flex: 1,
      margin: 0,
      padding: 0,
    },
    container: {
      flex: 1,
    },
    emailContainer: {
      backgroundColor: '#FFF',
      flex: 1,
      paddingTop: 30,
    },
    headerBackgroundImage: {
      paddingBottom: 20,
      paddingTop: 35,
    },
    headerContainer: {},
    headerColumn: {
      backgroundColor: 'transparent',
      ...Platform.select({
        ios: {
          alignItems: 'center',
          elevation: 1,
          marginTop: -1,
        },
        android: {
          alignItems: 'center',
        },
      }),
    },
    placeIcon: {
      color: 'white',
      fontSize: 26,
    },
    scroll: {
      backgroundColor: '#FFF',
    },
    telContainer: {
      backgroundColor: '#FFF',
      flex: 1,
      paddingTop: 30,
    },
    userAddressRow: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    userCityRow: {
      backgroundColor: 'transparent',
    },
    userCityText: {
      color: '#A5A5A5',
      fontSize: 15,
      fontWeight: '600',
      textAlign: 'center',
    },
    userImage: {
      borderRadius: 85,
      borderWidth: 3,
      height: 170,
      marginBottom: 15,
      width: 170,
    },
    userNameText: {
      color: '#FFF',
      fontSize: 22,
      fontWeight: 'bold',
      paddingBottom: 8,
      textAlign: 'center',
    },
  })
  export { ProfileCard };