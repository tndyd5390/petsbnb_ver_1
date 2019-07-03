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
import { ip } from "../../utils/const";
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
} from 'react-native'
const{width, height} =Dimensions.get('window');
const options={
    title : '사진',
    takePhotoButtonTitle : '사진 촬영',
    chooseFromLibraryButtonTitle : '갤러리에서 고르기'
}
export default class PetUpdateView extends Component{

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        const petNo = params.petNo;
        return {
            headerRight: <Icon name='ellipsis-v' size={25} onPress={() => params.deletePet(petNo)} style={{marginRight : 20}}/>
        };
    };

    componentDidMount() {
        this.props.navigation.setParams({deletePet : this._deletePetConfirm});
    }

    _deletePetConfirm = (petNo) => {
        Alert.alert(
            '알림',
            '프로필을 삭제 하시겠습니까?',
            [
              {text: 'Cancel', onPress: () => console.log('cancle pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => this._deletePet(petNo)},
            ],
            { cancelable: false }
          )
    }

    _deletePet = async(petNo) => {
        const params = {
            petNo : petNo,
            userNo : this.state.userNo
        }

        await fetch(`${ip}/pet/deletePetProfile.do`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
        .then((resp) => resp.json())
        .then((res => {
            this.setState({
                activityIndicator : false
            })
            if(res.result){
                alert('프로필이 삭제 되었습니다.');
            }else{
                alert('프로필 삭제에 실패했습니다. 잠시후 다시 시도해 주세요.');
            }
            this._gotoMenu();
        }))
        .catch((err) => {
            alert('서버에러입니다. 잠시후 다시 시도해주세요.');
            this._gotoMenu();
        })
    }


    constructor(props){
        super(props);
        const petNo = this.props.navigation.getParam('petNo');
        this.state = {
            petNo : petNo,
            userNo : '',
            activityIndicator : true,
            petBirthday: '',
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
            imageDataArr : []
        }
        this._getPetInfo();
    }

    _gotoMenu = async () => {
        const petSitterMode = await AsyncStorage.getItem('petSitterMode');
        if(petSitterMode == null){
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'ProfileMenu' })],
              });
            this.props.navigation.dispatch(resetAction);
        }else{
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'PetSitterProfileMenu' })],
              });
            this.props.navigation.dispatch(resetAction);
        }
    }

    _getPetInfo = async() => {
        const userNo = await AsyncStorage.getItem('userInfo');
        const params = {
            userNo : userNo,
            petNo : this.state.petNo
        }
        await fetch(`${ip}/pet/getPetInfo.do`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
          })
        .then((response) => response.json())
        .then((res => {
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
                        activityIndicator : false,
                        imageDataArr : res.petFileList
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

    _imageDisplay = () => {
        let imageView = [];
        const imageDataArr = this.state.imageDataArr;
        imageDataArr.forEach((value, index) => {
            const uri = {uri : `${ip}/petImageFile/` + value.petFileName}
            console.log(uri);
            imageView.push(<View key={index} style={{ alignItems : 'center', justifyContent : 'center'}}>
                                <Image source={uri} style={{width : '100%', height : '100%'}}/>
                                <View style={{position : 'absolute', bottom : 10, right : 15}}>
                                    <TouchableOpacity
                                        onPress={() => {this._deleteImage(value.petFileNo)}}
                                    >
                                        <FontAwesome5 name='trash-alt' size={30} color={Colors.lightGrey}/>
                                    </TouchableOpacity>
                                </View>
                           </View>)
        })
        imageView.push(
            <View key={imageDataArr.length} style={{ alignItems : 'center', justifyContent : 'center'}}>
                <RoundedButton
                    title='사진 등록'
                    buttonHandleFunc={this._butttonHandleFunc}
                    buttonColor={{backgroundColor : Colors.white}}
                    textColor={{color : Colors.buttonBorderGrey}}
                    textSize={{fontSize:15, fontWeight : '200'}}
                    customButtonStyle={{width : 90, height : 35, borderWidth : 1, borderColor : Colors.buttonBorderGrey, marginTop : 100}}
                />
            </View>
        )
        return imageView;
    }

    _butttonHandleFunc = async () => {
        ImagePicker.showImagePicker(options, (response) => {
            
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
              alert('사진을 다시 선택해주세요.');
            } else {

                const extension = response.path.substr(response.path.lastIndexOf('.') + 1 , response.path.length);
                this.setState({
                    activityIndicator : true
                })
                RNFetchBlob.fetch('POST', `${ip}/pet/petImageUploadSep.do`, {
                    Authorization : "Bearer access-token",
                    'Content-Type' : 'multipart/form-data',
                },[
                    {name : 'petImage', filename : 'image' + this.state.userNo, type : 'image/' + extension, data : response.data},
                    {name : 'userNo', data : this.state.userNo},
                    {name : 'petNo', data : this.state.petNo}
                  ])
                .then((resp) => resp.json())
                .then((res => {
                    if(res){
                        this.setState({
                            imageDataArr : res
                        })
                    }else{
                        alert("사진 업로드 실패");
                    }
                    this.setState({
                        activityIndicator : false
                    })
                }))
                .catch((err) => {
                    alert("서버 오작동");
                })
            }
        });
    }

    _deleteImage = async(petFileNo) => {
        if(this.state.imageDataArr.length==1){
            alert('반려동물 프로필 사진은 하나 이상 등록되어야 합니다.');
            return;
        }
        this.setState({
            activityIndicator : true
        })

        const params = {
            petFileNo : petFileNo,
            userNo : this.state.userNo,
            petNo : this.state.petNo
        }

        await fetch(`${ip}/pet/deletePetImage.do`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
        .then((resp) => resp.json())
        .then((res => {
            this.setState({
                activityIndicator : false
            })
            if(res){
                alert('사진이 삭제 되었습니다.');
                this.setState({
                    imageDataArr : res
                })
            }
        }))
        .catch((err) => {
            alert('서버에러입니다. 잠시후 다시 시도해주세요.');
        })
    }

    _checkVaccine = () => {
        const state = this.state;
        if(state.petComprehensiveVaccine == false && state.petRabiesVaccination == false && state.petHeartWorm == false && state.petCoronaEnteritis == false && state.petKennelkov == false && state.petNoneVaccine == false){
            return true;
        }else{
            return false;
        }
    }

    _updatePetProfile = async() => {
        const data = this.state;
        if(data.userNo == '') alert('다시 시도해 주세요');
        else if(data.petName == '') alert('반려동물의 이름을 입력해 주세요.');
        else if(data.petGender == '') alert('반려동물의 성별을 입력해주세요.');
        else if(data.petKind == '') alert('반려동물의 품종을 입력해주세요.');
        else if(data.petWeight == '') alert('반려동물의 몸무게를 입력해주세요.');
        else if(data.petNeutralization == null) alert('반려동물의 중성화 여부를 선택해주세요.');
        else if(data.petUnfamiliar == '') alert('"낯선 사람을 만나면 어떤가요?" 질문에 대답해주세요');
        else if(data.petMeetAnotherPet == '') alert('"다른 강아지를 만나면 어떤가요" 질문에 대답해주세요.');
        else if(data.petBarks == '') alert('"짖음은 어느정도인가요?" 질문에 대답해주세요.');
        else if(data.petBowelTraining == '') alert('"배변 훈련은 어떤 편인가요?" 질문에 대답해 주세요.');
        else if(this._checkVaccine()) alert('예방접종 여부를 선택해 주세요.');
        else if(data.petAccidentAgree == false) alert('사실과 다른 프로필 기재로 사고가 발생한 경우 책임은 견주 본인에게 있음에 동의해주세요.');
        else{
            const params = {
                petNo : data.petNo,
                userNo : data.userNo,
                petBirthday: data.petBirthday,
                petName : data.petName,
                petGender : data.petGender,
                petKind : data.petKind,
                petWeight : data.petWeight,
                petNeutralization : data.petNeutralization ? '1' : '0',
                petUnfamiliar : data.petUnfamiliar,
                petMeetAnotherPet : data.petMeetAnotherPet,
                petBarks : data.petBarks,
                petBowelTraining : data.petBowelTraining,
                petComprehensiveVaccine : data.petComprehensiveVaccine ? '1' : '0',
                petRabiesVaccination : data.petRabiesVaccination ? '1' : '0',
                petHeartWorm : data.petHeartWorm ? '1' : '0',
                petCoronaEnteritis : data.petCoronaEnteritis ? '1' : '0',
                petKennelkov : data.petKennelkov ? '1' : '0',
                petNoneVaccine : data.petNonevaccine ? '1' : '0',
                petSpecialMatters : data.petSpecialMatters,
                petReference : data.petReference 
            }

            await fetch(`${ip}/pet/updatePetProfile.do`, {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            })
            .then((resp) => resp.json())
            .then((res => {
                this.setState({
                    activityIndicator : false
                })
                if(res.result == true){
                    alert('성공적으로 반려동물 정보를 수정했습니다.')
                }else{
                    alert('반려동물 정보 수정에 실패했습니다.')
                }
                this._gotoMenu();
            }))
            .catch((err) => {
                alert('서버에러입니다. 잠시후 다시 시도해주세요.');
                this._gotoMenu();
            })
        }
    }

    render(){
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
                            key={this.state.imageDataArr.length}
                        >
                        {this._imageDisplay()}
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
                                    value={this.state.petName}
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
                                    onChangeText={(petKind) => this.setState({petKind : petKind})}
                                    value={this.state.petKind}
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
                                    value={this.state.petWeight}
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
                    <PetProfileRegCheckbox checkFunc={() => {this.setState({petComprehensiveVaccine : !this.state.petComprehensiveVaccine})}} text='종합백신 7종' isChecked={this.state.petComprehensiveVaccine} disabled={this.state.petNoneVaccine}/>
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
                                value={this.state.petSpecialMatters}
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
                                value={this.state.petReference}
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
                        onPress={this._updatePetProfile}
                    >
                        <Text style={{color : Colors.white, fontSize : 20, fontWeight : '700'}}>수정</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        );
    }
}


