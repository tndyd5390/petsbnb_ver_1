import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  Dimensions,
} from 'react-native';
import Colors from '../../utils/Colors';
import PropTypes from 'prop-types';
import RoundedButton from '../components/buttons/RoundedButton';
const{height, width} = Dimensions.get('window');


class Profile extends Component {
  render() {
    return (
      <View>
        <Text>프로필</Text>
      </View>
    );
  }
}

export default Profile;