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
    FlatList,
    Alert,
    Modal,
    ActivityIndicator
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../utils/Colors';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';
import {List, ListItem} from 'react-native-elements';

const{width, height} = Dimensions.get("window");

export default class MyBookingDetail extends Component {
    constructor(props){
        super(props);
        const id = this.props.navigation.getParam('id');
        this.state = {
            id,
            activityIndicator: true
        };
    };

    componentDidMount() {
        this._getReservationDetail(this.state.id);
    }

    _getReservationDetail = async(id) => {
        const params = {
            id
        }
        const reservationDetail = await fetch("http://192.168.0.8:8091/reservation/getReservationDetail.do", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
        .then(response => response.json())
        .then(res => {
            console.log(res);
            return res;
        })
        .catch(err => {

        })
        this.setState({
            activityIndicator: false,
            petsitterFileName: reservationDetail.fileName,
            checkin: reservationDetail.checkin,
            checkout: reservationDetail.checkout,
            petsitterName: reservationDetail.petsitterName,
            stDate: reservationDetail.stDate,
            edDate: reservationDetail.edDate,
            status: reservationDetail.status,
            petsitterIntroOne: reservationDetail.petsitterIntroOne,
            petsitterNo : reservationDetail.petsitterNo
        })
    }

    _setStateFromButton = (reservationDetail) => {
        this.setState({
            activityIndicator: false,
            petsitterFileName: reservationDetail.fileName,
            checkin: reservationDetail.checkin,
            checkout: reservationDetail.checkout,
            petsitterName: reservationDetail.petsitterName,
            stDate: reservationDetail.stDate,
            edDate: reservationDetail.edDate,
            status: reservationDetail.status,
            petsitterIntroOne: reservationDetail.petsitterIntroOne,
            petsitterNo : reservationDetail.petsitterNo
        })
    }

    _setActivityIndicator = (act) => {
        this.setState({
            activityIndicator: act
        });
    }

    render(){
        return(
            <SafeAreaView style={styles.safeAreaViewStyle}>
                {this.state.activityIndicator ? (
                    <View style={{backgroundColor : 'rgba(0,0,0,0.2)', width : width, height : height, position : 'absolute', zIndex : 10, alignItems : 'center', justifyContent : 'center'}}>
                        <ActivityIndicator size="large" color="#10b5f1"/>
                    </View>
                ) : (null)}
                <ScrollView>
                    <Profile 
                        petsitterFileName={this.state.petsitterFileName} 
                        petsitterName={this.state.petsitterName} 
                        petsitterIntroOne={this.state.petsitterIntroOne}
                    />
                    <BookingDate 
                        stDate={this.state.stDate}
                        edDate={this.state.edDate} 
                        checkin={this.state.checkin} 
                        checkout={this.state.checkout} 
                        status={this.state.status}
                    />
                </ScrollView>
                {this.state.status == '예약 반려' 
                ? 
                null 
                : 
                this.state.status == '케어 완료' 
                ? 
                <CompleteBottomRequest 
                    navigation={this.props.navigation} 
                    review={this.state.review}
                    petsitterNo={this.state.petsitterNo}
                    reservationNo={this.state.id}
                /> 
                : 
                <BottomRequest 
                    navigation={this.props.navigation} 
                    status={this.state.status}
                    id={this.state.id}
                    setStateFromButton={this._setStateFromButton}
                    setActivityIndicator={this._setActivityIndicator}
                />}
            </SafeAreaView>
        );
    };
};
class Profile extends Component {
    render(){
        const fileSource = this.props.petsitterFileName ? {uri : `http://192.168.0.8:8091/userImageFile/${this.props.petsitterFileName}`} : require("../../../img/user.png")
        return(
            <View style={styles.listBar}>
                <View style={{alignItems : 'center', justifyContent: 'center'}}>
                        <Image source={fileSource} style={{width : 80, height : 80, margin : 18}}/>
                </View>
                <View style={{justifyContent: 'center', marginLeft : 15}}>
                    <View>
                        <Text style={{fontSize : 20, fontWeight : 'bold'}}>{this.props.petsitterName}</Text>
                    </View>
                    <View style={{flexDirection: 'column', marginTop : 5}}>
                        <View style={{alignItems : 'center', flexDirection: 'row'}}>
                            <View style={styles.blueCircle}/>
                            <Text>{this.props.petsitterIntroOne}</Text>
                        </View>
                    </View>
                </View>            
            </View>
        )
    };
};

class BookingDate extends Component {
    constructor(props) {
        super(props);
    }
    _statusColor = (status) => {
        let color;
        if(status == '케어 진행'){
            color = Colors.buttonSky;
        }else if(status == '예약 반려'){
            color = Colors.red;
        }else if(status == '예약 승인'){
            color = Colors.chatGreen;
        }else if(status == '케어 완료'){
            color = Colors.black;
        }else{
            color = Colors.grey;
        }
        return color;
    };

