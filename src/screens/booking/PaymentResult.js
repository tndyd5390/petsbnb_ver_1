import React, { Component } from "react";
import {
    View,
    Text
} from "react-native";

export default class PaymentResult extends Component {

    constructor(props){
        super(props);
        const imp_uid = this.props.navigation.getParam("imp_uid", "imp_995252850179");
        const success = this.props.navigation.getParam("success", false);
        
        this.state = {
            imp_uid,
            success
        }
    }

    async componentDidMount() {
        const paymentInfo = await this._getPaymentInfo(this.state.imp_uid);
        const customData = this._parsingCustomData(paymentInfo.custom_data);
        console.log(paymentInfo);
        console.log(customData);
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

    render(){ 
        return(<View><Text>test</Text></View>);
    }
}