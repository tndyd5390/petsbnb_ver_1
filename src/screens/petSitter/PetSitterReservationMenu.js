import React, {Component} from 'react';
import Colors from '../../utils/Colors';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RoundedButton from '../components/buttons/RoundedButton';
import { StackActions, NavigationActions } from 'react-navigation';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
    AsyncStorage,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import { ip } from "../../utils/const";
const{width, height} = Dimensions.get('window');

export default class PetSitterReservationMenu extends Component{

    constructor(props) {
        super(props);
        this.state={
            activityIndicator: false
        };
    };

    _goPetSitterReservationList = async() => {
        this.setState({
            activityIndicator: true
        });
        const userNo = await AsyncStorage.getItem("userInfo");
        const params = {
            userNo
        };
        fetch(ip + "/petSitter/petSitterReservationList.do", {
            method: "POST",
            headers : {
                Accept : "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
        .then(response => response.json())
        .then(res => {
            this.setState({
                activityIndicator: false
            });
            this.props.navigation.navigate("PetSitterReservationList", {
                reservationList: res
            });
        })
        .catch(err => {

        });
    }

    render() {
        return(
            <View style={styles.container}>
                {this.state.activityIndicator ? (
                    <View style={{backgroundColor : 'rgba(0,0,0,0.2)', width : width, height : height, position : 'absolute', zIndex : 10, alignItems : 'center', justifyContent : 'center'}}>
                        <ActivityIndicator size="large" color="#10b5f1"/>
                    </View>
                ) : (null)}
                <ScrollView>
                    <TouchableOpacity 
                        style={{
                            width : width, 
                            height : 50, 
                            borderBottomWidth : 1, 
                            borderBottomColor : Colors.black, 
                            justifyContent : 'center'
                        }}
                        onPress={this._goPetSitterReservationList}
                    >
                        <Text style={{marginLeft : 10, fontSize : 15, fontWeight : '600'}}>요청 예약보기</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={{width : width, height : 50, borderBottomWidth : 1, borderBottomColor : Colors.black, justifyContent : 'center', marginTop : 0}}
                        onPress={()=>{this.props.navigation.navigate('PetSitterReservationExposure')}}
                    >
                        <Text style={{marginLeft : 10, fontSize : 15, fontWeight : '600'}}>예약 게시 설정</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{width : width, height : 50, borderBottomWidth : 1, borderBottomColor : Colors.black, justifyContent : 'center', marginTop : 0}}
                    >
                        <Text style={{marginLeft : 10, fontSize : 15, fontWeight : '600'}}>고객리뷰</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        backgroundColor : Colors.white,
        flex : 1
    }
})