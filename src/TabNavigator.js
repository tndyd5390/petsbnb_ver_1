import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TouchableHighlight, Button} from 'react-native';
import {createBottomTabNavigator, BottomTabBar,withNavigation,createStackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Explore from './screens/Explore';
import Reservation from './screens/Reservation';
import Colors from './utils/Colors';
import Chat from './screens/chat/Chat';
import ChatRoom from './screens/chat/ChatRoom';
import BookingDetail from './screens/booking/BookingDetail';
import BookingDetails from './screens/booking/BookingDetails';
import BookingDate from './screens/booking/BookingDate';
import ProfileMenu from './screens/profile/ProfileMenu';
import ProfileStackNavigator from './screens/profile/ProfileStackNavigator';


export default class TabNavigator extends Component {
  render(){
    const Tabs = createBottomTabNavigator({
      Explore : {
        screen : BookingStacks,
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
        screen : ChatStacks,
        navigationOptions : {
          tabBarLabel : '대화하기',
          tabBarIcon : ({tintColor}) => (
            <IconFontAwesome name='comments' color={tintColor} size={24}/>
          )
        }
      },
      Profile : {
        screen : props => <ProfileStackNavigator {...props} rootStack={this.props.navigation}/>,
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
      navigationOptions : {
        tabBarVisible : true
      },
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

    return(<Tabs/>);

  }
} 

const BookingStacks = createStackNavigator({
    Explore : {
      screen : Explore,
      navigationOptions : {

      }
    },
    BookingDetail :{
        screen : BookingDetail,
        navigationOptions : {

        }
    },
    BookingDate :{
      screen : BookingDate,
      navigationOptions : {
        title : '예약 날짜',
        headerTitleStyle: {
          width: '75%',
          textAlign: 'center',
      },
    }
  },
    BookingDetails :{
      screen : BookingDetails,
      navigationOptions : {
        title : '예약 세부사항',
        headerTitleStyle: {
          width: '75%',
          textAlign: 'center',
      },
    }
  },
},
{
  initialRouteName: 'Explore'
});

BookingStacks.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};


const ChatStacks = createStackNavigator({ 
  Chat : {
      screen : Chat,
      navigationOptions : {
          header : null
      }
  },
  ChatRoom : {
      screen : ChatRoom,
      navigationOptions : {
          headerTitleStyle: {
              width: '75%',
              textAlign: 'center',
          },
      }
  },
},
{
  initialRouteName: 'Chat',
  navigationOptions: {
    headerStyle: {
      backgroundColor: Colors.buttonSky,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

ChatStacks.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
