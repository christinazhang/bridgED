import React, {Component} from 'react';
import { Image, View, Picker, TouchableOpacity } from 'react-native';
import {speakArray, chooseArray} from './const.js'

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {inputLang: 'en', outputLang: 'en'};
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
      <View style={{flexDirection: 'column', justifyContent: 'center'}}>
        <Picker
            selectedValue={this.state.inputLang}
            onValueChange={(item, index) => this.setState({inputLang: item, outputLang: chooseArray[item][0].val})}>
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
          <TouchableOpacity style={{alignSelf:'center'}} onPress={this.handlePressNext} >
            <Image style={{height: 70, width: 70}} source={require('./assets/img/Camera.png')}/>
          </TouchableOpacity>
      </View>
    )
  }
}
