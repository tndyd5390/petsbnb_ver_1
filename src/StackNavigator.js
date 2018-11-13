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
import {
  AsyncStorage
} from 'react-native';

export default class StackNavigator extends Component {

  constructor(props){
    super(props);
    this.state = {
      initialScreen : ''
    }
    
  }

  componentWillMount(){
    this._loginCheck();
  }

  _loginCheck = async() => {
    const userInfo = await AsyncStorage.getItem('userInfo');
    if(userInfo != null){
      this.setState({
        initialScreen : 'Tabs'
      })
    }else{
      this.setState({
        initialScreen : 'Init'
      })
    }
  }

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
    },{
      initialRouteName : this.state.initialScreen
    }
  );
    return(
      <Stacks/>
    );
  }
}






