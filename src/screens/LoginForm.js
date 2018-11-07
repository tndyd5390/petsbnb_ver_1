import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  View,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import Colors from '../utils/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const{height, width} = Dimensions.get('window');


class LoginForm extends Component {
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
            <TextInput style={{borderBottomWidth : 1, paddingTop : 5, paddingBottom : 5, width : width-60}}/>
          </View>

          <View style={{alignItems : 'center', marginTop : 20}}>
            <View style={{display : 'flex', width : width -60}}>
              <Text style={{textAlign : 'left', fontSize : 17, fontWeight : '500'}}>패스워드</Text>
            </View>
            <TextInput style={{borderBottomWidth : 1, paddingTop : 5, paddingBottom : 5, width : width-60}}/>
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
                                  bottom: 0}}>
          <Text style={{color : Colors.white, fontSize : 20, fontWeight : '700'}}>로그인</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

export default LoginForm;

const styles = StyleSheet.create({
  
})