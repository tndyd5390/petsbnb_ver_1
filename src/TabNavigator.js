import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Explore from './screens/Explore';
import Saved from './screens/Saved';
import Trips from './screens/Trips';
import Profile from './screens/Profile';
import Colors from './utils/Colors';

export default createBottomTabNavigator({
  Explore : {
    screen : Explore,
    navigationOptions : {
      tabBarLabel : '검색하기',
      tabBarIcon : ({tintColor}) => (
        //<Image source={require('./img/img.png')} style={{height : 24, width : 24, tintColor : tintColor}}/>
        <Icon name='ios-search' color={tintColor} size={24}/>
      )
    }
  },
  Saved : {
    screen : Saved,
    navigationOptions : {
      tabBarLabel : '예약보기',
      tabBarIcon : ({tintColor}) => (
        <IconFontAwesome name='calendar' color={tintColor} size={24}/>
      )
    }
  },
  Trips : {
    screen : Trips,
    navigationOptions : {
      tabBarLabel : '대화하기',
      tabBarIcon : ({tintColor}) => (
        <IconFontAwesome name='comments' color={tintColor} size={24}/>
      )
    }
  },
  Profile : {
    screen : Profile,
    navigationOptions : {
      tabBarLabel : '프로필',
      tabBarIcon : ({tintColor}) => (
        <IconFontAwesome name='user' color={tintColor} size={24}/>
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
      backgroundColor : Colors.bottomNavigatorGrey,
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
