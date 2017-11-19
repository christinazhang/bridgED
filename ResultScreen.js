import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {languagesDict, languagesArray} from './const.js'
import {ResultTitle} from './const'

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
  constructor() {
    super();
    this.state = {translation: ''}
  }
  static navigationOptions = ({navigation}) => (
    {
      title: ResultTitle[navigation.state.params.inputLang]
    }
  );

  async componentWillMount() {
    const {params} = this.props.navigation.state;
    let t = params.data[0].class;
    let url = 'https://gateway.watsonplatform.net/language-translator/api/v2/translate?source=' + params.inputLang + '&target=' + params.outputLang + '&text=' + t
    let translation = await fetch(url, {
        method: 'get',
        headers: {
          'Authorization': 'Basic OTBhZDViNjgtZjU5YS00NzQxLTg2NGQtYmVlOGE0ZjYzZjcxOmxseW83aDdueEttNQ=='
        },
        text: t
      }).then(response => {
        return response._bodyInit;
      }).catch(err => {
        console.log(err)
      })
      console.log(translation);
      this.setState({translation: translation})
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
