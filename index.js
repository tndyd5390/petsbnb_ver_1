/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// 어플리케이션의 최초 진입점 위에서 import한 App로 이동한다.
AppRegistry.registerComponent(appName, () => App);
