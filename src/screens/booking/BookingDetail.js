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
    FlatList,
    ActivityIndicator
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Category from '../components/Explore/Category';
import Colors from '../../utils/Colors';
import ImageSlider from 'react-native-image-slider';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';
import BookingDate from './BookingDate';
import StarRating from 'react-native-star-rating';


const{width, height} = Dimensions.get('window');

export default class BookingDetail extends Component{
    constructor(props) {
        super(props);
        const petsitterNo = this.props.navigation.getParam('petsitterNo');
        this.state = {
            activityIndicator : true,
            userNo : '',
            petsitterNo : petsitterNo,
            petsitterUserNo : '',
            heartStatus : false,
            headImages : [],
            bookingDetail : {},
            reviews : [],
            petsitterUserProfileImage : {}
        };
    };
    componentDidMount(){
        this._getUserInfo();
        this._getBookingDetail();
    };

    componentWillMount(){
        
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

    _goToChat = async() => {
        console.log(this.state.bookingDetail);
        const roomId = 'p'+this.state.petsitterNo+'u'+this.state.userNo;
        const params = {
            roomId: roomId,
            userNo : this.state.userNo, 
            petsitterNo : this.state.petsitterNo,
            petsitterName : this.state.bookingDetail.petsitterName,
            petsitterUserNo : this.state.bookingDetail.petsitterUserNo,
            date : new Date()
        }
        await fetch("http://192.168.0.8:8091/chat/createChatRoom.do", {
            method : 'POST',
            headers : {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body :JSON.stringify(params),
        })
        .then((response) => {
            this.props.navigation.navigate("ChatRoom",{roomId:roomId,userNo : this.state.userNo, propsUserNo : this.state.userNo,petsitterNo : this.state.petsitterNo,petsitterUserNo : this.state.bookingDetail.petsitterUserNo ,userName : this.state.bookingDetail.petsitterName});
        })
        .catch((err) => {
            console.log(err);
        })


    }
    
    _getUserInfo = async() =>{
        const userNo = await AsyncStorage.getItem('userInfo');
        this.setState({
          userNo : userNo
        })
      };

    _getBookingDetail = async() => {
        const userNo = await AsyncStorage.getItem('userInfo');
        const params = {
            petsitterNo : this.state.petsitterNo,
            reviewNow : 0
        }
        await fetch('http://192.168.0.8:8091/booking/getBookingDetail.do', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
        .then((response) => response.json())
        .then((res => {
            this.setState({
                activityIndicator : false,
                headImages : res.images,
                bookingDetail : res.details,
                reviews : res.reviews,
                petsitterUserProfileImage : res.petsitterUserProfileImage
            });

            console.log(res.details);
        }))
        .catch((err) => {
        })
    };

    render(){
        const images = this.state.headImages
        .sort((a, b) => {
            if(a.petsitterFileNo > b.petsitterFileNo) {
                return 1;
            }else if(a.petsitterFileNo < b.petsitterFileNo){
                return -1;
            }else {
                return 0;
            }
        })
        .map((image, index) => `http://192.168.0.10:8080/petSitterImageFile/${image.petsitterFileName}`);
        return(
            <SafeAreaView style={styles.safeAreaViewStyle}>
                {this.state.activityIndicator && (
                    <View style={{backgroundColor : Colors.white, width : width, height : height, position : 'absolute', zIndex : 10, alignItems : 'center', justifyContent : 'center'}}>
                        <ActivityIndicator size="large" color="#10b5f1"/>
                    </View>
                )}
                {!this.state.activityIndicator && (
                    <ScrollView>
                    <ImageSlider images={images}
                                customSlide={({ index, item, style, width }) => (
                                             // It's important to put style here because it's got offset inside
                                <View key={index} style={[style,styles.customSlide,{ backgroundColor: index % 2 === 0 ? 'yellow' : 'green' },]}>
                                    <Image source={{ uri: item }} style={styles.customImage} />
                                </View>
                                )}
                                style={{height:200}} />
                    <Profile profileData={this.state.bookingDetail} petsitterUserProfileImage={this.state.petsitterUserProfileImage}/>
                    <Certificate/>
                    <Price priceData={this.state.bookingDetail}/>
                    <Enviroment petsitterEnv={this.state.bookingDetail.petsitterEnv}/>
                    <PetYN petsitterHasPet={this.state.bookingDetail.petsitterHasPet}/>
                    <Improssible impoData={this.state.bookingDetail}/>
                    {this.state.bookingDetail.starCount == 0 ? null : <Review petsitterNo={this.state.petsitterNo} reviews={this.state.reviews} reviewCount={this.state.bookingDetail.reviewCount}/>}
                    <View style={{backgroundColor : Colors.white, height : 30}}/>
                    </ScrollView>
                )}
                {!this.state.activityIndicator ? (
                        <BottomRequest navigation={this.props.navigation} petsitterNo={this.state.bookingDetail.petsitterNo} petsitterUserProfileImage={this.state.petsitterUserProfileImage}/>
                ) : null}
                {!this.state.activityIndicator ? (
                        <TouchableOpacity activeOpacity={0.8} style={styles.stickerBtn} onPress={this._goToChat}>
                             <IconFontAwesome name='comment-dots' color={Colors.buttonSky} size={25}/>
                        </TouchableOpacity>
                ) : null}

            </SafeAreaView>

        )
    }
    
}
class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            petsitterNo : this.props.profileData.petsitterNo,
            petsitterUserNo : this.props.profileData.petsitterUserNo,
            petsitterName : this.props.profileData.petsitterName,
            petsitterIntroduceOneline : this.props.profileData.petsitterIntroduceOneline,
            reviewCount : this.props.profileData.reviewCount,
            starCount : this.props.profileData.starCount,
            petsitterFileName : this.props.profileData.petsitterFileName,
            petsitterFilePath : this.props.profileData.petsitterFilePath,
            petsitterUserProfileImage : this.props.petsitterUserProfileImage.petsitterUserImage
        };
    };

