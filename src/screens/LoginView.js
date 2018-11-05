import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  Dimensions,
  Image,
  TextInput
} from 'react-native';
import Colors from '../utils/Colors';
import PropTypes from 'prop-types';
import RoundedButton from '../screens/components/buttons/RoundedButton';
import LoginProc from '../utils/LoginProc';
const{height, width} = Dimensions.get('window');


class LoginView extends Component {

  constructor(props){
    super(props);
    this.state = {
      id : '',
      password : '',
      
    }
  }

  _loginButtonHandle = () => {
    console.log("loginbutton click");
    this.props.navigation.navigate('ProfileMenu');
  }

  _regUserButtonHandle = () => {
    this.props.navigation.navigate('SignUpForm');
  }

  _findIdButtonHandle = () => {
      console.log('find id button is clicked');
  }

  _findPasswordButtonHandle = () => {
      console.log('find password button is clicked');
  }


  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image source={require('../../img/user.png')} style={{width : 100, height : 100, marginTop : 30}}/>
        </View>
        <View style={{width : width-60}}>
          <Text style={styles.idText}>아이디</Text>
          <TextInput style={{borderBottomWidth : 1, paddingTop : 5, paddingBottom : 5}}
            onChangeText={(id)=> this.setState({id : id})}
          />
        </View>
        <View style={{width : width-60, marginTop : 10}}>
          <Text style={styles.idText}>비밀번호</Text>
          <TextInput style={{borderBottomWidth : 1, paddingTop : 5, paddingBottom : 5}}
            onChangeText={(password) => this.setState({password : password})}
          />
        </View>
        <RoundedButton 
          title={'로그인'} 
          buttonHandleFunc={this._loginButtonHandle} 
          buttonColor={{backgroundColor : Colors.buttonBlue}} 
          textColor={{color:Colors.white}}
        />
        <RoundedButton 
          title={'회원가입'} 
          buttonHandleFunc={this._regUserButtonHandle}
          buttonColor={{backgroundColor : Colors.buttonBlue}}
          textColor={{color : Colors.white}}
        />

        <View style={{flex : 1, flexDirection : 'row'}}>
          <RoundedButton 
            title={'아이디 찾기'} 
            buttonHandleFunc={this._regUserButtonHandle}
            buttonColor={{backgroundColor : Colors.buttonBlue}}
            textColor={{color : Colors.white}}
            customButtonStyle={{width : width/2 - 30, height : 30, marginRight : 5}}
          />
          <RoundedButton 
            title={'비밀번호 찾기'} 
            buttonHandleFunc={this._regUserButtonHandle}
            buttonColor={{backgroundColor : Colors.buttonBlue}}
            textColor={{color : Colors.white}}
            customButtonStyle={{width : width/2 - 30, height : 30, marginLeft : 5}}
          />
        </View>
      </View>
    );
  }
}

export default LoginView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
  }, 
  idText : {
    fontSize : 20,
    marginTop : 10
  }
});