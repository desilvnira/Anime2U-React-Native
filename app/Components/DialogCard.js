import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { Icon, SearchBar, Card, Divider } from 'react-native-elements'

const DialogCard = ({title, imageUrl, description, episodes, score, type}) => {
  return (
    
    <Card          
      title={title}
      image={{uri:imageUrl}}>
      <Text style={{marginBottom: 10}}>
          {description}
      </Text>
      <Text>
          Episodes: {episodes}
      </Text>
      <Text>
          Score: {score}
      </Text>
      <Text style={{marginBottom: 10}}>
          Type: {type}
      </Text>
      </Card>
      
    
  )
}

const styles = StyleSheet.create({
  
});

export { DialogCard };