    render(){
        const petsitterImageSource = this.state.petsitterUserProfileImage ? {uri : `http://192.168.0.10:8080/userImageFile/${this.state.petsitterUserProfileImage}`} : require("../../../img/user.png");
        return(
        <View style={styles.listBar}>
            <View style={{alignItems : 'center', justifyContent: 'center'}}>
                    <Image source={petsitterImageSource} style={{width : 60, height : 60, margin : 18}}/>
            </View>
            <View style={{justifyContent: 'center', marginLeft : 15}}>
                <View>
                    <Text style={{fontSize : 17, fontWeight : 'bold'}}>{this.state.petsitterIntroduceOneline}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text>{this.state.petsitterName}</Text>
                    <TouchableOpacity style={{marginLeft:10}}>
                        <Text style={{color : Colors.buttonSky}}>프로필 보기</Text>
                    </TouchableOpacity>
                </View>
                {this.state.starCount == 0 ?  (<Text style={{fontSize:12, color:Colors.grey, paddingTop :10}}>아직 등록된 리뷰가 없어요!</Text>) :
                    (
                        <View style={{flexDirection :'row', paddingTop :10}}>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={this.state.starCount}
                                fullStarColor={Colors.buttonSky}
                                starSize={18}
                            />
                            <Text>  {this.state.starCount} ({this.state.reviewCount})</Text>
                        </View>
                    )
                }
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
    constructor(props){
        super(props)
        this.state={
            smallpetDayPrice : this.props.priceData.smallpetDayPrice, 
            smallpetNightPrice : this.props.priceData.smallpetNightPrice,
            middlepetDayPrice : this.props.priceData.middlepetDayPrice,
            middlepetNightPrice : this.props.priceData.middlepetNightPrice,
            bigpetDayPrice : this.props.priceData.bigpetDayPrice,
            bigpetNightPrice : this.props.priceData.bigpetNightPrice
        }
    }

    _addCommma = (price) =>{
        let rslt = '';
        if(price == 0){
            rslt = '이용불가';
        }else{
            rslt = '₩ ' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return rslt
    };

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
                            <Text style={styles.priceText}>{this._addCommma(this.state.smallpetNightPrice)}</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.priceText}>{this._addCommma(this.state.middlepetNightPrice)}</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.priceText}>{this._addCommma(this.state.bigpetNightPrice)}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:'row', justifyContent : 'space-between', marginTop : 10}}>
                        <View style={{flex:0.5, alignItems : 'center'}}>
                            <Text style={styles.priceText}>데이</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.priceText}>{this._addCommma(this.state.smallpetDayPrice)}</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.priceText}>{this._addCommma(this.state.middlepetDayPrice)}</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.priceText}>{this._addCommma(this.state.bigpetDayPrice)}</Text>
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
    constructor(props){
        super(props);
        this.state = {
            petsitterEnv : this.props.petsitterEnv
        };
    };

    render(){
        return(
            <View style={styles.EnvBar}>
                <View style={{flex:0.5,alignItems : 'center', flexDirection: 'row',marginLeft : 20}}>
                    <View style={styles.blueCircle}/>
                    <Text style={{fontWeight:'bold'}}>펫시팅 환경</Text>
                </View>
                <View style={{flex:1,alignItems : 'center', flexDirection: 'row'}}>
                    <Text>{this.state.petsitterEnv}</Text>
                </View>
            </View>
        )
    };
};

