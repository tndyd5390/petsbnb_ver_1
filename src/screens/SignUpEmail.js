import React, {Component} from 'react';
import Colors from '../utils/Colors';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CheckBox} from 'react-native-elements';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Dimensions,
    TextInput
} from 'react-native';

const{width, height} = Dimensions.get('window');

export default class SignUpEmail extends Component {
    constructor(props){
        super(props);
        this.state = {
            checked : true
        }
    }
    render(){
        return(
            <KeyboardAvoidingView style={{flex : 1, backgroundColor : Colors.white}}>
                <View style={{display : 'flex'}}>
                    <TouchableOpacity
                        style={{marginTop : 20, marginLeft : 20, marginBottom : 20}}
                        onPress={()=>this.props.navigation.goBack()}
                    >
                        <Icon name="angle-left" size={40}/>
                    </TouchableOpacity>
        
                    <View style={{alignItems : 'center'}}>
                        <View style={{display : 'flex', width : width -60}}>
                            <Text style={{textAlign : 'left', fontSize : 17, fontWeight : '500'}}>이메일</Text>
                        </View>
                        <TextInput style={{borderBottomWidth : 1, paddingTop : 5, paddingBottom : 5, width : width-60}}/>
                    </View>
                </View>

                
                <CheckBox
                
                
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={this.state.checked}
                onPress={() => this.setState({checked: !this.state.checked})}
                containerStyle={{backgroundColor : Colors.white, borderColor : Colors.white, width : 50}}
                />
                


        
                <TouchableOpacity style={{width: width, 
                                  height: 50, 
                                  backgroundColor: Colors.buttonSky, 
                                  justifyContent: 'center', 
                                  alignItems: 'center',
                                  position: 'absolute',
                                  bottom: 0}}>
                    <Text style={{color : Colors.white, fontSize : 20, fontWeight : '700'}}>다음</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({

})