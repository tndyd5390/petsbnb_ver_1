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

export default createStackNavigator({
      Init : {
        screen : Init,
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
      SignUpNameAndPhone : {
        screen : SignUpNameAndPhone,
        navigationOptions: {
          title: '본인 인증',
          headerTitleStyle: {
              width: '75%',
              textAlign: 'center',
          },
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
      SignUpAddress : {
        screen : SignUpAddress,
        navigationOptions : {
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
})
