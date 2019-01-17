import React, {Component} from 'react';
import {Platform, StyleSheet,Image, Text, View, FlatList, TouchableOpacity, SafeAreaView,AsyncStorage} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import Colors from '../../utils/Colors';

export default class Chat extends Component {
  constructor(props){
    super(props);
    this.state = {
      userNo : '',
      data : [],
    }
  };

  componentDidMount(){
    this._getUserInfo();
  }

  componentWillMount(){

  }

  _getUserInfo = async() =>{
    const userNo = await AsyncStorage.getItem('userInfo');
    this.setState({
      userNo : userNo
    })
  };

  _getChatList = async() =>{

  };

  _renderItem = ({item}) => (
    <ChatList
      id={item.id}
      onPressItem={this._onPressItem}
    />
  );

  _onPressItem = (item) => {
    this.props.navigation.navigate('ChatRoom',{'key': item.id});
  };

  render() {
    return (
        <SafeAreaView style={styles.safeAreaViewStyle}>
          <FlatList
            data={this.state.data}
            renderItem={this._renderItem}
          />
        </SafeAreaView>
    );
  }
}

class ChatList extends Component {
  constructor(props){
    super(props);
    this.state = {
      id : this.props.id,
    }

  };
  
  _onPress = () => {
    this.props.onPressItem(this.state.id);
  };

  render(){
    return(
      <TouchableOpacity onPress={this._onPress}>
        <ChatRoomList/>
      </TouchableOpacity>
      );
  };
};

class ChatRoomList extends Component {
  constructor(props){
      super(props);
  };
  
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
                      <Text style={{fontSize : 15, fontWeight : 'bold'}}>반려견 예약</Text>
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
