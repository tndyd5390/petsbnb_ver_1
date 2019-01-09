import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity,
    AsyncStorage,
    Button,
    Modal,
    FlatList,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Category from '../components/Explore/Category';
import Colors from '../../utils/Colors';
import ImageSlider from 'react-native-image-slider';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import {
    List, 
    ListItem, 
    CheckBox
} from 'react-native-elements';

export default class BookingConfirm extends Component {
    
    constructor(props){
        super(props);
        const data = this.props.navigation.getParam('data');
        const pDTO = this.props.navigation.getParam('pDTO');
        const isDayCare = this.props.navigation.getParam('isDayCare', false);
        this.state = {
            petList : [],
            stDate : data.stDate,
            edDate : data.edDate,
            diffDate : data.diffDate,
            price : -1,
            dayPrice : 30000,
            smallPetNightPrice: pDTO.smallPetNightPrice,
            smallPetDayPrice: pDTO.smallPetDayPrice,
            middlePetNightPrice: pDTO.middlePetNightPrice,
            middlePetDayPrice: pDTO.middlePetDayPrice,
            bigPetNightPrice: pDTO.bigPetNightPrice,
            bigPetDayPrice: pDTO.bigPetDayPrice,
            totalPrice : this.priceCalc(data),
            termsAccept : false,
            paymentIdx : 0,
            paymentVal : '네이버 페이',
            isDayCare
        }
        if(isDayCare){
            this.state.checkin = this.props.navigation.getParam('checkin');
            this.state.checkout = this.props.navigation.getParam('checkout');
        }
    };

    async componentWillMount() {
        const petList = await this._getSelectedPetList();
        this.setState({
            petList
        })
    }

    _getSelectedPetList = async () =>{
        const petNoMapArr = this.props.navigation.getParam('data').selected._mapData;
        let petNoArr = [];
        let petNoMap = petNoMapArr.reduce(function(map, obj) {
            petNoArr.push(obj[0]);
        }, {});
        
        const params = {
            petNoArr
        }

        const selectedPetList = await fetch('http://192.168.0.10:8080/pet/getSelectedPetList.do', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
        .then((response) => response.json())
        .then((res => {
            return res
        }))
        .catch((err) => {
            alert('데이터 전송 오류입니다. 다시 시도해주세요.');
            this.props.navigation.goBack();
        })

        return selectedPetList;
        
    }

    
    
    priceCalc = async (data) =>{
        let price = 0;
        if(data.diffDate == 0){
            price = data.dayPrice;
        }else{
            price = (data.price * data.diffDate);
        }
        return price;
    };
    
    setArrList=(data)=>{
        const arr = [];
        for(let i=0; i<data.length;i++){
            if(data[i][1]==true){
                arr.push(data[i][0]);
            };
        };
        return arr;
    };

    callBackChecked = (checked) =>{
        this.setState({
            termsAccept : checked
        });

    };

    _callBackPayment = (data) => {
        this.setState({
            paymentIdx : data.index,
            paymentVal : data.value
        });
    };

    render(){
        const pDTO = this.props.navigation.getParam('pDTO');
        return(
            <SafeAreaView style={styles.safeAreaViewStyle}>
                <ScrollView>
                    <View style={{backgroundColor : Colors.white}}>
                        <Text style={{fontSize : 17,fontWeight : 'bold', marginLeft : 20, marginTop : 20}}>펫시터 정보</Text>
                    </View>
                    <Profile pDTO={pDTO}/>
                    <View style={{backgroundColor : Colors.white}}>
                        <Text style={{fontSize : 17,fontWeight : 'bold', marginLeft : 20, marginTop : 20}}>맡길 펫 정보</Text>
                    </View>
                    <PetList petList={this.state.petList}/>
                    <View style={{backgroundColor : Colors.white}}>
                        <Text style={{fontSize : 17,fontWeight : 'bold', marginLeft : 20, marginTop : 20}}>예약 정보</Text>
                    </View>
                    <BookingDateDetail stDate={this.state.stDate} edDate={this.state.edDate} diffDate={this.state.diffDate}/>
                    <View style={{backgroundColor : Colors.white}}>
                        <Text style={{fontSize : 17,fontWeight : 'bold', marginLeft : 20, marginTop : 20}}>결제 정보</Text>
                    </View>
                    <Price data={this.state} />
                    <View style={{backgroundColor : Colors.white}}>
                        <Text style={{fontSize : 17,fontWeight : 'bold', marginLeft : 20, marginTop : 20}}>결제 방법</Text>
                    </View>
                    <Payment navigation={this.props.navigation} data={this.state} _callBackPayment={this._callBackPayment.bind(this)}/>
                    <Terms callBackChecked={this.callBackChecked}/>
                </ScrollView>
                <BottomRequest navigation={this.props.navigation} termsAccept={this.state.termsAccept}/>
            </SafeAreaView>
        );
    };
};

class Profile extends Component {
    constructor(props){
        super(props);
    };

