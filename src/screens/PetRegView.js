import React, {Component} from 'react';
import Colors from '../utils/Colors';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Swiper from 'react-native-swiper';
import RoundedButton from './components/buttons/RoundedButton';
import DatePicker from 'react-native-datepicker';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Dimensions,
    AsyncStorage,
    ActivityIndicator,
    ScrollView,
    StyleSheet
} from 'react-native';
const{width, height} = Dimensions.get('window');

export default class PetRegView extends Component{

    constructor(props){
        super(props);
        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth + 1;
        const yyyy = today.getFullYear();
        this.state = {
            userNo : '',
            activityIndicator : false,
            date: yyyy + "-" + mm + "-" + dd
        }
        this._getUserNo();
    }

    _getUserNo = async() => {
        const userNo = await AsyncStorage.getItem('userInfo');
        this.setState({userNo : userNo})
    }

    _butttonHandleFunc = () => {
        alert("test");
    }

    render() {
        return(
            <View style={{backgroundColor : Colors.white}}>
                {this.state.activityIndicator ? (
                    <View style={{backgroundColor : 'rgba(0,0,0,0.2)', width : width, height : height, position : 'absolute', zIndex : 10, alignItems : 'center', justifyContent : 'center'}}>
                        <ActivityIndicator size="large" color="#10b5f1"/>
                    </View>
                ) : (null)}
                <ScrollView>
                    <View style={{width : width, height : 250, backgroundColor : Colors.white, borderBottomWidth : 1, borderBottomColor : Colors.buttonBorderGrey}}>
                        <Swiper loop={false}>
                            <View style={{ alignItems : 'center', justifyContent : 'center'}}>
                                <RoundedButton
                                    title='사진 등록'
                                    buttonHandleFunc={this._butttonHandleFunc}
                                    buttonColor={{backgroundColor : Colors.white}}
                                    textColor={{color : Colors.buttonBorderGrey}}
                                    textSize={{fontSize:15, fontWeight : '200'}}
                                    customButtonStyle={{width : 90, height : 35, borderWidth : 1, borderColor : Colors.buttonBorderGrey, marginTop : 100}}
                                />
                            </View>
                            <View style={{ alignItems : 'center', justifyContent : 'center'}}>
                                <RoundedButton
                                    title='사진 등록'
                                    buttonHandleFunc={this._butttonHandleFunc}
                                    buttonColor={{backgroundColor : Colors.white}}
                                    textColor={{color : Colors.buttonBorderGrey}}
                                    textSize={{fontSize:15, fontWeight : '200'}}
                                    customButtonStyle={{width : 90, height : 35, borderWidth : 1, borderColor : Colors.buttonBorderGrey, marginTop : 100}}
                                />
                            </View>
                        </Swiper>
                    </View>
                    
                    <View style={{ height : 50, alignItems : 'center'}}>
                        <View style={{ flexDirection : 'row', height : '100%'}}>
                            <View style={{height : '100%', width : '35%', justifyContent : 'center'}}>
                                <Text style={{marginLeft : 20, fontSize : 15, color : Colors.black}}>이름</Text>
                            </View>
                            <View style={{height : '100%', width : '55%', justifyContent : 'center'}}>
                                <TextInput style={{backgroundColor : Colors.lightGrey, height : '60%', borderWidth : 1, borderColor : Colors.buttonBorderGrey, paddingLeft : 10, paddingTop : 0, paddingBottom : 0, paddingRight : 0, fontSize : 15}}/>
                            </View>
                        </View>
                    </View>

                    <View style={{ height : 50, alignItems : 'center'}}>
                        <View style={{ flexDirection : 'row', height : '100%'}}>
                            <View style={{height : '100%', width : '35%', justifyContent : 'center'}}>
                                <Text style={{marginLeft : 20, fontSize : 15, color : Colors.black}}>성별</Text>
                            </View>
                            <View style={{height : '100%', width : '55%', flexDirection : 'row'}}>
                                <View style={{height : '100%', width : '50%', justifyContent : 'center'}}>
                                    <View style={{flexDirection : 'row'}}>
                                        <TouchableOpacity
                                            onPress={this._toggleAgreeAll}
                                            style={{flexDirection : 'row'}}
                                        >
                                            <FontAwesome5 name={'check-square'} size={20} style={[this.state.agreeAll ? {color : Colors.buttonSky} : null]}/>
                                            <Text style={{marginLeft : 10}}>수컷</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{height : '100%', width : '50%', justifyContent : 'center'}}>
                                    <View style={{flexDirection : 'row'}}>
                                        <TouchableOpacity
                                            onPress={this._toggleAgreeAll}
                                            style={{flexDirection : 'row'}}
                                        >
                                            <FontAwesome5 name={'check-square'} size={20} style={[this.state.agreeAll ? {color : Colors.buttonSky} : null]}/>
                                            <Text style={{marginLeft : 10}}>암컷</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ height : 50, alignItems : 'center'}}>
                        <View style={{ flexDirection : 'row', height : '100%'}}>
                            <View style={{height : '100%', width : '35%', justifyContent : 'center'}}>
                                <Text style={{marginLeft : 20, fontSize : 15, color : Colors.black}}>품종</Text>
                            </View>
                            <View style={{height : '100%', width : '55%', justifyContent : 'center'}}>
                                <TextInput style={{backgroundColor : Colors.lightGrey, height : '60%', borderWidth : 1, borderColor : Colors.buttonBorderGrey, paddingLeft : 10, paddingTop : 0, paddingBottom : 0, paddingRight : 0, fontSize : 15}}/>
                            </View>
                        </View>
                    </View>

                    <View style={{ height : 50, alignItems : 'center'}}>
                        <View style={{ flexDirection : 'row', height : '100%'}}>
                            <View style={{height : '100%', width : '35%', justifyContent : 'center'}}>
                                <Text style={{marginLeft : 20, fontSize : 15, color : Colors.black}}>생일</Text>
                            </View>
                            <View style={{height : '100%', width : '55%', justifyContent : 'center'}}>
                            <DatePicker
                                style={{width:'100%'}}
                                date={this.state.date}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate="1980-01-01"
                                maxDate="2200-01-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                onDateChange={(date) => {this.setState({date: date})}}
                            />
                            </View>
                        </View>
                    </View>

                    <View style={{ height : 50, alignItems : 'center'}}>
                        <View style={{ flexDirection : 'row', height : '100%'}}>
                            <View style={{height : '100%', width : '35%', justifyContent : 'center'}}>
                                <Text style={{marginLeft : 20, fontSize : 15, color : Colors.black}}>몸무게</Text>
                            </View>
                            <View style={{height : '100%', width : '55%', justifyContent : 'center'}}>
                                <TextInput style={{backgroundColor : Colors.lightGrey, height : '60%', borderWidth : 1, borderColor : Colors.buttonBorderGrey, paddingLeft : 10, paddingTop : 0, paddingBottom : 0, paddingRight : 0, fontSize : 15}}/>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{ height : 50, alignItems : 'center'}}>
                        <View style={{ flexDirection : 'row', height : '100%'}}>
                            <View style={{height : '100%', width : '35%', justifyContent : 'center'}}>
                                <Text style={{marginLeft : 20, fontSize : 15, color : Colors.black}}>중성화 여부</Text>
                            </View>
                            <View style={{height : '100%', width : '55%', flexDirection : 'row'}}>
                                <View style={{height : '100%', width : '50%', justifyContent : 'center'}}>
                                    <View style={{flexDirection : 'row'}}>
                                        <TouchableOpacity
                                            onPress={this._toggleAgreeAll}
                                            style={{flexDirection : 'row'}}
                                        >
                                            <FontAwesome5 name={'check-square'} size={20} style={[this.state.agreeAll ? {color : Colors.buttonSky} : null]}/>
                                            <Text style={{marginLeft : 10}}>했어요</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{height : '100%', width : '50%', justifyContent : 'center'}}>
                                    <View style={{flexDirection : 'row'}}>
                                        <TouchableOpacity
                                            onPress={this._toggleAgreeAll}
                                            style={{flexDirection : 'row'}}
                                        >
                                            <FontAwesome5 name={'check-square'} size={20} style={[this.state.agreeAll ? {color : Colors.buttonSky} : null]}/>
                                            <Text style={{marginLeft : 10}}>안했어요</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    
                </ScrollView>
            </View>
        );
    }
}

