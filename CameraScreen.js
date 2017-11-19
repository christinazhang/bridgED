import React, {Component} from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera, Permissions } from 'expo';
import {CameraTitle} from './const'

let API_KEY = "***REMOVED***";

export default class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    };
  }

  static navigationOptions = ({navigation}) => (
    {
      title: CameraTitle[navigation.state.params.inputLang]
    }
  );

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  processImage = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      let photoURI = await photo.uri;
      let formdata = new FormData();

      formdata.append('image', {
        uri: photoURI,
        type: 'image/jpg',
        name: 'image.jpg',
        threshold: 0.7,
      });

      let url = 'https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=' + API_KEY + '&version=2016-05-20';
      let data = await fetch(url, {
          method: 'post',
          headers: {
            "Accept": "application/json",
            "Accept-Language": this.props.navigation.state.params.inputLang,
            "Content-Type": "multipart/form-data"
          },
          body: formdata
        }).then(response => {
          return response;
        }).catch(err => {
          console.log(err)
        })
      let rawjson = await data.json();
      //console.log(rawjson.images[0]);
      return rawjson.images[0].classifiers[0].classes;
    }
  }

  snap = async () => {
    let data = await this.processImage();
    this.props.navigation.navigate('Result', {data: data,
      inputLang: this.props.navigation.state.params.inputLang,
    outputLang: this.props.navigation.state.params.outputLang})
  }

  async translate() {
    const {state} = this.props.navigation;
    let dataArr = state.params.data;

    let topResult = dataArr[0].class;
    let formdata = new FormData();
    let modelID = 'en-de';

    formdata.append('image', {
      text: topResult,
      model_id: modelID,
    });

    let url = 'https://gateway.watsonplatform.net/language-translator/api/v2/translate';
    let data = await fetch(url, {
        method: 'post',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: formdata
      }).then(response => {
        return response;
      }).catch(err => {
        console.log(err)
      })
    let rawjson = await data.json();
    console.log(rawjason);
    this.state.json = rawjson;
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref = {ref=>{this.camera = ref;}}
            style={{ flex: 1 }}
            type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Image
                  source={require('./assets/img/Flip.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={this.snap}>
                <Image
                  source={require('./assets/img/Snap.png')}
                />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
