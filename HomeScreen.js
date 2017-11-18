import React, {Component} from 'react';
import { Text, View, Picker } from 'react-native';
import {languagesDict, languagesArray} from './const.js'

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {inputLang: 'en', outputLang: 'ko'};
  }
  static navigationOptions = {
    header: null
  }
  handlePress = () => {
    this.props.navigation.navigate('Camera',
    {inputLang: this.state.inputLang,
      outputLang: this.state.outputLang});
  }
  render() {
    const {state} = this.props.navigation;
    return (
      <View>
        <Text>Hi, there!</Text>
        <Text>I speak {languagesDict[this.state.inputLang]}</Text>
        <Text>I am learning {languagesDict[this.state.outputLang]}</Text>
        <Picker
            selectedValue={this.state.inputLang}
            onValueChange={(item, index) => this.setState({inputLang: item})}>
            {languagesArray.map((languageObject, index) => (
              <Picker.Item key={index} label={languageObject.lbl} value={languageObject.val} />
            ))}
          </Picker>
          <Picker
              selectedValue={this.state.outputLang}
              onValueChange={(item, index) => this.setState({outputLang: item})}>
              {languagesArray.map((languageObject, index) => (
                <Picker.Item key={index} label={languageObject.lbl} value={languageObject.val} />
              ))}
            </Picker>
        <Text onPress={this.handlePress}>Begin</Text>
      </View>
    )
  }
}
