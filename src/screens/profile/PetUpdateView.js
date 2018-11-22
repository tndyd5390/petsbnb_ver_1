import React,{Component} from 'react';
import Colors from '../../utils/Colors';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import RoundedButton from '../components/buttons/RoundedButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { StackActions, NavigationActions } from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import PetProfileRegCheckbox from '../components/checkbox/PetProfileRegCheckbox';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
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
    Image
} from 'react-native'
const{width, height} =Dimensions.get('window');

export default class PetUpdateView extends Component{

    constructor(props){
        super(props);
        const petNo = this.props.navigation.getParam('petNo');
        this.state = {
            petNo : petNo,
            activityIndicator : false,
        }
        this._getPetInfo();
    }

    _gotoInit = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Tabs' })],
          });
        this.props.rootStack.dispatch(resetAction);
    }

    _getPetInfo = async() => {
        const userNo = await AsyncStorage.getItem('userInfo');
        const params = {
            userNo : userNo,
            petNo : this.state.petNo
        }
        await fetch('http://192.168.0.10:8080/pet/getPetInfo.do', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
          })
        .then((response) => response.json())
        .then((res => {
            console.log(res);
                if(res.petDTO != null){
                    const pDTO = res.petDTO;
                    this.setState({
                        userNo : userNo,
                        petBirthday: pDTO.petBirthday,
                        petName : pDTO.petName,
                        petGender : pDTO.petGender,
                        petKind : pDTO.petKind,
                        petWeight : pDTO.petWeight,
                        petNeutralization : pDTO.petNeutralization == '1' ? true : false,
                        petUnfamiliar : pDTO.petUnfamiliar,
                        petMeetAnotherPet : pDTO.petMeetAnotherPet,
                        petBarks : pDTO.petBarks,
                        petBowelTraining : pDTO.petBowelTraining,
                        petComprehensiveVaccine : pDTO.petComprehensiveVaccine == '1' ? true : false,
                        petRabiesVaccination : pDTO.petRabiesvaccination == '1' ? true : false,
                        petHeartWorm : pDTO.petHeartworm == '1' ? true : false,
                        petCoronaEnteritis : pDTO.petCoronaenteritis == '1' ? true : false,
                        petKennelkov : pDTO.petKennelkov == '1' ? true : false,
                        petNoneVaccine : pDTO.petNonevaccine == '1' ? true : false,
                        petSpecialMatters : pDTO.petSpecialMatters,
                        petReference : pDTO.petReference,
                        
                        imageDataArr : []
                    })
                }else{
                    alert("잠시후 다시 시도해 주세요.");
                    this._gotoInit();
                }
        }))
        .catch((err) => {
            alert('서버에러입니다. 잠시후 다시 시도해 주세요.');
            this._gotoInit();
        })
    }

    render(){
        console.log(this.state);
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
                        >
                        <View style={{ alignItems : 'center', justifyContent : 'center'}}>
                                <Image source={require('../../../img/user.png')} style={{width : '100%', height : '100%'}}/>
                                <View style={{position : 'absolute', bottom : 10, right : 15}}>
                                    <TouchableOpacity
                                        onPress={() => this._deleteImage(index)}
                                    >
                                        <FontAwesome5 name='trash-alt' size={30} color={Colors.white}/>
                                    </TouchableOpacity>
                                </View>
                           </View>
                        </Swiper>
                    </View>
                    
                    <View style={{ height : 50, alignItems : 'center'}}>
                        <View style={{ flexDirection : 'row', height : '100%'}}>
                            <View style={{height : '100%', width : '35%', justifyContent : 'center'}}>
                                <Text style={{marginLeft : 20, fontSize : 15, color : Colors.black}}>이름</Text>
                            </View>
                            <View style={{height : '100%', width : '55%', justifyContent : 'center'}}>
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
                                    placeholder='예) 삐삐'
                                    onChangeText={(petName) => this.setState({petName : petName})}
                                />
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
                                            style={{flexDirection : 'row'}}
                                            onPress={() => this.setState({petGender : 'male'})}
                                        >
                                            <FontAwesome5 name={'check-square'} size={20} style={[this.state.petGender == 'male' ? {color : Colors.buttonSky} : null]}/>
                                            <Text style={{marginLeft : 10}}>수컷</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{height : '100%', width : '50%', justifyContent : 'center'}}>
                                    <View style={{flexDirection : 'row'}}>
                                        <TouchableOpacity
                                            style={{flexDirection : 'row'}}
                                            onPress={() => this.setState({petGender : 'female'})}
                                        >
                                            <FontAwesome5 name={'check-square'} size={20} style={[this.state.petGender == 'female' ? {color : Colors.buttonSky} : null]}/>
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
                                    placeholder='예) 말티즈'
                                    onChangeText={(petKind) => this.setState({petKind : petKind})}
                                />
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
                                date={this.state.petBirthday}
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
                            <View style={{height : '100%', width : '35%', justifyContent : 'center'}}>
                                <Text style={{marginLeft : 20, fontSize : 15, color : Colors.black}}>몸무게</Text>
                            </View>
                            <View style={{height : '100%', width : '55%', justifyContent : 'center'}}>
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
                                    keyboardType='numeric'
                                    placeholder='kg단위로 입력'
                                    onChangeText={(petWeight) => this.setState({petWeight : petWeight})}
                                />
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
                                            onPress={() => this.setState({petNeutralization : true})}
                                            style={{flexDirection : 'row'}}
                                        >
                                            <FontAwesome5 name={'check-square'} size={20} style={[this.state.petNeutralization == true ? {color : Colors.buttonSky} : null]}/>
                                            <Text style={{marginLeft : 10}}>했어요</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{height : '100%', width : '50%', justifyContent : 'center'}}>
                                    <View style={{flexDirection : 'row'}}>
                                        <TouchableOpacity
                                            onPress={() => this.setState({petNeutralization : false})}
                                            style={{flexDirection : 'row'}}
                                        >
                                            <FontAwesome5 name={'check-square'} size={20} style={[this.state.petNeutralization == false ? {color : Colors.buttonSky} : null]}/>
                                            <Text style={{marginLeft : 10}}>안했어요</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{borderBottomWidth : 1, borderBottomColor : Colors.lightGrey, height : 10}}>
                    </View>

                    <View style={{alignItems : 'center', marginTop : 20}}>
                        <View style={{width : width - 40, flexDirection : 'row'}}>
                            <Text style={{fontSize : 15, fontWeight : '500'}}>
                                Q1. 낯선 사람을 만나면 어떤가요?
                            </Text>
                            <Text style={{color : Colors.buttonSky}}>
                                {` (필수)`}
                            </Text>
                        </View>
                    </View>

                    <View style={{alignItems : 'center'}}>
                        <View style={{width : width - 50}}>
                            <RadioGroup
                                onSelect = {(index, value) => this.setState({petUnfamiliar : value})}
                                selectedIndex={this.state.petUnfamiliar}
                            >
                                <RadioButton value={'0'} >
                                    <Text>좋아하며 잘 어울려요</Text>
                                </RadioButton>
                                <RadioButton value={'1'}>
                                    <Text>별로 관심이 없어요</Text>
                                </RadioButton>
                                <RadioButton value={'2'}>
                                    <Text>무서워하며 피하려고 해요</Text>
                                </RadioButton>
                                <RadioButton value={'3'}>
                                    <Text>짖으면서 달려들어요</Text>
                                </RadioButton>
                            </RadioGroup>
                        </View>
                    </View>

                    
                    <View style={{borderBottomWidth : 1, borderBottomColor : Colors.lightGrey, height : 10}}></View>
                   
                    <View style={{alignItems : 'center', marginTop : 20}}>
                        <View style={{width : width - 40, flexDirection : 'row'}}>
                            <Text style={{fontSize : 15, fontWeight : '500'}}>
                                Q2. 다른 강아지를 만나면 어떤가요?
                            </Text>
                            <Text style={{color : Colors.buttonSky}}>
                                {` (필수)`}
                            </Text>
                        </View>
                    </View>

                    <View style={{alignItems : 'center'}}>
                        <View style={{width : width - 50}}>
                            <RadioGroup
                                onSelect = {(index, value) => this.setState({petMeetAnotherPet : value})}
                                selectedIndex={this.state.petMeetAnotherPet}
                            >
                                <RadioButton value={'0'} >
                                    <Text>좋아하며 잘 어울려요</Text>
                                </RadioButton>
                                <RadioButton value={'1'}>
                                    <Text>별로 관심이 없어요</Text>
                                </RadioButton>
                                <RadioButton value={'2'}>
                                    <Text>무서워하며 피하려고 해요</Text>
                                </RadioButton>
                                <RadioButton value={'3'}>
                                    <Text>짖으면서 달려들어요</Text>
                                </RadioButton>
                            </RadioGroup>
                        </View>
                    </View>

                    <View style={{borderBottomWidth : 1, borderBottomColor : Colors.lightGrey, height : 10}}></View>

                    <View style={{alignItems : 'center', marginTop : 20}}>
                        <View style={{width : width - 40, flexDirection : 'row'}}>
                            <Text style={{fontSize : 15, fontWeight : '500'}}>
                                Q3. 짖음은 어느정도인가요?
                            </Text>
                            <Text style={{color : Colors.buttonSky}}>
                                {` (필수)`}
                            </Text>
                        </View>
                    </View>

                    <View style={{alignItems : 'center'}}>
                        <View style={{width : width - 50}}>
                            <RadioGroup
                                onSelect = {(index, value) => this.setState({petBarks : value})}
                                selectedIndex={this.state.petBarks}
                            >
                                <RadioButton value={'0'} >
                                    <Text>거의 짖지 않아요</Text>
                                </RadioButton>
                                <RadioButton value={'1'}>
                                    <Text>외부 소음에만 짖는 편이에요</Text>
                                </RadioButton>
                                <RadioButton value={'2'}>
                                    <Text>이유없이 헛짖음을 자주 해요</Text>
                                </RadioButton>
                            </RadioGroup>
                        </View>
                    </View>

                    <View style={{borderBottomWidth : 1, borderBottomColor : Colors.lightGrey, height : 10}}></View>

                    <View style={{alignItems : 'center', marginTop : 20}}>
                        <View style={{width : width - 40, flexDirection : 'row'}}>
                            <Text style={{fontSize : 15, fontWeight : '500'}}>
                                Q4. 배변 훈련은 어떤 편인가요?
                            </Text>
                            <Text style={{color : Colors.buttonSky}}>
                                {` (필수)`}
                            </Text>
                        </View>
                    </View>

                    <View style={{alignItems : 'center'}}>
                        <View style={{width : width - 50}}>
                            <RadioGroup
                                onSelect = {(index, value) => this.setState({petBowelTraining : value})}
                                selectedIndex={this.state.petBowelTraining}
                            >
                                <RadioButton value={'0'} >
                                    <Text>배변 패드에 잘 가려요</Text>
                                </RadioButton>
                                <RadioButton value={'1'}>
                                    <Text>아직 배변 실수가 있어요</Text>
                                </RadioButton>
                                <RadioButton value={'2'}>
                                    <Text>실외배변만 해요</Text>
                                </RadioButton>
                            </RadioGroup>
                        </View>
                    </View>

                    <View style={{borderBottomWidth : 1, borderBottomColor : Colors.lightGrey, height : 10}}></View>

                    <View style={{alignItems : 'center', marginTop : 20}}>
                        <View style={{width : width - 40, flexDirection : 'row'}}>
                            <Text style={{fontSize : 15, fontWeight : '500'}}>
                                예방 접종 여부를 선택해 주세요.
                            </Text>
                            <Text style={{color : Colors.buttonSky}}>
                                {` (필수)`}
                            </Text>
                        </View>
                    </View>
                    <PetProfileRegCheckbox checkFunc={() => {}} text='종합백신 7종' isChecked={this.state.petComprehensiveVaccine} disabled={this.state.petNoneVaccine}/>
                    <PetProfileRegCheckbox checkFunc={() => {}} text='광견병 예방접종' isChecked={this.state.petRabiesVaccination} disabled={this.state.petNoneVaccine}/>
                    <PetProfileRegCheckbox checkFunc={() => {}} text='심장사사충 (매월 1회)' isChecked={this.state.petHeartWorm} disabled={this.state.petNoneVaccine}/>
                    <PetProfileRegCheckbox checkFunc={() => {}} text='코로나 장염 (매년 1회)' isChecked={this.state.petCoronaEnteritis} disabled={this.state.petNoneVaccine}/>
                    <PetProfileRegCheckbox checkFunc={() => {}} text='켄넬 코프 (매년 1회)' isChecked={this.state.petKennelkov} disabled={this.state.petNoneVaccine}/>
                    <PetProfileRegCheckbox checkFunc={() => {}} text='접종을 아예 하지 않았습니다.' isChecked={this.state.petNoneVaccine}/>

                    <View style={{borderBottomWidth : 1, borderBottomColor : Colors.lightGrey, height : 10, marginTop : 10}}></View>

                    <View style={{alignItems : 'center', marginTop : 20, marginBottom : 10}}>
                        <View style={{width : width - 40, flexDirection : 'row'}}>
                            <Text style={{fontSize : 15, fontWeight : '500'}}>
                                주의가 필요한 건강 특이 사항
                            </Text>
                            <Text style={{color : Colors.buttonSky}}>
                                {` (선택)`}
                            </Text>
                        </View>
                    </View>

                    <View style={{alignItems : 'center'}}>
                        <View style={{width : width -40}}>
                            <TextInput 
                                style={{
                                    backgroundColor : Colors.lightGrey
                                }}
                                multiline={true}
                                placeholder='예) 알러지 음식, 슬개골 탈구, 피부병 등'
                                numberOfLines={2}
                                onChangeText={(petSpecialMatters) => this.setState({petSpecialMatters : petSpecialMatters})}
                            />
                                
                        </View>
                    </View>

                    <View style={{borderBottomWidth : 1, borderBottomColor : Colors.lightGrey, height : 10, marginTop : 10}}></View>

                    <View style={{alignItems : 'center', marginTop : 20, marginBottom : 10}}>
                        <View style={{width : width - 40, flexDirection : 'row'}}>
                            <Text style={{fontSize : 15, fontWeight : '500'}}>
                                기타 참고사항
                            </Text>
                            <Text style={{color : Colors.buttonSky}}>
                                {` (선택)`}
                            </Text>
                        </View>
                    </View>

                    <View style={{alignItems : 'center',marginBottom : 20}}>
                        <View style={{width : width -40}}>
                            <TextInput 
                                style={{
                                    backgroundColor : Colors.lightGrey,
                                    justifyContent : 'flex-start'
                                }}
                                multiline={true}
                                placeholder='기타 주의사항을 적어 주세요.'
                                numberOfLines={10}
                                underlineColorAndroid="transparent"
                                onChangeText={(petReference)=> this.setState({petReference : petReference})}
                            />
                                
                        </View>
                    </View>
                    
                    <TouchableOpacity 
                        style={[{width: width, 
                        height: 50, 
                        backgroundColor: Colors.buttonSky, 
                        justifyContent: 'center', 
                        alignItems: 'center'
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