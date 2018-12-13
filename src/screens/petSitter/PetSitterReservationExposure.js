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
            exposure : '',
            nightCheckIn: '',
            nightCheckOut: '',
            dayCareStart: '',
            dayCareEnd: ''
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
        await fetch('http://192.168.0.10:8080/petSitter/getPetSitterReservationInfo.do', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
        .then((resp) => resp.json())
        .then((res => {
            if(res){
                this.setState({
                    petSitterName : res.petSitterName,
                    exposure : res.exposure === 'TRUE' ? true : false,
                    nightCheckIn: res.nightCheckIn || '00:00',
                    nightCheckOut: res.nightCheckIn || '00:00',
                    dayCareStart: res.dayCareStart || '00:00',
                    dayCareEnd: res.dayCareEnd || '00:00'
                })
            }
        }))
        .catch((err) => {
            this.setState({
                activityIndicator : false
            })
            alert('서버에러입니다. 잠시후 다시 시도해주세요.');
        })
        console.log(this.state);
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
                <ScrollView>
                    <View style={{alignItems : 'center', marginTop : 10, borderBottomWidth : 1, borderBottomColor : Colors.lightGrey}}>
                        <View style={{width : '90%', alignItems : 'center', justifyContent : 'center', marginBottom : 10}}>
                            <Text style={{color : Colors.black, fontSize : 15}}>
                                {this.state.exposure ? `${this.state.petSitterName}님은 현재 예약을 게시하고 있습니다.` : `${this.state.petSitterName}님은 현재 예약을 계시하지 않고있습니다.`}
                            </Text>
                        </View>
                    </View>

                    <View style={{alignItems : 'center', marginTop : 10}}>
                        <View style={{width : width - 20}}>
                            <Text style={{fontSize : 17}}>데이케어 가능 시간 설정</Text>
                        </View>
                    </View>

                    <View style={{alignItems : 'center', marginTop : 10}}>
                        <View style={{width : width - 30, flexDirection : 'row'}}>
                            <View style={{height : 40, width : '30%', justifyContent : 'center', alignItems : 'center',borderWidth : 1, borderColor : Colors.lightGrey, borderRadius : 5}}>
                                <Picker
                                    selectedValue={this.state.refundBank}
                                    onValueChange={(itemValue, itemIndex) => this.setState({refundBank : itemValue})}
                                    style={{width : '100%', height : '100%'}}
                                    >
                                    <Picker.Item label="선택" value="" itemStyle={{fontSize : 10}}/>
                                </Picker>
                            </View>
                            <View style={{height : 40, width : '20%', justifyContent : 'center', alignItems : 'center'}}>
                                <Text style={{fontSize : 15}}>시 부터 </Text>
                            </View>
                            <View style={{height : 40, width : '30%', justifyContent : 'center', alignItems : 'center',borderWidth : 1, borderColor : Colors.lightGrey, borderRadius : 5}}>
                                <Picker
                                    selectedValue={this.state.refundBank}
                                    onValueChange={(itemValue, itemIndex) => this.setState({refundBank : itemValue})}
                                    style={{width : '100%', height : '100%'}}
                                    >
                                    <Picker.Item label="선택" value="" itemStyle={{fontSize : 10}}/>
                                </Picker>
                            </View>
                            <View style={{height : 40, width : '20%', justifyContent : 'center', alignItems : 'center'}}>
                                <Text style={{fontSize : 15}}>시 까지 </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{alignItems : 'center', marginTop : 15}}>
                        <View style={{width : width - 20}}>
                            <Text style={{fontSize : 17}}>체크인 가능 시간 설정</Text>
                        </View>
                    </View>

                    <View style={{alignItems : 'center', marginTop : 10}}>
                        <View style={{width : width - 30, flexDirection : 'row'}}>
                            <View style={{height : 40, width : '15%', justifyContent : 'center'}}>
                                <Text style={{fontSize : 15}}>체크인 </Text>
                            </View>
                            <View style={{height : 40, width : '30%', justifyContent : 'center',borderWidth : 1, borderColor : Colors.lightGrey, borderRadius : 5}}>
                                <Picker
                                    selectedValue={this.state.refundBank}
                                    onValueChange={(itemValue, itemIndex) => this.setState({refundBank : itemValue})}
                                    style={{width : '100%', height : '100%'}}
                                    >
                                    <Picker.Item label="선택" value="" itemStyle={{fontSize : 10}}/>
                                </Picker>
                            </View>
                            <View style={{height : 40, width : '20%', justifyContent : 'center', alignItems : 'center'}}>
                                <Text style={{fontSize : 15}}>체크아웃 </Text>
                            </View>
                            <View style={{height : 40, width : '30%', justifyContent : 'center', alignItems : 'center',borderWidth : 1, borderColor : Colors.lightGrey, borderRadius : 5}}>
                                <Picker
                                    selectedValue={this.state.refundBank}
                                    onValueChange={(itemValue, itemIndex) => this.setState({refundBank : itemValue})}
                                    style={{width : '100%', height : '100%'}}
                                    >
                                    <Picker.Item label="선택" value="" itemStyle={{fontSize : 10}}/>
                                </Picker>
                            </View>
                        </View>
                    </View>

                    <View style={{alignItems : 'center'}}>
                        <View style={{width : width - 40, justifyContent : 'space-between', flexDirection : 'row'}}>
                            <View style={{width : '45%'}}>
                                <RoundedButton
                                    title="게시하기"
                                    buttonHandleFunc={() => {}}
                                    buttonColor={{backgroundColor : Colors.buttonSky}}
                                    textColor={{color : Colors.white}}
                                    radius={20}
                                />
                            </View>
                            <View style={{width : '45%'}}>
                                <RoundedButton
                                    title="게시 중단"
                                    buttonHandleFunc={() => {}}
                                    buttonColor={{backgroundColor : Colors.lightGrey}}
                                    textColor={{color : Colors.grey}}
                                    width={{width : '100%'}}
                                    radius={20}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
