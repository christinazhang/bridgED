import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import { StackNavigator } from 'react-navigation';

let API_KEY = "***REMOVED***";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Take Photo'
  }
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      let photoURI = await photo.uri;
      let formdata = new FormData();

      formdata.append('image', {
        uri: photoURI,
        type: 'image/jpg',
        name: 'image.jpg',
      });

      let url = 'https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=' + API_KEY + '&version=2016-05-20';
      let data = await fetch(url, {
          method: 'post',
          headers: {
            "Accept": "application/json",
            "Accept-Language": "en",
            "Content-Type": "multipart/form-data"
          },
          body: formdata
        }).then(response => {
          return response;
        }).catch(err => {
          console.log(err)
        })
      let rawjson = await data.json();
      console.log(rawjson.images[0]);
      return rawjson.images[0];
    }
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
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={this.snap}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Snap{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

export default StackNavigator({
  Home: {
    screen: HomeScreen
  }
});
