import React, {Component} from 'react';
import Colors from '../../utils/Colors';
import {createBottomTabNavigator, BottomTabBar,withNavigation,createStackNavigator} from 'react-navigation';
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
import PetSitterProfile from './PetSitterProfile';

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
        PetSitterProfile : {
          screen : PetSitterProfile,
          navigationOptions : {
            title : '펫시터 프로필',
            headerTitleStyle : {
              width : '75%',
              textAlign : 'center'
            }
          }
        }
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

      const Tabs = createBottomTabNavigator({
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

        return(
            <Tabs/>
        );
    }
}
