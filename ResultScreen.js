import React, {Component} from 'react';
import {Text, View} from 'react-native';

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

export default class ResultScreen extends Component {
  static navigationOptions = {
    title: 'Translation Result'
  }

  constructor() {
    super()
    this.state = {
      json: 0,
    }
  }

  render() {
    //let rawjason = translate();
    const {state} = this.props.navigation;
    let dataArr = state.params.data;
    let topResult = dataArr[0].class;

    console.log(this.state.json);

    return(
      <View>
        <Text>{topResult}      |       translated</Text>
      </View>
    )

    /*return(
      <View>
        {sortedData.map((obj, index) => (
          <Text key={index}>{obj.class}, {obj.score}</Text>
        ))}
      </View>
    )*/
  }
}
