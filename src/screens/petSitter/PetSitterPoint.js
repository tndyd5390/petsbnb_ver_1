import React, { Component } from "react";
import PropTypes from "prop-types";
import Colors from "../../utils/Colors";
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Modal,
    TextInput,
    AsyncStorage,
    ActivityIndicator
} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
const{ width, height } = Dimensions.get("window");

export default class PetSitterPoint extends Component{
    constructor(props){
        super(props);
        const {getPoint,totalPoint, refundPoint, userImage} = this.props.navigation.getParam("pointData");

        this.state={
            getPoint,
            totalPoint,
            refundPoint,
            userImage,
            modalVisiable: false,
            refundPointInput: "",
            activityIndicator: false
        }
    }
    //환급 요청 메소드
    _requestRefund = async() => {
        if(Number(this.state.refundPointInput) > this.state.totalPoint){
            alert("보유한 포인트보다 많은 급액을 환급 받으실 수 없습니다.");
            this.setState({
                refundPointInput: "",
                modalVisiable: false
            })
            return;
        }else if(Number(this.state.refundPointInput) === 0){
            alert("0보다 큰 수를 입력해 주세요");
            this.setState({
                refundPointInput: "",
                modalVisiable: false
            })
            return;
        }
        const userNo = await AsyncStorage.getItem("userInfo");
        const params = {
            userNo,
            refundPointInput: this.state.refundPointInput
        }
        const data = await fetch("http://192.168.0.10:8080/petSitter/requestRefund.do", {
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
        if(data){
            alert("환급요청이 완료되었습니다.");
        }
        this.setState({
            getPoint: data.getPoint,
            totalPoint: data.totalPoint,
            refundPoint: data.refundPoint,
            refundPointInput: "",
            modalVisiable: false
        });
    }
    //activityindicator 활성화 및 비활성화 메소드
    _toggleActivityIndicator = (flag) => {
        this.setState({
            activityIndicator: flag
        })
    }
    //숫자만 입력받는 메소드
    _onChangeCheckNumber = (text) => {
        let newText = '';
        let numbers = '0123456789';

        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
        }
        this.setState({
            refundPointInput: newText
        })
    }

    render() {
        const imageSource = this.state.userImage ? {uri: `http://192.168.0.10:8080/userImageFile/${this.state.userImage}`} : require("../../../img/user.png");
        return(
            <View style={{width: width, height: height, backgroundColor: Colors.white, flex: 1}}>
                {this.state.activityIndicator ? (
                    <View style={{backgroundColor : 'rgba(0,0,0,0.2)', width : width, height : height, position : 'absolute', zIndex : 10, alignItems : 'center', justifyContent : 'center'}}>
                        <ActivityIndicator size="large" color="#10b5f1"/>
                    </View>
                ) : (null)}
                {this.state.modalVisiable ? (
                    <View style={{backgroundColor : 'rgba(0,0,0,0.2)', width : width, height : height, position : 'absolute', zIndex : 10}}>
                        <View style={{width: width, alignItems: "center"}}>
                            <View style={{alignItems: "center", justifyContent: "center", width: "80%", height: 45, backgroundColor: Colors.buttonSky, marginTop: 100, borderTopRightRadius: 10, borderTopLeftRadius: 10}}>
                                <Text style={{color: Colors.white, fontSize: 20, fontWeight: "300"}}>환급 받기</Text>
                            </View>
                            <View style={{backgroundColor: Colors.white, width: "80%", height: 80, alignItems: "center", justifyContent: "center"}}>
                                <TextInput 
                                    style={{height: 40,width: "90%", borderColor: Colors.grey, borderWidth: 1}}
                                    onChangeText={this._onChangeCheckNumber}
                                    value={this.state.refundPointInput}
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={{width: "80%", flexDirection: "row", height: 50}}>
                                <TouchableOpacity 
                                    style={[styles.modalButton, {borderRightWidth: 2, borderRightColor: Colors.white}]}
                                    onPress={this._requestRefund}
                                >
                                    <View style={{}}>
                                        <Text style={{color: Colors.white, fontSize: 20, fontWeight: "300"}}>환급받기</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={[styles.modalButton, { borderLeftWidth: 2, borderLeftColor: Colors.white}]}
                                    onPress={()=> this.setState({
                                        refundPointInput: "",
                                        modalVisiable: false
                                    })}
                                >
                                    <View>
                                        <Text style={{color: Colors.white, fontSize: 20, fontWeight: "300"}}>닫기</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ) : (null)}
                <View style={{alignItems: "center", width: width}}>
                    <View style={{width: "95%", height: 120, flexDirection: "row"}}>
                        <View style={{width: "40%", alignItems: "center", justifyContent: "center"}}>
                            <Image
                                style={{width: 100, height: 100}}
                                source={imageSource}
                            />
                        </View>
                        <View style={{width: "60%"}}>
                            <View style={{ height: "60%", justifyContent: "center"}}>
                                <Text style={{fontSize: 20}}>박수용</Text>
                            </View>
                            <View style={{height: "40%", justifyContent: "center"}}>
                                <Text style={{fontSize: 18}}>{`보유한 포인트 : ${this.state.totalPoint}p`}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{width: width, alignItems: "center"}}>
                    <View style={{ width: "95%", height: 385}}>
                        <PointTabs getPoint={this.state.getPoint} refundPoint={this.state.refundPoint} toggleActivityIndicator={this._toggleActivityIndicator} navigation={this.props.navigation}/>
                    </View>
                </View>

                <View style={{alignItems: "center", width: width, position: "absolute", bottom: 10}}>
                    <View style={{width: "95%"}}>
                        <View style={[styles.bottomRequest, {borderRadius: 10}]}>
                            <TouchableOpacity style={styles.bottomButton} onPress={()=>this.setState({modalVisiable:true})}>
                                <Text style={styles.bottomText}>환급 받기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>  
            </View>
        )
    }
}

