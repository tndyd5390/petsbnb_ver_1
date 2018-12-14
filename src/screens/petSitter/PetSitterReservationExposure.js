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
            petSitterNo : '',
            petSitterName : '',
            exposure : '',
            nightCheckIn: '',
            nightCheckOut: '',
            dayCareStart: '',
            dayCareEnd: '',
            dayCareVisible : true,
            nightVisible : true
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
            console.log(res);
            if(res){
                let dayCareVisible = this.state.dayCareVisible;
                let nightVisible = this.state.nightVisible;
                if(
                    res.smallPetDayPrice == '0' &&
                    res.middlePetDayPrice == '0' &&
                    res.bigPetDayPrice == '0'
                ){
                   dayCareVisible = false;
                }

                if(
                    res.smallPetNightPrice == '0'&&
                    res.middlePetNightPrice == '0' &&
                    res.bigPetNightPrice == '0'
                ){
                    nightVisible = false;
                }

                if(!dayCareVisible && !nightVisible){
                    alert('현재 매칭 할수 있는 사항이 없습니다. 펫시터프로필에서 소형, 중형 대형 설정을 확인해주세요.');
                    this.props.navigation.goBack();
                    return;
                }

                this.setState({
                    petSitterNo : res.petSitterNo,
                    petSitterName : res.petSitterName,
                    exposure : res.exposure === 'true' ? true : false,
                    nightCheckIn: res.nightCheckIn || '',
                    nightCheckOut: res.nightCheckIn || '',
                    dayCareStart: res.dayCareStart || '',
                    dayCareEnd: res.dayCareEnd || '',
                    dayCareVisible : dayCareVisible,
                    nightVisible, nightVisible
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

    _displayHour = () => {
        let hourArr = [];
        hourArr.push(<Picker.Item label="선택" value="" key={0}/>)
        for(let i = 0; i< 24; i++){
            let hour;
            if(i<10){
                hour = '0' + i;
            }else{
                hour = i + '';
            }
            hourArr.push(
                <Picker.Item label={hour + '시'} value={hour} key={i+1}/>
            );
        }
        return hourArr;
    }

    _checkDayCareEnd = (value, index) => {
        if(this.state.dayCareStart == ''){
            alert('데이케어 사작 시간을 먼저 설정해주세요.');
            return;
        }
        const dayCareStart = Number(this.state.dayCareStart);
        const dayCareEnd = Number(value);
        if(dayCareEnd <= dayCareStart){
            alert('데이케어 시작시간 이후의 시간을 선택해 주세요');
            return;
        }
        this.setState({dayCareEnd : value})
    }

    _startReservationExposure = async () => {
        

        this.setState({activityIndicator : true});
        const params = {
            petSitterNo : this.state.petSitterNo,
            nightCheckIn: this.state.nightCheckIn,
            nightCheckOut: this.state.nightCheckOut,
            dayCareStart: this.state.dayCareStart,
            dayCareEnd: this.state.dayCareEnd
        }
        await fetch('http://192.168.0.10:8080/petSitter/startReservationExposure.do', {
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
                if(res.result){
                    alert(`지금부터 펫시터 매칭이 시작됩니다.`);
                    this.props.navigation.goBack();
                }else{
                    alert('서버에러입니다. 잠시후 다시 시도해주세요.');
                }
            }else{
                alert('서버에러입니다. 잠시후 다시 시도해주세요.');
            }
        }))
        .catch((err) => {
            this.setState({
                activityIndicator : false
            })
            alert('서버에러입니다. 잠시후 다시 시도해주세요.');
        })
        this.setState({activityIndicator : false});
    }

    _stopReservationExposure = async() => {
        this.setState({activityIndicator : true});

        const params = {
            petSitterNo : this.state.petSitterNo
        }

        await fetch('http://192.168.0.10:8080/petSitter/stopReservationExposure.do', {
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
                if(res.result){
                    alert(`펫시터 매칭이 중지되었습니다.`);
                    this.props.navigation.goBack();
                }else{
                    alert('서버에러입니다. 잠시후 다시 시도해주세요.');
                }
            }else{
                alert('서버에러입니다. 잠시후 다시 시도해주세요.');
            }
        }))
        .catch((err) => {
            this.setState({
                activityIndicator : false
            })
            alert('서버에러입니다. 잠시후 다시 시도해주세요.');
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
                <ScrollView>
                    <View style={{alignItems : 'center', marginTop : 10, borderBottomWidth : 1, borderBottomColor : Colors.lightGrey}}>
                        <View style={{width : '90%', alignItems : 'center', justifyContent : 'center', marginBottom : 10}}>
                            <Text style={{color : Colors.black, fontSize : 15}}>
                                {this.state.exposure ? `${this.state.petSitterName}님은 현재 펫시터 매칭중입니다.` : `${this.state.petSitterName}님은 현재 펫시터 매칭중이 아닙니다.`}
                            </Text>
                        </View>
                    </View>

                    {
                        this.state.dayCareVisible ? 
                        (
                            <View>
                                <View style={{alignItems : 'center', marginTop : 10}}>
                                    <View style={{width : width - 20}}>
                                        <Text style={{fontSize : 17}}>데이케어 시간 설정</Text>
                                    </View>
                                </View>

                                <View style={{alignItems : 'center', marginTop : 10}}>
                                    <View style={{width : width - 30, flexDirection : 'row'}}>
                                        <View style={{width : '50%', justifyContent : 'center'}}>
                                            <Text>데이케어 시작 시간</Text>
                                        </View>
                                        <View style={{width : '50%', justifyContent : 'center'}}>
                                            <Text>데이케어 종료 시간</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{alignItems : 'center', marginTop : 10}}>
                                    <View style={{width : width - 30, flexDirection : 'row'}}>
                                        <View style={{width : '50%', height : 40}}>
                                            <View style={{height : '100%', width : '90%', borderWidth : 1, borderColor : Colors.lightGrey, borderRadius : 5}}>
                                                <Picker
                                                    selectedValue={this.state.dayCareStart}
                                                    onValueChange={(itemValue, itemIndex) => this.setState({dayCareStart : itemValue})}
                                                    style={{width : '100%', height : '100%'}}
                                                    >
                                                    {this._displayHour()}
                                                </Picker>
                                            </View>
                                        </View>
                                        <View style={{width : '50%', justifyContent : 'center', height : 40}}>
                                            <View style={{height : '100%', width : '90%', borderWidth : 1, borderColor : Colors.lightGrey, borderRadius : 5}}>
                                                <Picker
                                                    selectedValue={this.state.dayCareEnd}
                                                    onValueChange={(itemValue, itemIndex) => this._checkDayCareEnd(itemValue, itemIndex)}
                                                    style={{width : '100%', height : '100%'}}
                                                    >
                                                    {this._displayHour()}
                                                </Picker>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                            </View>
                        )
                        : 
                        (
                            null
                        )
                    }

                    {
                        this.state.nightVisible ? 
                        (
                            <View>
                                <View style={{alignItems : 'center', marginTop : 15}}>
                                    <View style={{width : width - 20}}>
                                        <Text style={{fontSize : 17}}>체크인 시간 설정</Text>
                                    </View>
                                </View>

                                <View style={{alignItems : 'center', marginTop : 10}}>
                                    <View style={{width : width - 30, flexDirection : 'row'}}>
                                        <View style={{width : '50%', justifyContent : 'center'}}>
                                            <Text>체크인 시간</Text>
                                        </View>
                                        <View style={{width : '50%', justifyContent : 'center'}}>
                                            <Text>체크아웃 시간</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{alignItems : 'center', marginTop : 10}}>
                                    <View style={{width : width - 30, flexDirection : 'row'}}>
                                        <View style={{width : '50%', height : 40}}>
                                            <View style={{height : '100%', width : '90%', borderWidth : 1, borderColor : Colors.lightGrey, borderRadius : 5}}>
                                                <Picker
                                                    selectedValue={this.state.nightCheckIn}
                                                    onValueChange={(itemValue, itemIndex) => this.setState({nightCheckIn : itemValue})}
                                                    style={{width : '100%', height : '100%'}}
                                                    >
                                                    {this._displayHour()}
                                                </Picker>
                                            </View>
                                        </View>
                                        <View style={{width : '50%', justifyContent : 'center', height : 40}}>
                                            <View style={{height : '100%', width : '90%', borderWidth : 1, borderColor : Colors.lightGrey, borderRadius : 5}}>
                                                <Picker
                                                    selectedValue={this.state.nightCheckOut}
                                                    onValueChange={(itemValue, itemIndex) => this.setState({nightCheckOut : itemValue})}
                                                    style={{width : '100%', height : '100%'}}
                                                    >
                                                    {this._displayHour()}
                                                </Picker>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                        :
                        (
                            null
                        )
                    }

                    

                    

                    

                    <View style={{alignItems : 'center'}}>
                        <View style={{width : width - 40, justifyContent : 'space-between', flexDirection : 'row'}}>
                            <View style={{width : '45%'}}>
                                <RoundedButton
                                    title="매칭시작"
                                    buttonHandleFunc={this._startReservationExposure}
                                    buttonColor={{backgroundColor : Colors.buttonSky}}
                                    textColor={{color : Colors.white}}
                                    radius={20}
                                />
                            </View>
                            <View style={{width : '45%'}}>
                                <RoundedButton
                                    title="매칭중지"
                                    buttonHandleFunc={this._stopReservationExposure}
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
