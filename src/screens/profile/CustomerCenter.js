import React, {Component} from 'react';
import Colors from '../../utils/Colors';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
    View,
    Text,
    AsyncStorage,
    TouchableOpacity,
    Platform,
    Dimensions
} from 'react-native';
const{width, height} = Dimensions.get('window');

export default class CustomerCenter extends Component{
    render() {
        return(
            <View><Text>고객센터</Text></View>
        )
    }
}