// Modules
import React, {Component} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import { StackNavigator } from 'react-navigation';

// Import Screens here
import CameraScreen from './CameraScreen';
import ResultScreen from './ResultScreen';

export default StackNavigator({
  Camera: {
    screen: CameraScreen
  },
  Result: {
    screen: ResultScreen
  }
});
