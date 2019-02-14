//화면에 출력할 js파일들 import
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import Reservation from './screens/Reservation';
import Init from './screens/Init';
import LoginForm from './screens/login/LoginForm';
import SignUpEmail from './screens/signUp/SignUpEmail';
import Terms from './screens/Terms';
import SignUpPassword from './screens/signUp/SignUpPassword';
import SignUpAddress from './screens/signUp/SignUpAddress';
import FindEmail from './screens/login/FindEmail';
import FindPassword from './screens/login/FindPassword';
import SignUpNameAndPhone from './screens/signUp/SignUpNameAndPhone';
import TmpSignUpNameAndPhone from './screens/signUp/TmpSignUpNameAndPhone';
import Tabs from './TabNavigator';
import App from '../App';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PetSitterTab from './screens/petSitter/PetSitterTab';
import Main from './screens/Main';
import {
  AsyncStorage
} from 'react-native';

export default class StackNavigator extends Component {

  

  render(){
    //스택 네비케이터 생성
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
      Main : {
        screen : Main,
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
      },
      PetSitterTab : {
        screen : PetSitterTab,
        navigationOptions : {
          header : null
        }
      },
    }
  );
    //스택 네비게이터 출력
    return(
      <Stacks/>
    );
  }
}