class PointTabs extends Component{ 
    constructor(props){
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'getPoint', title: '취득 내역'},
                { key: 'refundPoint', title: '환급 내역' },
            ],
        };
    }

    render() {
        const FirstRoute = () => {
            if(this.props.getPoint.length !== 0){
                return(
                    <GetPointFlatList getPoint={this.props.getPoint} toggleActivityIndicator={this.props.toggleActivityIndicator} navigation={this.props.navigation}/>
                );
            }else {
                return(
                    <View style={{alignItems: "center", justifyContent: "center", marginTop: 20}}>
                        <Text style={{fontSize: 17, fontWeight: "300"}}>포인트 획득 내역이 없습니다.</Text>
                    </View>
                )
            }
        }
        const SecondRoute = () => {
            if(this.props.refundPoint.length !== 0){
                return ( 
                    <RefundPointFlatList refundPoint={this.props.refundPoint}/>
                );
            }else{
                return(
                    <View style={{alignItems: "center", justifyContent: "center", marginTop: 20}}>
                        <Text style={{fontSize: 17, fontWeight: "300"}}>포인트 환급 내역이 없습니다.</Text>
                    </View>
                )
            }
        }
        return(
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    getPoint: FirstRoute,
                    refundPoint: SecondRoute,
                })}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width,height: Dimensions.get('window').height}}
            />
        );
    }
}

class GetPointFlatList extends Component {
    constructor(props){
        super(props);
    }

    _keyExtractor = (item, index) => index + "";
    //어느 펫시팅 예약에서 포인트를 얻었는지 볼 수 있는 메소드
    _getPointDetail = (pointInfoNo) => {
        const params = {
            pointInfoNo: pointInfoNo+ ""
        }
        this.props.toggleActivityIndicator(true);
        fetch("http://192.168.0.10:8080/petSitter/getPointDetail.do", {
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
                this.props.navigation.navigate("PointDetail", {
                    reservationDetail: res.reservationDetail,
                    reservationPetDetail : res.reservationPetDetail
                })
            } else {
                alert("네트워크 오류입니다.");
            }
            this.props.toggleActivityIndicator(false);
        })
        .catch(err => {

        })

    }

    _renderItem = ({item, index}) => {
        return(
            <View style={{borderBottomWidth: 1, borderBottomColor: Colors.grey}}>
                <TouchableOpacity
                    onPress={() => this._getPointDetail(item.pointInfoNo)}
                >
                    <View style={{height: 50, alignItems: "center", justifyContent: "center"}}>
                        <View style={{width: "70%", justifyContent: "space-between", flexDirection: "row"}}>
                            <View>
                                <Text style={{fontSize: 20}}>{item.getPointDate}</Text>
                            </View>
                            <View>
                                <Text style={{fontSize: 20}}>{item.getPoint}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return(
            <FlatList
                data={this.props.getPoint}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
            />
        )
    }
}

class RefundPointFlatList extends Component{
    constructor(props){
        super(props);
    }

    _keyExtractor = (item, index) => index + ""; 

    _renderItem = ({item, index}) => {
        return(
            <View style={{borderBottomWidth: 1, borderBottomColor: Colors.grey}}>
                <View style={{flexDirection: "row", justifyContent: "center", height: 50}}>
                    <View style={{width: "40%", alignItems: "center", justifyContent: "center"}}>
                        <Text style={{fontSize: 17}}>{item.refundPointDate}</Text>
                    </View>
                    <View style={{width: "30%", alignItems: "center", justifyContent: "center"}}>
                        <Text style={{fontSize: 17}}>{item.refundPoint}</Text>
                    </View>
                    <View style={{width: "30%", alignItems: "center", justifyContent: "center"}}>
                        <Text style={{fontSize: 17}}>{item.status}</Text>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return(
            <FlatList
                data={this.props.refundPoint}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
            />
        )
    }
}



const styles = StyleSheet.create({
    scene: {
      flex: 1,
    },
    bottomRequest : {
        justifyContent: 'center', 
        alignItems: 'center',
        width:'100%',
        height : 60,
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
        fontSize : 20,
        color : Colors.white,
        fontWeight: "600"
    },
    modalButton : {
        width: "50%", 
        height: "100%", 
        backgroundColor: Colors.buttonSky, 
        alignItems: "center", 
        justifyContent: "center",
    }
});