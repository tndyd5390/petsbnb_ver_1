import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import Chat from './screens/Chat';
import ChatRoom from './screens/ChatRoom';


export default createStackNavigator({ 

    Chat : {
        screen : Chat,
        navigationOptions : {
            header : null
        }
    },
    ChatRoom : {
        screen : ChatRoom,
        navigationOptions : {
            title: this.title,
            headerTitleStyle: {
                width: '75%',
                textAlign: 'center',
            },
        }
    },

});