    render(){
        const pDTO = this.props.pDTO;
        return(
            <View style={styles.listBar}>
                <View style={{alignItems : 'center', justifyContent: 'center'}}>
                        <Image source={require("../../../img/user.png")} style={{width : 80, height : 80, margin : 18}}/>
                </View>
                <View style={{justifyContent: 'center', marginLeft : 15}}>
                    <View>
                        <Text style={{fontSize : 20, fontWeight : 'bold'}}>{pDTO.petSitterName}</Text>
                    </View>
                    <View style={{flexDirection: 'column', marginTop : 5}}>
                        <View style={{alignItems : 'center', flexDirection: 'row'}}>
                            <View style={styles.blueCircle}/>
                            <Text>{pDTO.petSitterIntroduceOneLine}</Text>
                        </View>
                    </View>
                </View>            
            </View>
        )
    };
};

Profile.propTypes = {
    pDTO : PropTypes.object.isRequired
}

class PetList extends Component{
    constructor(props){
        super(props);
    };

    renderList = (petList) => {
        return petList.map((pDTO, index)=>{
            const weight = Number(pDTO.petWeight);
            let size = '';
            if(weight > 0 && weight <= 6){
                size = '소형';
            }else if(weight > 6 && weight <= 15){
                size='중형';
            }else{
                size='대형';
            }
            return(
                <View style={styles.listBar} key={index}>
                    <View style={{alignItems : 'center', justifyContent: 'center'}}>
                            <Image source={require("../../../img/user.png")} style={{width : 80, height : 80, margin : 18}}/>
                    </View>
                    <View style={{justifyContent: 'center', marginLeft : 15}}>
                        <View>
                            <Text style={{fontSize : 20, fontWeight : 'bold'}}>{pDTO.petName}</Text>
                        </View>
                        <View style={{flexDirection: 'column', marginTop : 5}}>
                            <View style={{alignItems : 'center', flexDirection: 'row'}}>
                                <View style={styles.blueCircle}/>
                                <Text>{`종류 ${pDTO.petKind}`}</Text>
                            </View>
                            <View style={{alignItems : 'center', flexDirection: 'row'}}>
                                <View style={styles.blueCircle}/>
                                <Text>{size}</Text>
                            </View>
                        </View>
                    </View>            
                </View>
            );
        });
    };
    render(){
        return(
            <View>
                {this.renderList(this.props.petList)}
            </View>
        );
    };
};

class BookingDateDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            stDate : this.props.stDate,
            edDate : this.props.edDate,
            diffDate : this.props.diffDate
        }
    };

    setDateDetail = (state) =>{
        if(state.diffDate==0){
            return (
                <Text style={{fontSize : 17}}>
                    {state.stDate} 데이케어
                </Text>
            )
        }else{
            return (
                <Text style={{fontSize : 17}}>
                    {state.stDate}  ~  {state.edDate}
                </Text>
            )
        }
    };

    render(){
        return(
            <View style={styles.dateBar}>
                {this.setDateDetail(this.state)}
            </View>
        );
    };
};
class Price extends Component{
    constructor(props){
        super(props);
    };

    _calcPriceDayCare = (petList, checkin, checkout, smallPetDayPrice, middlePetDayPrice, bigPetDayPrice) => {
        let price = 0;
        petList = this._parsePetList(petList);
        const careHours = Number(checkout) - Number(checkin);
        petList.forEach((pDTO, index) => {
            if(pDTO.petKind === '소형'){
                price += careHours * Number(smallPetDayPrice);
            }else if(pDTO.petKine === '중형'){
                price += careHours * Number(middlePetDayPrice);
            }else{
                price += careHours * Number(bigPetDayPrice);
            }
        });
        return price;
    }

