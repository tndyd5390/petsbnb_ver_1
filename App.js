import React, {Component} from 'react';
import StackNavigator from './src/StackNavigator';
import {AsyncStorage, Alert} from 'react-native';
import firebase from 'react-native-firebase';
import {RemoteMessage} from 'react-native-firebase';
//import BackgroundTask from 'react-native-background-task';


// BackgroundTask.define(async () => {
//   let fcmToken = await AsyncStorage.getItem('fcmToken');
//   if(!fcmToken){
//     fcmToken = await firebase.messaging().getToken();
//     if(fcmToken){
//       await AsyncStorage.setItem('fcmToken', fcmToken);
//     }
//   }

//   this.notificationListener = firebase.notifications().onNotification((notification) => {
//     const {title, body} = notification;
//     const channel = new firebase.notifications.Android.Channel('phone-channel', 'Phone Channel', firebase.notifications.Android.Importance.Max).setDescription('phone apps channel');
//     const phoneChannel = firebase.notifications().android.createChannel(channel);
//     const phoneNotification = new firebase.notifications.Notification()
//     .setNotificationId('phoneNotification')
//     .setTitle(title)
//     .setBody(body)
//     .setData({
//       key1 : 'value1',
//       key2 : 'value2'
//     });
//     phoneNotification.android.setChannelId(channel.channelId);
//     firebase.notifications().displayNotification(phoneNotification);
//   });

//   this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
//     const title = 'opened listener';
//     const body = 'opened body';
//     this.showAlert(title, body);
//   });

//   const notificationOpen = await firebase.notifications().getInitialNotification();
//   if(notificationOpen){
//     const { title, body } = notificationOpen.notification;
//     this.showAlert(title, body);
//   }

//   this.messageListener = firebase.messaging().onMessage((message) => {
//     //process data message
//     console.log(JSON.stringify(message));
//   });

// })

//실질적인 어플리케이션의 최초 진입점
export default class App extends Component {
  constructor(props){
    super(props);

    const { navigation } = this.props;
    console.log("navi "+navigation);
  }

  // push notification을 받기위한 이벤트 등록
  async componentDidMount(){
    this._checkPermission();
    this._clearNowChat();
    this._createNotificationListeners();
    //BackgroundTask.schedule();
  }

  //앱이 종료된 상태에서도 push notification을 받기위한 코드
  componentWillUnmount(){
    this.notificationListener();
    this.notificationOpenedListener();
  }

  _clearNowChat = async() => {
    await AsyncStorage.setItem('nowChat', '');
    console.log(await AsyncStorage.getItem('nowChat'));
  }

  //push notification을 받기위한 권한 검사
  _checkPermission = async() => {
    const fcmEnabled = await firebase.messaging().hasPermission();
    if(fcmEnabled){
      this._getToken();
    }else{
      this._requestPermission();
    }
  }

  //push notification을 받기위한 디바이스 token얻기
  _getToken = async() => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log(fcmToken);

    if(!fcmToken){
      fcmToken = await firebase.messaging().getToken();
      console.log(fcmToken);
      if(fcmToken){
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  //push notification을 받을 수 있는 권한이 없다면 권한 요청
  _requestPermission = async() =>{
    try{
      await firebase.messaging().requestPermission();
      this._getToken();
    }catch(err){
      console.log(err);
      console.log('permission rejected');
    }
  }

  //push notification을 받기위한 이벤트 리스너
  _createNotificationListeners = async() => {
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const {title, body, data} = notification;
      const channel = new firebase.notifications.Android.Channel('phone-channel', 'Phone Channel', firebase.notifications.Android.Importance.Max).setDescription('phone apps channel');
      const phoneChannel = firebase.notifications().android.createChannel(channel);
      const phoneNotification = new firebase.notifications.Notification()
      .setNotificationId('phoneNotification')
      .setTitle(title)
      .setBody(body)
      .setData(data)
      // .setData({
      //   key1 : 'value1',
      //   key2 : 'value2'
      // });
      console.log(this._checkChatRoom());
      console.log(data.roomId);
      phoneNotification.android.setChannelId(channel.channelId);
      firebase.notifications().displayNotification(phoneNotification);
    });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notification) => {
      const title = 'opened listener';
      const body = 'opened body';
      this.showAlert(title, body);
      //this.props.navigation.navigate('ChatRoom',{roomId: notification.data.roomId, userNo:userNo, propsUserNo:notification.data.propsUserNo,petsitterNo:notification.data.petsitterNo, petsitterUserNo : notification.data.petsitterUserNo});

    });

    const notificationOpen = await firebase.notifications().getInitialNotification();
    if(notificationOpen){
      const { title, body, data } = notificationOpen.notification;
      console.log(notificationOpen.notification);
      //this.showAlert(title, body);
    }

    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  _checkChatRoom = async() => {
    try{
      let nowChat;
      await AsyncStorage.getItem('nowChat').then((value)=>{
              if(value!==null){
                console.log("value", value);
                nowChat = value
              }else{
                nowChat = '';
              }
            }
        ); 
      return nowChat;
    }catch(err){
      console.log(err);
    }
  }

  //위에서 import한 StackNavigator를 화면에 출력
  render() {
    return(
      <StackNavigator/>
    );  
  }
}