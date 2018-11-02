import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import Saved from './screens/Saved';
import TabNavigator from './TabNavigator'

export default createStackNavigator({
    main : {
        screen : TabNavigator,
        navigationOptions : {
          header : null
        }
      },
      saved : {
        screen : Saved,
        navigationOptions : {
          
        }
      }
})
