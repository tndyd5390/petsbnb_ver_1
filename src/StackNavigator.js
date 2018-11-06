import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import Reservation from './screens/Reservation';
import Init from './screens/Init';
import LoginView from './screens/LoginView';
import SignUpEmail from './screens/SignUpEmail';
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
      LoginView : {
        screen : LoginView,
        navigationOptions : {
          header : null
        }
      },
      SignUpEmail : {
        screen : SignUpEmail,
        navigationOptions : {
          header : null
        }
      }

})
