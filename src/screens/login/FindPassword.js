import React,{Component} from 'react';
import Colors from '../../utils/Colors';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { StackActions, NavigationActions } from 'react-navigation';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity,
    TextInput,
    Platform,
    ActivityIndicator
} from 'react-native';
const{width, height} = Dimensions.get('window');
export default class FindPassword extends Component{

    constructor(props){
        super(props);
        this.state = {
            activityIndicator : false,
            email : '',
            name : '',
            phone : ''
        }
    }
    //비밀번호 찾기 메소드
    _findPassword = async() => {
        const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(this.state.email == ''){
            alert('이메일을 입력해주세요');
            return;
        }else if(!emailCheckRegex.test(this.state.email)){
            alert('이메일 양식을 확인해 주세요.');
            return;
        }else if(this.state.name == ''){
            alert('이름을 입력해 주세요.');
            return;
        }else if(this.state.phone == ''){
            alert('전화번호를 입력해 주세요.');
            return;
        }else{
            this.setState({
                activityIndicator : true
            })
            const params = {
                email : this.state.email,
                name : this.state.name,
                phone : this.state.phone
            }
            await fetch('http://192.168.0.10:8080/user/userFindPassword.do', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            })
            .then((resp) => resp.json())
            .then((res => {
                this.setState({
                    activityIndicator : false
                })
                if(res.result){
                    alert('입력하신 이메일 주소로 임시비밀번호를 전송하였습닏다.');
                    this._gotoInit();
                }else{
                    alert('입력하신 정보와 일치하는 회원이 없습니다.');
                    this.setState({
                        name : '',
                        phone : '',
                        email : ''
                    })
                }
            }))
            .catch((err) => {
                alert(err);
            })
        }
    }

    _gotoInit = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Init' })],
        });
        this.props.navigation.dispatch(resetAction);
    }

    render(){
        return(
            <KeyboardAvoidingView style={{flex : 1, backgroundColor : Colors.white}}>
            {this.state.activityIndicator ? (
                <View style={{backgroundColor : 'rgba(0,0,0,0.2)', width : width, height : height, position : 'absolute', zIndex : 10, alignItems : 'center', justifyContent : 'center'}}>
                    <ActivityIndicator size="large" color="#10b5f1"/>
                </View>
            ) : (null)}
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
                            style={{borderBottomWidth : 1, paddingTop : 5, paddingBottom : 5, width : width-60}} 
                            value={this.state.email}
                            onChangeText={(email) => this.setState({email : email})}
                        />
                    </View>
                    <View style={{alignItems : 'center', marginTop : 20}}>
                        <View style={{display : 'flex', width : width -60}}>
                            <Text style={{textAlign : 'left', fontSize : 17, fontWeight : '500'}}>이름</Text>
                        </View>
                        <TextInput 
                            style={{borderBottomWidth : 1, paddingTop : 5, paddingBottom : 5, width : width-60}} 
                            value={this.state.name}
                            onChangeText={(name) => this.setState({name : name})}
                        />
                    </View>
                    <View style={{alignItems : 'center', marginTop : 20}}>
                        <View style={{display : 'flex', width : width -60}}>
                            <Text style={{textAlign : 'left', fontSize : 17, fontWeight : '500'}}>전화번호</Text>
                        </View>
                        <TextInput 
                            placeholder='-업이 입력'
                            style={{borderBottomWidth : 1, paddingTop : 5, paddingBottom : 5, width : width-60}} 
                            value={this.state.phone}
                            onChangeText={(phone) => this.setState({phone : phone})}
                            keyboardType='numeric'
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
                    onPress={this._findPassword}
                >
                    <Text style={{color : Colors.white, fontSize : 20, fontWeight : '700'}}>비밀번호 찾기</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}