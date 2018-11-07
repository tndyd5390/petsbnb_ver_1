import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import Reservation from './screens/Reservation';
import Init from './screens/Init';
import LoginForm from './screens/LoginForm';
import SignUpEmail from './screens/SignUpEmail';
import Terms from './screens/Terms';
import SignUpPassword from './screens/SignUpPassword';
import SignUpAddress from './screens/SignUpAddress';
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
})
