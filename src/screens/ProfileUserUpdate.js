import React, {Component} from 'react';
import Colors from '../utils/Colors';
import PropTypes from 'prop-types';
import RoundedButton from './components/buttons/RoundedButton';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import {
    View,
    Text,
    Dimensions,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    ScrollView,
    Image,
    StyleSheet
} from 'react-native';
import { colors } from 'react-native-elements';
const{width, height} = Dimensions.get('window');

const options={
    
    takePhotoButtonTitle : '사진 촬영',
    chooseFromLibraryButtonTitle : '갤러리에서 고르기'
}

export default class ProfileUserUpdate extends Component {

    constructor(props){
        super(props);
        this.state = {
            userNo : '',
            userName : '',
            userAddress : '',
            userAddressDetail : '',
            userZipcode : '',
            userPhone : '',
            userEmail : '',
            imageSource : null,
            userPassword : '',
            daumWebView : false,
            filePath : '',
            imageData : null
        }
        this._getUserInfo();
        
    }

    _getUserInfo = async() => {
        const userNo = await AsyncStorage.getItem('userInfo');
        const params = {
            userNo : userNo
        }
        await fetch('http://192.168.0.10:8080/user/getUserInfo.do', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
          })
          .then((response) => response.json())
          .then((res => {
              if(res.userNo == null){
                return;
              }else{
                this.setState({
                    userNo : res.userNo,
                    userName : res.userName,
                    userAddress : res.userAddress,
                    userAddressDetail : res.userAddressDetail,
                    userZipcode : res.userZipcode,
                    userPhone : res.userPhone,
                    userEmail : res.userEmail
                })
              }
          }))
    }

    _butttonHandleFunc = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              const source = { uri: response.uri };
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
              console.log(source);
              console.log("test : " , response.uri)
              this.setState({
                imageSource: source,
                imageData : response.data
              });
            }
          });
    }

    _updateUserPassword = async () => {
        if(this.state.userPassword == ''){
            alert('비밀번호를 입력해 주세요.');
            return;
        }
        
        const params = {
            password : this.state.userPassword,
            userNo : this.state.userNo
        }
        await fetch('http://192.168.0.10:8080/user/userUpdatePassword.do', {
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
              if(res.updatePasswordSuccess === true){
                alert("비밀번호가 변경되었습니다");
              }else{
                  //가입 실패
                  alert('서버에 문제가 있습니다. 잠시후 다시 시도해주세요.');
              }
          }))
    }

    _uploadImage = async() => {
        await RNFetchBlob.fetch('POST', 'http://192.168.0.10:8080/user/userImageUpload.do', {
            Authorization : "Bearer access-token",
            otherHeader : "foo",
            'Content-Type' : 'multipart/form-data',
          }, [
            
            { name : 'image', filename : 'image.png', type:'image/png', data: this.state.imageData},
            
          ]).then((resp) => {
            // ...
          }).catch((err) => {
            // ...
          })
    }

    render(){
        return(
            <View  style={{backgroundColor : Colors.white}}>
                <ScrollView>

                    {this.state.imageSource == null ? (
                        <View style={{borderBottomWidth : 1, borderBottomColor : Colors.buttonBorderGrey, width : width, height : 200, alignItems : 'center', justifyContent : 'center'}}>
                            <RoundedButton
                                title='사진 등록'
                                buttonHandleFunc={this._butttonHandleFunc}
                                buttonColor={{backgroundColor : Colors.white}}
                                textColor={{color : Colors.buttonBorderGrey}}
                                textSize={{fontSize:15, fontWeight : '200'}}
                                customButtonStyle={{width : 90, height : 35, borderWidth : 1, borderColor : Colors.buttonBorderGrey}}
                            />
                        </View>
                    ) : (
                        <View style={{borderBottomWidth : 1, borderBottomColor : Colors.buttonBorderGrey, width : width, height : 200, alignItems : 'center', justifyContent : 'center'}}>
                            <Image source={this.state.imageSource} style={{width : '100%', height : '100%'}}/>
                        </View>
                    )}

                    <View style={{ height : 50, alignItems : 'center'}}>
                        <View style={{ height : '100%', width : width - 50, flexDirection : 'row'}}>
                            <Text style={{marginTop : 10, fontSize : 20, fontWeight : '500', color : Colors.black}}>
                                기본 정보
                            </Text>
                        </View>
                    </View>

                    <View style={{height : 70, alignItems : 'center'}}>
                        <View style={{width : width-40, height : '40%', justifyContent : 'center'}}>
                            <Text style={{fontSize : 16, fontWeight : '200'}}>이름</Text>
                        </View>
                        <View style={{width : width -40, height : '60%'}}>
                            <TextInput 
                                style={{backgroundColor : Colors.lightGrey, width : '100%', height : '100%', paddingLeft : 10, fontSize : 17}}
                                value={this.state.userName}
                                editable={false}
                            />
                        </View>
                    </View>

                    <View style={{height : 70, alignItems : 'center', marginTop : 10}}>
                        <View style={{width : width-40, height : '40%', justifyContent : 'center'}}>
                            <Text style={{fontSize : 16, fontWeight : '200'}}>이메일</Text>
                        </View>
                        <View style={{width : width -40, height : '60%'}}>
                            <TextInput 
                                style={{backgroundColor : Colors.lightGrey, width : '100%', height : '100%', paddingLeft : 10, fontSize : 17}}
                                value={this.state.userEmail}
                                editable={false}
                            />
                        </View>
                    </View>

                    <View style={{height : 70, alignItems : 'center', marginTop : 10}}>
                        <View style={{width : width-40, height : '40%', justifyContent : 'center'}}>
                            <Text style={{fontSize : 16, fontWeight : '200'}}>비밀번호</Text>
                        </View>
                        <View style={{width : width -40, height : '60%', flexDirection : 'row'}}>
                            <TextInput 
                                style={{backgroundColor : Colors.lightGrey, width : '70%', height : '100%', paddingLeft : 10, fontSize : 17}}
                                placeholder="*******"
                                secureTextEntry={true}
                                onChangeText={(password) => this.setState({userPassword : password})}
                            />
                            <TouchableOpacity
                                style={{borderWidth : 1, borderColor : Colors.black, width : '30%', alignItems : 'center', justifyContent : 'center'}}
                                onPress={this._updateUserPassword}
                            >
                            <Text>변경하기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{height : 70, alignItems : 'center', marginTop : 10}}>
                        <View style={{width : width-40, height : '40%', justifyContent : 'center'}}>
                            <Text style={{fontSize : 16, fontWeight : '200'}}>주소</Text>
                        </View>
                        <View style={{width : width -40, height : '60%', flexDirection : 'row'}}>
                            <TextInput 
                                style={{backgroundColor : Colors.lightGrey, width : '70%', height : '100%', paddingLeft : 10, fontSize : 17}}
                                value={this.state.userAddress + ' ' + this.state.userAddressDetail}
                                editable={false}
                            />
                            <TouchableOpacity
                                style={{borderWidth : 1, borderColor : Colors.black, width : '30%', alignItems : 'center', justifyContent : 'center'}}
                            >
                            <Text>검색하기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{height : 70, alignItems : 'center', marginTop : 10, marginBottom : 20}}>
                        <View style={{width : width-40, height : '40%', justifyContent : 'center'}}>
                            <Text style={{fontSize : 16, fontWeight : '200'}}>휴대폰</Text>
                        </View>
                        <View style={{width : width -40, height : '60%'}}>
                            <TextInput 
                                style={{backgroundColor : Colors.lightGrey, width : '100%', height : '100%', paddingLeft : 10, fontSize : 17}}
                                value={this.state.userPhone}
                                editable={false}
                            />
                        </View>
                    </View>

                    <TouchableOpacity 
                        style={{width : width, 
                        height: 50, 
                        backgroundColor: Colors.buttonSky, 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        bottom  : 0}}
                        onPress={this._uploadImage}
                    >
                        <Text style={{color : Colors.white, fontSize : 20, fontWeight : '700'}}>완료</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}