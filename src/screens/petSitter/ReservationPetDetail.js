import React, { Component } from "react";
import PropTypes from "prop-types";
import Colors from "../../utils/Colors";
import {
    View,
    Text,
    Image,
    SafeAreaView,
    Dimensions
} from "react-native";
const {width, height} = Dimensions.get("window");

export default class ReservationPetDetail extends Component{
    constructor(props){
        super(props);
        console.log(this.props.navigation.getParam("petDetail"));
    }

    render() {
        return(
            <View><Text>dkadsf</Text></View>
        );
    }
}