class PetYN extends Component {
    constructor(props){
        super(props);
        this.state = {
            petsitterHasPet : this.props.petsitterHasPet
        }
    };

    render(){
        return(
            <View style={styles.EnvBar}>
                <View style={{flex:0.5,alignItems : 'center', flexDirection: 'row',marginLeft : 20}}>
                    <View style={styles.blueCircle}/>
                    <Text style={{fontWeight:'bold'}}>반려동물 여부</Text>
                </View>
                <View style={{flex:1,alignItems : 'center', flexDirection: 'row'}}>
                    {this.state.petsitterHasPet == 0 ? 
                    (
                        <Text>현재는 반려동물을 키우지 않아요</Text>

                    ) : (
                        <Text>{this.state.petsitterHasPet}마리 키우고 있어요.</Text>
                    )}
                    
                </View>
            </View>
        )
    };
};

class Improssible extends Component {
    constructor(props){
        super(props);
        this.state = {
            markingImpossible : this.props.impoData.markingImpossible,
            bowelImpossible : this.props.impoData.bowelImpossible,
            attackImpossible : this.props.impoData.attackImpossible, 
            separationImpossible : this.props.impoData.separationImpossible,
            biteImpossible : this.props.impoData.biteImpossible,
        };
    };

    componentDidMount(){
        this._impossibleConv(this.props.impoData);
    }

    _impossibleConv = (impoData) =>{
        let rsltStr = '';
        let impoArr = [];
        let mark = impoData.markingImpossible=='true' ? '마킹 심한 아이' : '';
        let bowel = impoData.bowelImpossible=='true' ? '중성화하지 않은 아이' : '';
        let attack = impoData.attackImpossible=='true' ? '공격적인 아이' : '';
        let separation = impoData.separationImpossible=='true' ? '분리불안이 심한 아이' : '';
        let bite = impoData.biteImpossible=='true' ? '물건을 심하게 물어 뜯는 아이' : '';

        impoArr.push(mark);
        impoArr.push(bowel);
        impoArr.push(attack);
        impoArr.push(separation);
        impoArr.push(bite);

        for(let i = 0;i < impoArr.length; i++){
            if(i!=(impoArr.length-1)){
                if(impoArr[i]!=''){
                    rsltStr = rsltStr + impoArr[i] + ", "; 
                }
            }else{
                rsltStr = rsltStr + impoArr[i];
            }
        }
        return rsltStr;
    };


    render(){
        return(
            <View style={styles.impossibleBar}>
                <View style={{flex:0.5,alignItems : 'center', flexDirection: 'row',marginLeft : 20, marginTop:15,marginBottom:15}}>
                    <View style={styles.redCircle}/>
                    <Text style={{fontWeight:'bold'}}>펫시팅 불가</Text>
                </View>
                <View style={{flex:1,alignItems : 'center', flexDirection: 'row',marginTop:15,marginBottom:15}}>
                    <Text>{this._impossibleConv(this.state)}</Text>
                </View>
            </View>
        )
    };
};

class Review extends Component{
    constructor(props){
        super(props);
        this.state = {
            nowCount : 0,
            allCount : this.props.reviewCount,
            reviews : this.props.reviews,
            petsitterNo : this.props.petsitterNo
        };
    };

