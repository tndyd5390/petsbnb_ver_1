import React, {Component} from 'react';
import Colors from '../../utils/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-datepicker';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import RoundedButton from '../components/buttons/RoundedButton';
import {
    View,
    Text,
    AsyncStorage,
    KeyboardAvoidingView,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Platform,
    TextInput,
    ScrollView
} from 'react-native';
const{width, height} = Dimensions.get('window');

export default class PetSitterApplyForm extends Component{
    render() {
        return(
            <View style={{backgroundColor : Colors.white, height : height , flex : 1}}>
                <ScrollView>
                    <View style={{ height : 50, alignItems : 'center', marginTop : 10}}>
                        <View style={{ flexDirection : 'row', height : '100%'}}>
                            <View style={{height : '100%', width : '25%', justifyContent : 'center'}}>
                                <Text style={{ fontSize : 15, color : Colors.black}}>이름</Text>
                            </View>
                            <View style={{height : '100%', width : '65%', justifyContent : 'center'}}>
                                <TextInput 
                                    style={{
                                        backgroundColor : Colors.lightGrey, 
                                        height : '60%', borderWidth : 1, 
                                        borderColor : '#BDBDBD', 
                                        paddingLeft : 10, 
                                        paddingTop : 0, 
                                        paddingBottom : 0, 
                                        paddingRight : 0, 
                                        fontSize : 15
                                    }}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{ height : 50, alignItems : 'center'}}>
                        <View style={{ flexDirection : 'row', height : '100%'}}>
                            <View style={{height : '100%', width : '25%', justifyContent : 'center'}}>
                                <Text style={{ fontSize : 15, color : Colors.black}}>성별</Text>
                            </View>
                            <View style={{height : '100%', width : '65%', flexDirection : 'row'}}>
                                <View style={{height : '100%', width : '50%', justifyContent : 'center'}}>
                                    <View style={{flexDirection : 'row'}}>
                                        <TouchableOpacity
                                            style={{flexDirection : 'row'}}
                                        >
                                            <FontAwesome5 name={'check-square'} size={20} />
                                            <Text style={{marginLeft : 10}}>남성</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{height : '100%', width : '50%', justifyContent : 'center'}}>
                                    <View style={{flexDirection : 'row'}}>
                                        <TouchableOpacity
                                            style={{flexDirection : 'row'}}
                                        >
                                            <FontAwesome5 name={'check-square'} size={20} />
                                            <Text style={{marginLeft : 10}}>여성</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ height : 50, alignItems : 'center'}}>
                        <View style={{ flexDirection : 'row', height : '100%'}}>
                            <View style={{height : '100%', width : '25%', justifyContent : 'center'}}>
                                <Text style={{ fontSize : 15, color : Colors.black}}>생년월일</Text>
                            </View>
                            <View style={{height : '100%', width : '65%', justifyContent : 'center'}}>
                            <DatePicker
                                style={{width:'100%'}}
                                date={'2011-11-11'}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate="1980-01-01"
                                maxDate="2200-01-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                onDateChange={(date) => {this.setState({petBirthday: date})}}
                            />
                            </View>
                        </View>
                    </View>

                    <View style={{ height : 50, alignItems : 'center'}}>
                        <View style={{ flexDirection : 'row', height : '100%'}}>
                            <View style={{height : '100%', width : '25%', justifyContent : 'center'}}>
                                <Text style={{ fontSize : 15, color : Colors.black}}>연락처</Text>
                            </View>
                            <View style={{height : '100%', width : '65%', justifyContent : 'center'}}>
                                <TextInput 
                                    style={{
                                        backgroundColor : Colors.lightGrey, 
                                        height : '60%', 
                                        borderWidth : 1, 
                                        borderColor : '#BDBDBD', 
                                        paddingLeft : 10, 
                                        paddingTop : 0, 
                                        paddingBottom : 0, 
                                        paddingRight : 0, 
                                        fontSize : 15
                                    }}
                                    placeholder='-없이 입력'
                                />
                            </View>
                        </View>
                    </View>

                    

                    <View style={{ height : 50, alignItems : 'center'}}>
                        <View style={{ flexDirection : 'row', height : '100%'}}>
                            <View style={{height : '100%', width : '25%', justifyContent : 'center'}}>
                                <Text style={{ fontSize : 15, color : Colors.black}}>이메일</Text>
                            </View>
                            <View style={{height : '100%', width : '65%', justifyContent : 'center'}}>
                                <TextInput 
                                    style={{
                                        backgroundColor : Colors.lightGrey, 
                                        height : '60%', 
                                        borderWidth : 1, 
                                        borderColor : '#BDBDBD', 
                                        paddingLeft : 10, 
                                        paddingTop : 0, 
                                        paddingBottom : 0, 
                                        paddingRight : 0, 
                                        fontSize : 15
                                    }}
                                    keyboardType='email-address'
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{ height : 50, alignItems : 'center'}}>
                        <View style={{ flexDirection : 'row', height : '100%'}}>
                            <View style={{height : '100%', width : '25%', justifyContent : 'center'}}>
                                <Text style={{ fontSize : 15, color : Colors.black}}>직업</Text>
                            </View>
                            <View style={{height : '100%', width : '65%', justifyContent : 'center'}}>
                                <TextInput 
                                    style={{
                                        backgroundColor : Colors.lightGrey, 
                                        height : '60%', borderWidth : 1, 
                                        borderColor : '#BDBDBD', 
                                        paddingLeft : 10, 
                                        paddingTop : 0, 
                                        paddingBottom : 0, 
                                        paddingRight : 0, 
                                        fontSize : 15
                                    }}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{alignItems : 'center'}}>
                        <View style={{width : width - 40, height : 50, flexDirection : 'row'}}>
                            <View style={{height : '100%', width : '80%', alignItems : 'center', justifyContent : 'center'}}>
                                <Text style={{paddingRight : 10}}>
                                    {`펫시팅 주소는 회원 프로필주소와 동일한 주소로 신청됩니다. 회원 프로필 주소를 확인해 주세요.`}
                                </Text>
                            </View>
                            <View style={{ height : '100%', width : '20%', alignItems : 'center', justifyContent : 'center'}}>
                                <TouchableOpacity
                                    style={{borderWidth : 1, borderColor : Colors.black, borderRadius : 10, width : '100%', height : '80%', alignItems : 'center', justifyContent : 'center'}}
                                >
                                    <Text>주소 확인</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    
                    <TouchableOpacity 
                        style={[{width: width, 
                        height: 50, 
                        backgroundColor: Colors.buttonSky, 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        marginBottom : 10
                        }, 
                        Platform.OS === 'ios' ? {bottom : 20} : {bottom  : 0}]}
                        onPress={this._regPetProfile}
                    >
                        <Text style={{color : Colors.white, fontSize : 20, fontWeight : '700'}}>다음</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        );
    }
}