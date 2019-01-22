import React, {Component} from 'react';
import {
  AsyncStorage,
  Platform, 
  SafeAreaView,
  StyleSheet, 
  Dimensions,
  Text, 
  View, 
  FlatList, 
  ScrollView, 
  KeyboardAvoidingView, 
  Keyboard, 
  TouchableHighlight, 
  TextInput,
  ActivityIndicator} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {List, ListItem} from 'react-native-elements';
import Colors from '../../utils/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';
import SockJsClient from 'react-stomp';

const{width1, height1} = Dimensions.get('window');

export default class ChatRoom extends Component{
    constructor(props) {
      super(props);
      this.state = {
        activityIndicator : true,
        userNo : this.props.navigation.getParam('userNo'),
        petsitterNo : this.props.navigation.getParam('petsitterNo'),
        petsitterName : this.props.navigation.getParam('petsitterName'),
        clientConnected: false,
        roomId : this.props.navigation.getParam('roomId'),
        messages: []
      };
    }

    componentDidMount(){
      this._loginCheck();
    }

    _makeRoomId = (userNo, petsitterNo) => {
      const roomId = 'p'+petsitterNo+'u'+userNo;
      this.setState((prevState)=>({
        roomId : roomId,
    }))
    }

    _loginCheck = async() => {
      const userInfo = await AsyncStorage.getItem('userInfo');
      if(userInfo != null || userInfo != ''){
        this.setState({
          userNo : userInfo,
          activityIndicator : false
        });

        if(this.state.roomId == ''){
          this.setState({
            roomId : 'p'+this.props.navigation.getParam('petsitterNo')+'u'+ this.props.navigation.getParam('userNo')
          })
        }
      }
    };
    
    callBackMsg = (childMsg) => {
      this.setState({
        clientConnected : true,
        messages : childMsg
      });
    }

    static navigationOptions = ({ navigation }) => {
      return {
        title: navigation.getParam('petsitterName', 'A Nested Details Screen'),
      };
    };
    

    render(){
        if(this.state.activityIndicator == false){
          var messages = [];
          var userNo = this.state.userNo;
          this.state.messages.forEach(function(msg) {
            const position = userNo == msg.userNo ? 'right' : 'left';
            messages.push(
                <MessageBubble key={msg.id} direction={position} text={msg.contents}/>
            );
          });
        }
    
        return(
            <SafeAreaView style={styles.outer}>
            {this.state.activityIndicator && (
              <View style={{backgroundColor : Colors.white, width : width1, height : height1, position : 'absolute', zIndex : 10, alignItems : 'center', justifyContent : 'center'}}>
                <ActivityIndicator size="large" color="#10b5f1"/>
              </View>
           )}
           {!this.state.activityIndicator && (
            <ScrollView style={styles.messages} ref="scrollView"
             onContentSizeChange={(width,height) => this.refs.scrollView.scrollTo({y:height})}>
              {messages}
            </ScrollView>
           )}
          {!this.state.activityIndicator && (
           <InputBar callBackMsg={this.callBackMsg} roomId={this.state.roomId} userNo={this.state.userNo}/>
          )}
          </SafeAreaView>
        );
    }
}
class MessageBubble extends Component {
    render() {
        var leftSpacer = this.props.direction === 'left' ? null : <View/>;
        var rightSpacer = this.props.direction === 'left' ? <View/> : null;
        var bubbleTextStyle = this.props.direction === 'left' ? styles.messageBubbleTextLeft : styles.messageBubbleTextRight;
  
      return (
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              {leftSpacer}
              <View>
                <Text style={bubbleTextStyle}>
                  {this.props.text}
                </Text>
              </View>
              {rightSpacer}
            </View>
        );
    }
  }


class InputBar extends Component{
    constructor(props) {
      super(props);
      this.state = {
        roomId : this.props.roomId,
        bottomMenu : false,
        plusButton : false,
        clientConnected: false,
        type: 'text',
        userNo : this.props.userNo,
        messages: []
      };
    }

    _showBottomMenu = () => {
      if(this.state.bottomMenu == false) {
        this.setState({bottomMenu : true, plusButton : true});
      }else{
        this.setState({bottomMenu : false, plusButton : false});
      }
    };

    
    _renderBottom = () =>{
      if(this.state.bottomMenu == true){
        return(
          <BottomMenu/>
        );
      }else{
        return null;
      }
    };

    sendMessage = (selfMsg) => {
      try {
        this.clientRef.sendMessage("/app/hello/"+this.props.roomId, JSON.stringify(selfMsg));
        return true;
      } catch(e) {
        return false;
      }
    };
    
