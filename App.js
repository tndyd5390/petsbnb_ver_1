import React, {Component} from 'react';
import StackNavigator from './src/StackNavigator';
import {AsyncStorage} from 'react-native';
export default class App extends Component {
  render() {
    return(
      <StackNavigator/>
    );  
  }
}