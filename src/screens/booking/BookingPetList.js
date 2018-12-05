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

export default class BookingPetList extends Component{
    constructor(props) {
        super(props)
        const rslt = chgDateFormat(this.props.navigation.getParam('date'));
        this.state = {
            stDate : rslt.stDate,
            edDate : rslt.edDate,
            diffDate : rslt.diffDate,
            petYN : true,
            selected : (new Map():Map<string,boolean>)
        }
    };

    
    _callBackPetList = (selectedPet) =>{
        this.setState({
            selected : selectedPet
        });
    };
      
    render(){

        return(
            <SafeAreaView style={styles.safeAreaViewStyle}>
                <ScrollView>
                {this.state.petYN ?  <PetY callBackPetList={this._callBackPetList}/> :<PetN/> }            
                 </ScrollView>
                {this.state.petYN ?  <BottomRequest navigation={this.props.navigation} data={this.state}/> : null }            
            </SafeAreaView>
        );
    };
};

class PetN extends Component {
    constructor(props) {
        super(props);
    }
    
    render(){
        return(
            <View style={{flex:1,flexDirection :'column',alignItems :'center', marginTop : 30}}>
                <Text style={{fontSize : 20, fontWeight :'bold'}}>등록된 반려동물이 없습니다.</Text>
                <Text style={{fontSize : 15, marginTop : 10}}>반려동물을 등록해야 예약 진행이 가능합니다.</Text>
                <View style={{marginTop : 50}}>
                    <TouchableOpacity style={{width : 200, height : 60,borderRadius: 15, backgroundColor : Colors.buttonSky, justifyContent : 'center', alignItems : 'center'}}>
                        <Text style={{color:Colors.white, fontSize : 17, fontWeight : 'bold'}}>반려동물 등록하기</Text>
                    </TouchableOpacity>
                </View>   
            </View>
        );
    };
};

class PetY extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [{id : '1', name : '호두', detail : '말티즈', size : '소형'},
                    {id : '2', name : '초코', detail : '웰시코기', size : '중형'},
                    {id : '3', name : '초코', detail : '웰시코기', size : '중형'},
                    {id : '4', name : '초코', detail : '웰시코기', size : '중형'},
                    {id : '5', name : '우유', detail : '사모예드', size : '대형'}],
            selected : (new Map():Map<string,boolean>)
        };

    };
    _keyExtractor = (item, index) => item.id;

    _onPressItem = (id : String) => {
        this.setState((state)=>{
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id));
            this.props.callBackPetList(selected);
            return {selected};
        })
    };

    _renderItem = ({item}) => (
        <PetList
            id = {item.id}
            onPressItem = {this._onPressItem}
            selected = {!!this.state.selected.get(item.id)}
            name = {item.name}
            detail = {item.detail}
            size = {item.size}
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

class PetList extends Component{
    constructor(props){
        super(props);
    };
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };
    
    render(){
        const backColor = this.props.selected ? Colors.lightGrey : Colors.white;
        return(
            <TouchableOpacity onPress={this._onPress}>
                <PetProfile id={this.props.id} name={this.props.name} detail={this.props.detail} size={this.props.size} backColor={backColor}/>
            </TouchableOpacity>
        )
    };
};

class PetProfile extends Component {
    render(){
        return(
            <View style={{
                    flex:1,
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    height : 130,
                    marginBottom : 5,
                    backgroundColor : this.props.backColor
            }}>
                <View style={{alignItems : 'center', justifyContent: 'center'}}>
                        <Image source={require("../../../img/user.png")} style={{width : 80, height : 80, margin : 18}}/>
                </View>
                <View style={{justifyContent: 'center', marginLeft : 15}}>
                    <View>
                        <Text style={{fontSize : 20, fontWeight : 'bold'}}>{this.props.name}</Text>
                    </View>
                    <View style={{flexDirection: 'column', marginTop : 5}}>
                        <View style={{alignItems : 'center', flexDirection: 'row'}}>
                            <View style={styles.blueCircle}/>
                            <Text>{this.props.detail}</Text>
                        </View>
                        <View style={{alignItems : 'center', flexDirection: 'row'}}>
                            <View style={styles.blueCircle}/>
                            <Text>{this.props.size}</Text>
                        </View>
                    </View>
                </View>            
            </View>
        )
    };
};

class BottomRequest extends Component{
    constructor(props) {
        super(props);
    };

    _onSubmit = () =>{
        const arr = this.props.data.selected._mapData;
        let count = 0;
        if(arr.length==0){
            alert('맡기실 반려동물을 선택해주세요.');
            return false;
        }else{
            for(let i=0; i<arr.length;i++){
                if(arr[i][1]==true){
                    count++;
                }
            }
            if(count>0){
                this.props.navigation.navigate('BookingConfirm',{data:this.props.data});
                return true;
            }else{
                alert('맡기실 반려동물을 선택해주세요.');
                return false;
                
            }
        }
    };

    render(){
        return(
            <View style={styles.bottomRequest}>
                <TouchableOpacity style={styles.bottomButton} onPress={()=>this._onSubmit()}>
                    <Text style={styles.bottomText}>다음</Text>
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