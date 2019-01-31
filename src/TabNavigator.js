import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image,TouchableHighlight, Button} from 'react-native';
import {createBottomTabNavigator, BottomTabBar,withNavigation,createStackNavigator, StackActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Explore from './screens/Explore';
import Reservation from './screens/Reservation';
import Colors from './utils/Colors';
import Chat from './screens/chat/Chat';
import ChatRoom from './screens/chat/ChatRoom';
import BookingDetail from './screens/booking/BookingDetail';
import DayBookingDetails from './screens/booking/DayBookingDetails';
import BookingDate from './screens/booking/BookingDate';
import BookingPetList from './screens/booking/BookingPetList';
import BookingConfirm from './screens/booking/BookingConfirm';
import BookingPaymentList from './screens/booking/BookingPaymentList';
import MyBookingList from './screens/myBooking/MyBookingList';
import MyBookingDetail from './screens/myBooking/MyBookingDetail';
import BookingReviewWrite from './screens/myBooking/BookingReviewWrite';
import Timeline from './screens/timeline/Timeline';
import TLComments from './screens/timeline/TLComments';
import ProfileMenu from './screens/profile/ProfileMenu';
import CheckPassword from './screens/profile/CheckPassword';
import ProfileUserUpdate from './screens/profile/ProfileUserUpdate';
import PetList from './screens/profile/PetList';
import PetRegView from './screens/profile/PetRegView';
import PetUpdateView from './screens/profile/PetUpdateView';
import PetSitterApplyForm from './screens/petSitter/PetSitterApplyForm';
import StackNavigator from './StackNavigator';
import CustomerCenter from './screens/profile/CustomerCenter';
import Preference from './screens/profile/Preferences';
import UsageTerm from './screens/profile/UsageTerm';
import NightBookingDetails from './screens/booking/NightBookingDetails';
import Payment from "./screens/booking/Payment";
import PaymentResult from "./screens/booking/PaymentResult";

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
      },
      Preference : {
          screen : Preference,
          navigationOptions : {
              title: '환경설정',
              headerTitleStyle: {
                  width: '75%',
                  textAlign: 'center',
              }
          }
      },
      UsageTerm : {
          screen : UsageTerm,
          navigationOptions : {
              title: '이용약관',
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
        screen : myBookingStacks,
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
        tabBarVisible: true,
        tabBarOnPress : ({navigation, defaultHandler}) => {
          navigation.dispatch(StackActions.popToTop());
          defaultHandler();
        }
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
        header : null
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
    DayBookingDetails :{
      screen : DayBookingDetails,
      navigationOptions : {
        title : '예약 세부사항',
        headerTitleStyle: {
          width: '75%',
          textAlign: 'center',
      },
    }
  },
    NightBookingDetails :{
      screen : NightBookingDetails,
      navigationOptions : {
        title : '예약 세부사항',
        headerTitleStyle: {
          width: '75%',
          textAlign: 'center',
      },
    }
  },
    BookingPetList :{
      screen : BookingPetList,
      navigationOptions : {
        title : '맡길 반려동물',
        headerTitleStyle: {
          width: '75%',
          textAlign: 'center',
      },
    }
  },
    BookingConfirm :{
      screen : BookingConfirm,
      navigationOptions : {
        title : '예약 확인',
        headerTitleStyle: {
          width: '75%',
          textAlign: 'center',
      },
    }
  },
  BookingPaymentList :{
      screen : BookingPaymentList,
      navigationOptions : {
        title : '결제 방법',
        headerTitleStyle: {
          width: '75%',
          textAlign: 'center',
      },
    }
  },
  Payment : {
    screen : Payment,
    navigationOptions : {
      header : null
    }
  },
  PaymentResult : {
    screen : PaymentResult,
    navigationOptions : {
      title : '결제 완료',
      headerTitleStyle: {
        width: '90%',
        textAlign: 'center',
      },
    }
  }
},
{
  initialRouteName: 'Explore'
});

BookingStacks.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let viewName = navigation.state.routes[navigation.state.index].routeName;
  let options = {};
  switch (viewName){
    case "PaymentResult":
      options.tabBarVisible = true;
      options.headerLeft = null;
      break;
    case "Explore":
      options.tabBarVisible = true;
      break;
    default : 
      options.tabBarVisible = false;
  };

  return options;
};


const myBookingStacks = createStackNavigator({
  MyBookingList : {
      screen : MyBookingList,
      navigationOptions : {
        header : null
      }
    },
  MyBookingDetail :{
      screen : MyBookingDetail,
      navigationOptions : {
        title : '예약 상세',
        headerTitleStyle: {
          width: '75%',
          textAlign: 'center',
      },
    }
   },
  BookingReviewWrite :{
      screen : BookingReviewWrite,
      navigationOptions : {
        title : '리뷰 쓰기',
        headerTitleStyle: {
          width: '75%',
          textAlign: 'center',
      },
    }
   },
  Timeline :{
      screen : Timeline,
      navigationOptions : {
        title : '타임 라인',
        headerTitleStyle: {
          width: '75%',
          textAlign: 'center',
      },
    }
   },
   TLComments :{
      screen : TLComments,
      navigationOptions : {
        title : '댓글',
        headerTitleStyle: {
          width: '75%',
          textAlign: 'center',
      },
    }
   },
  },
  {
  initialRouteName: 'MyBookingList'
  });

  myBookingStacks.navigationOptions = ({ navigation }) => {
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
        title : '대화하기',
        headerTitleStyle: {
          width: '90%',
          textAlign: 'center',
      },
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
