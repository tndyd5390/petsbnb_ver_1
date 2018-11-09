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
    AsyncStorage
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import Category from './components/Explore/Category';
import Colors from '../utils/Colors';

const{height, width} = Dimensions.get('window');

class Explore extends Component {
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
                            />
                        </View>
                    </View>
                    <ScrollView
                        scrollEventThrottle={16}
                    >
                    <TouchableOpacity
                        onPress={this._checkData}
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
                                    펫시터 알바 입니다.
                                </Text>
                                <Text style={styles.exploreImageDescription}>
                                    성남시 분당구 불곡산 산책을 시키며...
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                        <View style={styles.exploreContainer}>
                            <View style={styles.exploreWrapper}>
                                <View style={styles.exploreImageView}>
                                    <Image
                                        source={require('../../assets/home.jpg')}
                                        style={styles.exploreImage}
                                    />
                                </View>
                                <Text style={styles.exploreImageTitle}>
                                    펫시터 알바 입니다.
                                </Text>
                                <Text style={styles.exploreImageDescription}>
                                    성남시 분당구 불곡산 산책을 시키며...
                                </Text>
                            </View>
                        </View>
                        <View style={styles.exploreContainer}>
                            <View style={styles.exploreWrapper}>
                                <View style={styles.exploreImageView}>
                                    <Image
                                        source={require('../../assets/home.jpg')}
                                        style={styles.exploreImage}
                                    />
                                </View>
                                <Text style={styles.exploreImageTitle}>
                                    펫시터 알바 입니다.
                                </Text>
                                <Text style={styles.exploreImageDescription}>
                                    성남시 분당구 불곡산 산책을 시키며...
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}
export default Explore;

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
        paddingTop : 20
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