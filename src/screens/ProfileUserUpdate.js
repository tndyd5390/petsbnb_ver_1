import React, {Component} from 'react';
import Colors from '../utils/Colors';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Dimensions,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity
} from 'react-native';
const{width, height} = Dimensions.get('window');

export default class ProfileUserUpdate extends Component {
    render(){
        return(
            <View><Text>회원정보 변경</Text></View>
        );
    }
}