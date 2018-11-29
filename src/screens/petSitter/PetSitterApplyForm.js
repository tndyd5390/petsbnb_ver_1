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
    ScrollView,
    Picker,
    ActivityIndicator,
    Alert
} from 'react-native';
const{width, height} = Dimensions.get('window');

export default class PetSitterApplyForm extends Component{

    constructor(props){
        super(props);
        const today = new Date();
        const dd = today.getDate().toString();
        const mm = today.getMonth() + 1;
        const yyyy = today.getFullYear().toString();
        const birthday = yyyy + "-" + mm + "-" + dd;
        this.state = {
            activityIndicator : false,
            userNo : '',
            name : '',
            gender : '',
            birthday : birthday,
            phone : '',
            email : '',
            job : '',
            etcJob : '',
            checkAddress : false
        }
        this._getUserNo();
    }

    _getUserNo = async() => {
        const userNo = await AsyncStorage.getItem('userInfo');
        this.setState({
            userNo : userNo
        });
    }

    _confirmUserAddress = async() => {
        this.setState({
            activityIndicator : true
        })

        const params = {
            userNo : this.state.userNo
        }

        await fetch('http://192.168.0.10:8080/user/getUserAddress.do', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
          })
          .then((response) => response.json())
          .then((res => {
                if(res != null){
                    Alert.alert(
                        '주소를 확인해 주세요.',
                        res.userAddress,
                        [
                          {text: '수정하기', onPress: () => this.props.navigation.navigate('CheckPassword', {nextView : 'ProfileUserUpdate'}), style: 'cancel'},
                          {text: '확인', onPress: () => this.setState({checkAddress : true})},
                        ],
                        { cancelable: false }
                    )
                    this.setState({
                        activityIndicator : false
                    })
                }else{
                    
                }
          }))
          .catch((err) => {
              console.log(err);
              alert("서버 에러입니다. 잠시후 다시 시도해주세요.");
          })
    }

    _petSitterApply = async() => {
        const state = this.state;
        const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const phoneReg = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/;
        let JOB;
        
        if(state.name == ''){
            alert('이름을 입력해주세요.');
        }else if(state.gender == ''){
            alert('성별을 선택해 주세요.');
        }else if(state.phone == ''){
            alert('연락처를 입력해주세요');
        }else if(!phoneReg.test(state.phone)){
            alert('연락처 양식을 확인해 주세요.');
        }else if(state.email == ''){
            alert('이메일을 입력해주세요');
        }else if(!emailCheckRegex.test(state.email)){
            alert('이메일 양식을 확인해주세요.');
        }else if(state.job == ''){
            alert('직업을 선택해 주세요.');
        }else if(state.job == 'etc' && state.etcJob == ''){
            alert('직업을 입력해 주세요.');
        }else if(!state.checkAddress){
            alert('주소를 확인해 주세요.');
        }else{
            if(state.job != 'etc'){
                JOB = state.job;
            }else{
                JOB = state.etcJob;
            }

            this.setState({
                activityIndicator : true
            })

            const params = {
                name : state.name,
                gender : state.gender,
                birthday : state.birthday,
                phone : state.phone,
                email : state.email,
                job : JOB,
                userNo : state.userNo
            }

            await fetch('http://192.168.0.10:8080/user/applyPetSitter.do', {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            })
            .then((response) => response.json())
            .then((res => {
                if(res != null){
                    if(res.result){
                        alert('펫시터 신청이 완료되었습니다.');
                        this.setState({
                            activityIndicator : false
                        })
                        this.props.navigation.goBack();
                    }
                }else{
                    alert("서버 에러입니다. 잠시후 다시 시도해주세요.");    
                    this.setState({
                        activityIndicator : false
                    })
                    this.props.navigation.goBack();
                }
            }))
            .catch((err) => {
                alert("서버 에러입니다. 잠시후 다시 시도해주세요.");
                this.setState({
                    activityIndicator : false
                })
                this.props.navigation.goBack();
            })
        }
    }


    render() {
        return(
            <View style={{backgroundColor : Colors.white, height : height , flex : 1}}>
                {this.state.activityIndicator ? (
                    <View style={{backgroundColor : 'rgba(0,0,0,0.2)', width : width, height : height, position : 'absolute', zIndex : 10, alignItems : 'center', justifyContent : 'center'}}>
                        <ActivityIndicator size="large" color="#10b5f1"/>
                    </View>
                ) : (null)}
                <ScrollView>
                    <View style={{alignItems : 'center', marginTop : 15}}>
                        <View style={{width : width - 40}}>
                            <Text style={{fontSize : 15, color : Colors.black}}>
                                {`1. 지원자격\n  - 반려동물을 5년 이상 키워본 경험 보유\n  - 직업의식을 가지고 열심히 하실 분\n\n2. 우대사항\n  - 반려동물 관련 자격증 소지자, 관련학과 전공 및 졸업\n`}
                            </Text>
                        </View>
                        <View style={{width : width-40, flexDirection : 'row'}}>
                            <Text style={{color : Colors.red, fontSize : 15}}>*</Text><Text style={{fontSize : 15, color : Colors.black}}> 1차 신청자 합격 여부는 기재하신 번호로 일주일 이내에 개별 연락드리겠습니다.{`\n`}</Text>
                        </View>
                        <View style={{width : width-40, flexDirection : 'row'}}>
                            <Text style={{color : Colors.red, fontSize : 15}}>*</Text><Text style={{fontSize : 15, color : Colors.black}}> 지원 양식에 사실과 다른 정보를 기입할 경우 펫시터 선정에 불이익을 받을 수 있습니다.</Text>
                        </View>
                    </View>



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
                                    onChangeText={(name) => this.setState({name : name})}
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
                                            onPress={()=>this.setState({gender : 'M'})}
                                        >
                                            <FontAwesome5 name={'check-square'} size={20} style={[this.state.gender == 'M' ? {color : Colors.buttonSky} : null]}/>
                                            <Text style={{marginLeft : 10}}>남성</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{height : '100%', width : '50%', justifyContent : 'center'}}>
                                    <View style={{flexDirection : 'row'}}>
                                        <TouchableOpacity
                                            style={{flexDirection : 'row'}}
                                            onPress={()=>this.setState({gender : 'F'})}
                                        >
                                            <FontAwesome5 name={'check-square'} size={20} style={[this.state.gender == 'F' ? {color : Colors.buttonSky} : null]}/>
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
                                date={this.state.birthday}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate="1980-01-01"
                                maxDate="2200-01-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                onDateChange={(date) => {this.setState({birthday: date})}}
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
                                    keyboardType='numeric'
                                    onChangeText={(phone)=>this.setState({phone})}
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
                                    onChangeText={(email)=>this.setState({email : email})}
                                />
                            </View>
                        </View>
                    </View>
                    

                    <View style={{alignItems : 'center', height : 50}}>
                        <View style={{height : '100%', flexDirection : 'row'}}>
                            <View style={{width : '25%', justifyContent : 'center'}}>
                                <Text style={{fontSize : 15, color : Colors.black}}>직업</Text>
                            </View>
                            <View style={{width : '65%', justifyContent : 'center'}}>
                                <View style={{height : '60%', width : '100%', backgroundColor : Colors.lightGrey, borderWidth : 1, borderColor : '#BDBDBD'}}>
                                    <Picker
                                        selectedValue={this.state.job}
                                        style={{width : '100%', height : '100%'}}
                                        onValueChange={(itemValue, itemIndex) => this.setState({job: itemValue})}
                                    >
                                        <Picker.Item label="선택" value="" />
                                        <Picker.Item label="주부" value="주부" />
                                        <Picker.Item label="학생" value="학생" />
                                        <Picker.Item label="직장인" value="직장인" />
                                        <Picker.Item label="프리랜서" value="프리랜서" />
                                        <Picker.Item label="무직" value="무직" />
                                        <Picker.Item label="기타" value="etc" />
                                    </Picker>
                                </View>
                            </View>
                        </View>
                    </View>
                    {
                        this.state.job == 'etc' ?
                        (
                        <View style={{ height : 50, alignItems : 'center'}}>
                            <View style={{ flexDirection : 'row', height : '100%'}}>
                                <View style={{height : '100%', width : '25%', justifyContent : 'center'}}>
                                    <Text style={{ fontSize : 15, color : Colors.black}}>직업 입력</Text>
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
                                        onChangeText={(etcJob) => this.setState({etcJob : etcJob})}
                                    />
                                </View>
                            </View>
                        </View>
                        )
                        :
                        (null)
                    }
                    

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
                                    onPress={this._confirmUserAddress}
                                >
                                    <Text>{this.state.checkAddress ? '확인 완료' : '주소 확인'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{alignItems : 'center', marginBottom : 10}}>
                        <RoundedButton 
                            title='신청' 
                            buttonHandleFunc={this._petSitterApply} 
                            buttonColor={{backgroundColor : Colors.buttonSky}}
                            textColor={{color : Colors.white}}
                        />
                    </View>

                </ScrollView>
            </View>
        );
    }
}