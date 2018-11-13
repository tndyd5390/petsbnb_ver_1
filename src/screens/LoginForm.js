import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  View,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import Colors from '../utils/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const{height, width} = Dimensions.get('window');


class LoginForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      email : '',
      password : ''
    }
  }

  _login = () => {
    if(this.state.email == ''){
      alert("이메일을 입력해주세요.");
      return;
    }else if(this.state.password == ''){
      alert("비밀번호를 입력해 주세요.");
      return;
    }else{
      this._loginProc();
    }
  }

  _loginProc = () => {
    const {email, password} = this.state;
    const params = {
      email : email,
      password : password
    }
    fetch('http://192.168.0.10:8080/user/loginProc.do', {
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
        if(res.loginSuccess === true){
            //가입 성공
          try{
            console.log(res.userNo);
            this._storeData(res.userNo);
            this.props.navigation.navigate('Tabs');
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
    try{
      await AsyncStorage.setItem('userInfo', data);
    }catch(err){

    }
  }

  _checkData = async() => {
    try{
      const data = await AsyncStorage.getItem('userInfo');
      console.log(data);
    }catch(err){

    }
  }

  render() {
    return (
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
              style={{
                borderBottomWidth : 1, 
                paddingTop : 5, 
                paddingBottom : 5, 
                width : width-60
                }}
              onChangeText={(email) => this.setState({email : email})}
            />
          </View>

          <View style={{alignItems : 'center', marginTop : 20}}>
            <View style={{display : 'flex', width : width -60}}>
              <Text style={{textAlign : 'left', fontSize : 17, fontWeight : '500'}}>패스워드</Text>
            </View>
            <TextInput 
              style={{
                borderBottomWidth : 1, 
                paddingTop : 5, 
                paddingBottom : 5, 
                width : width-60
                }}
              onChangeText={(password) => this.setState({password : password})}
              secureTextEntry={true}
            />
          </View>
        </View>

        <View style={{alignItems : 'center', marginTop : 20}}>
          <View style={{width : width -60, flexDirection : 'row', justifyContent : 'flex-end'}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('FindEmail')}
            >
              <Text style={{textAlign : 'right', fontSize : 17, fontWeight : '500', marginRight : 20}}>이메일 찾기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('FindPassword')}
            >
              <Text style={{textAlign : 'right', fontSize : 17, fontWeight : '500'}}>비밀번호 찾기</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity style={{width: width, 
                                  height: 50, 
                                  backgroundColor: Colors.buttonSky, 
                                  justifyContent: 'center', 
                                  alignItems: 'center',
                                  position: 'absolute',
                                  bottom: 0}}
                          onPress={this._login}>
          <Text style={{color : Colors.white, fontSize : 20, fontWeight : '700'}}>로그인</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

export default LoginForm;

const styles = StyleSheet.create({
  
})