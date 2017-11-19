import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
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
    this.state = {translation: '', img: ''}
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
      this.setState({translation: translation});
/*
      let str = params.data[0].class;

      let api = "AIzaSyBVVbxDT9RAFGv6gj-emTS7HD9lbWN50mQ";
      url = "https://www.googleapis.com/customsearch/v1?key=" + api + "&cx=015596321862413156668:gxgkobpaaoq&q=" + str.replace("//g", "%20");
      let data = await fetch(url);
      let rawjson = await data.json();

      console.log(rawjson);
      this.setState({img:rawjson});*/
  }

  render() {
    const {params} = this.props.navigation.state;

    let str = params.data[0].class;
    let uriMe = params.uri;

    return(
      <View>
        <Text>{params.outputLang}  |  {params.inputLang}</Text>
        <Text>{this.state.translation} | {str}</Text>
        <Image
          style={{width: 250, height: 250}}
          source={{uri:uriMe}}
        />
      </View>
    )
  }
}
