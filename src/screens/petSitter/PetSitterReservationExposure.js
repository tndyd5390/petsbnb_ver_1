import React, {Component} from 'react';
import Colors from '../../utils/Colors';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Switch,
    ActivityIndicator,
    Dimensions,
    AsyncStorage,
    ScrollView,
    Picker
} from 'react-native';
import RoundedButton from '../components/buttons/RoundedButton';
import { StackActions, NavigationActions } from 'react-navigation';
import { ip } from "../../utils/const";
const{width, height} = Dimensions.get('window');

export default class PetSitterReservationExposure extends Component{


    constructor(props){
        super(props);
        this.state={
            activityIndicator : true,
            petSitterName : '',
            userNo : '',
            petSitterNo : '',
            exposure : null,
            exposureStr : '데이터 수신중',
            buttonTitle : '',
            nightCheckin : '',
            nightCheckout : '',
            smallPetNightPrice : '',
            middlePetNightPrice : '',
            bigPetNightPrice : ''
        }
    }

    componentWillMount(){
        this._getPetSitterInfo();
    }

    

    _getPetSitterInfo = async() => {
        const userNo = await AsyncStorage.getItem('userInfo');
        const params = {
            userNo
        }
        await fetch(`${ip}/petSitter/getPetSitterExposure.do`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
        .then((response) => response.json())
        .then((res => {
            if(res.pDTO){
                this.setState({
                    petSitterName : res.pDTO.petSitterName,
                    petSitterNo : res.pDTO.petSitterNo,
                    exposure : res.pDTO.exposure === 'true' ? true : false,
                    exposureStr : res.pDTO.exposure === 'true' ? `${res.pDTO.petSitterName}님은 현재 펫시터 매칭중입니다.` : `${res.pDTO.petSitterName}님은 현재 펫시터 매칭중이 아닙니다.`,
                    buttonTitle : res.pDTO.exposure === 'true' ? '매칭 중지' : '매칭 시작',
                    userNo : res.pDTO.userNo,
                    nightCheckin : res.pDTO.nightCheckin || -1,
                    nightCheckout : res.pDTO.nightCheckout || -1,
                    smallPetNightPrice : res.pDTO.smallPetNightPrice,
                    middlePetNightPrice : res.pDTO.middlePetNightPrice,
                    bigPetNightPrice : res.pDTO.bigPetNightPrice,
                    activityIndicator : false
                })
            }else{
                alert('프로필 메뉴에서 펫시터 프로필을 먼저 작성해 주세요.');
                this.setState({activityIndicator : false})
                this.props.navigation.goBack();
            }
        }))
        .catch((err) => {
            console.log(err);
            this.setState({activityIndicator : false});
        })
        //this.setState({activityIndicator : false});
    }

    _toggleMatching = async() => {

        this.setState({activityIndicator : true});

        const params = {
            userNo : this.state.userNo,
            exposure : (!this.state.exposure).toString(),
            petSitterNo : this.state.petSitterNo
        }
        await fetch(`${ip}/petSitter/togglePetSitterReservationExposure.do`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
        .then((response) => response.json())
        .then((res => {
            if(res){
                if(res.result){
                    if(res.exposure === 'true'){
                        alert('지금부터 펫시터 매칭이 시작됩니다.')
                    }else{
                        alert('펫시터 매칭이 중지되었습니다.');
                    }
                    this.props.navigation.goBack();
                }
            }else{
                alert('잠시후 다시 시도해주세요.');
                this.setState({activityIndicator : false})
                this.props.navigation.goBack();
            }
        }))
        .catch((err) => {
            console.log(err);
            this.setState({activityIndicator : false});
        })
        this.setState({activityIndicator : false});
    }

    _renderCheckTime = (start = 0) => {
        if(start === -1){
            start = 0;
        }
        let timeArr = [];
        timeArr.push(<Picker.Item label={'선택'} value={-1} key={-1}/>)
        for(; start< 24; start++){
            timeArr.push(<Picker.Item label={start + '시'} value={start + ''} key={start}/>)
        }
        return(
            timeArr
        );
    }

    _startExposure = async() => {
        if(this.state.nightCheckin === -1 || this.state.nightCheckout === -1){
            alert("체크인 체크아웃 시간을 설정해 주세요.");
            return;
        }


        this.setState({activityIndicator : true});
        const params = {
            userNo : this.state.userNo,
            petSitterNo : this.state.petSitterNo,
            nightCheckin : this.state.nightCheckin + "",
            nightCheckout : this.state.nightCheckout + ""
        }

        await fetch(`${ip}/petSitter/startReservationExposure.do`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
        .then((response) => response.json())
        .then((res => {
            if(res.result){
                alert('지금부터 펫시터 매칭이 시작됩니다.');
                this.setState({activityIndicator : false});
                this.props.navigation.goBack();
            }
        }))
        .catch((err) => {
            this.setState({activityIndicator : false});
        })
    }

    _stopExposure = async() => {
        this.setState({activityIndicator : true});

        const params = {
            userNo : this.state.userNo,
            petSitterNo : this.state.petSitterNo
        }

        await fetch(`${ip}/petSitter/stopReservationExposure.do`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
        .then((response) => response.json())
        .then((res => {
            if(res.result){
                alert('펫시터 매칭을 중지했습니다.');
                this.setState({activityIndicator : false});
                this.props.navigation.goBack();
            }
        }))
        .catch((err) => {
            this.setState({activityIndicator : false});
        })
    }
    
    render() {
        const {smallPetNightPrice, middlePetNightPrice, bigPetNightPrice}= this.state;
        
        return(
            <View style={{width : width, height : height, backgroundColor : Colors.white}}>
                {this.state.activityIndicator ? (
                    <View style={{backgroundColor : 'rgba(0,0,0,0.2)', width : width, height : height, position : 'absolute', zIndex : 10, alignItems : 'center', justifyContent : 'center'}}>
                        <ActivityIndicator size="large" color="#10b5f1"/>
                    </View>
                ) : (null)}
                <View style={{alignItems : 'center', justifyContent : 'center', height : 50}}>
                    <Text style={{fontSize : 15}}>{this.state.exposureStr}</Text>
                </View>
                {
                    smallPetNightPrice === '0' &&
                    middlePetNightPrice === '0' &&
                    bigPetNightPrice === '0'
                    ?
                    (null) 
                    : 
                    (
                        <View>
                        <View style={{alignItems : 'center', marginBottom : 10}}>
                            <View style={{width : width - 20}}>
                                <Text style={{fontSize : 17, color : Colors.black}}>1박 체크인 체크아웃 설정</Text>
                            </View>
                        </View>
                        <View style={{alignItems : 'center', marginBottom : 15}}>
                            <View style={{flexDirection : 'row', width : width - 10}}>
                                <View style={{height : 30, width : '20%', justifyContent : 'center', alignItems : 'center'}}>
                                    <Text>체크인</Text>                
                                </View>
                                <View style={{height : 30, width : '30%', borderWidth : 1, borderRadius : 1, borderColor : Colors.lightGrey}}>
                                    <Picker
                                        selectedValue={this.state.nightCheckin}
                                        onValueChange={(itemValue, itemIndex) => {this.setState({nightCheckin : itemValue})}}
                                        style={{width : '100%', height : '100%'}}
                                        textStyle={{fontSize : 5}}
                                        >
                                       {this._renderCheckTime()}
                                    </Picker>
                                </View>
                                <View style={{height : 30, width : '20%', justifyContent : 'center', alignItems : 'center'}}>
                                    <Text>체크아웃</Text>                        
                                </View>
                                <View style={{height : 30, width : '30%', borderWidth : 1, borderRadius : 1, borderColor : Colors.lightGrey}}>
                                    <Picker
                                        selectedValue={this.state.nightCheckout}
                                        onValueChange={(itemValue, itemIndex) => {this.setState({nightCheckout : itemValue})}}
                                        style={{width : '100%', height : '100%'}}
                                        textStyle={{fontSize : 5}}
                                        >
                                       {this._renderCheckTime(Number(this.state.nightCheckin))}
                                    </Picker>
                                </View>
                            </View>
                        </View>
                        </View>
                    )
                }
                
                

                <View style={{alignItems : 'center'}}>
                    <View style={{width : width, flexDirection : 'row'}}>
                        <View style={{width : '50%', height : 50, alignItems : 'center'}}>
                            <TouchableOpacity
                                style={{justifyContent : 'center', alignItems : 'center', width : '95%', height : '100%', borderRadius : 30, backgroundColor : Colors.buttonSky}}
                                onPress={this._startExposure}
                            >
                                <Text style={{color : Colors.white, fontSize : 17, fontWeight : '700'}}>매칭 시작</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width : '50%', height : 50, alignItems : 'center'}}>
                        <TouchableOpacity
                            style={{justifyContent : 'center', alignItems : 'center', width : '95%', height : '100%', borderRadius : 30, backgroundColor : Colors.white, borderWidth : 1, borderColor : Colors.grey}}
                            onPress={this._stopExposure}
                        >
                            <Text style={{color : Colors.grey, fontSize : 17, fontWeight : '700'}}>매칭 중지</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
