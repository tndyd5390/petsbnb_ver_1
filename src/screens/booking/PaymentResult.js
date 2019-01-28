import react, { Component } from "react";
import {
    View,
    Text
} from "react-native";

export default class PaymentResult extends Component {
    render(){
        const imp_uid = this.props.navigation.getParam("imp_uid");
        return(<View>{imp_uid}</View>);
    }
}