import React, { Component } from 'react';
import { 
    View, 
    Image, 
    Text, 
    StyleSheet,
    ScrollView, 
    Textarea,
    Dimensions, 
    SafeAreaView, 
    TextInput, 
    TouchableOpacity,
    Platform,
    ActivityIndicator
} from 'react-native';
import Colors from '../../utils/Colors';
import RNFetchBlob from 'react-native-fetch-blob';
import { ip } from "../../utils/const";

const{width, height} = Dimensions.get('window');

export default class TimelineWrite extends Component {
    constructor(props){
        super(props)
        const data = this.props.navigation.getParam("data");
        this.state = {
            reservationNo : data.reservationNo,
            userNo: data.userNo,
            imageSource: data.imageSource,
            extension : data.extension,
            fileName : data.fileName,
            imageData: data.imageData,
            timelineText : '',
            activityIndicator: false
        }
    };

    _uploadTimeline = async () => {
        if(this.state.timelineText == ""){
            alert("내용을 작성해 주세요.");
            return;
        } else {
            const arr = [];
            arr.push({name: "reservationNo", data: this.state.reservationNo.toString()});
            arr.push({name: "userNo", data: this.state.userNo})
            arr.push({
                name: "timelineFile",
                filename: this.state.fileName + "." + this.state.extension,
                type: "image/" + this.state.extension,
                data: this.state.imageData
            });
            arr.push({name: "content", data: this.state.timelineText});
            this.setState({
                activityIndicator: true
            });
            
            await RNFetchBlob.fetch("POST", `${ip}/timeline/uploadTimeline.do`, {
                Authorization : "Bearer access-token",
                'Content-Type' : 'multipart/form-data',
            }, arr)
            .then((resp) => resp.json())
            .then((res) => {
                this.setState({
                    activityIndicator: false
                });
                if(res.result == true){
                    alert("타임라인 업로드 성공");
                } else {
                    alert("타임라인 업로드 실패");
                }
                this.props.navigation.goBack();
            })
        }
    }
    
    render(){
        const imageSource = this.state.imageSource;
        return(
           <SafeAreaView>
               {this.state.activityIndicator ? (
                    <View style={{backgroundColor : 'rgba(0,0,0,0.2)', width : width, height : height, position : 'absolute', zIndex : 10, alignItems : 'center', justifyContent : 'center'}}>
                        <ActivityIndicator size="large" color="#10b5f1"/>
                    </View>
                ) : (null)}
               <View style={{width: '100%', height : '100%', backgroundColor: Colors.white}}>
                    <View style={{width : width, height : 200, backgroundColor : Colors.white, borderBottomWidth : 1, borderBottomColor : Colors.buttonBorderGrey}}>
                        <View style={{ alignItems : 'center', justifyContent : 'center'}}>
                        <Image source={{uri : imageSource}} style={{width : '100%', height : '100%'}}/>
                        </View>
                    </View>
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <View style={{width: '95%', marginTop: 15}}>
                            <TextInput 
                                style={{
                                    backgroundColor : Colors.white, 
                                    height : 80, borderWidth : 1, 
                                    borderColor : '#BDBDBD',
                                    borderRadius: 10, 
                                    paddingLeft : 10, 
                                    paddingTop : 10, 
                                    paddingBottom : 0, 
                                    paddingRight : 0, 
                                    fontSize : 15
                                }} 
                                textAlignVertical="top"
                                placeholder=""
                                onChangeText={(text) => {
                                    this.setState({timelineText : text})
                                }}
                            />
                        </View>
                    </View>
                    <View style={{position: 'absolute', left: 0, right: 0, bottom: 10, alignItems: 'center'}}>
                        <TouchableOpacity 
                            style={{
                                width: "95%", 
                                height: 50, 
                                backgroundColor: Colors.buttonSky, 
                                justifyContent: 'center', 
                                alignItems: 'center'
                            }}
                            onPress={() => {this._uploadTimeline()}}
                        >
                            <Text style={{color : Colors.white, fontSize : 20, fontWeight : '700'}}>타임라인 등록</Text>
                        </TouchableOpacity>
                    </View>
                </View>
           </SafeAreaView>
        );
    };
}

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
        marginTop:15,
        height : 30,
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
    },
    textAreaContainer1: {
        flex: 1,
        margin : 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor : Colors.lightGrey,
        borderWidth : 1
    },
    textAreaContainer2: {
        height: 220,
        padding: 5,
        backgroundColor: '#F5FCFF',
      },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 210,
        fontSize: 14,
        color: '#333',
    },
});