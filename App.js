// Modules
import React, {Component} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import { StackNavigator } from 'react-navigation';

// Import Screens here
import HomeScreen from './HomeScreen';
import CameraScreen from './CameraScreen';
import ResultScreen from './ResultScreen';

export default StackNavigator({
  Home: {
    screen: HomeScreen
  },
  Camera: {
    screen: CameraScreen
  },
  Result: {
    screen: ResultScreen
  }
});
