import React, {Component} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default class HomeScreen extends Component {
  handlePress = () => {
    this.props.navigation.navigate('Camera');
  }
  render() {
    return (
      <View>
        <Text>I am an English speaker, learning Korean.</Text>
        <Text onPress={this.handlePress}>Begin</Text>
      </View>
    )
  }
}
