import React, {Component} from 'react';
import Colors from '../utils/Colors';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Dimensions,
    Picker
} from 'react-native';
const {width, height} = Dimensions.get('window');

export default class SignUpNameAndPhone extends Component{
    constructor(props) {
        super(props);
        this.state = {
            nextStepButtonActive : false,
            localPerson : true,
            foreigner : false,
            male : true,
            female : false,
            name : '',
            birthday : '',
            teleCorp : 'SKT',
            phoneNumber : '',
            agreeAll : false,
            terms : false,
            authorization : false
        }
    }

    _pressLocalPerson = () => {
        this.setState({
            localPerson : true,
            foreigner : false
        })
    }

    _pressForeigner = () => {
        this.setState({
            localPerson : false,
            foreigner : true
        })
    }

    _pressMale = () => {
        this.setState({
            male : true,
            female : false
        })
    }

    _pressFemale = () => {
        this.setState({
            female : true,
            male : false
        })
    }

    _toggleAgreeAll = () => {
        const tmp = !this.state.agreeAll;
        this.setState({
            agreeAll : tmp,
            terms : tmp,
            authorization : tmp,
            nextStepButtonActive : tmp
        })
    }
    _toggleTerms = () => {
        const terms = !this.state.terms;
        this.setState({
            terms :terms
        }, this._checkAgreeAll)
    }

    _toggleAuthorization = () => {
        const auto = !this.state.authorization;
        this.setState({
            authorization : auto
        }, this._checkAgreeAll)
    }

    _checkAgreeAll = () => {
        const keys = ['terms', 'authorization'];
        let flag = false;
        let cnt = 0;
        keys.forEach(key => {
            if(this.state[key] == true){
                cnt++;
            }
        });
        if(cnt == keys.length){
            flag = true;
        }

        this.setState({
            agreeAll : flag
        })
    }

    _nextStep = () => {
        const email = this.props.navigation.getParam('email');
        
        if(!this.state.agreeAll){
            alert('약관에 동의해주세요.');
        }else{
            const params = {
                email : email,
                name : this.state.name,
                birthday : this.state.birthday,
                teleCorp : this.state.teleCorp,
                phoneNumber : this.state.phoneNumber,
            }
            this.props.navigation.navigate('SignUpPassword', params)
        }
    }

    render(){
        return (
            <KeyboardAvoidingView style={{flex : 1, backgroundColor : Colors.white}}>
                <View style={{alignItems : 'center', marginTop : 30}}>
                    <View style={{borderWidth : 2, borderColor : Colors.lightGrey, width : width - 40, height : 50, flexDirection : 'row'}}>
                        <TextInput 
                            style={{width : 245, paddingLeft : 10 }}
                            placeholder='실명을 입력해 주세요.'
                            onChangeText={(name) => this.setState({name : name})}
                        />
                        
                        <TouchableOpacity 
                            style={[{
                                borderRadius : 10, 
                                borderColor : Colors.lightGrey, 
                                width : 50, 
                                height : 35, 
                                marginLeft : 10, 
                                marginTop : 7, 
                                justifyContent : 'center', 
                                alignItems : 'center'
                            }, this.state.localPerson == true && this.state.foreigner == false ? {borderWidth : 2} : null]}
                            onPress={this._pressLocalPerson}
                        >
                            <Text>내국인</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[{
                                borderRadius : 10, 
                                borderColor : Colors.lightGrey, 
                                width : 50, 
                                height : 35, 
                                marginLeft : 10, 
                                marginTop : 7, 
                                justifyContent : 'center', 
                                alignItems : 'center'
                                }, this.state.foreigner == true && this.state.localPerson == false ? {borderWidth : 2} : null]}
                            onPress={this._pressForeigner}
                        >
                            <Text>외국인</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
                <View style={{alignItems : 'center'}}>
                    <View style={{borderLeftWidth : 2, borderRightWidth : 1, borderBottomWidth : 1, borderColor : Colors.lightGrey, width : width - 40, height : 50, flexDirection : 'row'}}>
                        <TextInput 
                            style={{width : 250, paddingLeft : 10 }}
                            placeholder='생년월일 예)930522.'
                            keyboardType='numeric'
                            onChangeText={(birthday) => this.setState({birthday : birthday})}
                        />
                        
                        <TouchableOpacity 
                            style={[{
                                borderRadius : 10, 
                                borderColor : Colors.lightGrey, 
                                width : 40, 
                                height : 35, 
                                marginLeft : 10, 
                                marginTop : 7, 
                                justifyContent : 'center', 
                                alignItems : 'center'}, this.state.male == true && this.state.female == false ? {borderWidth : 2} : null]}
                            onPress={this._pressMale}
                        >
                            <Text>남성</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[{
                                borderRadius : 10, 
                                borderColor : Colors.lightGrey, 
                                width : 40, 
                                height : 35, 
                                marginLeft : 20, 
                                marginTop : 7, 
                                justifyContent : 'center', 
                                alignItems : 'center'}, this.state.female == true && this.state.male == false ? {borderWidth : 2} : null]}
                            onPress={this._pressFemale}
                        >
                            <Text>여성</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>

