import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Image,
    TouchableOpacity
} from "react-native";
import Colors from "../../utils/Colors";
import PetList from "../profile/PetList";
const { width, height } = Dimensions.get("window");

export default class PetSitterReservationDetail extends Component{
    constructor(props){
        super(props);
        const reservationDetail = this.props.navigation.getParam("reservationDetail");
        const reservationPetDetail = this.props.navigation.getParam("reservationPetDetail");
        this.state={
            reservationDetail,
            reservationPetDetail,
            activityIndicator: false
        }
    }

    _generateBottomButton = () => {
        if(this.state.reservationDetail.status === "승인 대기"){
            return(
                <View style={{alignItems: "center", width: "100%", bottom : 15}}>
                    <View style={{justifyContent: "space-between", width : "90%", flexDirection: "row"}}>
                        <View style={{width: "45%"}}>
                            <RejectButton  
                                setActivityIndicator={this._setActivityIndicator} 
                                setReservationDetail={this._setReservationDetail}
                                reservationNo={this.state.reservationDetail.reservationInfoNo}
                            />
                        </View>
                        <View style={{width: "45%"}}>
                            <ApprovalButton  
                                setActivityIndicator={this._setActivityIndicator} 
                                setReservationDetail={this._setReservationDetail}
                                reservationNo={this.state.reservationDetail.reservationInfoNo}
                            />
                        </View>
                    </View>
                </View>
            )
        } else if(this.state.reservationDetail.status === "승인 완료"){
            return (
                <ProgressButton  
                    setActivityIndicator={this._setActivityIndicator} 
                    setReservationDetail={this._setReservationDetail}
                    reservationNo={this.state.reservationDetail.reservationInfoNo}
                />
            );
        } else if(this.state.reservationDetail.status === "예약 반려" ||
            this.state.reservationDetail.status === "예약 취소" ||
            this.state.reservationDetail.status === "펫시팅 완료"
        ){
            return(null);
        } else if (this.state.reservationDetail.status === "펫시팅 진행"){
            return(
                <CompleteButton  
                    setActivityIndicator={this._setActivityIndicator} 
                    setReservationDetail={this._setReservationDetail}
                    reservationNo={this.state.reservationDetail.reservationInfoNo}
                />
            )
        }
    }

    _setActivityIndicator = (flag) => {
        this.setState({
            activityIndicator: flag
        })
    }

    _setReservationDetail =(reservationDetail) => {
        this.setState({
            reservationDetail: reservationDetail
        })
    }

    render() {
        return(
            <SafeAreaView style={styles.safeAreaViewStyle}>
                {this.state.activityIndicator ? (
                    <View style={{backgroundColor : 'rgba(0,0,0,0.2)', width : width, height : height, position : 'absolute', zIndex : 10, alignItems : 'center', justifyContent : 'center'}}>
                        <ActivityIndicator size="large" color="#10b5f1"/>
                    </View>
                ) : (null)}
                <ScrollView>
                    <ReservationPetList reservationPetDetail={this.state.reservationPetDetail}/>
                    <ReservationDetail reservationDetail={this.state.reservationDetail}/>
                </ScrollView>
                    {this._generateBottomButton()}
            </SafeAreaView>
        );
    };
}

class ReservationPetList extends Component {
    constructor(props){
        super(props);
        this.state = {
            petList: this.props.reservationPetDetail
        }
    }

    _generatePetGender = (petGender) => {
        if(petGender === "male"){
            return "수컷";
        } else{
            return "암컷";
        }
    }

    _goPetDetail =(petNo) => {
        console.log(petNo);
    }

    _generatePetList = () => {
        let viewElement = [];
        const petList = this.state.petList;
        petList.forEach((petDetail, index) => {
            const fileSource = petDetail.petFileName ? {uri: `http://192.168.0.10:8080/petImageFile/${petDetail.petFileName}`} : require("../../../img/user.png");
            viewElement.push(
                <TouchableOpacity
                    onPress={() => this._goPetDetail(petDetail.petNo)}
                    key={index}
                >
                    <View style={{
                        flex:1,
                        flexDirection: 'row',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        height : 80,
                        marginBottom : 5,
                    }}>
                        <View style={{alignItems : 'center', justifyContent: 'center'}}>
                                <Image source={fileSource} style={{width : 60, height : 60, margin : 18}}/>
                        </View>
                        <View style={{flex:1,justifyContent: 'center', marginLeft : 15}}>
                            <View>
                                <Text style={{fontSize : 20, fontWeight : 'bold'}}>{petDetail.petName}</Text>
                            </View>
                            <View style={{alignItems : 'center', flexDirection: 'row', justifyContent : 'space-between', marginTop : 10}}>
                                <View style={{flexDirection: 'row'}}>
                                <Text style={{fontSize : 15, fontWeight :'bold'}}>{petDetail.petKind}</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                <Text style={{fontSize : 15, color : Colors.grey}}>{this._generatePetGender(petDetail.petGender)}</Text>
                                </View>
                                <View style={{flexDirection: 'row',marginRight:15}}>
                                <Text style={{fontSize : 15, color : Colors.grey}}>{`${petDetail.petAge}살`}</Text>
                                </View>
                            </View>
                        </View>            
                    </View>
                </TouchableOpacity>
            );
        })
        return viewElement;
    }

    render() {
        return(
            <View>
                {this._generatePetList()}
            </View>
        );
    }
}

