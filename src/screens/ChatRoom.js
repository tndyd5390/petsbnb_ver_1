import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, ScrollView, KeyboardAvoidingView, Keyboard, TouchableHighlight, TextInput} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import Colors from '../utils/Colors';

export default class ChatRoom extends Component{
    _loginCheck = async() => {
        const userInfo = await AsyncStorage.getItem('userInfo');
        if(userInfo != null){
          //로그인 되있는 상태
        }
      }

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
    render(){
        return(
            <View style={styles.inputBar}>
                <TextInput style={styles.textBox}/>
                <TouchableHighlight style={styles.sendButton}>
                    <Text style={{color: 'white'}}>></Text>
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
      height:'8%'
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
      width : '15%',
      paddingLeft: 15,
      marginLeft: 5,
      paddingRight: 15,
      borderRadius: 15,
      backgroundColor: '#66db30'
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
      backgroundColor: '#66db30'
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
      backgroundColor: '#66db30'
    },
  })
  
  
