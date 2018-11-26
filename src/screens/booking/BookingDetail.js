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
                <Enviroment/>
                <PetYN/>
                <Improssible/>
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
            <View style={{justifyContent: 'center', marginLeft : 15}}>
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
            <View>
            <View style={styles.priceBar}>
                <View style={{flex:1,justifyContent : 'center', alignItems : 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <IconFontAwesome name='paw' color={Colors.buttonSky} size={50}/>
                    </View>
                    <View style={{flexDirection: 'row', marginTop:10}}>
                        <Text style={{fontFamily: 'Arial', fontSize: 15}}>소형</Text>
                        <Text style={{fontSize:13, color:Colors.grey}}>(~6.9kg)</Text>
                    </View>
                </View>
                <View style={{flex:1,justifyContent : 'center', alignItems : 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <IconFontAwesome name='paw' color={Colors.lightGrey} size={50}/>
                    </View>
                    <View style={{flexDirection: 'row', marginTop:10}}>
                        <Text style={{fontFamily: 'Arial', fontSize: 15}}>중형</Text>
                        <Text style={{fontSize:13, color:Colors.grey}}>(7~14.9kg)</Text>
                    </View>
                </View>
                <View style={{flex:1,justifyContent : 'center', alignItems : 'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <IconFontAwesome name='paw' color={Colors.lightGrey} size={50}/>
                    </View>
                    <View style={{flexDirection: 'row', marginTop:10}}>
                        <Text style={{fontFamily: 'Arial', fontSize: 15}}>대형</Text>
                        <Text style={{fontSize:13, color:Colors.grey}}>(15kg~)</Text>
                    </View>
                </View>
            </View>
            <View style={styles.priceBar2}>
                <View style={{flexDirection: 'column',justifyContent : 'center', alignItems : 'center', width : Dimensions.get('window').width, marginTop:20}}>  
                    <View style={{flexDirection:'row', justifyContent : 'space-between'}}>
                        <View style={{flex:0.5, alignItems : 'center'}}>
                            <Text style={styles.priceText}>1박</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.priceText}>₩ 40,000</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.priceText}>₩ 40,000</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.priceText}>₩ 50,000</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', justifyContent : 'space-between', marginTop : 10}}>
                        <View style={{flex:0.5, alignItems : 'center'}}>
                            <Text style={styles.priceText}>데이</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.priceText}>₩ 40,000</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.priceText}>₩ 40,000</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.priceText}>₩ 50,000</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',marginTop : 25, marginBottom:10}}>
                        <TouchableOpacity style={{width : '85%', height : 50, borderColor : Colors.buttonSky, borderWidth : 1,borderRadius:15, justifyContent : 'center', alignItems : 'center'}}>
                            <Text style={{color:Colors.buttonSky}}>이용비용 자세히 보기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </View>
        );
    };
};

class Enviroment extends Component {
    render(){
        return(
            <View style={styles.EnvBar}>
                <View style={{flex:0.5,alignItems : 'center', flexDirection: 'row',marginLeft : 20}}>
                    <View style={styles.blueCircle}/>
                    <Text style={{fontWeight:'bold'}}>펫시팅 환경</Text>
                </View>
                <View style={{flex:1,alignItems : 'center', flexDirection: 'row'}}>
                    <Text>아파트</Text>
                </View>
            </View>
        )
    };
};

class PetYN extends Component {
    render(){
        return(
            <View style={styles.EnvBar}>
                <View style={{flex:0.5,alignItems : 'center', flexDirection: 'row',marginLeft : 20}}>
                    <View style={styles.blueCircle}/>
                    <Text style={{fontWeight:'bold'}}>반려동물 여부</Text>
                </View>
                <View style={{flex:1,alignItems : 'center', flexDirection: 'row'}}>
                    <Text>현재는 반려동물을 키우지 않아요</Text>
                </View>
            </View>
        )
    };
};

class Improssible extends Component {
    render(){
        return(
            <View style={styles.impossibleBar}>
                <View style={{flex:0.5,alignItems : 'center', flexDirection: 'row',marginLeft : 20, marginTop:15,marginBottom:15}}>
                    <View style={styles.redCircle}/>
                    <Text style={{fontWeight:'bold'}}>펫시팅 불가</Text>
                </View>
                <View style={{flex:1,alignItems : 'center', flexDirection: 'row',marginTop:15,marginBottom:15}}>
                    <Text>중성화하지 않은 아이, 하울링이 심한아이, 마킹 심한 아이, 물건을 심하게 물어 뜯는 아이</Text>
                </View>
            </View>
        )
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