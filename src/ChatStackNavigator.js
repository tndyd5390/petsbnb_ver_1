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
            tabBarVisible : false,
            headerTitleStyle: {
                width: '75%',
                textAlign: 'center',
            },
        }
    },
},
{
    initialRouteName: 'Chat',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
}
);