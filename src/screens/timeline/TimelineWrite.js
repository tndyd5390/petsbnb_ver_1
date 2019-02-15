import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, Textarea,Dimensions, SafeAreaView} from 'react-native';
import Colors from '../../utils/Colors';

const{width, height} = Dimensions.get('window');

export default class TimelineWrite extends Component {
    constructor(props){
        super(props)
        this.state = {
            // reservationNo : data.reservationNo,
            // serviceProvider : data.serviceProvider,
            // imageSource: data.imageSource,
            // extension : data.extension,
            // fileName : data.fileName,
            text : '',
        }
    };
    
    render(){
        // const imageSource = this.state.imageSource + '.' + this.state.extension;
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
                        <View style={{alignItems:'center', width : width, height : width, }}>
                            {/* <Image source={{uri : imageSource}} style={{width : '100%', height : '100%'}}/> */}
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
            </SafeAreaView>
        );
    };
}

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