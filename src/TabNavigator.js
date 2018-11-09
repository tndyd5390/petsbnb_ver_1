import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import {createBottomTabNavigator, withNavigation} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Explore from './screens/Explore';
import Reservation from './screens/Reservation';
import ChatStackNavigator from './ChatStackNavigator';
import Colors from './utils/Colors';
import ProfileStackNavigator from './ProfileStackNavigator';


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
  Reservation : {
    screen : Reservation,
    navigationOptions : {
      tabBarLabel : '예약보기',
      tabBarIcon : ({tintColor}) => (
        <IconFontAwesome name='calendar' color={tintColor} size={24}/>
      )
    }
  },
  Chat : {
    screen : ChatStackNavigator,
    navigationOptions : {
      tabBarLabel : '대화하기',
      tabBarIcon : ({tintColor}) => (
        <IconFontAwesome name='comments' color={tintColor} size={24}/>
      )
    }
  },
  Profile : {
    screen : ProfileStackNavigator,
    navigationOptions : {
      tabBarLabel : '프로필',
      tabBarIcon : ({tintColor}) => (
        <IconFontAwesome name='user' color={tintColor} size={24}/>
      )
    }
  },
},
{
  
  tabBarPosition : 'bottom',
  tabBarOptions : {
    activeTintColor : 'red',
    inactiveTintColor : 'grey',
    style : {
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
