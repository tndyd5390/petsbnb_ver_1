import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import LoginForm from './screens/LoginForm';
import ProfileMenu from './screens/ProfileMenu';
import SignUpForm from './screens/SignUpForm';
import Terms from './screens/Terms';
export default createStackNavigator({
    LoginForm : {
        screen : LoginForm,
        navigationOptions : {
            header : null
        }
    },
    ProfileMenu : {
        screen : ProfileMenu
    },
    SignUpForm : {
        screen : SignUpForm,
        navigationOptions: {
            title: '회원가입',
            headerTitleStyle: {
                width: '75%',
                textAlign: 'center',
            },
        }
    },
    Terms : {
        screen : Terms,
        navigationOptions: {
            title: '이용약관',
            headerTitleStyle: {
                width: '75%',
                textAlign: 'center',
            },
        }
    }
});