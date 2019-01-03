import React, { Component } from "react";
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
    FlatList,
    ActivityIndicator,
    RefreshControl
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import Category from './components/Explore/Category';
import Colors from '../utils/Colors';
import RNFetchBlob from 'react-native-fetch-blob';
import StarRating from 'react-native-star-rating';

const{height, width} = Dimensions.get('window');

export default class Explore extends Component {
    constructor(props){
        super(props)

        this.state = {
            data : [],
            page: 0,
            firstLoad : true,
            activityIndicator : true,
            refreshing : false,
            isLoading : false,
            footerLoading : true,
            enableScrollViewScroll: true,
            search : ''
        }
    };

    componentWillMount(){
        this._getBookingList();
    }

    _refreshList = () =>{
        this.setState(state => ({ page: 0 }), () => this._getBookingList());
    }

    _getBookingList = async() => {
        const params = {
            search : this.state.search,
            page : (this.state.page * 2),
        }

        console.log(this.state.page);

        if(this.state.page==0){
            this.setState({
                refreshing : true, 
                activityIndicator : true,
                firstLoad : false
            });
        }else{
            this.setState({
                footerLoading : false,
            });
        }
        
        await fetch('http://192.168.0.8:8091/booking/getBookingList.do', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
        .then((response) => response.json())
        .then((res => {
            if(this.state.page==0){
                this.setState({
                    refreshing: false,
                    firstLoad : false,
                    activityIndicator : false,
                    data : res
                });
            }else{
                if(res.length!=0){
                    this.setState((prevState)=>({
                        footerLoading : true,
                        refreshing: false,
                        activityIndicator : false,
                        data : prevState.data.concat(res)
                    }))
                }else{
                    this.setState({
                        firstLoad : true,
                        footerLoading : true,
                    })
                }
            }
        }))
        .catch((err) => {
            console.log(err);
        })

    };

    _onPressItem = (item) => {
        this.props.navigation.navigate('BookingDetail',{heart : false, petsitterNo: item.petsitterNo})
    };
     

    _renderItem = ({item}) => (
        <BookingsContents
            onPressItem = {this._onPressItem}
            petsitterNo = {item.petsitterNo}
            petsitterName = {item.petsitterName}
            petsitterIntroduceOneline = {item.petsitterIntroduceOneline}
            userAddress = {item.userAddress}
            userAddressDetail = {item.userAddressDetail}
            starCount = {item.starCount}
            reviewCount = {item.reviewCount}
            petsitterFileName = {item.petsitterFileName}
            petsitterFilePath = {item.petsitterFilePath}
        />
    )

    handleEnd = () => {
        if(!this.state.firstLoad){
            this.setState(state => ({ page: state.page + 1 }), () => this._getBookingList());
        }
    };

    _onChangeText = (text) =>{
        console.log(text);
        this.setState({
            search : text
        })
    }
r
    render() {
        return (
            <SafeAreaView style={styles.safeAreaViewStyle}>
                <View style={styles.searchTextInputContainer}>
                    <View style={styles.searchTextInputWrapper}>
                        <View style={styles.searchView}>
                            <Icon name="ios-search" size={20} style={styles.searchIcon} />
                            <TextInput
                                underlineColorAndroid="transparent"
                                placeholder="Try New Delhi"
                                placeholderTextColor="grey"
                                style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }}
                                onChangeText={this._onChangeText}
                            />
                        </View>
                    </View>
                    {/* <ScrollView
                        horizontal={ true }
                        scrollEventThrottle={16}
                        refreshControl={
                            <RefreshControl
                              refreshing={this.state.refreshing}
                              onRefresh={this._getBookingList}
                            />
                        }
                    > */}
                    {this.state.activityIndicator && (
                    <View style={{backgroundColor : Colors.white, width : width, height : height, position : 'absolute', zIndex : 10, alignItems : 'center', justifyContent : 'center'}}>
                        <ActivityIndicator size="large" color="#10b5f1"/>
                    </View>
                     )}
                    {!this.state.activityIndicator && (
                        <View style={{flex:1}}>
                        <FlatList
                            data={this.state.data}
                            extraData={this.state.refreshing} 
                            renderItem={this._renderItem} 
                            keyExtractor={ (item, index) => index.toString() }
                            refreshing={this.state.refreshing}
                            onRefresh={this._refreshList}
                            onEndReached={() => this.handleEnd()}
                            onEndReachedThreshold={0.0000000000000000000000001}
                            ListFooterComponent={() =>
                              this.state.footerLoading
                                ? null
                                : <ActivityIndicator size="large" animating />}
                
                        />
                        </View>
                    )}
                    {/* </ScrollView> */}
                </View>
            </SafeAreaView>
        );
    }
}

