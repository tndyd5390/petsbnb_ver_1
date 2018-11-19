import React, {Component} from 'react';
import Colors from '../utils/Colors';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Swiper from 'react-native-swiper';
import RoundedButton from './components/buttons/RoundedButton';
import DatePicker from 'react-native-datepicker';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import PetProfileRegCheckbox from './components/checkbox/PetProfileRegCheckbox';
import ImagePicker from 'react-native-image-picker';
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
} from 'react-native';
const{width, height} = Dimensions.get('window');
const options={
    title : '사진',
    takePhotoButtonTitle : '사진 촬영',
    chooseFromLibraryButtonTitle : '갤러리에서 고르기'
}
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
            petBirthday: yyyy + "-" + mm + "-" + dd,
            petName : '',
            petGender : '',
            petKind : '',
            petWeight : '',
            petNeutralization : null,
            petUnfamiliar : '',
            petMeetAnotherPet : '',
            petBarks : '',
            petBowelTraining : '',
            petComprehensiveVaccine : false,
            petRabiesVaccination : false,
            petHeartWorm : false,
            petCoronaEnteritis : false,
            petKennelkov : false,
            petNoneVaccine : false,
            petSpecialMatters : '',
            petReference : '',
            petAccidentAgree : false,
            imageData : [],
            imageSource : []
        }
        this._getUserNo();
    }

    _getUserNo = async() => {
        const userNo = await AsyncStorage.getItem('userInfo');
        this.setState({userNo : userNo})
    }

    _butttonHandleFunc = () => {
        ImagePicker.showImagePicker(options, (response) => {
            
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              const source = { uri: response.uri };
              const imageData = this.state.imageData;
              const imageSource = this.state.imageSource;
              imageData.push(response.data);
              imageSource.push(source);
              this.setState({
                  imageData : imageData,
                  imageSource : imageSource
              })
            }
        });
    }

    _noneVaccine = () => {
        const noneVaccine = !this.state.petNoneVaccine;
        if(noneVaccine){
            this.setState({
                petComprehensiveVaccine : false,
                petRabiesVaccination : false,
                petHeartWorm : false,
                petCoronaEnteritis : false,
                petKennelkov : false,
                petNoneVaccine : noneVaccine
            })
        }else{
            this.setState({
                petNoneVaccine : noneVaccine
            })
        }
    }

    _regPetProfile = () => {
        console.log(this.state.imageSource);
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
                                <Image source={require('../../img/petCare.jpg')}/>
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
                            >
                                <RadioButton value={'1'} >
                                    <Text>좋아하며 잘 어울려요</Text>
                                </RadioButton>
                                <RadioButton value={'2'}>
                                    <Text>별로 관심이 없어요</Text>
                                </RadioButton>
                                <RadioButton value={'3'}>
                                    <Text>무서워하며 피하려고 해요</Text>
                                </RadioButton>
                                <RadioButton value={'4'}>
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
                            >
                                <RadioButton value={'1'} >
                                    <Text>좋아하며 잘 어울려요</Text>
                                </RadioButton>
                                <RadioButton value={'2'}>
                                    <Text>별로 관심이 없어요</Text>
                                </RadioButton>
                                <RadioButton value={'3'}>
                                    <Text>무서워하며 피하려고 해요</Text>
                                </RadioButton>
                                <RadioButton value={'4'}>
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
                            >
                                <RadioButton value={'1'} >
                                    <Text>거의 짖지 않아요</Text>
                                </RadioButton>
                                <RadioButton value={'2'}>
                                    <Text>외부 소음에만 짖는 편이에요</Text>
                                </RadioButton>
                                <RadioButton value={'3'}>
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
                            >
                                <RadioButton value={'1'} >
                                    <Text>배변 패드에 잘 가려요</Text>
                                </RadioButton>
                                <RadioButton value={'2'}>
                                    <Text>아직 배변 실수가 있어요</Text>
                                </RadioButton>
                                <RadioButton value={'3'}>
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
                    <PetProfileRegCheckbox checkFunc={() => this.setState({petComprehensiveVaccine : !this.state.petComprehensiveVaccine})} text='종합백신 7종' isChecked={this.state.petComprehensiveVaccine} disabled={this.state.petNoneVaccine}/>
                    <PetProfileRegCheckbox checkFunc={() => this.setState({petRabiesVaccination : !this.state.petRabiesVaccination})} text='광견병 예방접종' isChecked={this.state.petRabiesVaccination} disabled={this.state.petNoneVaccine}/>
                    <PetProfileRegCheckbox checkFunc={() => this.setState({petHeartWorm : !this.state.petHeartWorm})} text='심장사사충 (매월 1회)' isChecked={this.state.petHeartWorm} disabled={this.state.petNoneVaccine}/>
                    <PetProfileRegCheckbox checkFunc={() => this.setState({petCoronaEnteritis : !this.state.petCoronaEnteritis})} text='코로나 장염 (매년 1회)' isChecked={this.state.petCoronaEnteritis} disabled={this.state.petNoneVaccine}/>
                    <PetProfileRegCheckbox checkFunc={() => this.setState({petKennelkov : !this.state.petKennelkov})} text='켄넬 코프 (매년 1회)' isChecked={this.state.petKennelkov} disabled={this.state.petNoneVaccine}/>
                    <PetProfileRegCheckbox checkFunc={this._noneVaccine} text='접종을 아예 하지 않았습니다.' isChecked={this.state.petNoneVaccine}/>

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

                    <View style={{alignItems : 'center', marginTop : 20}}>
                        <View style={{width : width - 40, height : 50, flexDirection : 'row'}}>
                            <View style={{alignItems : 'center', justifyContent : 'center', width : '90%', height : '100%'}}>
                                <Text style={{fontSize : 15, fontWeight : '500', color : Colors.red}}>
                                    {`사실과 다른 프로필 기재로 사고가 발생한 경우, \n책임은 견주 본인에게 있음에 동의합니다.`}
                                </Text>
                            </View>
                            <View style={{alignItems : 'center', justifyContent : 'center', width : '10%', height : '100%'}}>
                                <TouchableOpacity
                                    onPress={() => this.setState({petAccidentAgree : !this.state.petAccidentAgree})}
                                >
                                    <FontAwesome5 name='dot-circle' size={30} style={this.state.petAccidentAgree ? {color : Colors.buttonSky} : null}/>
                                </TouchableOpacity>
                            </View>
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


