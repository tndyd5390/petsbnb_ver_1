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

export default class MyBookingList extends Component{
    constructor(props){
        super(props);
        this.state = {
            booking : true
        }
    };

    render(){
        return(
            <SafeAreaView style={styles.safeAreaViewStyle}>
                <ScrollView>
                    {this.state.booking ? <BookingY navigation={this.props.navigation}/> : <BookingN/>}
                </ScrollView>
            </SafeAreaView>
        );
    };
};

class BookingN extends Component {
    constructor(props){
        super(props);
    };
    render(){
        return(
            <View style={{flexDirection :'column', justifyContent :'center', alignItems:'center',height:(Dimensions.get('window').height-100)}}>
                <View style={{flexDirection : 'row', justifyContent :'center', alignItems:'center'}}>
                    <Text style={{fontSize:17, fontWeight : 'bold'}}>
                        예약된 내역이 없습니다.
                    </Text>
                </View>
                <View style={{flexDirection : 'row', justifyContent :'center', alignItems:'center', marginTop:20}}>
                    <Text>
                        예약 후 이곳에서 예약내용을 확인할 수 있습니다.
                    </Text>
                </View>
            </View>
        );
    };
};

class BookingY extends Component {
    constructor(props){
        super(props);
        this.state = {
            data : [
                    {id : '1', sitter: '유혜진', date: '2018.12.06', status : '케어 진행'},
                    {id : '2', sitter: '김혜진', date: '2018-12-07', status : '승인 대기'},
                    {id : '3', sitter: '박혜진', date: '2018-12-08', status : '예약 반려'},
                    {id : '4', sitter: '이혜진', date: '2018-12-09', status : '예약 승인'},
                    {id : '5', sitter: '지혜진', date: '2018-12-10', status : '승인 대기'},
                    {id : '6', sitter: '조혜진', date: '2018-12-05', status : '케어 완료'},
                    ]
        }
    };
    _onPressItem = (item) => {
        this.props.navigation.navigate('MyBookingDetail', {data: item})
    };

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({item}) => (
        <BookingList
            id = {item.id}
            onPressItem = {this._onPressItem}
            sitter = {item.sitter}
            date = {item.date}
            status = {item.status}
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

class BookingList extends Component{
    constructor(props){
        super(props);
        this.state = {
            id : this.props.id,
            sitter : this.props.sitter,
            date : this.props.date,
            status : this.props.status
        }
    };

    _onPress = () => {
        this.props.onPressItem(this.state);
    };
    
    render(){
        return(
            <TouchableOpacity onPress={this._onPress}>
                <BookingProfile id={this.props.id} sitter={this.props.sitter} date={this.props.date} status={this.props.status}/>
            </TouchableOpacity>
        );
    };
};

class BookingProfile extends Component {
    constructor(props){
        super(props);
    };
    
    render(){
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
        const statusColor = _statusColor(this.props.status);
        return(
            <View style={{
                flex:1,
                flexDirection: 'row',
                paddingHorizontal: 10,
                paddingVertical: 5,
                height : 130,
                marginBottom : 5,
            }}>
                <View style={{alignItems : 'center', justifyContent: 'center'}}>
                        <Image source={require("../../../img/user.png")} style={{width : 80, height : 80, margin : 18}}/>
                </View>
                <View style={{flex:1,justifyContent: 'center', marginLeft : 15}}>
                    <View>
                        <Text style={{fontSize : 20, fontWeight : 'bold'}}>반려견 예약</Text>
                    </View>
                    <View style={{alignItems : 'center', flexDirection: 'row', justifyContent : 'space-between', marginTop : 10}}>
                        <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize : 15, fontWeight :'bold'}}>{this.props.sitter}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize : 15, color : Colors.grey}}>{this.props.date}</Text>
                        </View>
                        <View style={{flexDirection: 'row',marginRight:15}}>
                        <Text style={{fontSize : 15, color : statusColor}}>{this.props.status}</Text>
                        </View>
                    </View>
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