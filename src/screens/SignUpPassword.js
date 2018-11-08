import React, {Component} from 'react';
import Colors from '../utils/Colors';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
    TextInput
} from 'react-native'
const{width, height} = Dimensions.get('window');

export default class SignUpPassword extends Component{

    state = {
        password : '',
        passwordCheck : '',
        passwordSecureEntry : true,
        passwordCheckSecureEntry : true
    }

    _nextStep = () => {
        const passwordRegx = /^(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/;
        const navi = this.props.navigation;
        const params = {
            email : navi.getParam('email'),
            name : navi.getParam('name'),
           // birthday : navi.getParam('birthday'),
            //teleCorp : navi.getParam('teleCorp'),
            phoneNumber : navi.getParam('phoneNumber'),
            password : this.state.password
        }
        if(this.state.password != this.state.passwordCheck){
            alert('비밀번호가 일치 하지 않습니다.');
        }else if(!passwordRegx.test(this.state.password)){
            alert('비밀번호 형식을 다시 확인해 주세요.');
        }else{
            this.props.navigation.navigate('SignUpAddress', params);
        }
    }

    _togglePassword = () => {
        this.setState({
            passwordSecureEntry : !this.state.passwordSecureEntry
        })
    }

    _togglePasswordCheck = () => {
        this.setState({
            passwordCheckSecureEntry : !this.state.passwordCheckSecureEntry
        })
    }

    render(){
        return(
            <KeyboardAvoidingView style={{flex : 1, backgroundColor : Colors.white}}>
                <View style={{display : 'flex'}}>
                    <TouchableOpacity
                        style={{marginTop : 20, marginLeft : 20, marginBottom : 20}}
                        onPress={()=>this.props.navigation.goBack()}
                    >
                        <Icon name="angle-left" size={40}/>
                    </TouchableOpacity>
        
                    <View style={{alignItems : 'center'}}>
                        <View style={{display : 'flex', width : width -60}}>
                            <Text style={{textAlign : 'left', fontSize : 17, fontWeight : '500'}}>비밀번호</Text>
                        </View>
                        <View style={{flexDirection : 'row'}}>
                            <TextInput
                                style={{borderBottomWidth : 1, paddingTop : 5, paddingBottom : 5, width : width-90}}
                                onChangeText={(text)=>this.setState({email : text})}
                                placeholder="8자 이상 숫자, 특수문자 포함"
                                onChangeText={(password) => this.setState({password : password})}
                                secureTextEntry={this.state.passwordSecureEntry}
                            />
                            <TouchableOpacity
                                onPress={this._togglePassword}
                            >
                                <Icon name='eye-slash' size={20} style={{marginLeft : 10}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View style={{alignItems : 'center', marginTop : 20}}>
                        <View style={{display : 'flex', width : width -60}}>
                            <Text style={{textAlign : 'left', fontSize : 17, fontWeight : '500'}}>비밀번호 확인</Text>
                        </View>
                        <View style={{flexDirection : 'row'}}>
                            <TextInput
                                style={{borderBottomWidth : 1, paddingTop : 5, paddingBottom : 5, width : width-90}} 
                                onChangeText={(text)=>this.setState({email : text})}
                                placeholder="8자 이상 숫자, 특수문자 포함"
                                onChangeText={(passwordCheck)=>this.setState({passwordCheck : passwordCheck})}
                                secureTextEntry={this.state.passwordCheckSecureEntry}
                            />
                            <TouchableOpacity
                                onPress={this._togglePasswordCheck}
                            >
                                <Icon name='eye-slash' size={20} style={{marginLeft : 10}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        
                <TouchableOpacity 
                    style={{width: width, 
                    height: 50, 
                    backgroundColor: Colors.buttonSky, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: 0}}
                    onPress={this._nextStep}
                >
                    <Text style={{color : Colors.white, fontSize : 20, fontWeight : '700'}}>다음</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({

})