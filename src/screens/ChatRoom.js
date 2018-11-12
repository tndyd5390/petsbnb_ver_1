import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
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
            <View>
                <Text>채팅방입니다.</Text>
            </View>
        );
    }
}