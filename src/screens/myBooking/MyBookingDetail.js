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
import Colors from '../../utils/Colors';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';
import {List, ListItem} from 'react-native-elements';

export default class MyBookingDetail extends Component {
    constructor(props){
        super(props);
        const data = this.props.navigation.getParam('data');
        this.state = {
            id : data.id,
            sitter : data.sitter,
            date : data.date,
            status : data.status,
            review : false
        };
    };

    render(){
        return(
            <SafeAreaView style={styles.safeAreaViewStyle}>
                <ScrollView>
                    <Profile sitter={this.state.sitter}/>
                    <BookingDate date={this.state.date} status={this.state.status}/>
                </ScrollView>
                {this.state.status == '예약 반려' ? null : this.state.status == '케어 완료' ? <CompleteBottomRequest navigation={this.props.navigation} review={this.state.review}/> : <BottomRequest navigation={this.props.navigation} status={this.state.status}/>}
            </SafeAreaView>
        );
    };
};
class Profile extends Component {
    render(){
        return(
            <View style={styles.listBar}>
                <View style={{alignItems : 'center', justifyContent: 'center'}}>
                        <Image source={require("../../../img/user.png")} style={{width : 80, height : 80, margin : 18}}/>
                </View>
                <View style={{justifyContent: 'center', marginLeft : 15}}>
                    <View>
                        <Text style={{fontSize : 20, fontWeight : 'bold'}}>{this.props.sitter}</Text>
                    </View>
                    <View style={{flexDirection: 'column', marginTop : 5}}>
                        <View style={{alignItems : 'center', flexDirection: 'row'}}>
                            <View style={styles.blueCircle}/>
                            <Text>프로필1</Text>
                        </View>
                        <View style={{alignItems : 'center', flexDirection: 'row'}}>
                            <View style={styles.blueCircle}/>
                            <Text>프로필2</Text>
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

    render(){
        const statusColor = _statusColor(this.props.status);
        return(
            <View>
                <View style={styles.dateBar}>
                    <View style={{alignItems :'center', justifyContent : 'center', width:'30%'}}>
                        <Text style={{fontSize : 17}}>예약일</Text>
                    </View> 
                    <View style={{alignItems :'center', justifyContent : 'center',width:'70%'}}>
                        <Text style={{fontSize : 17}}>{this.props.date}</Text>
                    </View> 
                </View>
                <View style={styles.dateBar}>
                    <View style={{alignItems :'center', justifyContent : 'center', width:'30%'}}>
                        <Text style={{fontSize : 17}}>체크인</Text>
                    </View> 
                    <View style={{alignItems :'center', justifyContent : 'center',width:'70%'}}>
                        <Text style={{fontSize : 15}}>{this.props.date} 11:00 부터</Text>
                    </View> 
                </View>
                <View style={styles.dateBar}>
                    <View style={{alignItems :'center', justifyContent : 'center', width:'30%'}}>
                        <Text style={{fontSize : 17}}>체크아웃</Text>
                    </View> 
                    <View style={{alignItems :'center', justifyContent : 'center',width:'70%'}}>
                        <Text style={{fontSize : 15}}>{this.props.date}  09:00 까지</Text>
                    </View> 
                </View>
                <View style={styles.dateBar}>
                    <View style={{flexDirection :'row',alignItems :'center', justifyContent : 'center', width:'30%'}}>
                        <Text style={{fontSize : 17}}>초과시간</Text>
                        <IconFontAwesome name='question-circle' size={15} style={{marginLeft : 5}}/>
                    </View>
                    <View style={{alignItems :'center', justifyContent : 'center',width:'70%'}}>
                        <Text style={{fontSize : 15}}>체크아웃 0시간 초과</Text>
                    </View> 
                </View>
                <View style={styles.endBar}>
                <View style={{flex:1,flexDirection :'column', alignItems :'center'}}>
                    <View style={{flexDirection :'row',alignItems :'center', justifyContent : 'center', marginTop : 15}}>
                        <Text style={{fontSize : 25, fontWeight : 'bold', color : statusColor}}>{this.props.status}</Text>
                    </View> 
                    <View style={{flexDirection :'row',alignItems :'center', justifyContent : 'center', marginTop : 20}}>
                        <Text style={{fontSize : 15, fontWeight : 'bold'}}>24시간 기준 체크아웃 시간 초과시, 추가 비용 부과</Text>
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

class BottomRequest extends Component{
    constructor(props) {
        super(props);
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
            alert('예약 취소');
        }else{
            text = '타임 라인';
            this.props.navigation.navigate('Timeline');
        }
    };


    render(){
        const bottomTxt = this._statusText(this.props.status);
        return(
            <View style={styles.bottomRequest}>
                <TouchableOpacity style={styles.bottomButton} onPress={()=>this._onSubmit(this.props.status)}>
                    <Text style={styles.bottomText}>{bottomTxt}</Text>
                </TouchableOpacity>
            </View>
        )
    };
};

class CompleteBottomRequest extends Component{
    constructor(props){
        super(props);
        this.state = {
            review : this.props.review
        }
    };

    _goReviewWrite = (review) => {
        if(!review){
            this.props.navigation.navigate('BookingReviewWrite');
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