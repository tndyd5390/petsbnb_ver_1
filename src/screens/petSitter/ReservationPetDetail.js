import React,{Component} from 'react';
import Colors from '../../utils/Colors';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DatePicker from 'react-native-datepicker';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import PetProfileRegCheckbox from '../components/checkbox/PetProfileRegCheckbox';
import Swiper from 'react-native-swiper';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Dimensions,
    AsyncStorage,
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Platform,
    Image,
    Alert
} from "react-native";
import { ip } from "../../utils/const";
const {width, height} = Dimensions.get("window");

export default class ReservationPetDetail extends Component{
    constructor(props){
        super(props);
        const{petDetail, petImages} = this.props.navigation.getParam("petDetail");
        console.log(petDetail);
        this.state={
            petDetail,
            petImages
        }
    }
    _imageDisplay = () => {
        let imageView = [];
        const imageDataArr = this.state.petImages;
        imageDataArr.forEach((value, index) => {
            const uri = {uri : `${ip}/petImageFile/` + value}
            imageView.push(<View key={index} style={{ alignItems : 'center', justifyContent : 'center'}}>
                                <Image source={uri} style={{width : '100%', height : '100%'}}/>
                           </View>)
        });
        return imageView;
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
                        <Swiper 
                            loop={false}
                            key={this.state.petImages.length}
                        >
                        {this._imageDisplay()}
                        </Swiper>
                    </View>
                    
                    <View style={{ height : 40, alignItems : 'center'}}>
                        <View style={{ flexDirection : 'row', height : '100%'}}>
                            <View style={{height : '100%', width : '35%', justifyContent : 'center'}}>
                                <Text style={{marginLeft : 20, fontSize : 15, color : Colors.black}}>이름</Text>
                            </View>
                            <View style={{height : '100%', width : '55%', justifyContent : 'center'}}>
                                <Text>{this.state.petDetail.petName}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ height : 40, alignItems : 'center'}}>
                        <View style={{ flexDirection : 'row', height : '100%'}}>
                            <View style={{height : '100%', width : '35%', justifyContent : 'center'}}>
                                <Text style={{marginLeft : 20, fontSize : 15, color : Colors.black}}>성별</Text>
                            </View>
                            <View style={{height : '100%', width : '55%', justifyContent: "center"}}>
                               <Text>{this.state.petDetail.petGender}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ height : 40, alignItems : 'center'}}>
                        <View style={{ flexDirection : 'row', height : '100%'}}>
                            <View style={{height : '100%', width : '35%', justifyContent : 'center'}}>
                                <Text style={{marginLeft : 20, fontSize : 15, color : Colors.black}}>견종</Text>
                            </View>
                            <View style={{height : '100%', width : '55%', justifyContent : 'center'}}>
                                <Text>{this.state.petDetail.petKind}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ height : 40, alignItems : 'center'}}>
                        <View style={{ flexDirection : 'row', height : '100%'}}>
                            <View style={{height : '100%', width : '35%', justifyContent : 'center'}}>
                                <Text style={{marginLeft : 20, fontSize : 15, color : Colors.black}}>생일</Text>
                            </View>
                            <View style={{height : '100%', width : '55%', justifyContent : 'center'}}>
                                <Text>{this.state.petDetail.petBirthday}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ height : 40, alignItems : 'center'}}>
                        <View style={{ flexDirection : 'row', height : '100%'}}>
                            <View style={{height : '100%', width : '35%', justifyContent : 'center'}}>
                                <Text style={{marginLeft : 20, fontSize : 15, color : Colors.black}}>몸무게</Text>
                            </View>
                            <View style={{height : '100%', width : '55%', justifyContent : 'center'}}>
                                <Text>{this.state.petDetail.petWeight}</Text>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{ height : 40, alignItems : 'center'}}>
                        <View style={{ flexDirection : 'row', height : '100%'}}>
                            <View style={{height : '100%', width : '35%', justifyContent : 'center'}}>
                                <Text style={{marginLeft : 20, fontSize : 15, color : Colors.black}}>중성화 여부</Text>
                            </View>
                            <View style={{height : '100%', width : '55%', justifyContent: "center"}}>
                                <Text>{this.state.petDetail.petNeutralization === "male" ? "수컷" : "암컷"}</Text>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{borderBottomWidth : 1, borderBottomColor : Colors.lightGrey, height : 10}}>
                    </View>

                    <View style={{alignItems : 'center', marginTop : 20}}>
                        <View style={{width : width - 40, flexDirection : 'row'}}>
                            <Text style={{fontSize : 15, fontWeight : '500'}}>
                                1. 낯선 사람을 만나면 어떤가요?
                            </Text>
                        </View>
                    </View>

                    <View style={{alignItems : 'center', marginTop: 8}}>
                        <View style={{width : width - 50}}>
                            <Text style={{fontSize: 16}}>{this.state.petDetail.petUnfamiliar}</Text>
                        </View>
                    </View>

                    
                    <View style={{borderBottomWidth : 1, borderBottomColor : Colors.lightGrey, height : 10}}></View>
                   
                    <View style={{alignItems : 'center', marginTop : 20}}>
                        <View style={{width : width - 40, flexDirection : 'row'}}>
                            <Text style={{fontSize : 15, fontWeight : '500'}}>
                                2. 다른 강아지를 만나면 어떤가요?
                            </Text>
                        </View>
                    </View>

                    <View style={{alignItems : 'center'}}>
                        <View style={{width : width - 50, marginTop: 8}}>
                            <Text style={{fontSize: 16}}>{this.state.petDetail.petMeetAnotherPet}</Text>
                        </View>
                    </View>

                    <View style={{borderBottomWidth : 1, borderBottomColor : Colors.lightGrey, height : 10}}></View>

                    <View style={{alignItems : 'center', marginTop : 20}}>
                        <View style={{width : width - 40, flexDirection : 'row'}}>
                            <Text style={{fontSize : 15, fontWeight : '500'}}>
                                3. 짖음은 어느정도인가요?
                            </Text>
                        </View>
                    </View>

                    <View style={{alignItems : 'center'}}>
                        <View style={{width : width - 50, marginTop: 8}}>
                            <Text style={{fontSize: 16}}>{this.state.petDetail.petBarks}</Text>
                        </View>
                    </View>

                    <View style={{borderBottomWidth : 1, borderBottomColor : Colors.lightGrey, height : 10}}></View>

                    <View style={{alignItems : 'center', marginTop : 20}}>
                        <View style={{width : width - 40, flexDirection : 'row'}}>
                            <Text style={{fontSize : 15, fontWeight : '500'}}>
                                4. 배변 훈련은 어떤 편인가요?
                            </Text>
                        </View>
                    </View>

                    <View style={{alignItems : 'center'}}>
                        <View style={{width : width - 50, marginTop: 8}}>
                            <Text style={{fontSize: 16}}>{this.state.petDetail.petBowelTraining}</Text>
                        </View>
                    </View>

                    <View style={{borderBottomWidth : 1, borderBottomColor : Colors.lightGrey, height : 10}}></View>

                    <View style={{alignItems : 'center', marginTop : 20}}>
                        <View style={{width : width - 40, flexDirection : 'row'}}>
                            <Text style={{fontSize : 15, fontWeight : '500'}}>
                                예방 접종 여부
                            </Text>
                        </View>
                    </View>
                    <PetProfileRegCheckbox checkFunc={() => {}} text='종합백신 7종' isChecked={this.state.petDetail.petComprehensiveVaccine} disabled={true}/>
                    <PetProfileRegCheckbox checkFunc={() => {}} text='광견병 예방접종' isChecked={this.state.petDetail.petRabiesVaccination} disabled={true}/>
                    <PetProfileRegCheckbox checkFunc={() => {}} text='심장사사충 (매월 1회)' isChecked={this.state.petDetail.petHeartworm} disabled={true}/>
                    <PetProfileRegCheckbox checkFunc={() => {}} text='코로나 장염 (매년 1회)' isChecked={this.state.petDetail.petCoronaenteritis} disabled={true}/>
                    <PetProfileRegCheckbox checkFunc={() => {}} text='켄넬 코프 (매년 1회)' isChecked={this.state.petDetail.petKennelkov} disabled={true}/>
                    <PetProfileRegCheckbox checkFunc={() => {}} text='접종을 아예 하지 않았습니다.' isChecked={this.state.petDetail.petNoneVaccine} disabled={true}/>

                    <View style={{borderBottomWidth : 1, borderBottomColor : Colors.lightGrey, height : 10, marginTop : 10}}></View>

                    <View style={{alignItems : 'center', marginTop : 20, marginBottom : 10}}>
                        <View style={{width : width - 40, flexDirection : 'row'}}>
                            <Text style={{fontSize : 15, fontWeight : '500'}}>
                                주의가 필요한 건강 특이 사항
                            </Text>
                        </View>
                    </View>

                    <View style={{alignItems : 'center'}}>
                        <View style={{width : width -40}}>
                            <Text style={{fontSize: 16}}>
                                {
                                    this.state.petDetail.petSpecialMatters === "" || 
                                    typeof this.state.petDetail.petSpecialMatters === "undefined" || 
                                    this.state.petDetail.petSpecialMatters === null
                                    ? 
                                    `없음`
                                    :
                                    `${this.state.petDetail.petSpecialMatters}`
                                }
                            </Text>
                        </View>
                    </View>

                    <View style={{borderBottomWidth : 1, borderBottomColor : Colors.lightGrey, height : 10, marginTop : 10}}></View>

                    <View style={{alignItems : 'center', marginTop : 20, marginBottom : 10}}>
                        <View style={{width : width - 40, flexDirection : 'row'}}>
                            <Text style={{fontSize : 15, fontWeight : '500'}}>
                                기타 참고사항
                            </Text>
                        </View>
                    </View>

                    <View style={{alignItems : 'center',marginBottom : 20}}>
                        <View style={{width : width -40}}>
                            <Text style={{fontSize: 16}}>
                                {
                                    this.state.petDetail.petReference === "" || 
                                    typeof this.state.petDetail.petReference === "undefined" || 
                                    this.state.petDetail.petReference === null
                                    ? 
                                    `없음`
                                    :
                                    `${this.state.petDetail.petReference}`
                                }
                            </Text>
                        </View>
                    </View>

                </ScrollView>
            </View>
        );
    }
}
