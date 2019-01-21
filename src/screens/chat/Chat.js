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

  }

  _getUserInfo = async() =>{
    const userNo = await AsyncStorage.getItem('userInfo');
    this.setState({
      userNo : userNo,
      activityIndicator : false,
      data : [
              {roomId : 'p2u4', petsitterNo : 2, userNo : 4, petsitterName : 'dd'},
              {roomId : 'p2u3', petsitterNo : 2, userNo : 3, petsitterName : 'dd'}
            ]
    })
  };

  _getChatList = async() =>{

  };

  _renderItem = ({item}) => (
    <ChatList
      roomId={item.roomId}
      userNo={this.state.userNo}
      petsitterNo={item.petsitterNo}
      petsitterName={item.petsitterName}
      onPressItem={this._onPressItem}
    />
  );

  _onPressItem = (item) => {
    this.props.navigation.navigate('ChatRoom',{roomId: item.roomId, userNo:this.state.userNo, petsitterNo:item.petsitterNo, petsitterName:item.petsitterName});
  };

  render() {
    return (
      
        <SafeAreaView style={styles.safeAreaViewStyle}>
        {this.state.activityIndicator && (
                    <View style={{backgroundColor : Colors.white, width : width, height : height, position : 'absolute', zIndex : 10, alignItems : 'center', justifyContent : 'center'}}>
                        <ActivityIndicator size="large" color="#10b5f1"/>
                    </View>
           )}
        {!this.state.activityIndicator && (
          <FlatList
            data={this.state.data}
            keyExtractor={ (item, index) => index.toString() }
            renderItem={this._renderItem}
          />
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
      petsitterNo : this.props.petsitterNo,
      petsitterName : this.props.petsitterName
    }

  };
  
  _onPress = () => {
    this.props.onPressItem(this.state);
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