    _calcPriceNightCare = (petList, diffDate, smallPetNightPrice, middlePetNightPrice, bigPetNightPrice) => {
        let price = 0;
        petList = this._parsePetList(petList);
        diffDate = Number(diffDate);
        petList.forEach((pDTO, index) => {
            if(pDTO.petKind === '소형'){
                price += diffDate * Number(smallPetNightPrice);
            }else if(pDTO.petKine === '중형'){
                price += diffDate * Number(middlePetNightPrice);
            }else{
                price += diffDate * Number(bigPetNightPrice);
            }
        });
        return price;
    }

    _definePetKind = (weight) => {
        weight = Number(weight);
        if(weight > 0 && weight <= 6){
            return '소형';
        }else if(weight > 6 && weight <= 15){
            return '중형';
        }else{
            return '대형';
        }
    }

    _parsePetList = (petList) => petList.map((pDTO) => {return {...pDTO, petKind : this._definePetKind(pDTO.petWeight)}})

    addCommma = (price) =>{
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    _calcTotalPrice = (priceData) => {
        if(priceData.isDayCare){
            return this._calcPriceDayCare(
                priceData.petList, 
                priceData.checkin, 
                priceData.checkout, 
                priceData.smallPetDayPrice, 
                priceData.middlePetDayPrice,
                priceData.bigPetDayPrice
            );
        }else{
            return this._calcPriceNightCare(
                priceData.petList,
                priceData.diffData,
                priceData.smallPetNightPrice,
                priceData.middlePetNightPrice,
                priceData.bigPetNightPrice
            )
        }
    }

    render(){
        const priceData = this.props.data;
        return(
            <View style={styles.priceBar}>
                <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                    <Text style={{fontSize : 25, fontWeight : 'bold'}}>
                        {this.addCommma(this._calcTotalPrice(priceData))} 원
                    </Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'flex-end', marginTop : 10}}>
                    <View style={{borderBottomWidth : 2,borderBottomColor: Colors.lightGrey, width:'70%'}}/>
                </View>
            </View>
        );
    };
};

class Payment extends Component{
    constructor(props){
        super(props);
        this.state = {
            paymentIdx : this.props.data.paymentIdx,
            paymentVal : this.props.data.paymentVal
        }
    };
    
    _returnPayment = (data) =>{
        this.setState({
            paymentIdx : data.index,
            paymentVal : data.value
        });
        this.props._callBackPayment(data);
    };
    
    _goPaymentList = () =>{
        this.props.navigation.navigate('BookingPaymentList', 
        {'data': {'idx' : this.state.paymentIdx, 'val' : this.state.paymentVal}, returnPayment:this._returnPayment.bind(this)})
    };
    
    render(){
        return(
            <View style={styles.paymentBar}>
                <View style={{flexDirection:'row',flex:1,justifyContent : 'center',marginLeft:30}}>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>{this.state.paymentVal}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=> this._goPaymentList()}
                     style={{borderColor : Colors.lightGrey, borderWidth : 1, marginRight:15,borderRadius:10, backgroundColor : Colors.buttonSky}}>
                        <Text style={{fontSize : 15, margin : 10, color:Colors.white}}>변경</Text>
                    </TouchableOpacity>
                </View> 
            </View>
        );
    };
};

class Terms extends Component{
    constructor(props){
        super(props);
        this.state = {
            checked : false
        }
    };

    backChecked = () =>{
        this.setState({checked: !this.state.checked});
        this.props.callBackChecked(!this.state.checked);
    }