                <View style={{alignItems : 'center', marginTop : 15}}>
                    <View style={{borderWidth : 1,borderColor : Colors.lightGrey, width : width -40, height : 50, flexDirection : 'row'}}>
                        <View style={{borderRightWidth : 1, borderRightColor : Colors.lightGrey, width : '25%', height : '100%', alignItems : 'center', justifyContent : 'center'}}>
                            <Picker
                                selectedValue={this.state.teleCorp}
                                style={{ height: '100%', width: '100%' }}
                                onValueChange={(itemValue, itemIndex) => this.setState({teleCorp: itemValue})}>
                                <Picker.Item label="SKT" value="SKT" />
                                <Picker.Item label="KT" value="KT" />
                                <Picker.Item label="LG" value="LG" />
                            </Picker>
                        </View>
                        <View style={{borderRightWidth : 1, borderRightColor : Colors.lightGrey, height : '100%', width : '50%'}}>
                            <TextInput
                                placeholder='전화번호(-없이 입력)'
                                keyboardType='numeric'
                                onChangeText={(phoneNumber) => this.setState({phoneNumber : phoneNumber})}
                            />
                        </View>
                        <View style={{height : '100%', width : '25%', alignItems : 'center'}}>
                            <TouchableOpacity style={{width : '100%', height : '100%', backgroundColor : Colors.orange, justifyContent : 'center', alignItems : 'center'}}>
                                <Text style={{color : Colors.white, fontWeight : '500'}}>전송</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{alignItems : 'center'}}>
                    <View 
                        style={{
                            width : width -40, 
                            height : 50,
                            borderLeftWidth : 1,
                            borderLeftColor : Colors.lightGrey,
                            borderBottomWidth : 1,
                            borderBottomColor : Colors.lightGrey,
                            borderRightWidth : 1,
                            borderRightColor : Colors.lightGrey
                        }}
                    >
                        <TextInput
                            style={{width : '100%', height : '100%'}}
                            placeholder='   전송된 인증번호를 입력해 주세요.'
                        />
                    </View>
                </View>

                <View style={{alignItems : 'center'}}>
                    <View style={{display : 'flex', width : width -60, flexDirection : 'row', marginTop : 20}}>
                        <TouchableOpacity
                            onPress={this._toggleAgreeAll}
                        >
                            <FontAwesome5 name={'check-square'} size={20} style={[this.state.agreeAll ? {color : Colors.buttonSky} : null]}/>
                        </TouchableOpacity>
                        <Text style={{marginLeft : 10}}>전체 동의</Text>
                    </View>
                </View>


                <View style={{alignItems : 'center'}}>
                    <View style={{display : 'flex', width : width -60, flexDirection : 'row', marginTop : 20}}>
                        <TouchableOpacity
                            onPress={this._toggleTerms}
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
                            onPress={this._toggleAuthorization}
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