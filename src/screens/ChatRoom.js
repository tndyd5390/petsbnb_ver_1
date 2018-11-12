import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, ScrollView, KeyboardAvoidingView, Keyboard, TouchableHighlight, TextInput} from 'react-native';
import {List, ListItem} from 'react-native-elements';

export default class ChatRoom extends Component{
    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('key', 'A Nested Details Screen'),
        };
      };
    

    render(){
        const key = this.props.navigation.state.params.key;
        const key1 = this.props;
        return(
            <View style={styles.outer}>
            <ScrollView style={styles.messages}>
                <Text>asdsadsadsadsadwqdwqd</Text>
            </ScrollView>
                <InputBar/>
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
                    <Text style={{color: 'white'}}>Send</Text>
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
      backgroundColor: 'white'
    },
  
    messages: {
      flex: 1
    },
  
    //InputBar
  
    inputBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 5,
      paddingVertical: 3,
    },
  
    textBox: {
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'gray',
      flex: 1,
      fontSize: 16,
      paddingHorizontal: 10
    },
  
    sendButton: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 15,
      marginLeft: 5,
      paddingRight: 15,
      borderRadius: 5,
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
      backgroundColor: '#d5d8d4',
    },
  
    messageBubbleTextLeft: {
      color: 'black'
    },
  
    messageBubbleRight: {
      backgroundColor: '#66db30'
    },
  
    messageBubbleTextRight: {
      color: 'white'
    },
  })
  
  
