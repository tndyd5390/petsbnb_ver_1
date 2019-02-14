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
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Category from '../components/Explore/Category';
import Colors from '../../utils/Colors';
import ImageSlider from 'react-native-image-slider';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';
import {
    List, 
    ListItem, 
    CheckBox
} from 'react-native-elements';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';

//결제 방법 선택 컴포넌트
export default class BookingPaymentList extends Component {
    constructor(props){
        super(props);
        this.state = {
            index : this.props.navigation.getParam('data').idx,
            value : this.props.navigation.getParam('data').val
        }
    };
    _onSelect = (idx, val) => {
        this.setState({
            index : idx,
            value : val
        });
    };

    render(){
        return(
            <SafeAreaView style={styles.safeAreaViewStyle}>
                <ScrollView>
                <View style={{flexDirection:'row', marginTop : 20}}>
                    <RadioGroup
                        onSelect = {(index, value) => this._onSelect(index, value)}
                        selectedIndex={this.state.index}
                        size={30}
                        thickness={2}
                        color={Colors.buttonSky}
                        style={{marginLeft : 20}}
                    >
                        <RadioButton value={'신용카드'}>
                            <Text style={{fontSize:20, fontWeight:'bold', marginLeft:5}}>신용카드</Text>
                        </RadioButton>
                
                        <RadioButton value={'휴대폰 결제'}>
                            <Text style={{fontSize:20, fontWeight:'bold', marginLeft:5}}>휴대폰 결제</Text>
                        </RadioButton>
                        
                        <RadioButton value={'실시간 계좌이체'}>
                            <Text style={{fontSize:20, fontWeight:'bold', marginLeft:5}}>실시간 계좌이체</Text>
                        </RadioButton>
                    </RadioGroup>
                </View>
                </ScrollView>
                <BottomRequest navigation={this.props.navigation} data={this.state}/>
            </SafeAreaView>
        );
    };
};

class BottomRequest extends Component{
    constructor(props) {
        super(props);
    };

    _onSubmit = () =>{
        this.props.navigation.state.params.returnPayment(this.props.data);
        this.props.navigation.goBack();
    };

    render(){
        return(
            <View style={styles.bottomRequest}>
                <TouchableOpacity style={styles.bottomButton} onPress={()=>this._onSubmit()}>
                    <Text style={styles.bottomText}>선택</Text>
                </TouchableOpacity>
            </View>
        )
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
        justifyContent: 'center', 
        alignItems: 'center',
    },
    endBar: {
        flex:1,
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor : Colors.white,
        height : (Dimensions.get('window').height - 520)
    },
    priceBar : {
        flex:1,
        flexDirection: 'column',
        justifyContent : 'flex-end',
        paddingHorizontal: 10,
        paddingVertical: 5,
        height : 60,
        backgroundColor : Colors.white,
        marginBottom : 1,
    },
    paymentBar : {
        flex:1,
        flexDirection: 'row',
        justifyContent : 'space-around',
        alignItems : 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor : Colors.white,
        marginBottom : 1,
        height : 70
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