class BookingsContents extends Component{
    constructor(props){
        super(props);
        this.state = {
            petsitterNo : this.props.petsitterNo,
            petsitterName : this.props.petsitterName,
            petsitterIntroduceOneline : this.props.petsitterIntroduceOneline,
            starCount : this.props.starCount,
            reviewCount : this.props.reviewCount,
            petsitterFileName : this.props.petsitterFileName,
            petsitterFilePath : this.props.petsitterFilePath,
            userAddress : this.props.userAddress,
            userAddressDetail : this.props.userAddressDetail
        }
    };
    
    _onPress = () => {
        this.props.onPressItem(this.state);
    };


    render(){
        return(
            <TouchableOpacity
                onPress={() => this._onPress()}
            >
                <View style={styles.exploreContainer}>
                    <View style={styles.exploreWrapper}>
                        <View style={styles.exploreImageView}>
                            <Image
                                source={require('../../assets/home.jpg')}
                                style={styles.exploreImage}
                            />
                        </View>
                        <Text style={styles.exploreImageTitle}>
                            {this.state.petsitterIntroduceOneline}
                        </Text>
                        <Text style={{color : Colors.grey}}>
                            {this.state.userAddress}
                        </Text>
                        <Text style={styles.exploreImageDescription}>
                            {this.state.petsitterName}
                        </Text>
                        {this.state.starCount == 0 ?  (<Text style={{fontSize:12, color:Colors.grey}}>아직 등록된 리뷰가 없어요!</Text>) :
                            (
                                <View style={{flexDirection :'row'}}>
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
            </TouchableOpacity>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    safeAreaViewStyle : {
        flex: 1,
        backgroundColor : Colors.white
    },
    searchTextInputContainer : {
        flex : 1
    },
    searchTextInputWrapper : { 
        backgroundColor: 'white', 
        borderBottomWidth: 1, 
        borderBottomColor: '#dddddd',
        ...Platform.select({
            ios : {
                height : 80
            },
            android : {
                height : 100 + StatusBar.currentHeight
            }
        })
    },
    searchView : {
        flexDirection: 'row', padding: 10,
        backgroundColor: 'white', marginHorizontal: 20,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        elevation: 1,
        marginTop: Platform.OS == 'android' ? 30 : null
    },
    searchIcon : { 
        marginRight: 10, 
        marginTop : 15 
    },
    exploreContainer : {
        flex : 1, 
        backgroundColor : 'white', 
        paddingTop : 20,
        paddingBottom : 10
    },
    exploreWrapper : {
        paddingHorizontal : 20
    },
    exploreImageView : {
        width : width-40, 
        height : 200, 
        marginTop : 10
    },
    exploreImage : {
        flex : 1, 
        height : null, 
        width : null, 
        resizeMode : 'cover', 
        borderRadius : 5, 
        borderWidth : 1, 
        borderColor : '#dddddd'
    },
    exploreImageTitle : {
        fontSize : 24, 
        fontWeight : '700'
    },
    exploreImageDescription : {
        fontWeight : '100', 
        marginTop : 10
    }
});