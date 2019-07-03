import React, {Component} from 'react';
import Colors from '../../utils/Colors';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    Dimensions,
    StyleSheet,
    Switch
} from 'react-native';
import { ip } from "../../utils/const";
const{width, height} = Dimensions.get('window');

export default class Preference extends Component{

    constructor(props){
        super(props);
        this.state={
            toggleNotification : false
        }
    }

    _goUsageTerm = () => {
        this.props.navigation.navigate('UsageTerm');
    }

    render(){
        return(
            <View style={{width : width, height : height, flex : 1, backgroundColor : Colors.white}}>
                <TouchableOpacity
                    onPress={()=>this.setState({toggleNotification : !this.state.toggleNotification})}
                >
                    <View style={{alignItems : 'center', borderBottomWidth : 1, borderBottomColor : Colors.lightGrey}}>
                        <View style={{width : width - 40, height : 60, flexDirection : 'row', justifyContent : 'space-between'}}>
                            <View style={{height : '100%', width : '50%', justifyContent : 'center'}}>
                                <Text style={{fontSize : 15, color : Colors.black}}>알림 설정</Text>
                            </View>
                            <View style={{height : '100%', width : 50, justifyContent : 'center', alignItems : 'center'}}>
                                <FontAwesome5 name={'angle-down'} size={30}/>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                {
                    this.state.toggleNotification ? 
                    (
                        <View style={{alignItems : 'center', borderBottomWidth : 1, borderColor : Colors.lightGrey}}>
                            <View style={{width : width - 40, height : 60, flexDirection : 'row'}}>
                                <View style={{flexDirection : 'row', width : '50%', height : '100%'}}>
                                    <View style={{height : '100%', justifyContent : 'center', width : '60%'}}>
                                        <Text>예약상태 알림</Text>
                                    </View> 
                                    <View style={{height : '100%', justifyContent : 'center', width : '40%', alignItems : 'center'}}>
                                        <Switch

                                        />
                                    </View> 
                                </View> 
                                <View style={{flexDirection : 'row', width : '50%', height : '100%'}}>
                                    <View style={{height : '100%', justifyContent : 'center', width : '60%'}}>
                                        <Text>메세지 알림</Text>
                                    </View> 
                                    <View style={{height : '100%', justifyContent : 'center', width : '40%', alignItems : 'center'}}>
                                        <Switch

                                        />
                                    </View> 
                                </View> 
                            </View>
                            <View style={{width : width - 40, height : 60, flexDirection : 'row'}}>
                                <View style={{flexDirection : 'row', width : '50%', height : '100%'}}>
                                    <View style={{height : '100%', justifyContent : 'center', width : '60%'}}>
                                        <Text>일지작성 알림</Text>
                                    </View> 
                                    <View style={{height : '100%', justifyContent : 'center', width : '40%', alignItems : 'center'}}>
                                        <Switch

                                        />
                                    </View> 
                                </View> 
                                <View style={{flexDirection : 'row', width : '50%', height : '100%'}}>
                                    <View style={{height : '100%', justifyContent : 'center', width : '60%'}}>
                                        <Text>광고수신 동의</Text>
                                    </View> 
                                    <View style={{height : '100%', justifyContent : 'center', width : '40%', alignItems : 'center'}}>
                                        <Switch

                                        />
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
                

                <TouchableOpacity
                    onPress={this._goUsageTerm}
                >
                    <View style={{alignItems : 'center', borderBottomWidth : 1, borderBottomColor : Colors.lightGrey}}>
                        <View style={{width : width - 40, height : 60}}>
                            <View style={{height : '100%', width : '50%', justifyContent : 'center'}}>
                                <Text style={{fontSize : 15, color : Colors.black}}>이용약관</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={{alignItems : 'center', borderBottomWidth : 1, borderBottomColor : Colors.lightGrey}}>
                        <View style={{width : width - 40, height : 60}}>
                            <View style={{height : '100%', width : '50%', justifyContent : 'center'}}>
                                <Text style={{fontSize : 15, color : Colors.black}}>회원 탈퇴</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : Colors.white,
        flex : 1
    }
})