    _generateTime = (h) => {
        if(Number(h) < 10){
            return "0" + h;
        }else{
            return h + "";
        }
    }

    render(){
        const statusColor = _statusColor(this.props.status);
        const checkin = this._generateTime(this.props.checkin);
        const checkout = this._generateTime(this.props.checkout);
        return(
            <View>
                <View style={styles.dateBar}>
                    <View style={{alignItems :'center', justifyContent : 'center', width:'30%'}}>
                        <Text style={{fontSize : 17}}>예약일</Text>
                    </View> 
                    <View style={{alignItems :'center', justifyContent : 'center',width:'70%'}}>
                        <Text style={{fontSize : 17}}>{this.props.stDate}</Text>
                    </View> 
                </View>
                <View style={styles.dateBar}>
                    <View style={{alignItems :'center', justifyContent : 'center', width:'30%'}}>
                        <Text style={{fontSize : 17}}>체크인</Text>
                    </View> 
                    <View style={{alignItems :'center', justifyContent : 'center',width:'70%'}}>
                        <Text style={{fontSize : 15}}>{`${this.props.stDate} ${checkin}:00 부터`}</Text>
                    </View> 
                </View>
                <View style={styles.dateBar}>
                    <View style={{alignItems :'center', justifyContent : 'center', width:'30%'}}>
                        <Text style={{fontSize : 17}}>체크아웃</Text>
                    </View> 
                    <View style={{alignItems :'center', justifyContent : 'center',width:'70%'}}>
                        <Text style={{fontSize : 15}}>{`${this.props.edDate}  ${checkout}:00 까지`}</Text>
                    </View> 
                </View>
                <View style={styles.endBar}>
                <View style={{flex:1,flexDirection :'column', alignItems :'center'}}>
                    <View style={{flexDirection :'row',alignItems :'center', justifyContent : 'center', marginTop : 15}}>
                        <Text style={{fontSize : 25, fontWeight : 'bold', color : statusColor}}>{this.props.status}</Text>
                    </View> 
                    {/* <View style={{flexDirection :'row',alignItems :'center', justifyContent : 'center', marginTop : 20}}>
                        <Text style={{fontSize : 15, fontWeight : 'bold'}}>24시간 기준 체크아웃 시간 초과시, 추가 비용 부과</Text>
                    </View> 
                    <View style={{flexDirection :'row',alignItems :'center', justifyContent : 'center'}}>
                        <Text style={{fontSize : 13, color : Colors.red}}>1시간 당 추가비용 = 해당 펫시터 데이케어 비용의 10%</Text>
                    </View>  */}
                </View>
                </View>
            </View>
        );
    };
};

class BottomRequest extends Component{
    constructor(props) {
        super(props);
        this.state={
            id: this.props.id,
            modalVisible: false,
            reason: ""
        }
    }
    
    _statusText = (status) =>{
        let text = '';
        if(status=='승인 대기' || status=='예약 승인'){
            text = '예약 취소';
        }else{
            text = '타임 라인';
        }
        return text;
    };
    
    _onSubmit = (status) => {
        
        if(status=='승인 대기' || status=='예약 승인'){
            text = '예약 취소';
            this.setState({
                modalVisible: true
            })
        }else{
            text = '타임 라인';
            this.props.navigation.navigate('Timeline');
        }
    };

