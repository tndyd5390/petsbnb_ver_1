import React, {Component} from 'react';
import Colors from '../utils/Colors';
import PropTypes from 'prop-types';
import RoundedButton from './components/buttons/RoundedButton';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity
} from 'react-native';
const{width, height} = Dimensions.get('window');

export default class SignUpForm extends Component{
    _SignUpHandle = () => {
        console.log("test");
    }
    render(){
        return(
            <ScrollView style={{backgroundColor : Colors.white}}>
                <View style={{alignItems : 'center'}}>
                    <Image source={require('../../img/user.png')} style={{width : 150, height : 150, marginTop : 30}}/>
                </View>
                <View style={{alignItems : 'center'}}>
                    <View style={{display : 'flex', width : width -40}}>
                        <Text style={{fontSize : 17, fontWeight : '500'}}>이름</Text>
                        <TextInput 
                            style={{borderBottomWidth : 1, height : 40}}
                            placeholder="이름"
                        />
                    </View>
                </View>
                <View style={{alignItems : 'center', marginTop : 10}}>
                    <View style={{display : 'flex', width : width -40}}>
                        <Text style={{fontSize : 17, fontWeight : '500'}}>이메일</Text>
                        <TextInput 
                            style={{borderBottomWidth : 1, height : 40}}
                            placeholder="이메일"
                        />
                    </View>
                </View>
                <View style={{alignItems : 'center', marginTop : 10}}>
                    <View style={{display : 'flex', width : width -40}}>
                        <Text style={{fontSize : 17, fontWeight : '500'}}>비밀번호</Text>
                        <TextInput 
                            style={{borderBottomWidth : 1, height : 40}}
                            placeholder="비밀번호"
                        />
                    </View>
                </View>
                <View style={{alignItems : 'center', marginTop : 10}}>
                    <View style={{display : 'flex', width : width-40}}>
                        <Text style={{fontSize : 17, fontWeight : '500'}}>우편번호</Text>
                        <View style={{flexDirection : 'row'}}>
                            <TextInput
                                style={{borderBottomWidth : 1, height : 40, width : width-200}}
                                placeholder="우편번호"
                            />
                            
                            <TouchableOpacity style={{width : 150, borderWidth : 1, marginLeft : 10, justifyContent : 'center', alignItems :'center'}}>
                                <Text >우편번호 검색</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{alignItems : 'center', marginTop : 10}}>
                    <View style={{display : 'flex', width : width -40}}>
                        <Text style={{fontSize : 17, fontWeight : '500'}}>주소</Text>
                        <TextInput 
                            style={{borderBottomWidth : 1, height : 40}}
                            placeholder="주소"
                        />
                    </View>
                </View>
                <View style={{alignItems : 'center', marginTop : 10}}>
                    <View style={{display : 'flex', width : width -40}}>
                        <Text style={{fontSize : 17, fontWeight : '500'}}>상세주소</Text>
                        <TextInput 
                            style={{borderBottomWidth : 1, height : 40}}
                            placeholder="상세주소"
                        />
                    </View>
                </View>
                <View style={{alignItems : 'center', marginTop : 10}}>
                    <View style={{display : 'flex', width : width -40}}>
                        <Text style={{fontSize : 17, fontWeight : '500'}}>전화번호</Text>
                        <TextInput 
                            style={{borderBottomWidth : 1, height : 40}}
                            placeholder="전화번호"
                        />
                    </View>
                </View>
                <View style={{alignItems : 'center'}}>
                    <RoundedButton
                        title="회원가입"
                        buttonHandleFunc={this._SignUpHandle}
                        buttonColor={{backgroundColor : Colors.buttonSky}}
                        textColor={{color : Colors.white}}
                        textSize={{fontSize : 20}}
                        customButtonStyle={{marginBottom : 20}}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

});