import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

class Reservation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Reservation</Text>
      </View>
    );
  }
}


export default Reservation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  }
});