    _cancelReservation = async() => {
        if(this.state.reason === ""){
            alert("취소 사유를 입력해주세요.");
            return;
        }
        this.props.setActivityIndicator(true);
        this._closeModal();
        const params = {
            reservationNo: this.state.id,
            reason: this.state.reason
        };

        const reservationDetail = await fetch("http://192.168.0.8:8091/reservation/cancelReservation.do", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
        .then(response => response.json())
        .then(res => {
            return res;
        })
        .catch(err => {

        })
        this.props.setStateFromButton(reservationDetail);
        this.props.setActivityIndicator(false);
    }

    _closeModal = () => {
        this.setState({
            reason: "",
            modalVisible: false
        })
    }


    render(){
        const bottomTxt = this._statusText(this.props.status);
        return(
            <View>
                {
                    this.props.status !== "예약 취소" ?
                    (
                        <View style={styles.bottomRequest}>
                            <Modal
                                animationType="none"
                                transparent={true}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                    
                                }}
                            >
                                <View style={{width:width, height:height, alignItems:"center", backgroundColor:'rgba(0,0,0,0.5)'}}>
                                    <View 
                                        style={{
                                            width: "80%", 
                                            backgroundColor: Colors.buttonSky, 
                                            borderTopLeftRadius:10, 
                                            borderTopRightRadius:10, 
                                            height: 45,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginTop : 30
                                        }}
                                    >
                                        <Text
                                            style={{color: Colors.white, fontSize:18, fontWeight: "500"}}
                                        >취소 사유</Text>
                                    </View>
                                    <View
                                        style={{
                                            width: "80%",
                                            backgroundColor: Colors.white,
                                            height: 200,
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <TextInput
                                            style={{
                                                width: "90%",
                                                height: "80%",
                                                borderRadius: 5,
                                                borderColor: Colors.lightGrey,
                                                borderWidth : 2
                                            }}
                                            multiline={true}
                                            textAlignVertical="top"
                                            onChangeText={(value) => {this.setState({reason: value})}}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            width: "80%",
                                            height: 70,
                                            flexDirection: "row",
                                        }}
                                    >
                                        <View
                                            style={{
                                                width: "50%",
                                                backgroundColor: Colors.buttonSky,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderRightWidth: 1,
                                                borderRightColor: Colors.white
                                            }}
                                        >
                                            <TouchableOpacity
                                                style={{
                                                    width: "50%",
                                                    height: "50%",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}
                                                onPress={this._cancelReservation}
                                            >
                                                <Text 
                                                    style={{
                                                        color: Colors.white,
                                                        fontSize: 17,
                                                        fontWeight: "300"
                                                    }}
                                                >
                                                    예약 취소
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View
                                            style={{
                                                width: "50%",
                                                backgroundColor: Colors.buttonSky,
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderLeftColor: Colors.white,
                                                borderLeftWidth: 1
                                            }}
                                        >
                                            <TouchableOpacity
                                                style={{
                                                    width: "50%",
                                                    height: "50%",
                                                    alignItems: "center",
                                                    justifyContent: "center"
                                                }}
                                                onPress={this._closeModal}
                                            >
                                                <Text 
                                                    style={{
                                                        color: Colors.white,
                                                        fontSize: 17,
                                                        fontWeight: "300"
                                                    }}
                                                >
                                                    닫기
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => this.setState({modalVisible: false})}
                                    >
                                        <Text>닫기</Text>
                                    </TouchableOpacity>
                                </View>

                            </Modal>
                            <TouchableOpacity style={styles.bottomButton} onPress={()=>this._onSubmit(this.props.status)}>
                                <Text style={styles.bottomText}>{bottomTxt}</Text>
                            </TouchableOpacity>
                        </View>
                    ) 
                    : 
                    (
                        null
                    )
                }
            </View>
        )
    };
};

class CompleteBottomRequest extends Component{
    constructor(props){
        super(props);
        this.state = {
            review : this.props.review,
            petsitterNo : this.props.petsitterNo,
            reservationNo : this.props.reservationNo
        }
    };

    _goReviewWrite = (review) => {
        if(!review){
            this.props.navigation.navigate('BookingReviewWrite', {petsitterNo : this.state.petsitterNo, reservationNo : this.state.reservationNo});
            return true;
        }else{
            alert('이미 리뷰를 작성하셨습니다.');
            return false;
        };
    };

    render(){
        return(
            <View style={styles.bottomRequest}>
                <View style={{justifyContent : 'center', flex:1}}>
                <TouchableOpacity style={styles.bottomButton} onPress={()=>this._goReviewWrite(this.state.review)}>
                    <Text style={styles.bottomText}>리뷰 쓰기</Text>
                </TouchableOpacity>
                </View>
                <View style={{justifyContent : 'center', flex:1}}>
                <TouchableOpacity style={styles.bottomButton} onPress={()=>this.props.navigation.navigate('Timeline')}>
                    <Text style={styles.bottomText}>타임라인</Text>
                </TouchableOpacity>
                </View>
            </View>
        );
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
        height : (Dimensions.get('window').height - 520)
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
        backgroundColor : Colors.buttonSky,
        flexDirection : 'row'
    },
    bottomButton : {
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