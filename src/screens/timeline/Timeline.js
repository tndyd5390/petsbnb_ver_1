import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, AsyncStorage,Dimensions} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-ionicons'
import Feed from './Feed';
import Colors from '../../utils/Colors';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import { ip } from "../../utils/const";

const{width, height} = Dimensions.get('window');
const options={
  title : '사진',
  takePhotoButtonTitle : '사진 촬영',
  chooseFromLibraryButtonTitle : '갤러리에서 고르기'
}

export default class Timeline extends Component {
  constructor(props){
    super(props);
    console.log("reservationNo ; " + this.props.navigation.getParam('reservationNo'));
    const timelineList = this.props.navigation.getParam("timelineList");
    const timelineArr = [];
    for(let i = 0; i< timelineList.length; i++){
      const timelineObject = {
        key: i + 1,
        type: "image",
        source: `${ip}/timelineFile/${timelineList[i].TIMELINE_FILE_NAME}`,
        avatarUrl: 'https://unsplash.it/100?image=1027',
        text: timelineList[i].CONTENT,
        emotionRate: timelineList[i].EMOTION_RATE
      }
      timelineArr.push(timelineObject);
    }

    this.state = {
      reservationNo : this.props.navigation.getParam('reservationNo'),
      userNo : '',
      imageSource: '',
      imageData : '',
      extension : '',
      fileName : '',
      data : timelineArr,
      activityIndicator : true
    }
  }
  
  componentDidMount(){
    this._getUserInfo();
  }

  _getUserInfo = async() =>{
    const userNo = await AsyncStorage.getItem('userInfo');
    this.setState({
      userNo : userNo,
      activityIndicator : false
    })
  };



  _butttonHandleFunc = () => {
    ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const source = { uri: response.uri };
          const extension = response.path.substr(response.path.lastIndexOf('.') + 1 , response.path.length);
          const timestamp = new Date().getTime();
          const param = {
            reservationNo: this.state.reservationNo,
            userNo : this.state.userNo,
            imageData : response.data,
            imageSource : response.uri,
            extension : extension,
            fileName : timestamp.toString()
          }  
          this.props.navigation.navigate('TimelineWrite', {data : param});
        }
      });
  }

  render() {
    
    return (
      <View style={{flex : 1}}>
      {this.state.activityIndicator && (
        <View style={{backgroundColor : Colors.white, width : width, height : height, position : 'absolute', zIndex : 10, alignItems : 'center', justifyContent : 'center'}}>
            <ActivityIndicator size="large" color="#10b5f1"/>
        </View>
      )}
      {!this.state.activityIndicator &&(
      <FlatList
        keyExtractor = { (item, index) => index.toString() }
        style={{ flex: 1 }}
        data={this.state.data}
        renderItem={({ item }) => (
          <View style={{backgroundColor : Colors.white}}>
            <View style={{ height: 60, backgroundColor: 'white', flexDirection: 'row' }}>
              <Image
                style={{ width: 36, height: 36, margin: 12, borderRadius: 18, borderWidth: StyleSheet.hairlineWidth, borderColor: 'lightgray' }}
                source={{ uri: item.avatarUrl }}
              />
              <Text style={{ fontWeight: 'bold', height: 60, lineHeight: 60, flex: 1 }}>{item.username}</Text>
              <Icon name="ios-more" size={30} color="black" style={{ lineHeight: 60, marginRight: 15 }} />
            </View>
            <Feed type={item.type} source={item.source} />
            <View style={{ height: 54, backgroundColor: 'white', flexDirection: 'row' }}>
              <Icon name="heart-empty" size={34} color="grey" style={{ marginTop: 12, marginLeft: 15 }} />
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('TLComments', {user : item.username, text : item.text}) }>
              <Icon name="text" size={34} color="grey" style={{ marginTop: 12, marginLeft: 20 }} />
              </TouchableOpacity>
              <Text style={{ marginTop: 16, marginLeft: 15, color: 'gray' }}>{`감정분석 점수 ${item.emotionRate}`}</Text>
            </View>
            <View>
                <Text style={{fontSize : 13, color:'black', paddingLeft: 15}}>{item.text}</Text>
            </View>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('TLComments', {user : item.username, text : item.text}) }>
              <View style={{ marginBottom: 2, paddingLeft: 15, marginTop : 5 }}>
                <Text style={{ fontSize: 12, color: 'gray' }}>{'댓글 x개'}</Text>
              </View>
            </TouchableOpacity>
            <View style={{ marginBottom: 20, paddingLeft: 15, marginTop : 5 }}>
              <Text style={{ fontSize: 8, color: 'gray' }}>{'X MINUTES AGO'}</Text>
            </View>
          </View>
        )}
      />
      )} 
      <TouchableOpacity activeOpacity={0.8} style={styles.stickerBtn} onPress={this._butttonHandleFunc}>
        <IconFontAwesome name='camera-retro' color={Colors.buttonSky} size={25}/>
      </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  stickerBtn:
  {
      position: 'absolute',
      right: 20,
      bottom: 20,
      borderRadius: 30,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.white,
      borderColor : Colors.buttonSky,
      borderWidth : 2,
      padding: 15,
      marginBottom : 15
  },
  bottomButton : {
    alignItems: 'center',
    justifyContent: 'center',
    width : '100%',
    height : '100%'
  },
  bottomText : {
      fontSize : 20,
      color : Colors.white,
      fontWeight: "600"
  },
  bottomRequest : {
      justifyContent: 'center', 
      alignItems: 'center',
      bottom: 0,
      width:'100%',
      height : 60,
      backgroundColor : Colors.buttonSky,
      flexDirection : 'row'
  },
})