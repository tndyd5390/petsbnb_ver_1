import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, AsyncStorage,Dimensions} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-ionicons'
import Feed from './Feed';
import Colors from '../../utils/Colors';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';

const{width, height} = Dimensions.get('window');

export default class Timeline extends Component {
  constructor(props){
    super(props);
    this.state = {
      reservationNo : this.props.navigation.getParam('reservationNo'),
      serviceProvider : this.props.navigation.getParam('serviceProvider') == null ? '' : this.props.navigation.getParam('serviceProvider'),
      userNo : '',
      data : [
        {
          key: 2,
          username: 'jennifer',
          type: 'image',
          source: 'https://github.com/saitoxu/InstaClone/raw/master/contents/images/baking.jpg',
          avatarUrl: 'https://unsplash.it/100?image=1027',
          text : '1번~asdsadsadsadsadsadwq asfkmjaslkdfjk암ㄴ인미언망ㅁㄴㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁ'
        },
        {
          key: 3,
          username: 'cathy',
          type: 'video',
          source: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
          avatarUrl: 'https://unsplash.it/100?image=996',
          text : '2번 ㄱㄱㄱㄱㄱㅂㅈㄷㅈㅂ'
        },
         {
          key: 4,
          username: 'zack',
          type: 'image',
          source: 'https://github.com/saitoxu/InstaClone/raw/master/contents/images/landscape.jpg',
          avatarUrl: 'https://unsplash.it/100?image=856',
          text : '3번 ㅂㅈㄷㅈㅂㄷㅈㅂㄷ'
        }, {
          key: 5,
          username: 'luke',
          type: 'image',
          source: 'https://github.com/saitoxu/InstaClone/raw/master/contents/images/snow.jpg',
          avatarUrl: 'https://unsplash.it/100?image=669',
          text : '4번123213'
        }, 
        {
          key: 6,
          username: 'anna',
          type: 'video',
          source: 'https://sample-videos.com/video123/mkv/720/big_buck_bunny_720p_1mb.mkv',
          avatarUrl: 'https://unsplash.it/100?image=823',
          text : '6번ㅁ아ㅓ민안미암니ㅏ임ㄴ'
        },
         {
          key: 7,
          username: 'ken',
          type: 'image',
          source: 'https://github.com/saitoxu/InstaClone/raw/master/contents/images/town.jpg',
          avatarUrl: 'https://unsplash.it/100?image=550',
          text : '7번 ㅁ인ㅁ안미아ㅣㄴㅁ'
        }],
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

  render() {
    const data = [
        {
          key: 2,
          username: 'jennifer',
          type: 'image',
          source: 'https://github.com/saitoxu/InstaClone/raw/master/contents/images/baking.jpg',
          avatarUrl: 'https://unsplash.it/100?image=1027',
          text : '1번~asdsadsadsadsadsadwq asfkmjaslkdfjk암ㄴ인미언망ㅁㄴㅇㄴㅁㅇㄴㅁㅇㄴㅁㅇㄴㅁ'
        },
        {
          key: 3,
          username: 'cathy',
          type: 'video',
          source: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
          avatarUrl: 'https://unsplash.it/100?image=996',
          text : '2번 ㄱㄱㄱㄱㄱㅂㅈㄷㅈㅂ'
        },
         {
          key: 4,
          username: 'zack',
          type: 'image',
          source: 'https://github.com/saitoxu/InstaClone/raw/master/contents/images/landscape.jpg',
          avatarUrl: 'https://unsplash.it/100?image=856',
          text : '3번 ㅂㅈㄷㅈㅂㄷㅈㅂㄷ'
        }, {
          key: 5,
          username: 'luke',
          type: 'image',
          source: 'https://github.com/saitoxu/InstaClone/raw/master/contents/images/snow.jpg',
          avatarUrl: 'https://unsplash.it/100?image=669',
          text : '4번123213'
        }, 
        {
          key: 6,
          username: 'anna',
          type: 'video',
          source: 'https://sample-videos.com/video123/mkv/720/big_buck_bunny_720p_1mb.mkv',
          avatarUrl: 'https://unsplash.it/100?image=823',
          text : '6번ㅁ아ㅓ민안미암니ㅏ임ㄴ'
        },
         {
          key: 7,
          username: 'ken',
          type: 'image',
          source: 'https://github.com/saitoxu/InstaClone/raw/master/contents/images/town.jpg',
          avatarUrl: 'https://unsplash.it/100?image=550',
          text : '7번 ㅁ인ㅁ안미아ㅣㄴㅁ'
        }]
    
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
      <BottomRequest/>
      </View>
    )
  }
}

class BottomRequest extends Component{
  constructor(props){
    super(props)
  }
  
  _showPopUp = () =>{
    
  }

  render(){
    return(
      <TouchableOpacity activeOpacity={0.8} style={styles.stickerBtn} onPress={this._showPopUp}>
        <IconFontAwesome name='camera-retro' color={Colors.buttonSky} size={25}/>
      </TouchableOpacity>
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