import React,{Component} from 'react';
import Colors from '../../../utils/Colors';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import{
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
const{width, height} = Dimensions.get('window');

export default class PetProfileRegCheckbox extends Component{
    render(){
        const customStyle = this.props.customStyle || {};
        const disabled = this.props.disabled || false
        return(
            <View style={{alignItems : 'center'}}>
                <View style={[{display : 'flex', width : width -60, marginTop : 20}, customStyle]}>
                    <TouchableOpacity
                        style={{flexDirection : 'row'}}
                        onPress={this.props.checkFunc}
                        disabled={disabled}
                    >
                        <FontAwesome5 name={'check-square'} size={20} style={[this.props.isChecked ? {color : Colors.buttonSky} : null]}/>
                        <Text style={{marginLeft : 10}}>{this.props.text} </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

PetProfileRegCheckbox.propTypes = {
    text : PropTypes.string.isRequired,
    checkFunc : PropTypes.func.isRequired,
    customStyle : PropTypes.object,
    isChecked : PropTypes.bool.isRequired,
    disabled : PropTypes.bool
}