class ReservationDetail extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const reservationDetail = this.props.reservationDetail;
        return(
            <View>
                <View style={styles.dateBar}>
                    <View style={{alignItems :'center', justifyContent : 'center', width:'30%'}}>
                        <Text style={{fontSize : 17}}>예약일</Text>
                    </View> 
                    <View style={{alignItems :'center', justifyContent : 'center',width:'70%'}}>
                        <Text style={{fontSize : 17}}>{reservationDetail.stDate}</Text>
                    </View> 
                </View>
                <View style={styles.dateBar}>
                    <View style={{alignItems :'center', justifyContent : 'center', width:'30%'}}>
                        <Text style={{fontSize : 17}}>체크인</Text>
                    </View> 
                    <View style={{alignItems :'center', justifyContent : 'center',width:'70%'}}>
                        <Text style={{fontSize : 15}}>{`${reservationDetail.stDate} ${reservationDetail.checkin}:00 부터`}</Text>
                    </View> 
                </View>
                <View style={styles.dateBar}>
                    <View style={{alignItems :'center', justifyContent : 'center', width:'30%'}}>
                        <Text style={{fontSize : 17}}>체크아웃</Text>
                    </View> 
                    <View style={{alignItems :'center', justifyContent : 'center',width:'70%'}}>
                        <Text style={{fontSize : 15}}>{`${reservationDetail.edDate}  ${reservationDetail.checkout}:00 까지`}</Text>
                    </View> 
                </View>
                <View style={styles.dateBar}>
                    <View style={{alignItems :'center', justifyContent : 'center', width:'30%'}}>
                        <Text style={{fontSize : 17}}>금액</Text>
                    </View> 
                    <View style={{alignItems :'center', justifyContent : 'center',width:'70%'}}>
                        <Text style={{fontSize : 15}}>{`${reservationDetail.amount}원`}</Text>
                    </View> 
                </View>
                <View style={styles.endBar}>
                <View style={{flex:1,flexDirection :'column', alignItems :'center'}}>
                    <View style={{flexDirection :'row',alignItems :'center', justifyContent : 'center', marginTop : 15}}>
                        <Text style={{fontSize : 25, fontWeight : 'bold', color : Colors.grey}}>{reservationDetail.status}</Text>
                    </View>
                </View>
                </View>
            </View>
        )
    }
}

class ApprovalButton extends Component {
    constructor(props){
        super(props);
    }

    _approvalReservation = () => {
        const params = {
            reservationNo: this.props.reservationNo + ""
        }
        this.props.setActivityIndicator(true);
        fetch("http://192.168.0.10:8080/petSitter/approvalReservation.do", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
        .then(response => response.json())
        .then(res => {
            if(res){
                this.props.setReservationDetail(res);
            }else {
                alert("네트워크 오류입니다.");    
            }
            this.props.setActivityIndicator(false);
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return(
            <View style={[styles.bottomRequest, {borderRadius: 10}]}>
                <TouchableOpacity style={styles.bottomButton} onPress={this._approvalReservation}>
                    <Text style={styles.bottomText}>승인</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

class RejectButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            reservationNo: this.props.reservationNo
        }
    }

    _rejectReservation = () => {
        const params = {
            reservationNo: this.state.reservationNo + ""
        }
        this.props.setActivityIndicator(true);
        fetch("http://192.168.0.10:8080/petSitter/rejectReservation.do", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
        .then(response => response.json())
        .then(res => {
            if(res){
                this.props.setReservationDetail(res);
            }else{
                alert("네트워크 에러");
            }
            this.props.setActivityIndicator(false);
        })
        .catch(err => {

        })
    }

    render() {
        return(
            <View style={[styles.bottomRequest, {borderRadius: 10, backgroundColor: "rgb(255,102,102)"}]}>
                <TouchableOpacity 
                    style={styles.bottomButton}
                    onPress={this._rejectReservation}
                >
                    <Text style={styles.bottomText}>반려</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class ProgressButton extends Component {
    constructor(props){
        super(props);
    }

    _progressReservation = () => {
        const params = {
            reservationNo: this.props.reservationNo + ""
        }
        this.props.setActivityIndicator(true);
        fetch("http://192.168.0.10:8080/petSitter/progressReservation.do", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
        .then(response => response.json())
        .then(res => {
            if(res) {
                this.props.setReservationDetail(res);
            }else{
                alert("네트워크 오류입니다.");
            }
            this.props.setActivityIndicator(false);
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return(
            <View style={styles.bottomRequest}>
                <TouchableOpacity style={styles.bottomButton} onPress={this._progressReservation}>
                    <Text style={styles.bottomText}>펫시팅 진행</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

class CompleteButton extends Component {
    constructor(props){
        super(props);
    }

    _completeReservation = () => {
        const params = {
            reservationNo: this.props.reservationNo + ""
        }
        this.props.setActivityIndicator(true);
        fetch("http://192.168.0.10:8080/petSitter/completeReservation.do", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
        .then(response => response.json())
        .then(res => {
            if(res) {
                this.props.setReservationDetail(res);
            }else{
                alert("네트워크 오류입니다.");
            }
            this.props.setActivityIndicator(false);
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return(
            <View style={styles.bottomRequest}>
                <TouchableOpacity style={styles.bottomButton} onPress={this._completeReservation}>
                    <Text style={styles.bottomText}>펫시팅 완료</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    safeAreaViewStyle : {
        flex: 1,
        backgroundColor : Colors.white,
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
    bottomButton : {
        alignItems: 'center',
        justifyContent: 'center',
        width : '100%',
        height : '100%'
    },
    bottomText : {
        fontSize : 20,
        color : Colors.white,
        fontWeight: "600"
    },
    bottomRequest : {
        justifyContent: 'center', 
        alignItems: 'center',
        bottom: 0,
        width:'100%',
        height : 60,
        backgroundColor : Colors.buttonSky,
        flexDirection : 'row'
    },
})