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
    TouchableOpacity,
    WebView
} from 'react-native';
const{width, height} = Dimensions.get('window');

export default class SignUpForm extends Component{



    constructor(props){
        super(props);
        this.state = {
            postCode : '',
            address : '',
            addressDetail : '',
            daumPostCodeView : false
        }
    }

    _SignUpHandle = () => {
        this.setState({
            daumPostCodeView : true
        })
    }

    _daumPostCode = () => {
        this.setState({
            daumPostCodeView : true
        })
    }

    _getAddressData = (event) => {
        let code = JSON.parse(event.nativeEvent.data);
        this.setState({
            daumPostCodeView : false,
            postCode : code.zonecode,
            address : code.fullAddr
        })
    }

    render(){

        const{daumPostCodeView} = this.state;

        if(daumPostCodeView){
            return(
                <WebView
                    /**여기 주소는 나중에 웹뷰 보여줄 도메인으로 대체해야함 */
                    source={{uri: 'http://192.168.0.10:8080/mobile/camera.jsp'}}
                    onMessage={(event) => {this._getAddressData(event)}}
                    style={{width : width, height : 300}}
                />
            );
        }else{
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
                                value={this.state.postCode}
                            />
                            
                            <TouchableOpacity style={{width : 150, borderWidth : 1, marginLeft : 10, justifyContent : 'center', alignItems :'center'}}
                                onPress={this._daumPostCode}
                            >
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
                            value={this.state.address}
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
}

const styles = StyleSheet.create({

});