import React, {Component} from 'react';
import Colors from '../../utils/Colors';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {CheckBox, colors} from 'react-native-elements';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Dimensions,
    TextInput,
    SafeAreaView,
    Platform
} from 'react-native';
import { ip } from "../../utils/const";
const{width, height} = Dimensions.get('window');

export default class SignUpEmail extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            email : ''
        }
    }

    _nextStep = async () => {
        const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if(this.state.email === ''){
            alert('이메일을 입력해주세요.');
        }else if(!emailCheckRegex.test(this.state.email)){
            alert('이메일 양식을 확인해 주세요.');
        }else{
            const params = {
                email : this.state.email
            }
            await fetch(`${ip}/user/emailCheck.do`, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
              })
              .then((response) => response.json())
              .then((res => {
                  console.log(res);
                  if(res.emailValid === true){
                    //가입 성공
                    this.props.navigation.navigate('TmpSignUpNameAndPhone', {email : this.state.email});
                  }else{
                      //가입 실패
                      alert('이미 사용중인 이메일입니다.');
                      return;
                  }
              }))
            
        }
    }

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
                            placeholder='이메일은 아이디로 사용됩니다.'
                            onChangeText={(text)=>this.setState({email : text})}
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
                    <Text style={{color : Colors.white, fontSize : 20, fontWeight : '700'}}>다음</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            
        );
    }
}

const styles = StyleSheet.create({

})