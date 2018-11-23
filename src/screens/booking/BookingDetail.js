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
    Button
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import Category from '../components/Explore/Category';
import Colors from '../../utils/Colors';
import ImageSlider from 'react-native-image-slider';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';

export default class BookingDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            heartStatus : false
        };
    };
    
    static navigationOptions = ({navigation}) => {
        const { params = {} } = navigation.state;
        const setHeart = () => {
            navigation.getParam('heart') ? navigation.setParams({heart : false}) : navigation.setParams({heart : true})
        };
        return {
            headerTransparent: true,
            headerRight : (
                <IconFontAwesome name='heart' onPress={()=>setHeart()} color={navigation.getParam('heart') ? Colors.red : Colors.bottomNavigatorGrey} size={25} 
                style={{marginRight : 20}}
                />
              )
        };
    };


    render(){
        const images = [
            'https://s-i.huffpost.com/gen/5563994/images/n-DOG-MOUTH-628x314.jpg',
            'http://pet.chosun.com/images/news/healthchosun_pet_201611/20161117212109_708_1630_347.jpg',
            'https://s-i.huffpost.com/gen/5563994/images/n-DOG-MOUTH-628x314.jpg',
        ];
        return(
            <SafeAreaView style={styles.safeAreaViewStyle}>
                <ScrollView>
                    <ImageSlider images={images}
                            customSlide={({ index, item, style, width }) => (
                                // It's important to put style here because it's got offset inside
                                <View
                                key={index}
                                style={[
                                    style,
                                    styles.customSlide,
                                    { backgroundColor: index % 2 === 0 ? 'yellow' : 'green' },
                                ]}>
                                <Image source={{ uri: item }} style={styles.customImage} />
                                </View>
                            )}
                            style={{height:200}}
                    />
                <Profile/>
                <Certificate/>
                <Price/>
                <Certificate/>
                <Certificate/>
                </ScrollView>
                <BottomRequest/>
                <TouchableOpacity activeOpacity = { 0.8 } style = { styles.stickerBtn }>
                    <IconFontAwesome name='comment-dots' color={Colors.buttonSky} size={25}/>
                </TouchableOpacity>
            </SafeAreaView>

        )
    }
    
}
class Profile extends Component {
    render(){
        return(
        <View style={styles.listBar}>
            <View style={{alignItems : 'center', justifyContent: 'center'}}>
                    <Image source={require("../../../img/user.png")} style={{width : 60, height : 60, margin : 18}}/>
            </View>
            <View style={{justifyContent: 'center'}}>
                <View>
                    <Text style={{fontSize : 17, fontWeight : 'bold'}}>정성을 다해 사랑으로 돌봐드려요</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text>유혜진</Text>
                    <TouchableOpacity style={{marginLeft:10}}>
                        <Text style={{color : Colors.buttonSky}}>프로필 보기</Text>
                    </TouchableOpacity>
                </View>
            </View>            
        </View>
        )
    };
};

class Certificate extends Component {
    render(){
        return(
            <View style={styles.listBar}>
                <View style={{flex:1,justifyContent : 'center', alignItems : 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <IconFontAwesome name='award' color={Colors.buttonSky} size={50}/>
                    </View>
                    <View style={{flexDirection: 'row', marginTop:10}}>
                    <Text style={{fontFamily: 'Arial', fontSize: 15}}>5단계 신원인증</Text>
                    </View>
                </View>
                <View style={{flex:1,justifyContent : 'center', alignItems : 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <IconFontAwesome name='medal' color={Colors.lightGrey} size={50}/>
                    </View>
                    <View style={{flexDirection: 'row', marginTop:10}}>
                    <Text style={{fontFamily: 'Arial', fontSize: 15}}>전문교육 수료</Text>
                    </View>
                </View>
                <View style={{flex:1,justifyContent : 'center', alignItems : 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <IconFontAwesome name='shield-alt' color={Colors.buttonSky} size={50}/>
                    </View>
                    <View style={{flexDirection: 'row', marginTop:10}}>
                    <Text style={{fontFamily: 'Arial', fontSize: 15}}>안심 보험 적용</Text>
                    </View>
                </View>
            </View>
        );
    };
};

class Price extends Component {
    render(){
        return(
            <View style={styles.listBar}>
                <View style={{flex:1,justifyContent : 'center', alignItems : 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <IconFontAwesome name='paw' color={Colors.buttonSky} size={15}/>
                    </View>
                    <View style={{flexDirection: 'row', marginTop:10}}>
                    <Text style={{fontFamily: 'Arial', fontSize: 15}}>5단계 신원인증</Text>
                    </View>
                </View>
                <View style={{flex:1,justifyContent : 'center', alignItems : 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <IconFontAwesome name='paw' color={Colors.lightGrey} size={30}/>
                    </View>
                    <View style={{flexDirection: 'row', marginTop:10}}>
                    <Text style={{fontFamily: 'Arial', fontSize: 15}}>전문교육 수료</Text>
                    </View>
                </View>
                <View style={{flex:1,justifyContent : 'center', alignItems : 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <IconFontAwesome name='paw' color={Colors.lightGrey} size={50}/>
                    </View>
                    <View style={{flexDirection: 'row', marginTop:10}}>
                    <Text style={{fontFamily: 'Arial', fontSize: 15}}>안심 보험 적용</Text>
                    </View>
                </View>
            </View>
        );
    };
};


class BottomRequest extends Component{
    render(){
        return(
            <View style={styles.bottomRequest}>
                <TouchableOpacity style={styles.bottomButton} onPress={()=>console.log('얍')}>
                    <Text style={styles.bottomText}>예약 요청</Text>
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
        marginBottom : 5,
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

});