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
      uri: '',
      picture: false
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
      this.setState({uri: photoURI});
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
    this.setState({picture: !this.state.picture});
    this.props.navigation.navigate('Result', {data: data,
      uri: this.state.uri,
      inputLang: this.props.navigation.state.params.inputLang,
    outputLang: this.props.navigation.state.params.outputLang});
  }

  test = () => {
      this.setState({picture: !this.state.picture});
      this.snap();
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
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end'
                  }}
                  onPress={() => {
                    this.setState({
                      type: this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                    });
                  }}>
                  <Image
                    style={{margin: 16, height: 38, width: 45}}
                    source={require('./assets/img/Flip.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                  }}
                  onPress={() => (!this.state.picture && this.test())}>
                  <Image
                    style={{margin: 16, height: 60, width: 60}}
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
