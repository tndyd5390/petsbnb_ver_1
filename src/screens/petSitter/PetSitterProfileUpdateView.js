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
    ScrollView,
    Image,
    AsyncStorage,
    Alert
} from 'react-native';
import { ip } from "../../utils/const";
const{width, height} = Dimensions.get('window');
const options={
    title : '사진',
    takePhotoButtonTitle : '사진 촬영',
    chooseFromLibraryButtonTitle : '갤러리에서 고르기'
}
export default class PetSitterProfileUpdateView extends Component{

    constructor(props){
        super(props);
        this.state = {
            petSitterNo : '',
            activityIndicator : true,
            petSitterName : '',
            petSitterIntroduceOneLine : '',
            petSitterEnv : '',
            petSitterHasPet : '',
            longTermAvailable : false,
            walkAvailable : false,
            bathAvailable : false,
            firstaidAvailable : false,
            haircareAvailable : false,
            markingImpossible : false,
            bowelImpossible : false,
            attackImpossible : false,
            separationImpossible : false,
            biteImpossible : false,
            smallPetNightPrice : '',
            smallPetDayPrice : '',
            middlePetDayPrice : '',
            middlePetNightPrice : '',
            bigPetDayPrice : '',
            bigPetNightPrice : '',
            refundAccountName : '',
            refundBank : '',
            refundAccountNumber : '',
            necessaryItem : '',
            petSitterIntroduce : '',
            imageDataArr : []
        }
    }

