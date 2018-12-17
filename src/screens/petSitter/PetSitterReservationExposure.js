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
            if(res){
                this.setState({
                    petSitterName : res.petSitterName,
                    petSitterNo : res.petSitterNo,
                    exposure : res.exposure === 'true' ? true : false,
                    exposureStr : res.exposure === 'true' ? `${res.petSitterName}님은 현재 펫시터 매칭중입니다.` : `${res.petSitterName}님은 현재 펫시터 매칭중이 아닙니다.`,
                    buttonTitle : res.exposure === 'true' ? '매칭 중지' : '매칭 시작',
                    userNo : res.userNo,
                    activityIndicator : false
                })
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
