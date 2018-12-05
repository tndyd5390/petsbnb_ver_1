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
            booking : false
        }
    };

    render(){
        return(
            <SafeAreaView style={styles.safeAreaViewStyle}>
                <ScrollView>
                    {this.state.booking ? null : <BookingN/>}
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