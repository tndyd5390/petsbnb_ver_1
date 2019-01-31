import React, {Component} from 'react';
import Colors from '../../utils/Colors';
import {createBottomTabNavigator, BottomTabBar,withNavigation,createStackNavigator, StackActions} from 'react-navigation';
import Explore from '../Explore';
import Chat from '../chat/Chat';
import Reservation from '../Reservation';
import PetSitterProfileMenu from './PetSitterProfileMenu';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import PetList from '../profile/PetList';
import CheckPassword from '../profile/CheckPassword';
import ProfileUserUpdate from '../profile/ProfileUserUpdate';
import PetRegView from '../profile/PetRegView';
import PetUpdateView from '../profile/PetUpdateView';
import CustomerCenter from '../profile/CustomerCenter';
import Preference from '../profile/Preferences';
import UsageTerm from '../profile/UsageTerm';
import PetSitterProfileReg from './PetSitterProfileReg';
import PetSitterProfileUpdateView from './PetSitterProfileUpdateView';
import PetSitterReservationMenu from './PetSitterReservationMenu';
import PetSitterReservationExposure from './PetSitterReservationExposure';
import BookingDetail from '../booking/BookingDetail';
import DayBookingDetails from '../booking/DayBookingDetails';
import BookingDate from '../booking/BookingDate';
import BookingPetList from '../booking/BookingPetList';
import BookingConfirm from '../booking/BookingConfirm';
import BookingPaymentList from '../booking/BookingPaymentList';
import NightBookingDetails from '../booking/NightBookingDetails';
import Payment from "../booking/Payment";
import PaymentResult from "../booking/PaymentResult";
export default class PetSitterTab extends Component{
    render() {
      const petSitterProfileStackNavigation = createStackNavigator({
        PetSitterProfileMenu : {
          screen : props => <PetSitterProfileMenu {...props} rootStack={this.props.navigation}/>,
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
        },
        PetSitterProfileReg : {
          screen : PetSitterProfileReg,
          navigationOptions : {
            title : '펫시터 프로필',
            headerTitleStyle : {
              width : '75%',
              textAlign : 'center'
            }
          }
        },
        PetSitterProfileUpdateView: {
            screen : PetSitterProfileUpdateView,
            navigationOptions : {
              title : '펫시터 프로필',
              headerTitleStyle : {
                width : '75%',
                textAlign : 'center'
              }
            }
          },
      })

      petSitterProfileStackNavigation.navigationOptions = ({ navigation }) => {
        let tabBarVisible = false;
        if (navigation.state.index == 0) {
          tabBarVisible = true;
        }
        return {
          tabBarVisible,
        };
      };

      const petSitterReservationStackNavigator = createStackNavigator({
        PetSitterReservationMenu : {
          screen : PetSitterReservationMenu,
          navigationOptions : {
            title : '예약관리',
            headerTitleStyle : {
              width : '90%',
              textAlign : 'center'
            }
          }
        },
        PetSitterReservationExposure : {
          screen : PetSitterReservationExposure,
          navigationOptions : {
            title : '예약 게시 설정',
            headerTitleStyle : {
              width : '80%',
              textAlign : 'center'
            }
          }
        },
      })

      petSitterReservationStackNavigator.navigationOptions = ({ navigation }) => {
        let tabBarVisible = true;
        if (navigation.state.index > 0) {
          tabBarVisible = false;
        }
        return {
          tabBarVisible,
        };
      };


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
            screen : petSitterReservationStackNavigator,
            navigationOptions : {
              tabBarLabel : '예약관리',
              tabBarIcon : ({tintColor}) => (
                <IconFontAwesome name='calendar' color={tintColor} size={24}/>
              )
            }
          },
          Chat : {
            screen : Chat,
            navigationOptions : {
              tabBarLabel : '대화하기',
              tabBarIcon : ({tintColor}) => (
                <IconFontAwesome name='comments' color={tintColor} size={24}/>
              )
            }
          },
          Profile : {
            screen : petSitterProfileStackNavigation,//props => <ProfileStackNavigator {...props} rootStack={this.props.navigation}/>,
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
          },
          //탭네비게이션안의 스택네비게이션에서 스택을 쌓고 다른데로 가면 스택 비우는 코드
          /*navigationOptions : {
            tabBarOnPress : ({navigation, defaultHandler}) => {
              navigation.dispatch(StackActions.popToTop());
              defaultHandler();
            }
          }
          */
        })

        return(
            <Tabs/>
        );
    }
}
