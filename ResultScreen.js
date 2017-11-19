import React, {Component} from 'react';
import {Text, ScrollView, View, Image, StyleSheet, Dimensions} from 'react-native';
import {languagesDict, languagesArray, ResultTitle} from './const.js'

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
    this.state = {translation: '', img: '', blurb: ''}
  }
  static navigationOptions = ({navigation}) => (
    {
      title: ResultTitle[navigation.state.params.inputLang]
    }
  );

  async componentWillMount() {
    const {params} = this.props.navigation.state;
    let t = params.data[0].class;
    let translationURL = 'https://gateway.watsonplatform.net/language-translator/api/v2/translate?source=' + params.inputLang + '&target=' + params.outputLang + '&text=' + t
    let translation = await fetch(translationURL, {
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
    let delimited = t.split(' ').join('%20');
    let blurbURL = 'https://' + params.inputLang + '.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&redirects=1&titles='
    + delimited;
    let blurbData = await fetch(blurbURL, {method: 'get'})
      .then(response => (JSON.parse(response._bodyInit).query.pages))
      .catch(err => {console.log(err)});
    let id = Object.keys(blurbData)[0];
    let blurb = blurbData[id].extract;
    this.setState({blurb: blurb, translation: translation})
  }

  render() {
    const {params} = this.props.navigation.state;

    let inputResult = params.data[0].class;
    let uriMe = params.uri;

    return(
      <ScrollView style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row',
           backgroundColor: '#A9F7EB',
           alignItems: 'center',
         paddingTop: 10,
       paddingBottom: 10}}>
          <View style={{flexDirection: 'column',
                      alignItems: 'flex-end',
                      margin: 10,
                      width: ((Dimensions.get('window').width - 30) / 3)}}>
            <Text>{params.outputLang.toUpperCase()}</Text>
            <Text style={styles.titleTextRight}>{this.state.translation}</Text>
          </View>
          <View style={{backgroundColor: '#222', width: 3,
            height: 120}}></View>
          <View style={{flexDirection: 'column',
          width: ((Dimensions.get('window').width - 30) / 3)*2, margin: 10}}>
            <Text>{params.inputLang.toUpperCase()}</Text>
            <Text style={styles.titleText}>{inputResult}</Text>
          </View>
        </View>
        <Image
          style={styles.image}
          source={{uri:uriMe}}
        />
        <Text style={{margin: 10}}>{this.state.blurb}</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  image: {
    width: Dimensions.get('window').width - 50,
    height: 200,
    margin: 25
  },
  titleText: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  titleTextRight: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'right'
  },
});