    render(){
        return(
            <View style={{flex:1, flexDirection: 'row', backgroundColor : Colors.white, justifyContent:'center', height : 300}}>
                <View style={{width:'85%', height:200, marginTop:30}}>
                    <ScrollView>
                        <Text>
                            제1조(목적 등)
                                크리스찬상조(주) (www.4christitan.co.kr) 이용자 약관(이하 "본 약관"이라 합니다)은 이용자가 크리스찬상조 주식회사(이하 "크리스찬상조(주)‘이라 합니다)에서 제공하는 인터넷 관련 서비스(이하 "서비스"라 합니다)를 이용함에 있어 이용자와 "크리스찬상조(주)"의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                                이용자가 되고자 하는 자가 "크리스찬상조(주)"가 정한 소정의 절차를 거쳐서 "가입하기" 단추를 누르면 본 약관에 동의하는 것으로 간주합니다. 본 약관에 정하는 이외의 이용자와 "크리스찬상조(주)"의 권리, 의무 및 책임사항에 관해서는 대한민국의 관련 법령과 상관습에 의합니다.
                                제2조(이용자의 정의)
                                "이용자"란 "크리스찬상조(주) 웹사이트" 에 접속하여 본 약관에 따라 "크리스찬상조(주)" 웹회원으로 가입하여 "크리스찬상조(주)"가 제공하는 상조회원(본인)정보를 열람할 수 있는 권리를 포함한 기타 권리와 의무가 생성되는 자를 말합니다.
                                크리스찬상조(주) 웹사이트의 "이용자"는 크리스찬상조(주) 상품에 가입한 상조회원으로 제한합니다.
                                제3조(웹회원 가입)
                                이용자가 되고자 하는 자는 "크리스찬상조(주)"가 정한 가입 양식에 따라 웹회원정보를 기입하고 "확인" 단추를 누르는 방법으로 웹회원 가입을 신청합니다.
                                “크리스찬상조(주)"는 제1항과 같이 웹회원으로 가입할 것을 신청한 자가 다음 각 호에 해당하지 않는 한 신청한 자를 웹회원으로 등록합니다.
                                ① 가입신청자가 본 약관 제6조에 의하여 이전에 웹회원자격을 상실한 적이 있는 경우.
                                ② 등록 내용에 허위, 기재누락, 오기가 있는 경우 (모든 가입신청자는 반드시 실명으로 본인의 이름과 주민번호, 이메일 주소를 제공하여야 하나, 그러하지 아니한 경우)
                                ③ 쓰기 권한을 주기에 현저히 지장이 있다고 판단되는 경우
                                ④ 조19세 미만
                                웹회원가입계약의 성립시기는 가입 양식에 기입한 고객명 및 주민(사업자)번호를 통해 크리스찬상조(주) 상조회원으로 확인되는 시점으로 합니다.
                                웹회원은 제1항의 웹회원정보 기재 내용에 변경이 발생한 경우, 즉시 변경사항을 정정하여 기재하여야 합니다.
                                제4조(권한의 제공)
                                "크리스찬상조(주)"는 이용자에게 아래와 같은 서비스를 제공합니다.
                                ① 상조회원열람(본인)
                                ② 이벤트가 있을 시) 이벤트 참여권
                                ③ 기타 "크리스찬상조(주)"가 향후 개발하거나 다른 회사와의 협력계약 등을 통해 웹회원들에게 제공할 일체의 서비스 등
                                웹회원가입계약의 성립시기는 가입 양식에 기입한 고객명 및 주민(사업자)번호를 통해 크리스찬상조(주) 상조회원으로 확인되는 시점으로 합니다.
                                웹회원은 제1항의 웹회원정보 기재 내용에 변경이 발생한 경우, 즉시 변경사항을 정정하여 기재하여야 합니다.
                                제5조(서비스의 중단)
                                "크리스찬상조(주)"는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있고, 새로운 서비스로의 교체 기타 "크리스찬상조(주)"가 적절하다고 판단하는 사유에 기하여 현재 제공되는 서비스를 완전히 중단할 수 있습니다.
                                제1항에 의한 서비스 중단의 경우에는 "크리스찬상조(주)"는 제7조 제2항에서 정한 방법으로 이용자에게 통지합니다. 다만, "크리스찬상조(주)"가 통제할 수 없는 사유로 인한 서비스의 중단(시스템 관리자의 고의, 과실이 없는 디스크 장애, 시스템 다운 등)으로 인하여 사전 통지가 불가능한 경우에는 그러하지 아니합니다.
                                제6조(이용자 탈퇴 및 자격 상실 등)
                                이용자는 "크리스찬상조(주)"에 언제든지 자신의 웹회원 등록을 말소해 줄 것(이용자 탈퇴)을 요청할 수 있으며 위 요청을 받은 즉시 해당 이용자의 웹회원 등록 말소를 위한 절차를 밟습니다.
                                이용자가 다음 각 호의 사유에 해당하는 경우, "크리스찬상조(주)"는 이용자의 웹회원자격을 적절한 방법으로 제한 및 정지, 상실시킬 수 있습니다.
                                ① 다른 사람의 "서비스" 이용을 방해하거나 그 정보를 도용하는 등 전자거래질서를 위협하는 경우
                                ② "서비스"를 이용하여 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우
                                ③ 욕설 기타 욕설에 준하는 표현을 쓸 경우 1회 경고 , 재차 그런 표현을 쓸 경우에는 무조건 등록 말소
                                "크리스찬상조(주)"가 이용자의 웹회원자격을 상실시키기로 결정한 경우에는 웹회원등록을 말소합니다. 이 경우 이용자인 웹회원에게 웹회원등록 말소 전에 이를 통지하지만 해명의 기회는 주지않습니다.
                                제7조(이용자의 개인정보보호)
                                "크리스찬상조(주)"는 관련법령이 정하는 바에 따라서 이용자 등록정보를 포함한 이용자의 개인정보를 보호하기 위하여 노력합니다. 이용자의 개인정보보호에 관해서는 관련법령 및 "크리스찬상조(주)"가 정하는 "개인정보보호정책"에 정한 바에 의합니다.
                            </Text>
                    </ScrollView>
                    <View style={{flexDirection:'row',justifyContent : 'flex-end', marginTop:10}}>
                        <CheckBox
                            containerStyle={{backgroundColor : Colors.white,borderColor:Colors.white}}
                            textStyle={{fontSize : 17, fontWeight:'bold'}}
                            checked={this.state.checked} 
                            iconRight
                            title='약관에 동의 하십니까?'
                            onPress={() => this.backChecked()}/>
                    </View>
                </View>
            </View>
        );
    };

};

