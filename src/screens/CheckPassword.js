import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Colors from '../utils/Colors';
import RoundedButton from './components/buttons/RoundedButton';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Dimensions,
    AsyncStorage
} from 'react-native';
const {width, height} = Dimensions.get('window');

export default class CheckPassword extends Component{

    constructor(props){
        super(props);
        this.state = {
            password : ''
        }
    }

    _buttonHandleFunc = async () => {
        if(this.state.password == ''){
            alert('비밀번호를 입력해 주세요.');
            return;
        }
        const nextView = this.props.navigation.getParam('nextView');
        const userInfo = await AsyncStorage.getItem('userInfo');
        const params = {
            userNo : userInfo,
            password : this.state.password
        }
        await fetch('http://192.168.0.10:8080/user/checkPassword.do', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
            })
            .then((response) => response.json())
            .then((res => {
                if(res.passwordCheck == true){
                    this.props.navigation.navigate(nextView);
                }else{
                    alert('비밀번호가 일치하지 않습니다');
                    return;
                }
            }))
    }

    render(){
        
        
        return(
            <View style={{backgroundColor : Colors.white, width : width, height : height}}>
                <View style={{width : '100%', height : 50, alignItems : 'center', justifyContent : 'center'}}>
                    <Text>회원정보 변경을 위해 비밀번호를 입력해주세요.</Text>
                </View>
                <View style={{width : '100%',  alignItems : 'center'}}>
                   
                    <View style={{width : width - 40}}>
                        <TextInput
                            style={{borderBottomWidth : 1, borderBottomColor : Colors.buttonBorderGrey}}
                            placeholder='비밀번호를 입력해주세요.'
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({password : password})}
                        />
                    </View>
                </View>
                <View style={{alignItems : 'center'}}>
                    <RoundedButton 
                        title='확인' 
                        buttonHandleFunc={this._buttonHandleFunc} 
                        buttonColor={{backgroundColor : Colors.buttonSky}}
                        textColor={{color : Colors.white}}
                     />
                </View>
            </View>    
        );

    }
}