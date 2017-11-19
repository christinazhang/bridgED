import React, {Component} from 'react';
import { Text, View, Picker } from 'react-native';
import {speakArray, chooseArray} from './const.js'

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {inputLang: 'en', outputLang: 'ko'};
  }
  static navigationOptions = {
    header: null
  }
  handlePressNext = () => {
    this.props.navigation.navigate('Camera',
    {inputLang: this.state.inputLang,
      outputLang: this.state.outputLang});
  }
  render() {
    const {state} = this.props.navigation;
    return (
      <View>
        <Picker
            selectedValue={this.state.inputLang}
            onValueChange={(item, index) => this.setState({inputLang: item})}>
            {speakArray.map((languageObject, index) => (
              <Picker.Item key={index} label={languageObject.lbl} value={languageObject.val} />
            ))}
          </Picker>
          <Picker
            selectedValue={this.state.outputLang}
            onValueChange={(item, index) => this.setState({outputLang: item})}>
            {chooseArray[this.state.inputLang].map((languageObject, index) => (
              <Picker.Item key={index} label={languageObject.lbl} value={languageObject.val} />
            ))}
          </Picker>
        <Text onPress={this.handlePressNext}>Next</Text>
      </View>
    )
  }
}
