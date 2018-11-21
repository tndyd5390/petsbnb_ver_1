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
    AsyncStorage
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import Category from '../components/Explore/Category';
import Colors from '../../utils/Colors';
import ImageSlider from 'react-native-image-slider';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';

export default class BookingDetail extends Component{
    constructor(props) {
        super(props);
    
    }
    static navigationOptions = {
        headerTransparent: true
    }

    render(){
        const images = [
            'https://s-i.huffpost.com/gen/5563994/images/n-DOG-MOUTH-628x314.jpg',
            'http://pet.chosun.com/images/news/healthchosun_pet_201611/20161117212109_708_1630_347.jpg',
            'https://s-i.huffpost.com/gen/5563994/images/n-DOG-MOUTH-628x314.jpg',
        ]
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
                <Certificate/>
                <Certificate/>
                <Certificate/>
                </ScrollView>
                <BottomRequest/>
            </SafeAreaView>

        )
    }
    
}
class Profile extends Component {
    render(){
        return(
        <View style={styles.listBar}>
            <View style={{flexDirection : 'row', alignItems : 'center'}}>
                <Text>사진</Text>
            </View>
            <View style={{flexDirection : 'row', alignItems : 'center'}}>
                <Text>프로필</Text>
            </View>            
        </View>
        )
    };
};

class Certificate extends Component {
    render(){
        return(
            <View style={styles.listBar}>
                <View style={{flex : 1,flexDirection: 'row', padding: 10, alignItems:'center'}}>
                    <IconFontAwesome name='video' color={Colors.black} size={50}>
                        <Text style={{fontFamily: 'Arial', fontSize: 15}}>동영상</Text>
                    </IconFontAwesome>       
                </View>
                <View style={{flex : 1,flexDirection: 'row', padding: 10, alignItems:'center'}}>
                    <IconFontAwesome name='video' color={Colors.black} size={50}>
                        <Text style={{fontFamily: 'Arial', fontSize: 15}}>동영상</Text>
                    </IconFontAwesome>       
                </View>
                <View style={{flex : 1,flexDirection: 'row', padding: 10, alignItems:'center'}}>
                    <IconFontAwesome name='video' color={Colors.black} size={50}>
                        <Text style={{fontFamily: 'Arial', fontSize: 15}}>동영상</Text>
                    </IconFontAwesome>       
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
        marginBottom : 5
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
    }
});