import React from 'react';
import { View, StyleSheet, Text, Button, Image } from 'react-native';
import { Icon, SearchBar, Card, Divider } from 'react-native-elements'

const NewsCard = ({title, imageUrl, startDate, episodes, score, people, type}) => {
  return (
    
    <Card          
      title={title}
      image={imageUrl}>
      <Text style={{marginBottom: 10}}>
          Commences: {startDate}
      </Text>
      <Text>
          Episodes: {episodes}
      </Text>
      <Text>
          Score: {score}
      </Text>
      <Text>
          People Watching: {people}
      </Text>
      <Text style={{marginBottom: 10}}>
          Type: {type}
      </Text>
      <Divider></Divider>
      </Card>
      
    
  )
}

const styles = StyleSheet.create({
  
});

export { NewsCard };