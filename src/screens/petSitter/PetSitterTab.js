import React, {Component} from 'react';
import Colors from '../../utils/Colors';
import {createBottomTabNavigator, BottomTabBar,withNavigation,createStackNavigator} from 'react-navigation';
import Explore from '../Explore';
import Chat from '../chat/Chat';
import Reservation from '../Reservation';
import PetSitterMenu from './PetSitterMenu';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
export default class PetSitterTab extends Component{
    render() {

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
              screen : PetSitterMenu,//props => <ProfileStackNavigator {...props} rootStack={this.props.navigation}/>,
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
