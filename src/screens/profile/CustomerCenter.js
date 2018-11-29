import React, {Component} from 'react';
import Colors from '../../utils/Colors';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import call from 'react-native-phone-call';
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
    _makePhoneCall = () => {
        const args = {
            number : '01038999410',
            prompt : false
        }
        call(args).catch(console.error);
    }
    render() {
        return(
            <View style={{width : width, height : height, flex : 1, backgroundColor : Colors.white}}>
                <View style={{alignItems : 'center', borderBottomWidth : 1, borderBottomColor : Colors.lightGrey}}>
                    <View style={{width : width - 40, height : 70, flexDirection : 'row'}}>
                        <View style={{height : '100%', width : '30%', justifyContent : 'center'}}>
                            <Text style={{fontSize : 15, color : Colors.black}}>전화 걸기</Text>
                        </View>
                        <View style={{height : '100%', width : '50%', alignItems : 'flex-end', justifyContent : 'center'}}>
                            <Text style={{fontSize : 15, color : Colors.black}}>010-5790-7883</Text>
                        </View>
                        <View style={{height : '100%', width : '20%', alignItems : 'center', justifyContent : 'center'}}>
                            <TouchableOpacity
                                onPress={this._makePhoneCall}
                            >
                                <FontAwesome5 name={'phone-square'} size={40} style={{color : Colors.buttonSky}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{alignItems : 'center', borderBottomWidth : 1, borderBottomColor : Colors.lightGrey}}>
                    <View style={{width : width - 40, marginTop : 10, marginBottom : 5}}>
                        <Text>AM 10:00 ~ PM 6:00</Text>
                    </View>
                    <View style={{width : width - 40, marginTop : 5, marginBottom : 10}}>
                        <Text>주말, 공휴일 휴일</Text>
                    </View>
                </View>
            </View>
        )
    }
}