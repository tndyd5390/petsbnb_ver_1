import React, {Component} from 'react';
import Colors from '../../utils/Colors';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
const{width, height} = Dimensions.get('window');

export default class TmpSignUpNameAndPhone extends Component{

    constructor(props){
        super(props);
        this.state = {
            name : '',
            phoneNumber : ''
        }
    }

    _nextStep = () => {
        const email = this.props.navigation.getParam('email');
        const {name, phoneNumber} = this.state;
        const params = {
            email : email,
            name : name,
            phoneNumber : phoneNumber
        }
        if(name == ''){
            alert('이름을 입력해주세요');
        }else if(phoneNumber == ''){
            alert('전화번호를 입력해주세요');
        }else{
            this.props.navigation.navigate('SignUpPassword', params);
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
                            <Text style={{textAlign : 'left', fontSize : 17, fontWeight : '500'}}>이름</Text>
                        </View>
                        <TextInput 
                            name='email'
                            style={{borderBottomWidth : 1, paddingTop : 5, paddingBottom : 5, width : width-60}} 
                            placeholder='실명을 입력해주세요.'
                            onChangeText={(name) => this.setState({name : name})}
                        />
                    </View>

                    <View style={{alignItems : 'center', marginTop : 20}}>
                        <View style={{display : 'flex', width : width -60}}>
                            <Text style={{textAlign : 'left', fontSize : 17, fontWeight : '500'}}>전화번호</Text>
                        </View>
                        <TextInput 
                            name='email'
                            style={{borderBottomWidth : 1, paddingTop : 5, paddingBottom : 5, width : width-60}} 
                            placeholder='-없이 입력해주세요'
                            keyboardType='numeric'
                            onChangeText={(phoneNumber) => this.setState({phoneNumber : phoneNumber})}
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