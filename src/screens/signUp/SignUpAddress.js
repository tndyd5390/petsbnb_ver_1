import React, {Component} from 'react';
import Colors from '../../utils/Colors';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    WebView,
    AsyncStorage,
    Platform
} from 'react-native';
const{width, height} = Dimensions.get('window');

export default class SignUpAddress extends Component{
    constructor(props){
        super(props);
        this.state = {
            zipCode : '',
            address : '',
            addressDetail : '',
            daumWebView : false
        }
    }
    

    _getAddressData = (event) => {
        let data = JSON.parse(event.nativeEvent.data);
        this.setState({
            daumWebView : false,
            zipCode : data.zonecode,
            address : data.fullAddr
        })
    }

    _daumWebView = () => {
        this.setState({
            daumWebView : true
        })
    }

    _nextStep = () => {
        if(this.state.zipCode == ''){
            alert('우편번호를 확인해 주세요.');
        }else if(this.state.address == ''){
            alert('주소를 확인해 주세요.');
        }else if(this.state.addressDetail == ''){
            alert('상세주소를 확인해 주세요.');
        }else{
            this._regUser();
        }
    }

    _regUser = async () => {
        const navi = this.props.navigation;
        const email = navi.getParam('email');
        const name = navi.getParam('name');
        const phoneNumber = navi.getParam('phoneNumber');
        const password = navi.getParam('password');
        const params = {
            email : email || 'email',
            name : name || 'name',
            phoneNumber : phoneNumber || '01057907883',
            password : password || 'tndyd5390@',
            zipCode : this.state.zipCode,
            address : this.state.address,
            addressDetail : this.state.addressDetail
        }
        
        fetch('http://192.168.0.10:8080/user/userRegProc.do', {
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
              if(res.regSuccess === true){
                  //가입 성공
                try{
                    console.log(res.userNo);
                    this._storeData(res.userNo);
                    alert('회원 가입 되셨습니다.');
                    navi.navigate('Tabs');
                }catch(error){
                    alert('다시 시도해주세요.')
                }
              }else{
                  //가입 실패
                  alert('서버에 문제가 있습니다. 잠시후 다시 시도해주세요.');
              }
          }))
        
    }

    _storeData = async (data) => {
        try {
         const tmp = await AsyncStorage.setItem('userInfo', data);
        } catch (error) {
          // Error saving data
        }
      }

    render() {
        if(this.state.daumWebView){
            return(
                <WebView
                    /**여기 주소는 나중에 웹뷰 보여줄 도메인으로 대체해야함 */
                    source={{uri: 'http://192.168.0.10:8080/user/daumPostView.do'}}
                    onMessage={(event) => {this._getAddressData(event)}}
                    style={{width : width, height : 300}}
                />
            );
        }else{
            return(
                <KeyboardAvoidingView style={{flex : 1, backgroundColor : Colors.white}}>
                    <View style={[{display : 'flex'}, Platform.OS ==='ios' ? {marginTop : 10} : null]}>
                        <TouchableOpacity
                            style={{marginTop : 20, marginLeft : 20, marginBottom : 20}}
                            onPress={()=>this.props.navigation.goBack()}
                        >
                            <Icon name="angle-left" size={40}/>
                        </TouchableOpacity>
            
                        <View style={{alignItems : 'center', marginTop : 5}}>
                        <View style={{display : 'flex', width : width-60}}>
                            <Text style={{fontSize : 17, fontWeight : '500'}}>우편번호</Text>
                            <View style={{flexDirection : 'row'}}>
                                <TextInput
                                    style={{borderBottomWidth : 1, height : 40, width : width-200}}
                                    placeholder="우편번호"
                                    value={this.state.zipCode}
                                    onChangeText={(zipCode)=>this.setState({zipCode : zipCode})}
                                />
                                
                                <TouchableOpacity style={{width : 130,backgroundColor : Colors.buttonSky, marginLeft : 10, justifyContent : 'center', alignItems :'center', elevation : 4}}
                                    onPress={this._daumWebView}
                                >
                                    <Text style={{color : Colors.white, fontWeight : '500'}}>우편번호 검색</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                        
                        <View style={{alignItems : 'center', marginTop : 20}}>
                            <View style={{display : 'flex', width : width -60}}>
                                <Text style={{textAlign : 'left', fontSize : 17, fontWeight : '500'}}>주소</Text>
                            </View>
                            <TextInput
                                style={{borderBottomWidth : 1, paddingTop : 5, paddingBottom : 5, width : width-60}} 
                                onChangeText={(text)=>this.setState({address : text})}
                                placeholder="주소"
                                value={this.state.address}
                            />
                        </View>
                        <View style={{alignItems : 'center', marginTop : 20}}>
                            <View style={{display : 'flex', width : width -60}}>
                                <Text style={{textAlign : 'left', fontSize : 17, fontWeight : '500'}}>상세 주소</Text>
                            </View>
                            <TextInput
                                style={{borderBottomWidth : 1, paddingTop : 5, paddingBottom : 5, width : width-60}} 
                                onChangeText={(text)=>this.setState({addressDetail : text})}
                                placeholder="상세주소"
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
                        <Text style={{color : Colors.white, fontSize : 20, fontWeight : '700'}}>가입</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            );
        }
    }
}