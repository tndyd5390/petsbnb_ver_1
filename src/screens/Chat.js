import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {List, ListItem} from 'react-native-elements';

export default class Chat extends Component {
  render() {
    return (
        <List>
          <FlatList
            data={[{key: 'a', sub:'안녕'}, {key: 'b',sub:'하이'}]}
            renderItem={({item}) => 
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('ChatRoom',{'key': item.key}); console.log(item.key)}}>
              <View>
                <ListItem roundAvatar title={item.key} subtitle={item.sub}>{item.key}</ListItem>
              </View>
            </TouchableOpacity>
            }
          />
        </List>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});
