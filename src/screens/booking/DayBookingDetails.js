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
    ActivityIndicator,
    Picker
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Category from '../components/Explore/Category';
import Colors from '../../utils/Colors';
import ImageSlider from 'react-native-image-slider';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
const{width, height} = Dimensions.get('window');

export default class DayBookingDetails extends Component{
    constructor(props) {
        super(props);
        this.state = {
            checkin : -1,
            checkout : -1
        }
    }

    _onChangeBookingDate = (value, flag) => {
        if(flag === 'checkin'){
            this.setState({checkin : value});
        }else{
            this.setState({checkout : value});
        }
    }

    render(){
        return (
            <SafeAreaView style={styles.safeAreaViewStyle}>
                <ScrollView>
                    <Profile pDTO={this.props.navigation.getParam('pDTO')} userImage={this.props.navigation.getParam('userImage')}/>
                    <BookingDate 
                        date={this.props.navigation.getParam('date')} 
                        onChangeBookingDate={this._onChangeBookingDate} 
                        checkin={this.state.checkin} 
                        checkout={this.state.checkout}
                    />
                </ScrollView>
                <BottomRequest navigation={this.props.navigation} pDTO={this.props.navigation.getParam('pDTO')} checkin={this.state.checkin} checkout={this.state.checkout} />
            </SafeAreaView>
        );
    };
};
class Profile extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const userImageName = this.props.userImage.userFileName;
        return(
            <View style={styles.listBar}>
                <View style={{alignItems : 'center', justifyContent: 'center'}}>
                        <Image source={{uri:`http://192.168.0.10:8080/userImageFile/${userImageName}`}} style={{width : 80, height : 80, margin : 18}}/>
                </View>
                <View style={{justifyContent: 'center', marginLeft : 15}}>
                    <View>
                        <Text style={{fontSize : 20, fontWeight : 'bold'}}>{this.props.pDTO.petSitterName}</Text>
                    </View>
                    <View style={{flexDirection: 'column', marginTop : 5}}>
                        <View style={{alignItems : 'center', flexDirection: 'row'}}>
                            <View style={styles.blueCircle}/>
                            <Text>{this.props.pDTO.petSitterIntroduceOneLine}</Text>
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

class BookingDate extends Component {
    constructor(props) {
        super(props);
    }

    
    _renderCheckTime = (start = 0) => {
        let pickerArr = [];
        if(start === -1){
            start = 0;
        }
        pickerArr.push(<Picker.Item label={'선택'} value={-1} key={-1}/>);
        for(;start<24; start++){
            pickerArr.push(<Picker.Item label={start + '시'} value={start} key={start}/>)
        }
        return pickerArr;
    }

    _onChangeCheckin = (value) => {
        this.props.onChangeBookingDate(value, 'checkin');
    }

    _onChangeCheckout = (value) => {
        this.props.onChangeBookingDate(value, 'checkout');
    }



    render(){
        chgDateFormat = (date) =>{
            const stDate = new Date(date.stDate);
            const edDate = new Date(date.edDate);
            const diffDate = Math.abs(edDate.getTime() - stDate.getTime());
            const rslt = {'stDate': (stDate.getMonth()+1) + '월 ' +stDate.getDate() +'일', 'edDate' : (edDate.getMonth()+1) + '월 ' +edDate.getDate() +'일', 'diffDate' : Math.ceil(diffDate / (1000*3600*24))+''};
            return rslt                 
        };
        const rslt = chgDateFormat(this.props.date);
        return(
            <View>
                <View style={styles.dateBar}>
                    <View style={{alignItems :'center', justifyContent : 'center', width:'30%'}}>
                        <Text style={{fontSize : 17}}>예약일</Text>
                    </View> 
                    <View style={{alignItems :'center', justifyContent : 'center',width:'70%'}}>
                        <Text style={{fontSize : 17}}>{rslt.stDate}</Text>
                    </View> 
                </View>
                <View style={styles.dateBar}>
                    <View style={{alignItems :'center', justifyContent : 'center', width:'30%'}}>
                        <Text style={{fontSize : 17}}>체크인</Text>
                    </View> 
                    <View style={{alignItems :'center', justifyContent : 'center',width:'70%', flexDirection : 'row'}}>
                        <View style={{width : '40%', borderWidth : 1, borderRadius : 10, borderColor : Colors.lightGrey, marginLeft : 10}}>
                            <Picker
                                selectedValue={this.props.checkin}
                                onValueChange={(itemValue, itemIndex) => {this._onChangeCheckin(itemValue)}}
                                style={{width : '100%', height : '100%'}}
                            >
                                {this._renderCheckTime()}
                            </Picker>
                        </View>
                        <Text style={{fontSize : 15, width : '20%', marginLeft : 3}}>부터</Text>
                    </View> 
                </View>
                <View style={styles.dateBar}>
                    <View style={{alignItems :'center', justifyContent : 'center', width:'30%'}}>
                        <Text style={{fontSize : 17}}>체크아웃</Text>
                    </View> 
                    <View style={{alignItems :'center', justifyContent : 'center',width:'70%', flexDirection : 'row'}}>
                        <View style={{width : '40%', borderWidth : 1, borderRadius : 10, borderColor : Colors.lightGrey, marginLeft : 10}}>
                            <Picker
                                selectedValue={this.props.checkout}
                                onValueChange={(itemValue, itemIndex) => {this._onChangeCheckout(itemValue)}}
                                style={{width : '100%', height : '100%'}}
                            >
                                {this._renderCheckTime(this.props.checkin + 1)}
                            </Picker>
                        </View>
                        <Text style={{fontSize : 15, width : '20%', marginLeft : 3}}>까지</Text>
                    </View>
                </View>
                <View style={styles.endBar}>
                <View style={{flex:1,flexDirection :'column', alignItems :'center'}}>
                    <View style={{flexDirection :'row',alignItems :'center', justifyContent : 'center', marginTop : 15}}>
                        <Text style={{fontSize : 15, fontWeight : 'bold'}}>체크아웃 시간 초과시, 추가 비용 부과</Text>
                    </View> 
                    <View style={{flexDirection :'row',alignItems :'center', justifyContent : 'center'}}>
                        <Text style={{fontSize : 13, color : Colors.red}}>1시간 당 추가비용 = 해당 펫시터 데이케어 비용의 10%</Text>
                    </View> 
                </View>
                </View>
            </View>
        );
    };
};

BookingDate.propTypes = {
    onChangeBookingDate : PropTypes.func.isRequired
}

class BottomRequest extends Component{
    constructor(props) {
        super(props);
    }

    _gotoBookingPetList = () => {
        if(this.props.checkin === -1){
            alert('체크인 시간을 설정해주세요.');
            return;
        }else if(this.props.checkout === -1) {
            alert('체크아웃 시간을 설정해주세요.');
            return;
        }else{
            this.props.navigation.navigate('BookingPetList', {date : this.props.navigation.getParam('date'), pDTO : this.props.pDTO, checkin : this.props.checkin, checkout : this.props.checkout, isDayCare : true})
        }
    }

    render(){
        return(
            <View style={styles.bottomRequest}>
                <TouchableOpacity style={styles.bottomButton} onPress={this._gotoBookingPetList}>
                    <Text style={styles.bottomText}>다음</Text>
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
    },
    endBar: {
        flex:1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor : Colors.white,
        height : (Dimensions.get('window').height - 450)
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

});