import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

class Saved extends Component {
  render() {
    const{navigation} = this.props;
    console.log(navigation);
    const data = navigation.getParam('data','tmpData');

    return (
      <View style={styles.container}>
        <Text>Saved</Text>
        <Text>{toString.call(data)}</Text>
      </View>
    );
  }
}


export default Saved;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});
