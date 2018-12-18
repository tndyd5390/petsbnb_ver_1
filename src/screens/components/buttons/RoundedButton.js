import React, {Component} from 'react'
import Colors from '../../../utils/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native'
const{height, width} = Dimensions.get('window');


export default class RoundedButton extends Component{
    render(){
        const{title, buttonHandleFunc} = this.props;
        const buttonColor = this.props.buttonColor || {color : Colors.black};
        const textColor = this.props.textColor || {color : Colors.black};
        const textSize = this.props.textSize || {fontSize :17};
        const customButtonStyle = this.props.customButtonStyle || {};
        const propWidth = this.props.width || width - 40;
        const radius = this.props.radius || 40;
        return(
            <View>
                <TouchableOpacity
                    onPress={buttonHandleFunc}
                    style={[{ height : 50, justifyContent : 'center', alignItems : 'center', borderRadius : radius, marginTop : 15, fontSize : 20, width : propWidth}, buttonColor, customButtonStyle]}
                >
                    <Text style={[textColor, textSize, {fontWeight : '700'}]}>{title}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

RoundedButton.propTypes = {
    title : PropTypes.string.isRequired,
    buttonHandleFunc : PropTypes.func.isRequired,
    buttonColor : PropTypes.object,
    textColor : PropTypes.object,
    textSize : PropTypes.object,
    customButtonStyle : PropTypes.object,
    width : PropTypes.object,
    radius : PropTypes.number
}

const styles = StyleSheet.create({

})