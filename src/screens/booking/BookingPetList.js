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
    FlatList
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Category from '../components/Explore/Category';
import Colors from '../../utils/Colors';
import ImageSlider from 'react-native-image-slider';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import {List, ListItem} from 'react-native-elements';
import { ip } from "../../utils/const";

export default class BookingPetList extends Component{
    constructor(props) {
        super(props)
        if(this.props.navigation.getParam('pDTO', null) === null){
            alert('다시시도해주세요.');
            this.props.navigation.goBack();
        }
        const rslt = chgDateFormat(this.props.navigation.getParam('date'));
        this.state = {
            stDate : rslt.stDate,
            edDate : rslt.edDate,
            diffDate : rslt.diffDate,
            rowStDate: this._chgDateFormat(this.props.navigation.getParam("date").stDate),
            rowEdDate: this._chgDateFormat(this.props.navigation.getParam("date").edDate),
            petYN : true,
            selected : (new Map():Map<string,boolean>)
        }
    };

    _chgDateFormat = (date) => {
        const chgDate = new Date(date);
            const rstl = (chgDate.getFullYear() ? chgDate.getFullYear() +"년" : '') + 
                         (chgDate.getMonth()>=0 ? (chgDate.getMonth()+1)+ "월" : '') +  
                         (chgDate.getDate() ? chgDate.getDate() +"일" : '');
            return rstl;
    }

    componentWillMount(){
        const isDayCare = this.props.navigation.getParam('isDayCare', false);
        if(isDayCare){
            this.setState({
                isDayCare : isDayCare,
                checkin : this.props.navigation.getParam('checkin'),
                checkout : this.props.navigation.getParam('checkout')
            })
        }
    }
    
    _callBackPetList = (selectedPet) =>{
        this.setState({
            selected : selectedPet
        });
    };
      
    render(){
        return(
            <SafeAreaView style={styles.safeAreaViewStyle}>
                <ScrollView>
                {this.state.petYN ?  <PetY callBackPetList={this._callBackPetList} pDTO={this.props.navigation.getParam('pDTO')} isDayCare={this.state.isDayCare} checkin={this.state.checkin} checkout={this.state.checkout} navigation={this.props.navigation}/> :<PetN/> }            
                 </ScrollView>
                {this.state.petYN ?  <BottomRequest navigation={this.props.navigation} data={this.state} pDTO={this.props.navigation.getParam('pDTO')} isDayCare={this.state.isDayCare} checkin={this.state.checkin} checkout={this.state.checkout} petsitterUserImage={this.props.navigation.getParam('petsitterUserImage')}/> : null }            
            </SafeAreaView>
        );
    };
};

class PetN extends Component {
    constructor(props) {
        super(props);
    }
    
    render(){
        return(
            <View style={{flex:1,flexDirection :'column',alignItems :'center', marginTop : 30}}>
                <Text style={{fontSize : 20, fontWeight :'bold'}}>등록된 반려동물이 없습니다.</Text>
                <Text style={{fontSize : 15, marginTop : 10}}>반려동물을 등록해야 예약 진행이 가능합니다.</Text>
                <View style={{marginTop : 50}}>
                    <TouchableOpacity style={{width : 200, height : 60,borderRadius: 15, backgroundColor : Colors.buttonSky, justifyContent : 'center', alignItems : 'center'}}>
                        <Text style={{color:Colors.white, fontSize : 17, fontWeight : 'bold'}}>반려동물 등록하기</Text>
                    </TouchableOpacity>
                </View>   
            </View>
        );
    };
};

class PetY extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected : (new Map():Map<string,boolean>)
        };

    };

    async componentWillMount() {
        //여기서 문제는 펫시터가 이용불가라고 설정해놓은 견종을 화면에 출력하면 안된다.
        //자바스크립트로 해결할까 했지만 아싸리 스프링에서 데이터를 불러올때 펫시터가 이용불가로 설정해놓은 견종을 불러오지 않는 방식으로 변경한다.
        
        //먼저 펫시터가 이용불가로 설정해놓은 데이터를 불러오기위하여 부모 컴포넌트에서 넘겨준 펫시터 정보를 불러온다.
        //데이터는 price가 0이면 펫시터가 이용 불가로 설정해 놓은 것이다.
        const pDTO = this.props.pDTO;
        
        //데이케어의 경우 DayPrice만 판단한다.
        let availablePetKind = [];
        if(this.props.isDayCare){
            if(pDTO.smallPetDayPrice !== '0'){
                availablePetKind.push('SMALL');
            }
            if(pDTO.middlePetDayPricee !== '0'){
                availablePetKind.push('MIDDLE');
            }
            if(pDTO.bigPetDayPrice !== '0'){
                availablePetKind.push('BIG');
            }
        }else{//1박케어의 경우 NightPrice만 판단한다.
            if(pDTO.smallPetNightPrice !== '0'){
                availablePetKind.push('SMALL');
            }
            if(pDTO.middlePetNightPrice !== '0'){
                availablePetKind.push('MIDDLE');
            }
            if(pDTO.bigPetNightPrice !== '0'){
                availablePetKind.push('BIG');
            }
        }
        //위의 if문으로 펫시팅 가능한 견종만 추리고 펫 목록을 불러오는 ajax에 파라미터로 넘긴다.
        const petList = await this._getPetList(availablePetKind);
        let refinedPetList = [];
        petList.forEach((value, index) => {
            let weight = Number(value.petWeight);
            let size = '';
            if(weight > 0 && weight <= 6){
                size = '소형';
            }else if(weight > 6 && weight <= 15){
                size='중형';
            }else{
                size='대형';
            }
            refinedPetList.push({id : value.petNo, name : value.petName, detail : value.petKind, size : size, petFileName : value.petFileName})
        });
        this.setState({data : refinedPetList});
    }
    //펫시터를 이용가능한 반려동물 목록을 불러오는 메소드
    _getPetList = async(availablePetKind) => {        
        const userNo = await AsyncStorage.getItem('userInfo');
        const params = {
            userNo,
            availablePetKind
        }
        const petList = await fetch(`${ip}/pet/getAvaliablePetList.do`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
        .then((response) => response.json())
        .then((res => {
            if(res.length === 0){
                alert('펫시팅 조건에 부합하는 반려동물이 없습니다. 펫시팅 조건을 다시 확인해주세요.');
                this.props.navigation.pop(3);
            }
            return res;
        }))
        .catch((err) => {
            this.setState({activityIndicator : false});
        })

        return petList;
    }

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (id : String) => {
        this.setState((state)=>{
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id));
            this.props.callBackPetList(selected);
            return {selected};
        })
    };

    _renderItem = ({item}) => (
        <PetList
            id = {item.id}
            onPressItem = {this._onPressItem}
            selected = {!!this.state.selected.get(item.id)}
            name = {item.name}
            detail = {item.detail}
            size = {item.size}
            petFileName = {item.petFileName}
        />
    );

    render(){
        return(
            <View>
                <FlatList
                    data={this.state.data}
                    extraData={this.state} 
                    renderItem={this._renderItem} 
                    keyExtractor={this._keyExtractor}
                />
            </View>
        );
    };
};

