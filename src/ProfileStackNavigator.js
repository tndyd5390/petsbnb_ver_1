import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import LoginView from './screens/LoginView';
import ProfileMenu from './screens/ProfileMenu';
import SignUpForm from './screens/SignUpForm';
export default createStackNavigator({
    LoginView : {
        screen : LoginView,
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
    }
});