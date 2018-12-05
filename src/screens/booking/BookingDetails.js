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
    Modal
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Category from '../components/Explore/Category';
import Colors from '../../utils/Colors';
import ImageSlider from 'react-native-image-slider';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';


export default class BookingDetails extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <SafeAreaView style={styles.safeAreaViewStyle}>
                <ScrollView>
                    <Profile/>
                    <BookingDate date={this.props.navigation.getParam('date')}/>
                </ScrollView>
                <BottomRequest navigation={this.props.navigation}/>
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
                        <Text style={{fontSize : 20, fontWeight : 'bold'}}>유혜진</Text>
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
                        <Text style={{fontSize : 17}}>{rslt.stDate}  ~  {rslt.edDate}</Text>
                    </View> 
                </View>
                <View style={styles.dateBar}>
                    <View style={{alignItems :'center', justifyContent : 'center', width:'30%'}}>
                        <Text style={{fontSize : 17}}>체크인</Text>
                    </View> 
                    <View style={{alignItems :'center', justifyContent : 'center',width:'70%'}}>
                        <Text style={{fontSize : 15}}>{rslt.stDate} 11:00 부터</Text>
                    </View> 
                </View>
                <View style={styles.dateBar}>
                    <View style={{alignItems :'center', justifyContent : 'center', width:'30%'}}>
                        <Text style={{fontSize : 17}}>체크아웃</Text>
                    </View> 
                    <View style={{alignItems :'center', justifyContent : 'center',width:'70%'}}>
                        <Text style={{fontSize : 15}}>{rslt.edDate}  09:00 까지</Text>
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


    render(){
        return(
            <View style={styles.bottomRequest}>
                <TouchableOpacity style={styles.bottomButton} onPress={()=>this.props.navigation.navigate('BookingPetList', {date : this.props.navigation.getParam('date')})}>
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