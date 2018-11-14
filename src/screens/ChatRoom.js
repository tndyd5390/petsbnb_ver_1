import React, {Component} from 'react';
import {Alert,Platform, StyleSheet, Text, View, FlatList, ScrollView, KeyboardAvoidingView, Keyboard, TouchableHighlight, TextInput} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import Colors from '../utils/Colors';

export default class ChatRoom extends Component{
    constructor(props) {
      super(props);
      this.state = {
        visible : 'none'
      };
    }

    _loginCheck = async() => {
      const userInfo = await AsyncStorage.getItem('userInfo');
      if(userInfo != null){
          //로그인 되있는 상태
      }
    };

    static navigationOptions = ({ navigation }) => {
      return {
        title: navigation.getParam('key', 'A Nested Details Screen'),
      };
    };
    

    render(){
        return(
            <View style={styles.outer}>
            <ScrollView style={styles.messages}>
               <MessageBubble key={0} direction={'left'} text={'sdsdsdsasdasdsaas'}/>
               <MessageBubble key={1} direction={'right'} text={'sdsdsds'}/>
               <MessageBubble key={0} direction={'left'} text={'sdsdsdsasdasdsaas'}/>
               <MessageBubble key={1} direction={'right'} text={'sdsdsds'}/>
               <MessageBubble key={0} direction={'left'} text={'sdsdsdsasdasdsaas'}/>
               <MessageBubble key={1} direction={'right'} text={'sdsdsds'}/>
               <MessageBubble key={0} direction={'left'} text={'sdsdsdsasdasdsaas'}/>
               <MessageBubble key={1} direction={'right'} text={'sdsdsds'}/>
               <MessageBubble key={0} direction={'left'} text={'sdsdsdsasdasdsaas'}/>
               <MessageBubble key={1} direction={'right'} text={'sdsdsds'}/>
               <MessageBubble key={0} direction={'left'} text={'sdsdsdsasdasdsaas'}/>
               <MessageBubble key={1} direction={'right'} text={'sdsdsds'}/>
               <MessageBubble key={0} direction={'left'} text={'sdsdsdsasdasdsaas'}/>
               <MessageBubble key={1} direction={'right'} text={'sdsdsds'}/>
               <MessageBubble key={0} direction={'left'} text={'sdsdsdsasdasdsaas'}/>
               <MessageBubble key={1} direction={'right'} text={'sdsdsds'}/>
               <MessageBubble key={0} direction={'left'} text={'sdsdsdsasdasdsaas'}/>
               <MessageBubble key={1} direction={'right'} text={'sdsdsds'}/>
            </ScrollView>
                <InputBar/>
                <BottomMenu bottomMenu={this.state.visible}/>
            </View>
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
        visible : false
      };
    }

    _showBottomMenu = () => {
      if(this.state.visible = false) {
        this.setState({visible : false});
      }else{
        this.setState({visible : true});
      }
    };

    render(){
        return(
            <View style={styles.inputBar}>
                <TouchableHighlight style={styles.plusButton} onPress={()=>this._showBottomMenu()}> 
                    <Text style={{color: 'white', fontSize : 17}}>+</Text>
                </TouchableHighlight>
                <TextInput style={styles.textBox}/>
                <TouchableHighlight style={styles.sendButton}>
                    <Text style={{color: 'white', fontSize : 17}}>></Text>
                </TouchableHighlight>
            </View>
        );
    }
};

class BottomMenu extends Component{
  constructor(props) {
    super(props);
    console.log(this.props.visible);
  }
  render(){
    return(
      <View style={styles.bottomBar}>
        <Text>바텀</Text>
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
      height : 45
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
      height : 80,
      backgroundColor : Colors.white,
    },

  })
  
  
