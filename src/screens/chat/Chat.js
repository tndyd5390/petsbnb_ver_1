import React, {Component} from 'react';
import {Platform, Dimensions,StyleSheet,Image, Text, View, FlatList, TouchableOpacity, SafeAreaView,AsyncStorage, ActivityIndicator} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import Colors from '../../utils/Colors';

const{width, height} = Dimensions.get('window');

export default class Chat extends Component {
  constructor(props){
    super(props);
    this.state = {
      activityIndicator : true,
      userNo : null,
      data : []
    }
  };

  componentDidMount(){
    this._getUserInfo();
  }

  componentWillMount(){
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this._getChatList();
    });
     
  }

  _getUserInfo = async() =>{
    const userNo = await AsyncStorage.getItem('userInfo');
    this.setState({
      userNo : userNo,
      activityIndicator : false,
    })
    this._getChatList();
  };

  _getChatList = async() =>{
    this.setState({
      activityIndicator : true
    })
    const params = {
        userNo : this.state.userNo, 
        petsitterNo : this.state.petsitterNo
    }
    await fetch("http://192.168.0.8:8091/chat/chatList.do", {
        method : 'POST',
        headers : {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body :JSON.stringify(params),
    })
    .then((response) => response.json())
    .then((res => {
      console.log(res);
      this.setState({
        activityIndicator : false,
        data : res
      })
    }))
    .catch((err) => {
        console.log(err);
    })
  };

  _renderItem = ({item}) => (
    <ChatList
      roomId={item.roomId}
      userNo={this.state.userNo}
      propsUserNo={item.userNo}
      petsitterNo={item.petsitterNo}
      petsitterUserNo={item.petsitterUserNo}
      userName={item.userName}
      onPressItem={this._onPressItem}
    />
  );

  _renderList = () =>{
    console.log(this.state.data);
    if(this.state.data.length!= 0){
      return(
        <FlatList
        data={this.state.data}
        keyExtractor={ (item, index) => index.toString() }
        renderItem={this._renderItem}
      />
      );
    }else{
      return(
        <View style={{flexDirection :'column', justifyContent :'center', alignItems:'center',height:(Dimensions.get('window').height-100)}}>
        <View style={{flexDirection : 'row', justifyContent :'center', alignItems:'center'}}>
            <Text style={{fontSize:17, fontWeight : 'bold'}}>
                대화중인 채팅방이 없습니다.
            </Text>
        </View>
        <View style={{flexDirection : 'row', justifyContent :'center', alignItems:'center', marginTop:20}}>
            <Text>
                예약 후 이곳에서 예약내용을 확인할 수 있습니다.
            </Text>
        </View>
    </View>
)
    }
  }

  _onPressItem = (item) => {
    this.props.navigation.navigate('ChatRoom',{roomId: item.roomId, userNo:item.userNo, propsUserNo:item.propsUserNo,petsitterNo:item.petsitterNo, userName:item.userName, petsitterUserNo : item.petsitterUserNo});
  };

  render(){
    return (
        <SafeAreaView style={styles.safeAreaViewStyle}>
        {this.state.activityIndicator && (
                    <View style={{backgroundColor : Colors.white, width : width, height : height, position : 'absolute', zIndex : 10, alignItems : 'center', justifyContent : 'center'}}>
                        <ActivityIndicator size="large" color="#10b5f1"/>
                    </View>
           )}
        {!this.state.activityIndicator && (
          this._renderList()
        )}
        </SafeAreaView>
    );
  }
}

class ChatList extends Component {
  constructor(props){
    super(props);
    this.state = {
      roomId : this.props.roomId,
      userNo : this.props.userNo,
      propsUserNo : this.props.propsUserNo,
      petsitterNo : this.props.petsitterNo,
      petsitterUserNo : this.props.petsitterUserNo,
      userName : this.props.userName
    }

  };
  
  _onPress = () => {
    this.props.onPressItem(this.state);
  };

  render(){
    return(
      <TouchableOpacity onPress={this._onPress}>
        <ChatRoomList data={this.state}/>
      </TouchableOpacity>
      );
  };
};

class ChatRoomList extends Component {
  constructor(props){
      super(props);
      this.state = {
        roomId : this.props.data.roomId,
        userNo : this.props.data.userNo,
        propsUserNo : this.props.data.propsUserNo,
        petsitterNo : this.props.data.petsitterNo,
        petsitterUserNo : this.props.petsitterUserNo,
        userName : this.props.data.userName
      }
  };

  _checkUser = () =>{

  }
  
  render(){
      return(
          <View style={{
              flex:1,
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingVertical: 5,
              marginBottom : 5,
          }}>
              <View style={{alignItems : 'center', justifyContent: 'center'}}>
                      <Image source={require("../../../img/user.png")} style={{width : 45, height : 45, margin : 13}}/>
              </View>
              <View style={{flex:1,justifyContent: 'center', marginLeft : 15}}>
                  <View>
                      <Text style={{fontSize : 15, fontWeight : 'bold'}}>{this.state.userName}</Text>
                  </View>
                  <View style={{alignItems : 'center', flexDirection: 'row', justifyContent : 'space-between', marginTop : 5}}>
                      <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize : 13, fontWeight :'bold'}}>123123</Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize : 13, color : Colors.grey}}>123213</Text>
                      </View>
                  </View>
              </View>            
          </View>
      );
  };
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  safeAreaViewStyle : {
    flex: 1,
    backgroundColor : Colors.white,
  },

});