class PetList extends Component{
    constructor(props){
        super(props);
    };
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };
    
    render(){
        const backColor = this.props.selected ? Colors.lightGrey : Colors.white;
        return(
            <TouchableOpacity onPress={this._onPress}>
                <PetProfile id={this.props.id} name={this.props.name} detail={this.props.detail} size={this.props.size} backColor={backColor} petFileName={this.props.petFileName}/>
            </TouchableOpacity>
        )
    };
};

class PetProfile extends Component {
    render(){
        const petFileSource = this.props.petFileName ? {uri : `${ip}/petImageFile/${this.props.petFileName}`} : require("../../../img/user.png")
        return(
            <View style={{
                    flex:1,
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    height : 130,
                    marginBottom : 5,
                    backgroundColor : this.props.backColor
            }}>
                <View style={{alignItems : 'center', justifyContent: 'center'}}>
                        <Image source={petFileSource} style={{width : 80, height : 80, margin : 18}}/>
                </View>
                <View style={{justifyContent: 'center', marginLeft : 15}}>
                    <View>
                        <Text style={{fontSize : 20, fontWeight : 'bold'}}>{this.props.name}</Text>
                    </View>
                    <View style={{flexDirection: 'column', marginTop : 5}}>
                        <View style={{alignItems : 'center', flexDirection: 'row'}}>
                            <View style={styles.blueCircle}/>
                            <Text>{this.props.detail}</Text>
                        </View>
                        <View style={{alignItems : 'center', flexDirection: 'row'}}>
                            <View style={styles.blueCircle}/>
                            <Text>{this.props.size}</Text>
                        </View>
                    </View>
                </View>            
            </View>
        )
    };
};

class BottomRequest extends Component{
    constructor(props) {
        super(props);
        
    };

    _onSubmit = () =>{
        const arr = this.props.data.selected._mapData;
        let count = 0;
        if(arr.length==0){
            alert('맡기실 반려동물을 선택해주세요.');
            return false;
        }else{
            for(let i=0; i<arr.length;i++){
                if(arr[i][1]==true){
                    count++;
                }
            }
            if(count>0){
                let params = {
                    data:this.props.data, 
                    pDTO : this.props.pDTO
                }
                if(this.props.isDayCare){
                    params.isDayCare = this.props.isDayCare;
                    params.checkin = this.props.checkin;
                    params.checkout = this.props.checkout
                }
                params.petsitterUserImage = this.props.petsitterUserImage;
                this.props.navigation.navigate('BookingConfirm',params);
                return true;
            }else{
                alert('맡기실 반려동물을 선택해주세요.');
                return false;
                
            }
        }
    };

    render(){
        return(
            <View style={styles.bottomRequest}>
                <TouchableOpacity style={styles.bottomButton} onPress={()=>this._onSubmit()}>
                    <Text style={styles.bottomText}>다음</Text>
                </TouchableOpacity>
            </View>
        )
    };
};


const styles = StyleSheet.create({
    safeAreaViewStyle : {
        flex: 1,
        backgroundColor : Colors.white,
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
        marginBottom : 5,
    },
    priceBar: {
        flex:1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        height : 130,
        backgroundColor : Colors.white,
        marginBottom : 1,
    },
    priceBar2 : {
        flex:1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        height : 160,
        backgroundColor : Colors.white,
        marginBottom : 5,
    },
    priceText : {
        fontSize : 16
    },
    EnvBar : {
        flex:1,
        flexDirection: 'row',
        justifyContent : 'space-around',
        paddingHorizontal: 10,
        paddingVertical: 5,
        height : 60,
        backgroundColor : Colors.white,
        marginBottom : 1,
    },
    impossibleBar : {
        flex:1,
        flexDirection: 'row',
        justifyContent : 'space-around',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor : Colors.white,
        marginBottom : 20,
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
    redCircle:{
        height: 10,
        width: 10,
        backgroundColor: Colors.red,
        borderRadius: 50,
        marginRight : 10
    }

});