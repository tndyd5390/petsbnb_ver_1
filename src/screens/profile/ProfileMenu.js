import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Colors from '../../utils/Colors';
import RestartAndroid from 'react-native-restart-android';
import RoundedButton from '../components/buttons/RoundedButton';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Platform,
    Image,
    TouchableOpacity,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';


const {width, height} = Dimensions.get('window');

export default class ProfileMenu extends Component {

    constructor(props){
        super(props);

        this.state = {
            userImageURI : '',
            activityIndicator : false
        }
        this._getUserImage();
    }

    _getUserImage = async() => {
        const userNo = await AsyncStorage.getItem('userInfo');
        const params = {
            userNo : userNo
        }
        await fetch('http://192.168.0.10:8080/user/getUserImage.do', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
            })
            .then((response) => response.json())
            .then((res => {
                if(res.result === true){
                    this.setState({
                        userImageURI : {uri : 'http://192.168.0.10:8080/userImageFile/' + res.fileInfo.fileName}
                    })
                }else{
                  
                }
            }))
            .catch((err) => {
                console.log("서버 에러" + err);
            })
    }

    _updateUserInfo = () => {
        this.props.navigation.navigate('CheckPassword', {nextView : 'ProfileUserUpdate'});
    }

    _logOut = async () => {
        
        await AsyncStorage.removeItem('userInfo');
        this._gotoInit();
       
    }

    _gotoInit = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Init' })],
          });
        this.props.rootStack.dispatch(resetAction);
    }

    _goToPetList = () => {
        this.props.navigation.navigate('PetList', {tmp : 'petList'});
    }

    _petSitterMode = async() => {
        this.setState({
            activityIndicator : true
        })

        const userNo = await AsyncStorage.getItem('userInfo');
        const params = {
            userNo : userNo
        }

        await fetch('http://192.168.0.10:8080/user/checkPetSitter.do', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
        .then((resp) => resp.json())
        .then((res => {
            if(res.isPetSitter != null){
                this._storeData();
            
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Init' })],
                  });
                this.props.rootStack.dispatch(resetAction);

            }else{
                alert('회원님은 펫시터가 아닙니다. 펫시터 신청을 먼저 해주세요.');
            }
        }))
        .catch((err) => {
            alert('서버에러입니다. 잠시후 다시 시도해주세요.');
        })
        this.setState({
            activityIndicator : false
        })
    }

    _applyPetSitter = async () => {
        this.setState({
            activityIndicator : true
        })
        const userNo = await AsyncStorage.getItem('userInfo');
        const params = {
            userNo : userNo
        }

        await fetch('http://192.168.0.10:8080/user/checkAppliedUser.do', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
        .then((resp) => resp.json())
        .then((res => {
            if(res != null){
                console.log(res);
                if(res.result){
                    alert('이미 신청하셨습니다.');
                    this.setState({
                        activityIndicator : false
                    })
                    return;
                }else{
                    this.setState({
                        activityIndicator : false
                    })
                    this.props.navigation.navigate('PetSitterApplyForm');
                }
            }else{
                this.setState({
                    activityIndicator : false
                })
                alert('서버에러입니다. 잠시후 다시 시도해주세요.');
            }
        }))
        .catch((err) => {
            this.setState({
                activityIndicator : false
            })
            alert('서버에러입니다. 잠시후 다시 시도해주세요.');
        })

        
    }

    _gotoCustomerCenter = () => {
        console.log("test");
        this.props.navigation.navigate('CustomerCenter');
    }

    _gotoPreference = () => {
        this.props.navigation.navigate('Preference');
    }

    _storeData = async () => {
        const data = {
            petSitterMode : true
        }
        try{
          await AsyncStorage.setItem('petSitterMode', JSON.stringify(data));
        }catch(err){
    
        }
      }

    _gotoPetSitter = async () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Init' })],
          });
        this.props.rootStack.dispatch(resetAction);
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.activityIndicator ? (
                    <View style={{backgroundColor : 'rgba(0,0,0,0.2)', width : width, height : height, position : 'absolute', zIndex : 10, alignItems : 'center', justifyContent : 'center'}}>
                        <ActivityIndicator size="large" color="#10b5f1"/>
                    </View>
                ) : (null)}
                {
                    this.state.userImageURI ? 
                    (
                        <View style={{alignItems : 'center'}}>
                            <Image source={this.state.userImageURI} style={{width : 100, height : 100, marginTop : 30}}/>
                        </View>
                    ) 
                    : 
                    (
                        <View style={{alignItems : 'center'}}>
                            <Image source={require("../../../img/user.png")} style={{width : 100, height : 100, marginTop : 30}}/>
                        </View>
                    )
                }
                
                <View style={{alignItems : 'center'}}>
                    <RoundedButton
                        title="프로필 확인 및 수정"
                        buttonHandleFunc={this._updateUserInfo}
                        buttonColor={{backgroundColor : Colors.white}}
                        textColor={{color : Colors.black}}
                        textSize={{fontSize : 17}}
                        customButtonStyle={{width : 170, height : 30, borderWidth : 2, borderRadius:40, borderColor : Colors.buttonBorderGrey}}
                    />
                </View>
                <View>
                    <TouchableOpacity style={{width : width, height : 50, borderTopWidth : 1, borderTopColor: Colors.black, justifyContent : 'center', marginTop : 30}}
                        onPress={this._goToPetList}
                    >
                        <Text style={{marginLeft : 10, fontSize : 15, fontWeight : '600'}}>반려동물 프로필</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{width : width, height : 50, borderTopWidth : 1, borderTopColor: Colors.black, justifyContent : 'center', marginTop : 0}}
                        onPress={this._gotoPreference}
                    >
                        <Text style={{marginLeft : 10, fontSize : 15, fontWeight : '600'}}>환경설정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{width : width, height : 50, borderTopWidth : 1, borderTopColor: Colors.black, justifyContent : 'center', marginTop : 0}}
                        onPress={this._gotoCustomerCenter}
                    >
                        <Text style={{marginLeft : 10, fontSize : 15, fontWeight : '600'}}>고객센터</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{width : width, height : 50, borderTopWidth : 1, borderTopColor: Colors.black, justifyContent : 'center', marginTop : 0}}
                        onPress={this._applyPetSitter}
                    >
                        <Text style={{marginLeft : 10, fontSize : 15, fontWeight : '600'}}>펫시터 신청</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{width : width, height : 50, borderTopWidth : 1, borderTopColor: Colors.black, justifyContent : 'center', marginTop : 0}}
                        onPress={this._petSitterMode}
                    >
                        <Text style={{marginLeft : 10, fontSize : 15, fontWeight : '600'}}>펫시터 모드 변환</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width : width, height : 50, borderTopWidth : 1, borderBottomWidth : 1, borderTopColor: Colors.black, borderBottomColor : Colors.black, justifyContent : 'center', marginTop : 0}} onPress={this._logOut}>
                        <Text style={{marginLeft : 10, fontSize : 15, fontWeight : '600'}}>로그아웃</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container : {
        backgroundColor : Colors.white,
        flex : 1
    }
})