    componentWillMount(){
        this._getPetSitterInfo();
    }
    //펫시터 프로필 가져오는 메소드
    _getPetSitterInfo = async() => {
        const petSitterNo = this.props.navigation.getParam('petSitterNo');

        const params = {
            petSitterNo : petSitterNo
        }

        await fetch(`${ip}/petSitter/getPetSitterInfoWithImage.do`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
        .then((response) => response.json())
        .then((res => {
            if(res.petSitterInfo != null){
                this.setState({activityIndicator : false});
                const petSitterInfo = res.petSitterInfo;
                const petSitterImages = res.petSitterImages;
                this.setState({
                    petSitterNo : petSitterInfo.petSitterNo,
                    userNo : petSitterInfo.userNo,
                    petSitterName : petSitterInfo.petSitterName,
                    petSitterIntroduceOneLine : petSitterInfo.petSitterIntroduceOneLine,
                    petSitterEnv : petSitterInfo.petSitterEnv,
                    petSitterHasPet : petSitterInfo.petSitterHasPet,
                    longTermAvailable : petSitterInfo.longTermAvailable == 'true' ? true : false,
                    walkAvailable : petSitterInfo.walkAvailable == 'true' ? true : false,
                    bathAvailable : petSitterInfo.bathAvailable == 'true' ? true : false,
                    firstaidAvailable : petSitterInfo.firstaidAvailable == 'true' ? true : false,
                    haircareAvailable : petSitterInfo.haircareAvailable == 'true' ? true : false,
                    markingImpossible : petSitterInfo.markingImpossible == 'true' ? true : false,
                    bowelImpossible : petSitterInfo.bowelImpossible == 'true' ? true : false,
                    attackImpossible : petSitterInfo.attackImpossible == 'true' ? true : false,
                    separationImpossible : petSitterInfo.separationImpossible == 'true' ? true : false,
                    biteImpossible : petSitterInfo.biteImpossible == 'true' ? true : false,
                    smallPetNightPrice : petSitterInfo.smallPetNightPrice,
                    smallPetDayPrice : petSitterInfo.smallPetDayPrice,
                    middlePetDayPrice : petSitterInfo.middlePetDayPrice,
                    middlePetNightPrice : petSitterInfo.middlePetNightPrice,
                    bigPetDayPrice : petSitterInfo.bigPetDayPrice,
                    bigPetNightPrice : petSitterInfo.bigPetNightPrice,
                    refundAccountName : petSitterInfo.refundAccountName,
                    refundBank : petSitterInfo.refundBank,
                    refundAccountNumber : petSitterInfo.refundAccountNumber,
                    necessaryItem : petSitterInfo.necessaryItem,
                    petSitterIntroduce : petSitterInfo.petSitterIntroduce,
                    imageDataArr : petSitterImages
                })
            }else{
                this.setState({activityIndicator : false});
                
            }
        }))
        .catch((err) => {
            alert('네트워크가 작동하지 않습니다. 잠시후 다시 시도해주세요.');
            this.setState({activityIndicator : false});
        })
        this.setState({activityIndicator : false});
    }


    _imageDisplay = () => {
        let imageView = [];
        const imageDataArr = this.state.imageDataArr;
        imageDataArr.forEach((value, index) => {
            const uri = {uri : `${ip}/petSitterImageFile/` + value.petSitterFileName}
            imageView.push(<View key={index} style={{ alignItems : 'center', justifyContent : 'center'}}>
                                <Image source={uri} style={{width : '100%', height : '100%'}}/>
                                <View style={{position : 'absolute', bottom : 10, right : 15}}>
                                    <TouchableOpacity
                                        onPress={() => this._deleteImage(value.petSitterFileNo)}
                                    >
                                        <FontAwesome5 name='trash-alt' size={30} color={Colors.white}/>
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

    _deleteImage = async(petSitterFileNo) => {

        this.setState({activityIndicator : true});
        const params = {
            petSitterFileNo : petSitterFileNo,
            petSitterNo : this.state.petSitterNo
        }
        await fetch(`${ip}/petSitter/deletePetSitterImage.do`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
        .then((response) => response.json())
        .then((res => {
            if(res){
                this.setState({
                    imageDataArr : res
                })
            }else{
                alert('사진 삭제에 실패했습니다. 잠시후 다시 시도해주세요.');
            }
            this.setState({activityIndicator : false});
        }))
        .catch((err) => {
            alert("서버 에러");
        })
        this.setState({activityIndicator : false});
    }

    _butttonHandleFunc = async () => {
        ImagePicker.showImagePicker(options, (response) => {
            
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
              alert('사진을 다시 선택해주세요.');
            } else {
                this.setState({activityIndicator : true});
                if(this.state.imageDataArr.length >= 11){
                    alert('사진은 최대 10장까지만 등록할 수 있습니다.');
                }else {
                    const extension = response.path.substr(response.path.lastIndexOf('.') + 1 , response.path.length);

                    RNFetchBlob.fetch('POST', `${ip}/petSitter/petSitterImageUpload.do`, {
                        Authorization : "Bearer access-token",
                        'Content-Type' : 'multipart/form-data',
                    },[
                        {name : 'petSitterImage', filename : 'image' + this.state.userNo, type : 'image/' + extension, data : response.data},
                        {name : 'userNo', data : this.state.userNo},
                        {name : 'petSitterNo', data : this.state.petSitterNo}
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
                    this.setState({
                        activityIndicator : false
                    })
                }
            }
        });
    }

    _checkAvailable = () => {
        if(
            !this.state.longTermAvailable && 
            !this.state.walkAvailable && 
            !this.state.bathAvailable &&
            !this.state.firstaidAvailable &&
            !this.state.haircareAvailable
        ){
            return true;
        }else{
            return false;
        }
    }

    _checkImpossible = () => {
        if(
            !this.state.markingImpossible &&
            !this.state.bowelImpossible && 
            !this.state.attackImpossible &&
            !this.state.separationImpossible &&
            !this.state.biteImpossible
        ){
            return true;
        }else{
            return false;
        }
    }

    _updatePetSitterInfoProc = async() => {
        if(this.state.imageDataArr.length < 1){
            alert('사진을 선택해 주세요.');
        }else if(this.state.petSitterName == ''){
            alert('이름을 입력해주세요.');
        }else if(this.state.petSitterIntroduceOneLine == ''){
            alert('한줄소개를 입력해주세요.');
        }else if(this.state.petSitterEnv == ''){
            alert('펫시팅 환경을 입력해주세요.');
        }else if(this.state.petSitterHasPet == ''){
            alert('반려동물 여부를 선택해주세요.');
        }else if(this.state.smallPetNightPrice == ''){
            alert('소형 반려동물 1박 금액을 선택해주세요.');
        }else if(this.state.smallPetDayPrice == ''){
            alert('소형 반려동물 데이 금액을 선택해주세요.');
        }else if(this.state.middlePetNightPrice == ''){
            alert('중형 반려동물 1박 금액을 선택해주세요.');
        }else if(this.state.middlePetDayPrice == ''){
            alert('중형 반려동물 데이 금액을 선택해주세요.');
        }else if(this.state.bigPetNightPrice == ''){
            alert('대형 반려동물 1박 금액을 선택해주세요.');
        }else if(this.state.bigPetDayPrice == ''){
            alert('대형 반려동물 데이 금액을 선택해주세요.');
        }else if(this.state.refundAccountName == ''){
            alert('환급계좌 예금주명을 입력해주세요.');
        }else if(this.state.refundBank == ''){
            alert('환급계좌 은행을 선택해주세요.')
        }else if(this.state.refundAccountNumber == ''){
            alert('환급계좌번호를 입력해주세요.');
        }else if(this.state.petSitterIntroduce == ''){
            alert('펫시터 소개를 입력해주세요.');
        }else if(this._checkAvailable()){
            Alert.alert(
                '서비스 확인',
                '이용가능 서비스를 선택하지 않으셨습니다.\n계속 진행 하시겟습니까?',
                [
                  {text: 'Cancel', onPress: () => {}},
                  {text: 'OK', onPress: this._petSitterRegProc},
                ],
                { cancelable: false }
            )
        }else if(this._checkImpossible()){
            Alert.alert(
                '서비스 확인',
                '펫시팅 불가여부를 선택하지 않으셨습니다.\n계속 진행 하시겟습니까?',
                [
                  {text: 'Cancel', onPress: ()=>{}},
                  {text: 'OK', onPress: this._petSitterRegProc},
                ],
                { cancelable: false }
            )
        }else{
            this.setState({activityIndicator : true});
            const state = this.state;
            const params = {
                petSitterNo : state.petSitterNo.toString(),
                userNo : state.userNo.toString(),
                petSitterName : state.petSitterName.toString(),
                petSitterIntroduceOneLine : state.petSitterIntroduceOneLine.toString(),
                petSitterEnv : state.petSitterEnv.toString(),
                petSitterHasPet : state.petSitterHasPet.toString(),
                longTermAvailable : state.longTermAvailable.toString(),
                walkAvailable : state.walkAvailable.toString(),
                bathAvailable : state.bathAvailable.toString(),
                firstaidAvailable : state.firstaidAvailable.toString(),
                haircareAvailable : state.haircareAvailable.toString(),
                markingImpossible : state.markingImpossible.toString(),
                bowelImpossible : state.bowelImpossible.toString(),
                attackImpossible : state.attackImpossible.toString(),
                separationImpossible : state.separationImpossible.toString(),
                biteImpossible : state.biteImpossible.toString(),
                smallPetNightPrice : state.smallPetNightPrice.toString(),
                smallPetDayPrice : state.smallPetDayPrice.toString(),
                middlePetDayPrice : state.middlePetDayPrice.toString(),
                middlePetNightPrice : state.middlePetNightPrice.toString(),
                bigPetDayPrice : state.bigPetDayPrice.toString(),
                bigPetNightPrice : state.bigPetNightPrice.toString(),
                refundAccountName : state.refundAccountName.toString(),
                refundBank : state.refundBank.toString(),
                refundAccountNumber : state.refundAccountNumber.toString(),
                necessaryItem : state.necessaryItem.toString(),
                petSitterIntroduce : state.petSitterIntroduce.toString()
            }
    
            await fetch(`${ip}/petSitter/updatePetSitterProc.do`, {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            })
            .then((response) => response.json())
            .then((res => {
                if(res.result === true){
                    alert("펫시터 프로필이 변경되었습니다.");
                    this.setState({activityIndicator : false});
                    this.props.navigation.goBack();
                }else{
                    //가입 실패
                    alert('서버에 문제가 있습니다. 잠시후 다시 시도해주세요.');
                }
                this.setState({activityIndicator : false});
            }))
            .catch((err) => {
                alert(err, "잠시후 다시 시도해 주세요.");
            })
            this.setState({activityIndicator : false});
        }
    }
    

    render(){
        return(
            <ScrollView>
                <View style={{backgroundColor : Colors.white}}>

                    {this.state.activityIndicator ? (
                        <View style={{backgroundColor : 'rgba(0,0,0,0.2)', width : width, height : height, position : 'absolute', zIndex : 10, alignItems : 'center', justifyContent : 'center'}}>
                            <ActivityIndicator size="large" color="#10b5f1"/>
                        </View>
                    ) : (null)}

                    <View style={{width : width, height : 250, backgroundColor : Colors.white, borderBottomWidth : 1, borderBottomColor : Colors.buttonBorderGrey}}>
                        <Swiper 
                            loop={false}
                            key={this.state.imageDataArr.length}
                        >
                        {this._imageDisplay()}
                        </Swiper>
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
                        <View style={{width : width - 40, height : '60%'}}>
                            <TextInput 
                                style={{backgroundColor : Colors.lightGrey, paddingLeft : 10, paddingRight : 0, paddingTop : 0, paddingBottom : 0, borderRadius : 5}}
                                onChangeText={(name) => this.setState({petSitterName : name})}
                                value={this.state.petSitterName}
                                placeholder="예)홍길동"
                            />
                        </View>
                    </View>

                    <View style={{height : 70, alignItems : 'center'}}>
                        <View style={{width : width - 30, height : '40%'}}>
                            <Text>한줄 소개</Text>
                        </View>
                        <View style={{width : width - 40, height : '60%'}}>
                            <TextInput 
                                style={{backgroundColor : Colors.lightGrey, paddingLeft : 10, paddingRight : 0, paddingTop : 0, paddingBottom : 0, borderRadius : 5}}
                                onChangeText={(petSitterIntroduceOneLine) => this.setState({petSitterIntroduceOneLine : petSitterIntroduceOneLine})}
                                value={this.state.petSitterIntroduceOneLine}
                                placeholder='펫시터 찾기에 노출되는 한줄의 소개입니다.'
                            />
                        </View>
                    </View>

                    <View style={{height : 70, alignItems : 'center'}}>
                        <View style={{width : width - 30, height : '40%'}}>
                            <Text>펫시팅 환경</Text>
                        </View>
                        <View style={{width : width - 40, height : '60%'}}>
                            <TextInput 
                                style={{backgroundColor : Colors.lightGrey, paddingLeft : 10, paddingRight : 0, paddingTop : 0, paddingBottom : 0, borderRadius : 5}}
                                onChangeText={(petSitterEnv)=>this.setState({petSitterEnv : petSitterEnv})}
                                value={this.state.petSitterEnv}
                                placeholder='가정집, 마당있는 집, 애견카페등'
                            />
                        </View>
                    </View>

                    <View style={{height : 40, alignItems : 'center'}}>
                        <View style={{width : width - 30, height : '100%', justifyContent : 'center'}}>
                            <Text style={{fontSize : 15, color : Colors.black}}>반려동물 여부</Text>
                        </View>
                    </View>

                    <View style={{alignItems : 'center'}}>
                        <View style={{width : width -30}}>
                            <RadioGroup
                                onSelect={(index, value) => this.setState({petSitterHasPet : value})}
                                selectedIndex={this.state.petSitterHasPet}
                            >
                                <RadioButton value={'0'}>
                                    <Text>현재는 반려동물과 살고 있지 않아요</Text>
                                </RadioButton>
                                <RadioButton value={'1'}>
                                    <Text>반려동물과 함께 살고 있어요</Text>
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
                            <View 
                                style={[
                                    {borderWidth : 1, borderColor : Colors.black, borderRadius : 5, margin : 5}, 
                                    this.state.longTermAvailable ? {borderColor : Colors.buttonSky, backgroundColor : Colors.buttonSky} : null
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={() => this.setState({longTermAvailable : !this.state.longTermAvailable})}
                                >
                                    <Text style={[{margin : 5}, this.state.longTermAvailable ? {color : Colors.white} : null]}>장기 가능</Text>
                                </TouchableOpacity>
                            </View>
                            <View 
                                style={[
                                    {borderWidth : 1, borderColor : Colors.black, borderRadius : 5, margin : 5},
                                    this.state.walkAvailable ? {borderColor : Colors.buttonSky, backgroundColor : Colors.buttonSky} : null
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={() => this.setState({walkAvailable : !this.state.walkAvailable})}
                                >
                                    <Text style={[{margin : 5}, this.state.walkAvailable ? {color : Colors.white} : null]}>산책 가능</Text>
                                </TouchableOpacity>
                            </View>
                            <View 
                                style={[
                                    {borderWidth : 1, borderColor : Colors.black, borderRadius : 5, margin : 5},
                                    this.state.bathAvailable ? {borderColor : Colors.buttonSky, backgroundColor : Colors.buttonSky} : null
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={()=>this.setState({bathAvailable : !this.state.bathAvailable})}
                                >
                                    <Text style={[{margin : 5}, this.state.bathAvailable ? {color : Colors.white} : null]}>목욕 가능</Text>
                                </TouchableOpacity>
                            </View>
                            <View 
                                style={[
                                    {borderWidth : 1, borderColor : Colors.black, borderRadius : 5, margin : 5},
                                    this.state.firstaidAvailable ? {borderColor : Colors.buttonSky, backgroundColor : Colors.buttonSky} : null
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={()=>this.setState({firstaidAvailable : !this.state.firstaidAvailable})}
                                >
                                    <Text style={[{margin : 5}, this.state.firstaidAvailable ? {color : Colors.white} : null]}>응급 처치</Text>
                                </TouchableOpacity>
                            </View>
                            <View 
                                style={[
                                    {borderWidth : 1, borderColor : Colors.black, borderRadius : 5, margin : 5},
                                    this.state.haircareAvailable ? {borderColor : Colors.buttonSky, backgroundColor : Colors.buttonSky} : null
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={() => this.setState({haircareAvailable : !this.state.haircareAvailable})}
                                >
                                    <Text style={[{margin : 5}, this.state.haircareAvailable ? {color : Colors.white} : null]}>모발 관리</Text>
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
                            <View 
                                style={[
                                    {borderWidth : 1, borderColor : Colors.black, borderRadius : 5, margin : 5},
                                    this.state.markingImpossible ? {borderColor : Colors.buttonSky, backgroundColor : Colors.buttonSky} : null
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={()=>this.setState({markingImpossible : !this.state.markingImpossible})}
                                >
                                    <Text style={[{margin : 5}, this.state.markingImpossible ? {color : Colors.white} : null]}>마킹이 심한 아이</Text>
                                </TouchableOpacity>
                            </View>
                            <View 
                                style={[
                                    {borderWidth : 1, borderColor : Colors.black, borderRadius : 5, margin : 5},
                                    this.state.bowelImpossible ? {borderColor : Colors.buttonSky, backgroundColor : Colors.buttonSky} : null
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={() => this.setState({bowelImpossible : !this.state.bowelImpossible})}
                                >
                                    <Text style={[{margin : 5}, this.state.bowelImpossible ? {color : Colors.white} : null]}>배변 훈련 안된 아이</Text>
                                </TouchableOpacity>
                            </View>
                            <View 
                                style={[
                                    {borderWidth : 1, borderColor : Colors.black, borderRadius : 5, margin : 5},
                                    this.state.attackImpossible ? {borderColor : Colors.buttonSky, backgroundColor : Colors.buttonSky} : null
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={() => this.setState({attackImpossible : !this.state.attackImpossible})}
                                >
                                    <Text style={[{margin : 5}, this.state.attackImpossible ? {color : Colors.white} : null]}>공격적인 아이</Text>
                                </TouchableOpacity>
                            </View>
                            <View 
                                style={[
                                    {borderWidth : 1, borderColor : Colors.black, borderRadius : 5, margin : 5},
                                    this.state.separationImpossible ? {borderColor : Colors.buttonSky, backgroundColor : Colors.buttonSky} : null
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={()=> this.setState({separationImpossible : !this.state.separationImpossible})}
                                >
                                    <Text style={[{margin : 5}, this.state.separationImpossible ? {color : Colors.white} : null]}>분리 불안 있는 아이</Text>
                                </TouchableOpacity>
                            </View>
                            <View 
                                style={[
                                    {borderWidth : 1, borderColor : Colors.black, borderRadius : 5, margin : 5},
                                    this.state.biteImpossible ? {borderColor : Colors.buttonSky, backgroundColor : Colors.buttonSky}: null
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={()=> this.setState({biteImpossible : !this.state.biteImpossible})}
                                >
                                    <Text style={[{margin : 5}, this.state.biteImpossible ? {color : Colors.white} : null]}>물어 뜯는 아이</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{height : 40, alignItems : 'center'}}>
                        <View style={{width : width - 30, height : '100%', justifyContent : 'center'}}>
                            <Text style={{fontSize : 15, color : Colors.black}}>금액 설정</Text>
                        </View>
                    </View>

                    <View style={{alignItems : 'center'}}>
                        <View style={{width : width, height : 90, flexDirection : 'row'}}>
                            <View style={{height : '100%', width : '33.333%'}}>
                                <View style={{width : '100%', height : '70%', alignItems : 'center', justifyContent : 'center'}}>
                                    <FontAwesome5 name='paw' color={Colors.lightGrey} size={50}/>
                                </View>
                                <View style={{width : '100%', height : '30%', alignItems : 'center', justifyContent : 'center'}}>
                                    <Text>소형(1~6kg)</Text>
                                </View>
                            </View>
                            <View style={{height : '100%', width : '33.333%'}}>
                                <View style={{width : '100%', height : '70%', alignItems : 'center', justifyContent : 'center'}}>
                                    <FontAwesome5 name='paw' color={Colors.lightGrey} size={50}/>
                                </View>
                                <View style={{width : '100%', height : '30%', alignItems : 'center', justifyContent : 'center'}}>
                                    <Text>중형(7~15kg)</Text>
                                </View>
                            </View>
                            <View style={{height : '100%', width : '33.333%'}}>
                                <View style={{width : '100%', height : '70%', alignItems : 'center', justifyContent : 'center'}}>
                                    <FontAwesome5 name='paw' color={Colors.lightGrey} size={50}/>
                                </View>
                                <View style={{width : '100%', height : '30%', alignItems : 'center', justifyContent : 'center'}}>
                                    <Text>대형(15kg~)</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    
                        
                    <View style={{width : width, height : 45, flexDirection : 'row', marginTop : 10}}>
                        <View style={{height : '100%', width : '33.333%', alignItems : 'center', justifyContent : 'center'}}>
                            <View style={{ width : '95%', height : 40, borderWidth : 1, borderColor : Colors.lightGrey, borderRadius : 5}}>
                                <Picker
                                    selectedValue={this.state.smallPetNightPrice}
                                    onValueChange={(itemValue, itemIndex) => {this.setState({smallPetNightPrice : itemValue})}}
                                    style={{width : '100%', height : '100%'}}
                                    textStyle={{fontSize : 5}}
                                    >
                                    <Picker.Item label="1박" value="" />
                                    <Picker.Item label="불가" value="0" />
                                    <Picker.Item label="10000" value="10000" />
                                    <Picker.Item label="15000" value="15000" />
                                    <Picker.Item label="20000" value="20000" />
                                    <Picker.Item label="25000" value="25000" />
                                    <Picker.Item label="30000" value="30000" />
                                    <Picker.Item label="35000" value="35000" />
                                    <Picker.Item label="40000" value="40000" />
                                    <Picker.Item label="45000" value="45000" />
                                    <Picker.Item label="50000" value="50000" />
                                </Picker>
                            </View>
                        </View>
                        <View style={{height : '100%', width : '33.333%', alignItems : 'center', justifyContent : 'center'}}>
                            <View style={{ width : '95%', height : 40, borderWidth : 1, borderColor : Colors.lightGrey, borderRadius : 5}}>
                                <Picker
                                    selectedValue={this.state.middlePetNightPrice}
                                    onValueChange={(itemValue, itemIndex) => {this.setState({middlePetNightPrice : itemValue})}}
                                    style={{width : '100%', height : '100%'}}
                                    textStyle={{fontSize : 5}}
                                    >
                                    <Picker.Item label="1박" value="" />
                                    <Picker.Item label="불가" value="0" />
                                    <Picker.Item label="10000" value="10000" />
                                    <Picker.Item label="15000" value="15000" />
                                    <Picker.Item label="20000" value="20000" />
                                    <Picker.Item label="25000" value="25000" />
                                    <Picker.Item label="30000" value="30000" />
                                    <Picker.Item label="35000" value="35000" />
                                    <Picker.Item label="40000" value="40000" />
                                    <Picker.Item label="45000" value="45000" />
                                    <Picker.Item label="50000" value="50000" />
                                </Picker>
                            </View>
                        </View>
                        <View style={{height : '100%', width : '33.333%', alignItems : 'center', justifyContent : 'center'}}>
                            <View style={{ width : '95%', height : 40, borderWidth : 1, borderColor : Colors.lightGrey, borderRadius : 5}}>
                                <Picker
                                    selectedValue={this.state.bigPetNightPrice}
                                    onValueChange={(itemValue, itemIndex) => {this.setState({bigPetNightPrice : itemValue})}}
                                    style={{width : '100%', height : '100%'}}
                                    textStyle={{fontSize : 5}}
                                    >
                                    <Picker.Item label="1박" value="" />
                                    <Picker.Item label="불가" value="0" />
                                    <Picker.Item label="10000" value="10000" />
                                    <Picker.Item label="15000" value="15000" />
                                    <Picker.Item label="20000" value="20000" />
                                    <Picker.Item label="25000" value="25000" />
                                    <Picker.Item label="30000" value="30000" />
                                    <Picker.Item label="35000" value="35000" />
                                    <Picker.Item label="40000" value="40000" />
                                    <Picker.Item label="45000" value="45000" />
                                    <Picker.Item label="50000" value="50000" />
                                </Picker>
                            </View>
                        </View>
                    </View>

                    <View style={{width : width, height : 45, flexDirection : 'row'}}>
                        <View style={{height : '100%', width : '33.333%', alignItems : 'center', justifyContent : 'center'}}>
                            <View style={{ width : '95%', height : 40, borderWidth : 1, borderColor : Colors.lightGrey, borderRadius : 5}}>
                                <Picker
                                    selectedValue={this.state.smallPetDayPrice}
                                    onValueChange={(itemValue, itemIndex) => {this.setState({smallPetDayPrice : itemValue})}}
                                    style={{width : '100%', height : '100%'}}
                                    >
                                    <Picker.Item label="데이" value="" />
                                    <Picker.Item label="불가" value="0" />
                                    <Picker.Item label="10000" value="10000" />
                                    <Picker.Item label="15000" value="15000" />
                                    <Picker.Item label="20000" value="20000" />
                                    <Picker.Item label="25000" value="25000" />
                                    <Picker.Item label="30000" value="30000" />
                                    <Picker.Item label="35000" value="35000" />
                                    <Picker.Item label="40000" value="40000" />
                                    <Picker.Item label="45000" value="45000" />
                                    <Picker.Item label="50000" value="50000" />
                                </Picker>
                            </View>
                        </View>
                        <View style={{height : '100%', width : '33.333%', alignItems : 'center', justifyContent : 'center'}}>
                            <View style={{ width : '95%', height : 40, borderWidth : 1, borderColor : Colors.lightGrey, borderRadius : 5}}>
                                <Picker
                                    selectedValue={this.state.middlePetDayPrice}
                                    onValueChange={(itemValue, itemIndex) => {this.setState({middlePetDayPrice : itemValue})}}
                                    style={{width : '100%', height : '100%'}}
                                    >
                                    <Picker.Item label="데이" value="" />
                                    <Picker.Item label="불가" value="0" />
                                    <Picker.Item label="10000" value="10000" />
                                    <Picker.Item label="15000" value="15000" />
                                    <Picker.Item label="20000" value="20000" />
                                    <Picker.Item label="25000" value="25000" />
                                    <Picker.Item label="30000" value="30000" />
                                    <Picker.Item label="35000" value="35000" />
                                    <Picker.Item label="40000" value="40000" />
                                    <Picker.Item label="45000" value="45000" />
                                    <Picker.Item label="50000" value="50000" />
                                </Picker>
                            </View>
                        </View>
                        <View style={{height : '100%', width : '33.333%', alignItems : 'center', justifyContent : 'center'}}>
                            <View style={{ width : '95%', height : 40, borderWidth : 1, borderColor : Colors.lightGrey, borderRadius : 5}}>
                                <Picker
                                    selectedValue={this.state.bigPetDayPrice}
                                    onValueChange={(itemValue, itemIndex) => {this.setState({bigPetDayPrice : itemValue})}}
                                    style={{width : '100%', height : '100%'}}
                                    >
                                    <Picker.Item label="데이" value="" />
                                    <Picker.Item label="불가" value="0" />
                                    <Picker.Item label="10000" value="10000" />
                                    <Picker.Item label="15000" value="15000" />
                                    <Picker.Item label="20000" value="20000" />
                                    <Picker.Item label="25000" value="25000" />
                                    <Picker.Item label="30000" value="30000" />
                                    <Picker.Item label="35000" value="35000" />
                                    <Picker.Item label="40000" value="40000" />
                                    <Picker.Item label="45000" value="45000" />
                                    <Picker.Item label="50000" value="50000" />
                                </Picker>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{height : 40, alignItems : 'center'}}>
                        <View style={{width : width - 30, height : '100%', justifyContent : 'center'}}>
                            <Text style={{fontSize : 15, color : Colors.black}}>환급계좌 정보</Text>
                        </View>
                    </View>

                    <View style={{alignItems : 'center'}}>
                        <View style={{width : width - 40, height : 20, flexDirection : 'row'}}>
                            <View style={{height : '100%', width : '50%'}}>
                                <Text>예금주명</Text>
                            </View>
                            <View style={{height : '100%', width : '50%'}}>
                                <Text>은행</Text>
                            </View>
                        </View>
                        <View style={{width : width - 40, height : 30, flexDirection : 'row'}}>
                            <View style={{height : '100%', width : '50%', justifyContent : 'center'}}>
                                <View style={{width : '90%'}}>
                                    <TextInput 
                                        style={{backgroundColor : Colors.lightGrey, paddingLeft : 10, paddingRight : 0, paddingTop : 0, paddingBottom : 0, borderRadius : 5}}
                                        onChangeText={(refundAccountName) => this.setState({refundAccountName : refundAccountName})}
                                        placeholder='예)홍길동'
                                        value={this.state.refundAccountName}
                                    />
                                </View>
                            </View>
                            <View style={{height : '100%', width : '50%', justifyContent : 'center'}}>
                                <View style={{width : '100%'}}>
                                    <View style={{ width : '100%', height : '100%', borderWidth : 1, borderColor : Colors.lightGrey, borderRadius : 5}}>
                                        <Picker
                                            selectedValue={this.state.refundBank}
                                            onValueChange={(itemValue, itemIndex) => this.setState({refundBank : itemValue})}
                                            style={{width : '100%', height : '100%'}}
                                            >
                                            <Picker.Item label="선택" value="" />
                                            <Picker.Item label="신한" value="신한" />
                                            <Picker.Item label="하나" value="하나" />
                                            <Picker.Item label="우리" value="우리" />
                                            <Picker.Item label="농형" value="농형" />
                                        </Picker>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{alignItems : 'center', marginTop : 5}}>
                            <View style={{width : width - 40, height : 20}}>
                                <Text>계좌번호</Text>
                            </View>
                            <View style={{width : width - 40, height : 30}}>
                                <TextInput 
                                    style={{backgroundColor : Colors.lightGrey, paddingLeft : 10, paddingRight : 0, paddingTop : 0, paddingBottom : 0, borderRadius : 5}}
                                    onChangeText={(refundAccountNumber) => this.setState({refundAccountNumber : refundAccountNumber})}
                                    placeholder='-없이 입력'
                                    value={this.state.refundAccountNumber}
                                />
                            </View>
                        </View>
                        <View style={{width : width - 40}}>
                            <Text style={{color : Colors.red}}>* 계좌번호를 정확히 입력해 주세요.</Text>
                        </View>
                    </View>

                    <View style={{height : 40, alignItems : 'center'}}>
                        <View style={{width : width - 30, height : '100%', justifyContent : 'center'}}>
                            <Text style={{fontSize : 15, color : Colors.black}}>지참 항목</Text>
                        </View>
                    </View>
                    <View style={{alignItems : 'center'}}>
                        <View style={{width : width - 30, height : 100}}>
                            <TextInput 
                                style={{width : '100%', height : '100%', backgroundColor : Colors.lightGrey, borderRadius : 5}}
                                multiline={true}
                                onChangeText={(necessaryItem)=>this.setState({necessaryItem : necessaryItem})}
                                placeholder='사료, 배변패드 등 반려동물 주인이 지참해야할 항목들을 상세히 적어주세요.'
                                value={this.state.necessaryItem}
                            />
                        </View>
                    </View>

                    <View style={{height : 40, alignItems : 'center'}}>
                        <View style={{width : width - 30, height : '100%', justifyContent : 'center'}}>
                            <Text style={{fontSize : 15, color : Colors.black}}>펫시터 소개</Text>
                        </View>
                    </View>
                    <View style={{alignItems : 'center'}}>
                        <View style={{width : width - 30, height : 100}}>
                            <TextInput 
                                style={{width : '100%', height : '100%', backgroundColor : Colors.lightGrey, borderRadius : 5}}
                                multiline={true}
                                onChangeText={(petSitterIntroduce)=>this.setState({petSitterIntroduce : petSitterIntroduce})}
                                placeholder='펫시터 소개는 사용자들이 펫시터를 선택하는데 도움이 됩니다.'
                                value={this.state.petSitterIntroduce}
                            />
                        </View>
                    </View>
                    
                    <View style={{marginTop : 10}}>
                        <TouchableOpacity 
                            style={{width: width, 
                            height: 50, 
                            backgroundColor: Colors.buttonSky, 
                            justifyContent: 'center', 
                            alignItems: 'center'}}
                            onPress={this._updatePetSitterInfoProc}
                        >
                            <Text style={{color : Colors.white, fontSize : 20, fontWeight : '700'}}>수정</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop : 5}}></View>

                </View>
            </ScrollView>
        );
    }
}