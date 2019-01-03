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
            buttonTitle : ''
        }
    }

    componentWillMount(){
        this._getPetSitterInfo();
    }

    _getPetSitterInfo = async() => {
        console.log('getpetsitterinfo');
        const userNo = await AsyncStorage.getItem('userInfo');
        const params = {
            userNo
        }
        await fetch('http://192.168.0.10:8080/petSitter/getPetSitterExposure.do', {
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
            if(res.pDTO){
                this.setState({
                    petSitterName : res.pDTO.petSitterName,
                    petSitterNo : res.pDTO.petSitterNo,
                    exposure : res.pDTO.exposure === 'true' ? true : false,
                    exposureStr : res.pDTO.exposure === 'true' ? `${res.pDTO.petSitterName}님은 현재 펫시터 매칭중입니다.` : `${res.pDTO.petSitterName}님은 현재 펫시터 매칭중이 아닙니다.`,
                    buttonTitle : res.pDTO.exposure === 'true' ? '매칭 중지' : '매칭 시작',
                    userNo : res.pDTO.userNo,
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
        await fetch('http://192.168.0.10:8080/petSitter/togglePetSitterReservationExposure.do', {
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
    
    render() {
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

                <View style={{alignItems : 'center'}}>
                    <View style={{width : width - 20}}>
                        <Text style={{fontSize : 17, color : Colors.black}}>데이케어 시간 설정</Text>
                    </View>
                </View>
                <View style={{alignItems : 'center'}}>
                    <View style={{flexDirection : 'row', width : width - 10}}>
                        <View style={{height : 45, width : '20%', justifyContent : 'center', alignItems : 'center'}}>
                            <Text>시작시간</Text>                
                        </View>
                        <View style={{height : 45, width : '30%', borderWidth : 1, borderRadius : 1, borderColor : Colors.lightGrey}}>
                            <Picker
                                //selectedValue={this.state.middlePetNightPrice}
                                //onValueChange={(itemValue, itemIndex) => {this.setState({middlePetNightPrice : itemValue})}}
                                style={{width : '100%', height : '100%'}}
                                textStyle={{fontSize : 5}}
                                >
                                <Picker.Item label="1박" value="" />
                                <Picker.Item label="불가" value="0" />
                                
                            </Picker>
                        </View>
                        <View style={{height : 45, width : '20%', justifyContent : 'center', alignItems : 'center'}}>
                            <Text>종료시간</Text>                        
                        </View>
                        <View style={{height : 45, width : '30%', borderWidth : 1, borderRadius : 1, borderColor : Colors.lightGrey}}>
                            <Picker
                                //selectedValue={this.state.middlePetNightPrice}
                                //onValueChange={(itemValue, itemIndex) => {this.setState({middlePetNightPrice : itemValue})}}
                                style={{width : '100%', height : '100%'}}
                                textStyle={{fontSize : 5}}
                                >
                                <Picker.Item label="1박" value="" />
                                <Picker.Item label="불가" value="0" />
                                
                            </Picker>   
                        </View>
                    </View>
                </View>

                <View style={{alignItems : 'center', marginTop :15}}>
                    <View style={{width : width - 20}}>
                        <Text style={{fontSize : 17, color : Colors.black}}>1박 체크인 체크아웃 설정</Text>
                    </View>
                </View>
                <View style={{alignItems : 'center', marginBottom : 15}}>
                    <View style={{flexDirection : 'row', width : width - 10}}>
                        <View style={{height : 45, width : '20%', justifyContent : 'center', alignItems : 'center'}}>
                            <Text>체크인</Text>                
                        </View>
                        <View style={{height : 45, width : '30%', borderWidth : 1, borderRadius : 1, borderColor : Colors.lightGrey}}>
                            <Picker
                                //selectedValue={this.state.middlePetNightPrice}
                                //onValueChange={(itemValue, itemIndex) => {this.setState({middlePetNightPrice : itemValue})}}
                                style={{width : '100%', height : '100%'}}
                                textStyle={{fontSize : 5}}
                                >
                                <Picker.Item label="1박" value="" />
                                <Picker.Item label="불가" value="0" />
                                
                            </Picker>
                        </View>
                        <View style={{height : 45, width : '20%', justifyContent : 'center', alignItems : 'center'}}>
                            <Text>체크아웃</Text>                        
                        </View>
                        <View style={{height : 45, width : '30%', borderWidth : 1, borderRadius : 1, borderColor : Colors.lightGrey}}>
                            <Picker
                                //selectedValue={this.state.middlePetNightPrice}
                                //onValueChange={(itemValue, itemIndex) => {this.setState({middlePetNightPrice : itemValue})}}
                                style={{width : '100%', height : '100%'}}
                                textStyle={{fontSize : 5}}
                                >
                                <Picker.Item label="1박" value="" />
                                <Picker.Item label="불가" value="0" />
                                
                            </Picker>   
                        </View>
                    </View>
                </View>
                




                
                <View style={{alignItems : 'center'}}>
                    <View style={{width : width, flexDirection : 'row'}}>
                        <View style={{width : '50%', height : 50, alignItems : 'center'}}>
                            <TouchableOpacity
                                style={{justifyContent : 'center', alignItems : 'center', width : '95%', height : '100%', borderRadius : 30, backgroundColor : Colors.buttonSky}}
                            >
                                <Text style={{color : Colors.white, fontSize : 17, fontWeight : '700'}}>매칭 시작</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{width : '50%', height : 50, alignItems : 'center'}}>
                        <TouchableOpacity
                            style={{justifyContent : 'center', alignItems : 'center', width : '95%', height : '100%', borderRadius : 30, backgroundColor : Colors.white, borderWidth : 1, borderColor : Colors.grey}}
                        >
                            <Text style={{color : Colors.grey, fontSize : 17, fontWeight : '700'}}>매칭 중지</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{alignItems : 'center'}}>
                    <RoundedButton 
                        title={this.state.buttonTitle} 
                        buttonHandleFunc={this._toggleMatching} 
                        buttonColor={{backgroundColor : Colors.buttonSky}}
                        textColor={{color : Colors.white}}
                     />
                </View>
            </View>
        );
    }
}
