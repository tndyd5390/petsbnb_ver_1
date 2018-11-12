import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import Reservation from './screens/Reservation';
import Init from './screens/Init';
import LoginForm from './screens/LoginForm';
import SignUpEmail from './screens/SignUpEmail';
import Terms from './screens/Terms';
import SignUpPassword from './screens/SignUpPassword';
import SignUpAddress from './screens/SignUpAddress';
import FindEmail from './screens/FindEmail';
import FindPassword from './screens/FindPassword';
import SignUpNameAndPhone from './screens/SignUpNameAndPhone';
import TmpSignUpNameAndPhone from './screens/TmpSignUpNameAndPhone';
import Tabs from './TabNavigator';
import App from '../App';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class StackNavigator extends Component {

  render(){
    const Stacks = createStackNavigator({
      Init : {
        screen : Init,
        navigationOptions : {
          header : null
        }
      },
      Tabs : {
        screen : Tabs,
        navigationOptions : {
          header : null
        }
      },
      App : {
        screen : App,
        navigation : {
          header : null
        }
      },
      SignUpAddress : {
        screen : SignUpAddress,
        navigationOptions : {
          header : null
        }
      },
      Reservation : {
        screen : Reservation,
        navigationOptions : {
          
        }
      },
      LoginForm : {
        screen : LoginForm,
        navigationOptions : {
          header : null
        }
      },
      SignUpEmail : {
        screen : SignUpEmail,
        navigationOptions : {
          header : null
        }
      },
      TmpSignUpNameAndPhone : {
        screen : TmpSignUpNameAndPhone,
        navigationOptions : {
          header : null
        }
      },
      
      Terms : {
        screen : Terms,
        navigationOptions: {
          title: '가입 약관',
          headerTitleStyle: {
              width: '75%',
              textAlign: 'center',
          },
        }
      },
      SignUpPassword : {
        screen : SignUpPassword,
        navigationOptions  : {
          header : null
        }
      },
      
      FindEmail : {
        screen : FindEmail,
        navigationOptions : {
          header : null
        }
      },
      FindPassword : {
        screen : FindPassword,
        navigationOptions :{
          header : null
        }
      }
    }
  );
    return(
      <Stacks/>
    );
  }
}






