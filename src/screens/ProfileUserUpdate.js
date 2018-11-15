import React, {Component} from 'react';
import Colors from '../utils/Colors';
import PropTypes from 'prop-types';
import RoundedButton from './components/buttons/RoundedButton';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import Icon from 'react-native-vector-icons/FontAwesome';
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
    StyleSheet,
    ActivityIndicator,
    WebView
} from 'react-native';
import { colors } from 'react-native-elements';
const{width, height} = Dimensions.get('window');

const options={
    title : '사진',
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
            userPassword : '',
            imageFileNo : '',
            fileNo : '',
            fileOrgName : '',
            fileName : '',
            filePath : '',
            imageSource : null,
            daumWebView : false,
            imageData : null,
            activityIndicator : true
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
                    userEmail : res.userEmail,
                    fileNo : res.fileNo,
                    fileOrgName : res.fileOrgName,
                    fileName : res.fileName,
                    filePath : res.filePath,
                    activityIndicator : false
                })
              }
          }))
    }

    _butttonHandleFunc = () => {
        ImagePicker.showImagePicker(options, (response) => {
            
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              const source = { uri: response.uri };
              this.setState({
                imageSource: source,
                imageData : response.data,
                //사진을 고를 경우 파일 이름을 임의로 설정하여 사진이 화면에 출력되게끔 함
                fileName : "tmp"
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

        this.setState({
            activityIndicator : true
        })

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
              if(res.updatePasswordSuccess === true){
                alert("비밀번호가 변경되었습니다");
                this.setState({
                    activityIndicator : false
                })
              }else{
                  //가입 실패
                  alert('서버에 문제가 있습니다. 잠시후 다시 시도해주세요.');
              }
          }))
          .catch((err) => {
              alert(err, "잠시후 다시 시도해 주세요.");
          })
    }

    _uploadImage = async() => {
        this.setState({
            activityIndicator : true
        })

        if(this.state.imageSource == null){
            this.setState({
                activityIndicator : false
            })
            this.props.navigation.navigate('ProfileMenu');
            return;
        }
        
        
        await RNFetchBlob.fetch('POST', 'http://192.168.0.10:8080/user/userImageUpload.do', {
            Authorization : "Bearer access-token",
            'Content-Type' : 'multipart/form-data',
          }, [
            { name : 'image', filename : 'image.png', type:'image/png', data: this.state.imageData},
            { name : 'userNo', data : this.state.userNo}
          ])
          .then((resp) => resp.json())
          .then((res => {
            this.setState({
                activityIndicator : false
            })
            if(res.uploadImageSuccess == true){
                alert("사진 업로드 성공");
                this.props.navigation.navigate('ProfileMenu');
            }else{
                alert("사진 업로드 실패");
            }
          }))
          .catch((err) => {
            alert("서버 오작동");
          })
        
    }

    _getAddressData = (event) => {
        let data = JSON.parse(event.nativeEvent.data);
        this.setState({
            daumWebView : false,
            userZipcode : data.zonecode,
            userAddress : data.fullAddr
        })
    }

    _daumWebView = () => {
        this.setState({
            daumWebView : true
        })
    }

    _updateUserAddress = async () => {
        if(this.state.userAddressDetail == ''){
            alert('상세 주소를 입력해주세요');
            return;
        }
        this.setState({
            activityIndicator : true
        })
        const params = {
            zipcode : this.state.userZipcode,
            address : this.state.userAddress,
            addressDetail : this.state.userAddressDetail,
            userNo : this.state.userNo
        }

        await fetch('http://192.168.0.10:8080/user/userUpdateAddress.do', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
        .then((response)=> response.json())
        .then((res => {
            this.setState({
                activityIndicator : false
            })
            if(res.userUpdateAddressSuccess){
                alert('주소가 변경되었습니다');
            }else{
                alert('주소 변경에 실패 했습니다');
            }
        }))
        .catch((err) => {
            alert("서버 오작동");
        })
    }

    render(){
        const imageSource = this.state.imageSource == null ? {uri : 'http://192.168.0.10:8080/userImageFile/' + this.state.fileName} : this.state.imageSource;
        console.log(imageSource);
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
                <View  style={{backgroundColor : Colors.white}}>
                    {this.state.activityIndicator ? (
                        <View style={{backgroundColor : 'rgba(0,0,0,0.2)', width : width, height : height, position : 'absolute', zIndex : 10, alignItems : 'center', justifyContent : 'center'}}>
                            <ActivityIndicator size="large" color="#10b5f1"/>
                        </View>
                    ) : (null)}
                    <ScrollView>
                    {this.state.fileName == null ? (
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
                            <Image source={imageSource} style={{width : '100%', height : '100%'}}/>
                            <View style={{position : 'absolute', bottom : 10, right : 10}}>
                                <TouchableOpacity
                                    onPress={this._butttonHandleFunc}
                                >
                                    <Icon name='camera' size={30} color={Colors.white}/>
                                </TouchableOpacity>
                            </View>
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
                                <Text style={{fontSize : 16, fontWeight : '200'}}>우편번호</Text>
                            </View>
                            <View style={{width : width -40, height : '60%', flexDirection : 'row'}}>
                                <TextInput 
                                    style={{backgroundColor : Colors.lightGrey, width : '70%', height : '100%', paddingLeft : 10, fontSize : 17}}
                                    value={this.state.userZipcode}
                                    editable={false}
                                    
                                />
                                <TouchableOpacity
                                    style={{borderWidth : 1, borderColor : Colors.black, width : '30%', alignItems : 'center', justifyContent : 'center'}}
                                    onPress={this._daumWebView}
                                >
                                <Text>검색하기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        <View style={{height : 70, alignItems : 'center', marginTop : 10}}>
                            <View style={{width : width-40, height : '40%', justifyContent : 'center'}}>
                                <Text style={{fontSize : 16, fontWeight : '200'}}>주소</Text>
                            </View>
                            <View style={{width : width -40, height : '60%'}}>
                                <TextInput 
                                    style={{backgroundColor : Colors.lightGrey, width : '100%', height : '100%', paddingLeft : 10, fontSize : 17}}
                                    value={this.state.userAddress}
                                    editable={false}

                                />
                            </View>
                        </View>

                        <View style={{height : 70, alignItems : 'center', marginTop : 10}}>
                            <View style={{width : width-40, height : '40%', justifyContent : 'center'}}>
                                <Text style={{fontSize : 16, fontWeight : '200'}}>상세주소</Text>
                            </View>
                            <View style={{width : width -40, height : '60%', flexDirection : 'row'}}>
                                <TextInput 
                                    style={{backgroundColor : Colors.lightGrey, width : '70%', height : '100%', paddingLeft : 10, fontSize : 17}}
                                    value={this.state.userAddressDetail}
                                    onChangeText={(addressDetail) => this.setState({userAddressDetail : addressDetail})}
                                />
                                <TouchableOpacity
                                    style={{borderWidth : 1, borderColor : Colors.black, width : '30%', alignItems : 'center', justifyContent : 'center'}}
                                    onPress={this._updateUserAddress}
                                >
                                <Text>변경하기</Text>
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
}