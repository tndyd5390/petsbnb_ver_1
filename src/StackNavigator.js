import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Explore from './screens/Explore';
import Saved from './screens/Saved';
import Trips from './screens/Trips';
import Inbox from './screens/Inbox';
import Profile from './screens/Profile';
import TabNavigator from './TabNavigator'

export default createStackNavigator({
    main : {
        screen : TabNavigator,
        navigationOptions : {
          header : null
        }
      },
      saved : {
        screen : Saved,
        navigationOptions : {
          
        }
      }
})
