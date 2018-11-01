import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Explore from './screens/Explore';
import Saved from './screens/Saved';
import Trips from './screens/Trips';
import Inbox from './screens/Inbox';
import Profile from './screens/Profile';

export default createBottomTabNavigator({
  Explore : {
    screen : Explore,
    navigationOptions : {
      tabBarLabel : 'EXPLORE',
      tabBarIcon : ({tintColor}) => (
        //<Image source={require('./img/img.png')} style={{height : 24, width : 24, tintColor : tintColor}}/>
        <Icon name='ios-search' color={tintColor} size={24}/>
      )
    }
  },
  Saved : {
    screen : Saved,
    navigationOptions : {
      tabBarLabel : 'SAVED',
      tabBarIcon : ({tintColor}) => (
        <Icon name='ios-heart' color={tintColor} size={24}/>
      )
    }
  },
  Trips : {
    screen : Trips,
    navigationOptions : {
      tabBarLabel : 'Trips',
      tabBarIcon : ({tintColor}) => (
        <Image source={require('./img/img.png')} style={{height : 24, width : 24, tintColor : tintColor}}/>
      )
    }
  },
  Inbox : {
    screen : Inbox,
    navigationOptions : {
      tabBarLabel : 'Inbox',
      tabBarIcon : ({tintColor}) => (
        <Icon name='ios-chatboxes' color={tintColor} size={24}/>
      )
    }
  },
  Profile : {
    screen : Profile,
    navigationOptions : {
      tabBarLabel : 'PROFILE',
      tabBarIcon : ({tintColor}) => (
        <Icon name='ios-heart' color={tintColor} size={24}/>
      )
    }
  },
},
{
  tabBarOptions : {
    activeTintColor : 'red',
    inactiveTintColor : 'grey',
    style : {
      //backgroundColor : 'white',
      borderTopWidth : 0,
      shadowOffset : {width : 5, height : 3},
      shadowColor : 'black',
      shadowOpacity : 0.5,
      elevation : 5
    }
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});
