import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    FlatList,
    Image,
    ActivityIndicator
} from "react-native";
import Colors from "../../utils/Colors";
import { ip } from "../../utils/const";
const {width, height} = Dimensions.get("window");

export default class PetSitterReservationList extends Component{
    constructor(props){
        super(props);
        const reservationList = this.props.navigation.getParam("reservationList");
        this.state={
            reservationList,
            activityIndicator: false
        }
    }
    _setActivitiIndicator = (flag) => {
        this.setState({
            activityIndicator: flag
        })
    }
    render() {
        return (
            <SafeAreaView style={styles.safeAreaViewStyle}>
                {this.state.activityIndicator ? (
                    <View style={{backgroundColor : 'rgba(0,0,0,0.2)', width : width, height : height, position : 'absolute', zIndex : 10, alignItems : 'center', justifyContent : 'center'}}>
                        <ActivityIndicator size="large" color="#10b5f1"/>
                    </View>
                ) : (null)}
                <ScrollView>
                    {
                        this.state.reservationList.length === 0
                        ?
                        (
                            <ReservationN/>
                        )
                        :
                        (
                            <ReservationY navigation={this.props.navigation} reservationList={this.state.reservationList} setActivitiIndicator={this._setActivitiIndicator}/>
                        )
                    }
                </ScrollView>
            </SafeAreaView>
        )
    }
}

class ReservationY extends Component{
    constructor(props){
        super(props);
    }
    _onPressItem = (id) => {
        this.props.setActivitiIndicator(true);
        const params ={
            reservationNo: id + ""
        }
        fetch(ip + "/petSitter/petSitterReservationDetail.do", {
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
                this.props.navigation.navigate("PetSitterReservationDetail", {
                    reservationDetail: res.reservationDetail,
                    reservationPetDetail : res.reservationPetDetail
                })
            } else {
                alert("네트워크 오류입니다.");
            }
            this.props.setActivitiIndicator(false);
        })
        .catch(err => {
            alert("네트워크 오류입니다");
        })
        this.props.setActivitiIndicator(false);
    }
    _keyExtractor = (item, index) => item.id + "";

    _renderItem = ({item}) => {
        return(
            <ReservationList
                id={item.id}
                petFileName={item.petFileName}
                reservationName={item.reservationName}
                stDate={item.stDate}
                status={item.status}
                userName={item.userName}
                onPressItem={this._onPressItem}
            />
        );
    }

    render(){
        return(
            <View>
                <FlatList
                    data={this.props.reservationList}
                    extraData={this.state}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                />
            </View>
        );
    }
}

class ReservationList extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            petFileName: this.props.petFileName,
            reservationName: this.props.reservationName,
            userName: this.props.userName,
            stDate: this.props.stDate,
            status: this.props.status
        }
    }

    _onPress = () => {
        this.props.onPressItem(this.state.id);
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
    render() {
        const statusColor = this._statusColor(this.props.status);
        const petFileSource = this.props.petFileName ? {uri : ip + `/petImageFile/${this.props.petFileName}`} : require("../../../img/user.png")
        return(
            <TouchableOpacity
                onPress={this._onPress}
            >
                <View style={{
                    flex:1,
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    height : 130,
                    marginBottom : 5,
                }}>
                    <View style={{alignItems : 'center', justifyContent: 'center'}}>
                            <Image source={petFileSource} style={{width : 60, height : 60, margin : 18}}/>
                    </View>
                    <View style={{flex:1,justifyContent: 'center', marginLeft : 15}}>
                        <View>
                            <Text style={{fontSize : 20, fontWeight : 'bold'}}>{this.state.reservationName}</Text>
                        </View>
                        <View style={{alignItems : 'center', flexDirection: 'row', justifyContent : 'space-between', marginTop : 10}}>
                            <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize : 15, fontWeight :'bold'}}>{this.state.userName}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize : 15, color : Colors.grey}}>{this.state.stDate}</Text>
                            </View>
                            <View style={{flexDirection: 'row',marginRight:15}}>
                            <Text style={{fontSize : 15, color : statusColor}}>{this.state.status}</Text>
                            </View>
                        </View>
                    </View>            
                </View>
            </TouchableOpacity>
        );
    }
}
class ReservationN extends Component{
    render() {
        return(
            <View style={{flexDirection :'column', justifyContent :'center', alignItems:'center',height: height - 100}}>
                <View style={{flexDirection : 'row', justifyContent :'center', alignItems:'center'}}>
                    <Text style={{fontSize:17, fontWeight : 'bold'}}>
                        요청된 펫시팅이 없습니다.
                    </Text>
                </View>
                <View style={{flexDirection : 'row', justifyContent :'center', alignItems:'center', marginTop:20}}>
                    <Text>
                        펫시팅이 요청되면 이곳에서 확인할 수 있습니다.
                    </Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    safeAreaViewStyle: {
        flex: 1,
        backgroundColor : Colors.white,
    }
})