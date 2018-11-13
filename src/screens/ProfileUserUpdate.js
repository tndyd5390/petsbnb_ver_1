import React, {Component} from 'react';
import Colors from '../utils/Colors';
import PropTypes from 'prop-types';
import RoundedButton from './components/buttons/RoundedButton';
import ImagePicker from 'react-native-image-picker';
import {
    View,
    Text,
    Dimensions,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    AsyncStorage,
    ScrollView
} from 'react-native';
const{width, height} = Dimensions.get('window');

const options={
    title : '사진 선택',
    tacePhotoButtonTitle : '사진 촬영',
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
            userEmail : ''
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
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
           
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
           
              this.setState({
                avatarSource: source,
              });
            }
          });
    }

    render(){
        return(
            <View>
                <ScrollView style={{backgroundColor : Colors.white}}>
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
                </ScrollView>
            </View>
        );
    }
}