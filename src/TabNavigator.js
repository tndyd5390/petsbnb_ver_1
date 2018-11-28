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
import ProfileMenu from './screens/profile/ProfileMenu';
import CheckPassword from './screens/profile/CheckPassword';
import ProfileUserUpdate from './screens/profile/ProfileUserUpdate';
import PetList from './screens/profile/PetList';
import PetRegView from './screens/profile/PetRegView';
import PetUpdateView from './screens/profile/PetUpdateView';
import PetSitterApplyForm from './screens/petSitter/PetSitterApplyForm';
import StackNavigator from './StackNavigator';
import CustomerCenter from './screens/profile/CustomerCenter';

export default class TabNavigator extends Component {
  render(){
    const ProfileStackNavigator = createStackNavigator({
      ProfileMenu : {
          screen : props => <ProfileMenu {...props} rootStack={this.props.navigation}/>,
          navigationOptions : {
              header : null
          }
      },
      CheckPassword : {
          screen : CheckPassword,
          navigationOptions : {
              title: '비밀번호 확인',
              headerTitleStyle: {
                  width: '75%',
                  textAlign: 'center',
              },
          }
      },
      ProfileUserUpdate : {
          screen : ProfileUserUpdate,
          navigationOptions : {
              title: '회원정보',
              headerTitleStyle: {
                  width: '75%',
                  textAlign: 'center',
              },
          }
      },
      PetRegView : {
          screen : PetRegView,
          navigationOptions : {
              title: '반려동물 등록',
              headerTitleStyle: {
                  width: '75%',
                  textAlign: 'center',
              },
          }
      },
      PetList : {
          screen : PetList,
          navigationOptions : {
              title: '반려동물 관리',
              headerTitleStyle: {
                  width: '75%',
                  textAlign: 'center',
              }
          }
      },
      PetUpdateView : {
          screen : PetUpdateView,
          navigationOptions : {
              title: '반려동물 상세',
              headerTitleStyle: {
                  width: '75%',
                  textAlign: 'center',
              }
          }
      },
      PetSitterApplyForm : {
          screen : PetSitterApplyForm,
          navigationOptions : {
              title: '펫시터 지원',
              headerTitleStyle: {
                  width: '75%',
                  textAlign: 'center',
              }
          }
      },
      CustomerCenter : {
        screen : CustomerCenter,
        navigationOptions : {
            title: '고객 센터',
            headerTitleStyle: {
                width: '75%',
                textAlign: 'center',
            }
        }
    }
    })
    
    ProfileStackNavigator.navigationOptions = ({ navigation }) => {
      let tabBarVisible = false;
      if (navigation.state.index == 0) {
        tabBarVisible = true;
      }
      return {
        tabBarVisible,
      };
    };

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
        screen : ProfileStackNavigator,//props => <ProfileStackNavigator {...props} rootStack={this.props.navigation}/>,
        navigationOptions : {
          tabBarLabel : '프로필',
          tabBarIcon : ({tintColor}) => (
            <IconFontAwesome name='user' color={tintColor} size={24}/>
          )
        },
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
