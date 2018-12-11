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
const{width, height} = Dimensions.get('window');

export default class PetSitterReservationMenu extends Component{
    render() {
        return(
            <View style={styles.container}>
                <ScrollView>
                    <TouchableOpacity style={{width : width, height : 50, borderBottomWidth : 1, borderBottomColor : Colors.black, justifyContent : 'center'}}
                        
                    >
                        <Text style={{marginLeft : 10, fontSize : 15, fontWeight : '600'}}>요청 예약보기</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={{width : width, height : 50, borderBottomWidth : 1, borderBottomColor : Colors.black, justifyContent : 'center', marginTop : 0}}
                        
                    >
                        <Text style={{marginLeft : 10, fontSize : 15, fontWeight : '600'}}>예약 가능 날짜 설정</Text>
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