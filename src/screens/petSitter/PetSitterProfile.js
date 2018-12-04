import React, {Component} from 'react';
import Colors from '../../utils/Colors';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import Swiper from 'react-native-swiper';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import RoundedButton from '../components/buttons/RoundedButton';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Picker,
    Dimensions,
    ActivityIndicator,
    ScrollView
} from 'react-native';
const{width, height} = Dimensions.get('window');

export default class PetSitterProfile extends Component{

    constructor(props){
        super(props);
        this.state = {
            activityIndicator : false
        }
    }
    /**<View style={{ width : '75%', height : 40, borderWidth : 1, borderColor : Colors.lightGrey, borderRadius : 5}}>
                                <Picker
                                    selectedValue={'없음'}
                                    onValueChange={(itemValue, itemIndex) => {}}
                                    style={{width : '100%', height : '100%', borderWidth : 1, borderColor : Colors.black, borderRadius : 5}}
                                    >
                                    <Picker.Item label="없음" value="없음" />
                                    <Picker.Item label="산책 가능" value="산책 가능" />
                                    <Picker.Item label="목욕 가능" value="목욕 가능" />
                                    <Picker.Item label="응급 처치" value="응급 처치" />
                                    <Picker.Item label="모발 관리" value="모발 관리" />
                                </Picker>
                            </View>
                            <View style={{width : '25%', height : 40}}>
                                
                            </View>
     * 
     */
    render(){
        return(
            <ScrollView>
                <View style={{backgroundColor : Colors.white}}>

                    {this.state.activityIndicator ? (
                        <View style={{backgroundColor : 'rgba(0,0,0,0.2)', width : width, height : height, position : 'absolute', zIndex : 10, alignItems : 'center', justifyContent : 'center'}}>
                            <ActivityIndicator size="large" color="#10b5f1"/>
                        </View>
                    ) : (null)}

                    <View style={{alignItems : 'center', justifyContent : 'center', width : width, height : 200, backgroundColor : Colors.white, borderBottomWidth : 1, borderBottomColor : Colors.buttonBorderGrey}}>
                        <View style={{ alignItems : 'center', justifyContent : 'center'}}>
                            <RoundedButton
                                title='사진 등록'
                                buttonHandleFunc={() => {}}
                                buttonColor={{backgroundColor : Colors.white}}
                                textColor={{color : Colors.buttonBorderGrey}}
                                textSize={{fontSize:15, fontWeight : '200'}}
                                customButtonStyle={{width : 90, height : 35, borderWidth : 1, borderColor : Colors.buttonBorderGrey}}
                            />
                        </View>
                    </View>

                    <View style={{width : width, height : 40, alignItems : 'center'}}>
                        <View style={{width : width - 30, height : '100%', justifyContent : 'center'}}>
                            <Text style={{fontSize : 15, color : Colors.black}}>기본정보</Text>
                        </View>
                    </View>

                    <View style={{height : 70, alignItems : 'center'}}>
                        <View style={{width : width - 30, height : '40%'}}>
                            <Text>이름</Text>
                        </View>
                        <View style={{width : width - 30, height : '60%'}}>
                            <TextInput style={{backgroundColor : Colors.lightGrey, paddingLeft : 10, paddingRight : 0, paddingTop : 0, paddingBottom : 0, borderRadius : 5}}/>
                        </View>
                    </View>

                    <View style={{height : 70, alignItems : 'center'}}>
                        <View style={{width : width - 30, height : '40%'}}>
                            <Text>한줄 소개</Text>
                        </View>
                        <View style={{width : width - 30, height : '60%'}}>
                            <TextInput style={{backgroundColor : Colors.lightGrey, paddingLeft : 10, paddingRight : 0, paddingTop : 0, paddingBottom : 0, borderRadius : 5}}/>
                        </View>
                    </View>

                    <View style={{height : 70, alignItems : 'center'}}>
                        <View style={{width : width - 30, height : '40%'}}>
                            <Text>펫시팅 환경</Text>
                        </View>
                        <View style={{width : width - 30, height : '60%'}}>
                            <TextInput style={{backgroundColor : Colors.lightGrey, paddingLeft : 10, paddingRight : 0, paddingTop : 0, paddingBottom : 0, borderRadius : 5}}/>
                        </View>
                    </View>

                    <View style={{height : 40, alignItems : 'center'}}>
                        <View style={{width : width - 30, height : '100%', justifyContent : 'center'}}>
                            <Text style={{fontSize : 15, color : Colors.black}}>반려동물 여부</Text>
                        </View>
                    </View>

                    <View style={{alignItems : 'center'}}>
                        <View style={{width : width -30}}>
                            <RadioGroup>
                                <RadioButton>
                                    <Text>반려동물과 함께 살고 있어요</Text>
                                </RadioButton>
                                <RadioButton>
                                    <Text>현재는 반려동물과 살고 있지 않아요</Text>
                                </RadioButton>
                            </RadioGroup>
                        </View>
                    </View>

                    <View style={{height : 40, alignItems : 'center'}}>
                        <View style={{width : width - 30, height : '100%', justifyContent : 'center'}}>
                            <Text style={{fontSize : 15, color : Colors.black}}>이용가능 서비스</Text>
                        </View>
                    </View>
                    
                    <View style={{alignItems : 'center'}}>
                        <View style={{width : width - 30, flexDirection : 'row', flexWrap : 'wrap'}}>
                            <View style={{borderWidth : 1, borderColor : Colors.black, borderRadius : 5, margin : 5}}>
                                <TouchableOpacity>
                                    <Text style={{margin : 5}}>장기 가능</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{borderWidth : 1, borderColor : Colors.black, borderRadius : 5, margin : 5}}>
                                <TouchableOpacity>
                                    <Text style={{margin : 5}}>산책 가능</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{borderWidth : 1, borderColor : Colors.black, borderRadius : 5, margin : 5}}>
                                <TouchableOpacity>
                                    <Text style={{margin : 5}}>목욕 가능</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{borderWidth : 1, borderColor : Colors.black, borderRadius : 5, margin : 5}}>
                                <TouchableOpacity>
                                    <Text style={{margin : 5}}>응급 처치</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{borderWidth : 1, borderColor : Colors.black, borderRadius : 5, margin : 5}}>
                                <TouchableOpacity>
                                    <Text style={{margin : 5}}>모발 관리</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{height : 40, alignItems : 'center'}}>
                        <View style={{width : width - 30, height : '100%', justifyContent : 'center'}}>
                            <Text style={{fontSize : 15, color : Colors.black}}>펫시팅 불가 여부</Text>
                        </View>
                    </View>
                    
                    <View style={{alignItems : 'center'}}>
                        <View style={{width : width - 30, flexDirection : 'row', flexWrap : 'wrap'}}>
                            <View style={{borderWidth : 1, borderColor : Colors.black, borderRadius : 5, margin : 5}}>
                                <TouchableOpacity>
                                    <Text style={{margin : 5}}>마킹이 심한 아이</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{borderWidth : 1, borderColor : Colors.black, borderRadius : 5, margin : 5}}>
                                <TouchableOpacity>
                                    <Text style={{margin : 5}}>배변 훈련 안된 아이</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{borderWidth : 1, borderColor : Colors.black, borderRadius : 5, margin : 5}}>
                                <TouchableOpacity>
                                    <Text style={{margin : 5}}>공격적인 아이</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{borderWidth : 1, borderColor : Colors.black, borderRadius : 5, margin : 5}}>
                                <TouchableOpacity>
                                    <Text style={{margin : 5}}>분리 불안 있는 아이</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{borderWidth : 1, borderColor : Colors.black, borderRadius : 5, margin : 5}}>
                                <TouchableOpacity>
                                    <Text style={{margin : 5}}>물어 뜯는 아이</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{height : 40, alignItems : 'center'}}>
                        <View style={{width : width - 30, height : '100%', justifyContent : 'center'}}>
                            <Text style={{fontSize : 15, color : Colors.black}}>금액 설정</Text>
                        </View>
                    </View>

                </View>
            </ScrollView>
        );
    }
}