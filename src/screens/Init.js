import React, {Component} from 'react';
import Colors from '../utils/Colors';
import PropTypes from 'prop-types';
import Tabs from '../TabNavigator';
import { StackActions, NavigationActions } from 'react-navigation';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
const {width, height} = Dimensions.get('window');

export default class Init extends Component{

    componentWillMount() {
        this._nextView();
    }

    _nextView = async() => {
        const userNo = await AsyncStorage.getItem('userInfo');
        const petSitterMode = await AsyncStorage.getItem('petSitterMode');
        /**
         * 여기서 세가지의 경우의 수가 있음
         * 1. 로그인을 안한 상태
         * 2. 로그인을 하고 사용자모드
         * 3. 로그인을 하고 펫시터 모드
         */
        //먼저 로그인은 안한 상태
        if(userNo == null){
            this._gotoZeroStack('Main');
        }else{
            if(petSitterMode == null){
                this._gotoZeroStack('Tabs');
            }else{
                this._gotoZeroStack('PetSitterTab');
            }
        }
    }

    _gotoZeroStack = (nextView) => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: nextView })],
          });
        this.props.navigation.dispatch(resetAction);
    }

    render(){
        return(
            <View>
                <Image
                    source={require('../../img/petCare.jpg')}
                    style={{width : width, height : height, position : 'absolute'}}
                />
                <View style={{width : width, height : height, position : 'absolute', backgroundColor : 'rgba(255,255,255,0.8)', alignItems : 'center'}}>
                    <View>
                        <Image
                            source={require('../../img/img.png')}
                            style={{width : 100, height : 100, marginTop : height/2 - 50}}
                        />
                    </View>
                </View>
            </View>
        );   
    }
}