class BottomRequest extends Component{
    constructor(props) {
        super(props);
    };

    onSubmit = () =>{
        const termsAccept = this.props.termsAccept;

        if(termsAccept){
            alert('다음');   
        }else{
            alert('약관에 동의해주시기 바랍니다.');
        };
        
    };

    render(){
        return(
            <View style={styles.bottomRequest}>
                <TouchableOpacity style={styles.bottomButton} onPress={()=>this.onSubmit()}>
                    <Text style={styles.bottomText}>결제하기</Text>
                </TouchableOpacity>
            </View>
        )
    };
};

const styles = StyleSheet.create({
    safeAreaViewStyle : {
        flex: 1,
        backgroundColor : Colors.lightGrey,
    },
    slideContainer : {
        alignItems: 'center',
        justifyContent: 'center',
        height : 220,
        width : '100%'
    },
    customSlide: {
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        height : '100%'
    },
    customImage: {
        width: Dimensions.get('window').width,
        height: 200,
    },
    listBar : {
        flex:1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        height : 130,
        backgroundColor : Colors.white,
        marginBottom : 2,
    },
    dateBar : {
        flex:1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        height : 60,
        backgroundColor : Colors.white,
        marginBottom : 2,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    endBar: {
        flex:1,
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor : Colors.white,
        height : (Dimensions.get('window').height - 520)
    },
    priceBar : {
        flex:1,
        flexDirection: 'column',
        justifyContent : 'flex-end',
        paddingHorizontal: 10,
        paddingVertical: 5,
        height : 60,
        backgroundColor : Colors.white,
        marginBottom : 1,
    },
    paymentBar : {
        flex:1,
        flexDirection: 'row',
        justifyContent : 'space-around',
        alignItems : 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor : Colors.white,
        marginBottom : 1,
        height : 70
    },

    bottomRequest : {
        justifyContent: 'center', 
        alignItems: 'center',
        bottom: 0,
        width:'100%',
        height : 70,
        backgroundColor : Colors.buttonSky
    },
    bottomButton : {
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        width : '100%',
        height : '100%'
    },
    bottomText : {
        fontSize : 17,
        color : Colors.white
    },
    stickerBtn:
    {
        position: 'absolute',
        right: 25,
        bottom: 25,
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderColor : Colors.buttonSky,
        borderWidth : 2,
        padding: 15,
        marginBottom : 20
    },

    blueCircle:{
        height: 10,
        width: 10,
        backgroundColor: Colors.buttonSky,
        borderRadius: 50,
        marginRight : 10
    },

});