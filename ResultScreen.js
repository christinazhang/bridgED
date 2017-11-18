import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {languagesDict, languagesArray} from './const.js'

// ResultScreen is given the IBM Watson result from the picture as an array in
// the following format:

/* Array [
        Object {
          "class": "ginger ale",
          "score": 0.958,
          "type_hierarchy": "/food/beverage/soft drink/ginger ale",
        },
        Object {
          "class": "soft drink",
          "score": 0.959,
        },
        Object {
          "class": "beverage",
          "score": 0.959,
        },
        Object {
          "class": "food",
          "score": 0.959,
        },
        Object {
          "class": "bottle green color",
          "score": 1,
        },
      ]
*/

// You can access the parameters: this.props.navigation.state.params.data
// To keep it less verbose, see below
// For Input/Output languages:
// this.props.navigation.state.params.inputLang

export default class ResultScreen extends Component {
  static navigationOptions = {
    title: 'Translation Result'
  }
  render() {
    const {state} = this.props.navigation;
    return(
      <View>
        {state.params.data.map((obj, index) => (
          <Text key={index}>{obj.class}, {obj.score}</Text>
        ))}
      </View>
    )
  }
}
