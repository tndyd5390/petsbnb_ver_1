import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import Colors from "../../utils/Colors";
import RoundedButton from "../components/buttons/RoundedButton";
import { StackActions, NavigationActions } from 'react-navigation';

const { width, height } = Dimensions.get("window");

export default class PaymentResult extends Component {

    static navigationOptions = {
        headerLeft : null
    }

    constructor(props){
        super(props);
        const imp_uid = this.props.navigation.getParam("imp_uid");
        const success = this.props.navigation.getParam("success");
        this.state = {
            imp_uid,
            success,
            activityIndicator: true
        }
    }

    async componentDidMount() {
        const paymentInfo = await this._getPaymentInfo(this.state.imp_uid);
        const customData = this._parsingCustomData(paymentInfo.custom_data);
        if(this.state.success){
            await this._insertReservationInfo(paymentInfo, customData);
        }
        this.setState({
            activityIndicator: false
        })
    }

    _insertReservationInfo = async(paymentInfo, customData) => {
        
        const params = {
            imp_uid: this.state.imp_uid,
            merchant_uid: paymentInfo.merchant_uid,
            amount: paymentInfo.amount + "",
            buyer_addr: paymentInfo.buyer_addr,
            buyer_email: paymentInfo.buyer_email,
            buyer_name: paymentInfo.buyer_name,
            buyer_postcode: paymentInfo.buyer_postcode,
            buyer_tel: paymentInfo.buyer_tel,
            petNo: customData.petNo,
            checkin: customData.checkin + "",
            checkout: customData.checkout + "",
            careKind: customData.careKind,
            serviceProvider: customData.serviceProvider,
            serviceReceiver: customData.serviceReceiver,
            stDate: customData.stDate,
            edDate: customData.edDate
        };
        await fetch("http://192.168.0.10:8080/reservation/insertReservationInfo.do", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
        .then((response) => response.json())
        .then(res => {

        })
        .catch((err) => {

        });
    }

    _parsingCustomData = (data) => {
        return JSON.parse(data);
    }

    _getPaymentInfo = async(imp_uid) => {
        const token = await this._getToken();
        const paymentInfo = await fetch("https://api.iamport.kr/payments/" + imp_uid, {
            method: "POST",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              "Authorization": token
            }
        })
        .then((response) => response.json())
        .then(res => {
            if(res.response !== null){
                return res.response;
            }
        })
        .catch((err) => {

        })
        return paymentInfo;
    }
    
    _getToken = async() => {
        const token = await fetch('http://192.168.0.10:8080/payment/getToken.do', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((res => {
            if(res.success){
                return res.token;
            }else{
                return null;
            }
        }))
        .catch((err) => {
            this.setState({activityIndicator : false});
        })
        return token;
    }

    _gotoTop = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Explore' })],
          });
        this.props.navigation.dispatch(resetAction);
    }

    render(){ 
        return(
            <View style={{width : width, height : height, backgroundColor : Colors.white}}>
                {this.state.activityIndicator ? (
                    <View style={{backgroundColor : 'rgba(0,0,0,0.2)', width : width, height : height, position : 'absolute', zIndex : 10, alignItems : 'center', justifyContent : 'center'}}>
                        <ActivityIndicator size="large" color="#10b5f1"/>
                    </View>
                ) : (null)}
                <View style={{width : "100%", alignItems : "center"}}>
                    
                        {
                            this.state.success ? 
                            (
                                <View style={{alignItems : "center", marginTop : 10}}>
                                    <Text style={{fontSize : 15, color : Colors.black}}>
                                        예약이 성공적으로 요청되었습니다.
                                    </Text>
                                    <Text style={{fontSize : 15, color : Colors.black}}>
                                        요청된 예약은 예약보기 탭에서 확인할 수 있습니다.
                                    </Text>
                                </View>
                            )
                            :
                            (
                                <View style={{alignItems : "center", marginTop : 10}}>
                                    <Text style={{fontSize : 15, color : Colors.black}}>
                                        예약에 요청에 실패했습니다. 다시 시도해주세요.
                                    </Text>
                                </View>
                            )
                        }
                </View>
                <View style={{alignItems : 'center'}}>
                    <RoundedButton 
                        title='메인으로' 
                        buttonHandleFunc={this._gotoTop} 
                        buttonColor={{backgroundColor : Colors.buttonSky}}
                        textColor={{color : Colors.white}}
                     />
                </View>
            </View>
        );
    }
}