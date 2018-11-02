import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import Saved from './screens/Saved';
import Reservation from './screens/Reservation';
import TabNavigator from './TabNavigator'

export default createStackNavigator({
    main : {
        screen : TabNavigator,
        navigationOptions : {
          header : null
        }
      },
      Reservation : {
        screen : Reservation,
        navigationOptions : {
          
        }
      }
})
