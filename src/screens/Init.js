import React, {Component} from 'react';
import Colors from '../utils/Colors';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
const {width, height} = Dimensions.get('window');

export default class Init extends Component{
    render(){
        return(
            <View>
                <Image
                    source={require('../../img/petCare.jpg')}
                    style={{width : width, height : height, position : 'absolute'}}
                />
                <View style={{width : width, height : height, position : 'absolute', backgroundColor : 'rgba(255,255,255,0.8)', alignItems : 'center'}}>
                    <View>
                        <Image
                            source={require('../../img/img.png')}
                            style={{width : 100, height : 100, marginTop : 100}}
                        />
                    </View>
                    <View>
                        <TouchableOpacity 
                            style={{width : width - 150, height : 50, backgroundColor : Colors.buttonBorderGrey, marginTop : 100, justifyContent : 'center', alignItems : 'center'}}
                            onPress={() => this.props.navigation.navigate('LoginForm')}
                        >
                            <Text style={{color : Colors.white, fontSize : 20, fontWeight : '800'}}>로그인</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity 
                            style={{width : width - 150, height : 50, backgroundColor : Colors.buttonSky, marginTop : 30, justifyContent : 'center', alignItems : 'center'}}
                            onPress={() => this.props.navigation.navigate('SignUpEmail')}
                        >
                            <Text style={{color : Colors.white, fontSize : 20, fontWeight : '800'}}>회원가입</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}