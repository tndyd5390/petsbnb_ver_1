import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Colors from '../utils/Colors';
import RestartAndroid from 'react-native-restart-android';
import RoundedButton from './components/buttons/RoundedButton';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Platform,
    Image,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';


const {width, height} = Dimensions.get('window');

export default class ProfileMenu extends Component {

    _updateUserInfo = () => {
        console.log('updateUserInfo button is clicked');
    }

    _logOut = async () => {
        await AsyncStorage.removeItem('userInfo');
        //여기서 스택 다 비우면 댐
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Init' })],
          });
         this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{alignItems : 'center'}}>
                    <Image source={require("../../img/user.png")} style={{width : 100, height : 100, marginTop : 30}}/>
                </View>
                <View style={{alignItems : 'center'}}>
                    <RoundedButton
                        title="회원정보 수정"
                        buttonHandleFunc={this._updateUserInfo}
                        buttonColor={{backgroundColor : Colors.white}}
                        textColor={{color : Colors.black}}
                        textSize={{fontSize : 17}}
                        customButtonStyle={{width : 150, height : 30, borderWidth : 2, borderRadius:40, borderColor : Colors.buttonBorderGrey}}
                    />
                </View>
                <View>
                    <TouchableOpacity style={{width : width, height : 50, borderTopWidth : 1, borderTopColor: Colors.black, justifyContent : 'center', marginTop : 30}}>
                        <Text style={{marginLeft : 10, fontSize : 15, fontWeight : '600'}}>반려동물 프로필</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width : width, height : 50, borderTopWidth : 1, borderTopColor: Colors.black, justifyContent : 'center', marginTop : 0}}>
                        <Text style={{marginLeft : 10, fontSize : 15, fontWeight : '600'}}>환경설정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width : width, height : 50, borderTopWidth : 1, borderTopColor: Colors.black, justifyContent : 'center', marginTop : 0}}>
                        <Text style={{marginLeft : 10, fontSize : 15, fontWeight : '600'}}>고객센터</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width : width, height : 50, borderTopWidth : 1, borderTopColor: Colors.black, justifyContent : 'center', marginTop : 0}}>
                        <Text style={{marginLeft : 10, fontSize : 15, fontWeight : '600'}}>펫시터 신청</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width : width, height : 50, borderTopWidth : 1, borderTopColor: Colors.black, justifyContent : 'center', marginTop : 0}}>
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