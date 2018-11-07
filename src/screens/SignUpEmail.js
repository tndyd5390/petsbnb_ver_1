import React, {Component} from 'react';
import Colors from '../utils/Colors';
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
    TextInput
} from 'react-native';

const{width, height} = Dimensions.get('window');

export default class SignUpEmail extends Component {
    
    state = {
        terms : false,
        authorization : false,
        agreeAll : false,
        email : ''
    }
    

    _agreeAll = () => {
        this.setState({
            agreeAll : !this.state.agreeAll,
            terms : !this.state.agreeAll,
            authorization : !this.state.agreeAll
        })
    }

    _agreeWithTerms = () => {
        const {terms} = this.state;
        if(!terms == false){
            this.setState({
                agreeAll : false
            })
        }
        this.setState({
            terms : !terms
        }, this._checkAllAgree);
        
    }

    _agreeWithAuthorization = () => {
        const{authorization} = this.state;
        
        if(!authorization == false){
            this.setState({
                agreeAll : false
            })
        }
        this.setState({
            authorization : !authorization
        }, this._checkAllAgree);
        
    }

    _checkAllAgree = () => {
        const keys = Object.keys(this.state);
        let flag = true;
        keys.forEach(element => {
            if(element === 'agreeAll') return;
            if(element === 'email') return;
            if(this.state[element] == false){
                flag = false
            }
        });
        if(flag){
            this.setState({
                agreeAll : true
            })
        }
    }

    _nextStep = () => {
        const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(emailCheckRegex.test(this.state.email));
        if(!this.state.terms){
            alert('가입약관에 동의해주세요.');
        }else if(!this.state.authorization){
            alert('본인인증 규정에 동의해주세요.');
        }else if(this.state.email === ''){
            alert('이메일을 입력해주세요.');
        }else if(!emailCheckRegex.test(this.state.email)){
            alert('이메일 양식을 확인해 주세요.');
        }else{
            this.props.navigation.navigate('SignUpPassword', {email : this.state.email});
        }
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

                <View style={{alignItems : 'center'}}>
                    <View style={{display : 'flex', width : width -60, flexDirection : 'row', marginTop : 20}}>
                        <TouchableOpacity
                            onPress={this._agreeAll}
                        >
                            <FontAwesome5 name={'check-square'} size={20} style={[this.state.agreeAll ? {color : Colors.buttonSky} : null]}/>
                        </TouchableOpacity>
                        <Text style={{marginLeft : 10}}>전체 동의</Text>
                    </View>
                </View>


                <View style={{alignItems : 'center'}}>
                    <View style={{display : 'flex', width : width -60, flexDirection : 'row', marginTop : 20}}>
                        <TouchableOpacity
                            onPress={this._agreeWithTerms}
                        >
                            <FontAwesome5 name={'check-square'} size={20} style={[this.state.terms ? {color : Colors.buttonSky} : null]}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginLeft : 10}}
                            onPress={() => this.props.navigation.navigate('Terms')}
                        >
                            <Text style={{textDecorationLine : 'underline'}}>가입약관에 동의합니다.</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{alignItems : 'center'}}>
                    <View style={{display : 'flex', width : width -60, flexDirection : 'row', marginTop : 20}}>
                        <TouchableOpacity
                            onPress={this._agreeWithAuthorization}
                        >
                            <FontAwesome5 name={'check-square'} size={20} style={[this.state.authorization ? {color : Colors.buttonSky} : null]}/>
                        </TouchableOpacity>
                        <Text style={{marginLeft : 10}}>본인인증 관련 규정에 </Text>
                        <TouchableOpacity>
                            <Text style={{textDecorationLine : 'underline'}}>동의합니다.</Text>
                        </TouchableOpacity>
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