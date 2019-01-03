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
import Textarea from 'react-native-textarea';
import StarRating from 'react-native-star-rating';

export default class BookingReviewWrite extends Component{
    constructor(props){
        super(props);
        this.state = {
            text : '',
            starCount : 0
        }
    };

    _onChangeText = (txt) =>{
        this.setState({
            text : txt
        });
    };

    _onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
    };

    render(){
        return(
            <SafeAreaView style={styles.safeAreaViewStyle}>
                <ScrollView>
                    <View style={{flexDirection:'column'}}>
                        <View style={styles.EnvBar}>
                            <View style={{flex:1,alignItems : 'center', flexDirection: 'row',marginLeft : 20}}>
                                <View style={styles.blueCircle}/>
                                <Text style={{fontWeight:'bold', fontSize : 20}}>리뷰</Text>
                            </View>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={this.state.starCount}
                                selectedStar={(rating) => this._onStarRatingPress(rating)}
                                fullStarColor={Colors.buttonSky}
                                starSize={25}
                            />
                        </View>
                        <View style={styles.textAreaContainer1}>
                            <Textarea
                                containerStyle={styles.textareaContainer2}
                                style={styles.textarea}
                                onChangeText={this._onChangeText}
                                defaultValue={this.state.text}
                                maxLength={999}
                                underlineColorAndroid={'transparent'}
                            />
                        </View>
                        <View style={{flex:1,flexDirection :'column', alignItems :'center'}}>
                            <View style={{flexDirection :'row',alignItems :'center', justifyContent : 'center', marginTop : 10}}>
                                <Text style={{fontSize : 15, fontWeight : 'bold', color : Colors.grey}}>최소 10자이상 작성 부탁드립니다.</Text>
                            </View> 
                        </View>
                    </View>
                </ScrollView>
                <BottomRequest navigation={this.props.navigation} text={this.state.text} starCount={this.state.starCount}/>
            </SafeAreaView>
        );
    };
};


class BottomRequest extends Component{
    constructor(props) {
        super(props);
    }

    _onSubmit = (text) => {
        const count = text.length;
        if(count<=10){
            alert('최소 10자 이상 작성해주세요.');
            return false;
        }else{
            if(this.props.starCount==0){
                alert('별점을 선택해주세요.');
                return false;
            }else{
                this.props.navigation.goBack();
                return true;
            };
        };
    };

    render(){
        return(
            <View style={styles.bottomRequest}>
                <TouchableOpacity style={styles.bottomButton} onPress={()=>this._onSubmit(this.props.text)}>
                    <Text style={styles.bottomText}>등록 하기</Text>
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