    _renderItem = ({item}) => (
        <ReviewContents
            key = {item.reviewNo}
            starCount = {item.starCount}
            avatarUrl = {item.fileName} 
            userName = {item.userName}
            reviewText = {item.reviewText}
        />
    );

    _moreReivew = (reviews) => {
        this.setState((prevState)=>({
            reviews : prevState.reviews.concat(reviews)
        }))
    }

    render(){
        return(
            <View style={{flexDirection:'column', marginTop : 6}}>
                <View style={styles.reviewBar}>
                    <View style={{flex:1,alignItems : 'center', flexDirection: 'row',marginLeft : 10}}>
                        <View style={styles.blueCircle}/>
                        <Text style={{fontWeight:'bold', fontSize : 15}}>리뷰</Text>
                    </View>
                </View>
                <View style={{flex:1}}>
                    <FlatList
                        data={this.state.reviews}
                        renderItem={this._renderItem} 
                        keyExtractor={ (item, index) => index.toString() }
                    />
                </View>
                {this.state.allCount > 3 ? this.state.allCount != this.state.reviews.length ? <MoreReview moreReviewRt={this._moreReivew} reviewNow={this.state.nowCount} petsitterNo={this.state.petsitterNo}/>  : null : null}
            </View>
        );
    };
};

class MoreReview extends Component{
    constructor(props){
        super(props);
        this.state = {
            reviewNow : this.props.reviewNow + 3,
            petsitterNo : this.props.petsitterNo 
        };
    };

    _moreReviewRt = async() => {
        const params = {
            petsitterNo : this.state.petsitterNo,
            reviewNow : this.state.reviewNow
        }
        await fetch('http://192.168.0.8:8091/booking/getMoreReview.do', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
        .then((response) => response.json())
        .then((res => {
            this.props.moreReviewRt(res);
            this.setState((prevState)=>({
                reviewNow : prevState.reviewNow + 3
            }))
        }))
        .catch((err) => {
        })

    };

    render(){
        return(
            <View style={{backgroundColor : Colors.white, alignItems : 'center', paddingTop:5}}>
                    <TouchableOpacity 
                        style={{width : '85%', height : 40, backgroundColor : Colors.buttonSky,borderRadius:10, justifyContent : 'center', alignItems : 'center'}}
                        onPress={this._moreReviewRt}    
                    >
                        <Text style={{color:Colors.white}}>더보기</Text>
                    </TouchableOpacity>
            </View>
        );
    };
};

class ReviewContents extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName : this.props.userName,
            avatarUrl : this.props.avatarUrl,
            reviewText : this.props.reviewText,
            starCount : this.props.starCount
        };
    };

    render(){
        return(
            <View style={styles.reviewContentsBar}>
                <View style={{alignItems : 'center', justifyContent: 'center'}}>
                        <Image source={{ uri : this.state.avatarUrl}} style={{width : 30, height : 30, margin : 10}}/>
                </View>
                <View style={{justifyContent: 'center', marginLeft : 15}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight : 'bold'}}>{this.state.userName}   </Text>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={this.state.starCount}
                            fullStarColor={Colors.buttonSky}
                            starSize={15}
                        />
                        <Text>   {this.state.starCount}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginTop:2}}>
                        <Text>{this.state.reviewText}</Text>
                    </View>
                </View>
            </View>
        );
    };
}

class BottomRequest extends Component{
    constructor(props) {
        super(props);
    };


    render(){
        return(
            <View style={styles.bottomRequest}>
                <TouchableOpacity style={styles.bottomButton} onPress={()=>{this.props.navigation.navigate('BookingDate', {petsitterNo : this.props.petsitterNo, petsitterUserImage:this.props.petsitterUserProfileImage})}}>
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
        width : width
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
        marginBottom : 2,
    },
    reviewBar : {
        flex:1,
        flexDirection: 'row',
        justifyContent : 'space-around',
        paddingHorizontal: 10,
        paddingVertical: 5,
        height : 30,
        backgroundColor : Colors.white,
    },
    reviewContentsBar : {
        flex:1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor : Colors.white,
        width : width
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