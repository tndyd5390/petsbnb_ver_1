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
import Category from '../components/Explore/Category';
import Colors from '../../utils/Colors';
import ImageSlider from 'react-native-image-slider';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';
import {List, ListItem} from 'react-native-elements';

export default class BookingConfirm extends Component {
    constructor(props){
        super(props);
        const data = this.props.navigation.getParam('data');
        this.state = {
            petList : this.setArrList(data.selected._mapData),
            stDate : data.stDate,
            edDate : data.edDate
        }
    };
    
    setArrList=(data)=>{
        const arr = [];
        for(let i=0; i<data.length;i++){
            if(data[i][1]==true){
                arr.push(data[i][0]);
            };
        };
        return arr;
    };

    render(){
        return(
            <SafeAreaView style={styles.safeAreaViewStyle}>
                <ScrollView>
                    <View style={{backgroundColor : Colors.white}}>
                        <Text style={{fontSize : 17,fontWeight : 'bold', marginLeft : 20, marginTop : 20}}>펫시터 정보</Text>
                    </View>
                    <Profile/>
                    <View style={{backgroundColor : Colors.white}}>
                        <Text style={{fontSize : 17,fontWeight : 'bold', marginLeft : 20, marginTop : 20}}>맡길 펫 정보</Text>
                    </View>
                    <PetList petList={this.state.petList}/>
                    <View style={{backgroundColor : Colors.white}}>
                        <Text style={{fontSize : 17,fontWeight : 'bold', marginLeft : 20, marginTop : 20}}>예약 정보</Text>
                    </View>
                    <BookingDateDetail stDate={this.state.stDate} edDate={this.state.edDate}/>
                    <View style={{backgroundColor : Colors.white}}>
                        <Text style={{fontSize : 17,fontWeight : 'bold', marginLeft : 20, marginTop : 20}}>결제 정보</Text>
                    </View>

                </ScrollView>
                <BottomRequest navigation={this.props.navigation}/>
            </SafeAreaView>
        );
    };
};

class Profile extends Component {
    constructor(props){
        super(props);
    };

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

class PetList extends Component{
    constructor(props){
        super(props);
        this.state = {
            petList : this.props.petList
        }
    };

    renderList = (petList) => {
        return petList.map((key)=>{
            return(
                <View style={styles.listBar} key={key}>
                    <View style={{alignItems : 'center', justifyContent: 'center'}}>
                            <Image source={require("../../../img/user.png")} style={{width : 80, height : 80, margin : 18}}/>
                    </View>
                    <View style={{justifyContent: 'center', marginLeft : 15}}>
                        <View>
                            <Text style={{fontSize : 20, fontWeight : 'bold'}}>{key}</Text>
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
            );
        });
    };
    render(){
        return(
            <View>
                {this.renderList(this.state.petList)}
            </View>
        );
    };
};

class BookingDateDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            stDate : this.props.stDate,
            edDate : this.props.edDate
        }
    };

    render(){
        return(
            <View style={styles.dateBar}>
                <Text style={{fontSize : 17}}>
                        {this.state.stDate}  ~  {this.state.edDate}
                </Text>
            </View>
        );
    };
};

class Payment extends Component{
    constructor(props){
        super(props);
    }
    

};

class BottomRequest extends Component{
    constructor(props) {
        super(props);
    };

    render(){
        return(
            <View style={styles.bottomRequest}>
                <TouchableOpacity style={styles.bottomButton} onPress={()=>console.log('nextt')}>
                    <Text style={styles.bottomText}>결제하기</Text>
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
        justifyContent: 'center', 
        alignItems: 'center',
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