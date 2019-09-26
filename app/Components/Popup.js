import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon, SearchBar, Tile, Header, ListItem, Overlay} from 'react-native-elements'
import { ScrollView } from "react-native-gesture-handler";
import RNPickerSelect from 'react-native-picker-select';
const Popup = () => {
  return (
    <Overlay
      isVisible={this.state.isVisible}
      windowBackgroundColor="rgba(255, 255, 255, .5)"
      overlayBackgroundColor="red"
      width="auto"
      height="auto"
    >
      <Text>Hello from Overlay!</Text>
      <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
            ]}
        />
    </Overlay>
  )
}


export { Popup };