    onMessageReceive = (msg) => {
      this.setState(prevState => ({
        messages: [...prevState.messages, msg]
      }));
      this.props.callBackMsg(this.state.messages);
    };


    render(){
        return(
          <View>
            <View style={styles.inputBar}>
                <TouchableHighlight style={styles.plusButton} onPress={()=>this._showBottomMenu()}> 
                    <Text style={{color: 'white', fontSize : 18, justifyContent: 'center'}}>{this.state.plusButton ? 'x' : '+'}</Text>
                </TouchableHighlight>
                <TextInput style={styles.textBox} onChangeText={(text) => {
              this.setState({
                userNo : this.state.userNo,
                type : this.state.type,
                contents : text
              });
            }} value={this.state.content}/>
                <TouchableHighlight style={styles.sendButton} onPress={() => {
              this.sendMessage({roomId: this.state.roomId, userNo : this.state.userNo, type:this.state.type,contents : this.state.contents, date : new Date()})
            }}>
                    <Text style={{color: 'white', fontSize : 17}}>></Text>
                </TouchableHighlight>
            </View>
            {this.state.bottomMenu ? <BottomMenu/> : null}
            <SockJsClient url='http://192.168.0.8:8095/gs-guide-websocket' topics={['/topic/chat/'+this.props.roomId]}
            onMessage={(msg) => { this.onMessageReceive(msg) }}
            ref={ (client) => { this.clientRef = client }}
            debug={true} />
          </View>
        );
    }
};

class BottomMenu extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <View style={styles.bottomBar}>
        <TouchableHighlight onPress={()=>console.log('얍얍')}>
        <View style={{flex : 1,flexDirection: 'row', padding: 10, alignItems:'center'}}>
            <IconFontAwesome name='images' color={Colors.black} size={50}>
              <Text style={{fontFamily: 'Arial', fontSize: 15}}>앨범</Text>
            </IconFontAwesome>
        </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>console.log('얍얍')}>
        <View style={{flex : 1,flexDirection: 'row', padding: 10, alignItems:'center'}}>
            <IconFontAwesome name='camera' color={Colors.black} size={50}>
              <Text style={{fontFamily: 'Arial', fontSize: 15}}>사진</Text>
            </IconFontAwesome>
        </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>console.log('얍얍')}>
        <View style={{flex : 1,flexDirection: 'row', padding: 10, alignItems:'center'}}>
            <IconFontAwesome name='video' color={Colors.black} size={50}>
              <Text style={{fontFamily: 'Arial', fontSize: 15}}>동영상</Text>
            </IconFontAwesome>       
        </View>
        </TouchableHighlight>
      </View>
    );
  }
}


const styles = StyleSheet.create({

    //ChatView
  
    outer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: 'white',
    },
  
    messages: {
      flex: 1
    },
  
    //InputBar
  
    inputBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginTop : 5,
      height : 40
    },
  
    textBox: {
      borderRadius: 15,
      borderWidth: 1,
      borderColor: Colors.lightGrey,
      backgroundColor : Colors.white,
      flex: 1,
      paddingHorizontal: 10,
    },
    sendButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width : '12%',
      paddingLeft: 15,
      marginLeft: 5,
      paddingRight: 15,
      borderRadius: 15,
      backgroundColor: Colors.buttonSky
    },
    plusButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width : '9%',
      marginRight: 5,
      borderRadius: 30,
      backgroundColor: Colors.buttonSky,
    },
  
    //MessageBubble
  
    messageBubble: {
        borderRadius: 5,
        marginTop: 8,
        marginRight: 10,
        marginLeft: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection:'row',
        flex: 1
    },
  
    messageBubbleLeft: {
      backgroundColor: '#d5d8d4'
    },
  
    messageBubbleTextLeft: {
      color: 'black',
      borderRadius: 5,
      marginTop: 8,
      marginRight: 10,
      marginLeft: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      flexDirection:'row',
      flex: 1,
      backgroundColor: '#d5d8d4'
    },
  
    messageBubbleRight: {
      backgroundColor: Colors.buttonSky
    },
  
    messageBubbleTextRight: {
      color: 'white',
      borderRadius: 5,
      marginTop: 8,
      marginRight: 10,
      marginLeft: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      flexDirection:'row',
      flex: 1,
      backgroundColor: Colors.buttonSky
    },

    // BottomMenu
    
    bottomBar : {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingVertical: 5,
      height : 110,
      backgroundColor : Colors.lightGrey,
    },
  })
  
  
