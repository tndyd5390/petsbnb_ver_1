import React,{Component} from 'react';
import Colors from '../utils/Colors';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
    TextInput,
    Platform
} from 'react-native';
const{width, height} = Dimensions.get('window');
export default class FindPassword extends Component{
    render(){
        return(
            <KeyboardAvoidingView style={{flex : 1, backgroundColor : Colors.white}}>
                <View style={[{display : 'flex'}, Platform.OS ==='ios' ? {marginTop : 10} : null]}>
                    <TouchableOpacity
                        style={{marginTop : 20, marginLeft : 20, marginBottom : 20}}
                        onPress={()=>this.props.navigation.goBack()}
                    >
                        <Icon name="angle-left" size={40}/>
                    </TouchableOpacity>
        
                    <View style={{alignItems : 'center'}}>
                        <View style={{display : 'flex', width : width -60}}>
                            <Text style={{textAlign : 'left', fontSize : 17, fontWeight : '500'}}>이메일</Text>
                        </View>
                        <TextInput 
                            name='email'
                            style={{borderBottomWidth : 1, paddingTop : 5, paddingBottom : 5, width : width-60}} 
                        />
                    </View>
                </View>
                <TouchableOpacity 
                    style={[{width: width, 
                    height: 50, 
                    backgroundColor: Colors.buttonSky, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    position: 'absolute'}, 
                    Platform.OS === 'ios' ? {bottom : 20} : {bottom  : 0}]}
                    onPress={this._nextStep}
                >
                    <Text style={{color : Colors.white, fontSize : 20, fontWeight : '700'}}>비밀번호 찾기</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}