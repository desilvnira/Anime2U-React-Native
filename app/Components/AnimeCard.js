import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { Icon, SearchBar, Card, Divider } from 'react-native-elements'

const AnimeCard = ({title, imageUrl, description, episodes, score, type}) => {
  return (
    
    <Card          
      title={title}
      image={imageUrl}>
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
      <Divider></Divider>
      <Button
          icon={<Icon name='code' color='#ffffff' />}
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='Add To List' />
      </Card>
      
    
  )
}

const styles = StyleSheet.create({
  
});

export { AnimeCard };