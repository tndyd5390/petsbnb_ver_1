import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity,TouchableHighlight, SafeAreaView, ScrollView, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-ionicons';
import Colors from '../../utils/Colors';

const { width } = Dimensions.get('window');

export default class TLComments extends Component {
    constructor(props){
        super(props);
        this.state = {
            username :  this.props.navigation.getParam('user'),
            text :  this.props.navigation.getParam('text'),
            comments : [
                {
                    key : 1,
                    user : '유혜진',
                    comment : '어머머 이뻐요 이뻐요ㅕ이ㅃ요ㅛㅉㅃ또ㅉ뻐ㄸㅃ쩌ㅏㅂㅈㄷㅈㅂㄷㅈㅂ',
                    date : '2018-12-13',
                },
                {
                    key : 2,
                    user : '김혜진',
                    comment : '어머머 이뻐요2',
                    date : '2018-12-13',
                },
                {
                    key : 3,
                    user : '유혜진',
                    comment : '어머머 이뻐요3',
                    date : '2018-12-13',
                },
                {
                    key : 4,
                    user : '유혜진',
                    comment : '어머머 이뻐요4',
                    date : '2018-12-13',
                },
            ]
        }
    };

    _renderItem = ({item}) => (
        <CommentBox
            id = {item.key}
            user = {item.user}
            comment = {item.comment}
            date = {item.date}
        />
    );


    render(){
        return(
            <SafeAreaView style={styles.safeAreaViewStyle}>
                <ScrollView style>
                    <View style={styles.mainText}>
                        <Text numberOfLines={99}>
                            <Text style={{fontWeight : 'bold', color : 'black'}}>
                                {this.state.username}{' '}
                            </Text>
                            {this.state.text}
                        </Text>
                    </View>
                    <View style={{alignSelf :'center',marginTop : 10, marginBottom:5,borderColor : Colors.lightGrey, borderWidth : 1, width : '95%'}}/>
                    <FlatList
                        data={this.state.comments}
                        extraData={this.state} 
                        style={{ flex: 1 }}
                        renderItem={this._renderItem}
                        keyExtractor = { (item, index) => index.toString() }
                    />
                </ScrollView>
                <InputBar/>
            </SafeAreaView>
        );
    };
};

class CommentBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            key : this.props.id,
            user : this.props.user,
            comment : this.props.comment,
            date : this.props.date
        }
    }

    render(){
        return(
            <View>
                <View style={styles.commentText}>
                    <Text numberOfLines={6}>
                        <Text style={{fontWeight : 'bold', color : 'black'}}>
                            {this.state.user}{' '}
                        </Text>
                        {this.state.comment}
                    </Text>
                </View>
                <View>
                    <Text style={{marginLeft : 25, color : 'grey', fontSize : 10}}>
                        {this.state.date}
                    </Text>
                </View>   
            </View>
        );
    };
};

class InputBar extends Component{
    constructor(props) {
      super(props);
      this.state = {
        inputText : ''
      };
    }

    _chgInputText = (text) =>{
        this.setState(
            inputText : text
        );
    };

    render(){
        return(
          <View>
            <View style={styles.inputBar}>
                <TextInput style={styles.textBox} onChangeText={(text) => {console.log(text)}}/>
                <TouchableHighlight style={styles.sendButton} onPress={() => {console.log()}}>
                    <Text style={{color: 'white', fontSize : 17}}>></Text>
                </TouchableHighlight>
            </View>
          </View>
        );
    }
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
    mainText : {
        flex:1,
        flexDirection: 'row',
        marginTop : 10,
        backgroundColor : Colors.white,
        marginBottom : 5,
        marginLeft : 20,
    },
    commentText : {
        flex:1,
        flexDirection: 'row',
        marginTop : 10,
        backgroundColor : Colors.white,
        marginLeft : 20,
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
    inputBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop : 5,
        height : 45
      },
    sendButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width : '12%',
        paddingLeft: 15,
        marginLeft: 5,
        paddingRight: 15,
        borderRadius: 15,
        backgroundColor: Colors.buttonSky
      },
    
      textBox: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        backgroundColor : Colors.white,
        flex: 1,
        paddingHorizontal: 10,
      },
  
});