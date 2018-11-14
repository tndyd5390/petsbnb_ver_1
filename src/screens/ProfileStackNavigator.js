import React, {Component} from 'react';
import Colors from '../utils/Colors';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator, withNavigation} from 'react-navigation';
import ProfileMenu from './ProfileMenu';
import CheckPassword from './CheckPassword';
import ProfileUserUpdate from './ProfileUserUpdate';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
} from 'react-native';

export default class ProfileStackNavigator extends Component{
    render() {
        console.log("parentNav")
        console.log(this.props.rootStack);
        const ProfileStacks = createStackNavigator({
            ProfileUserUpdate : {
                screen : ProfileUserUpdate,
                navigationOptions : {
                    title: '회원정보',
                    headerTitleStyle: {
                        width: '75%',
                        textAlign: 'center',
                    },
                }
            },
            ProfileMenu : {
                screen : props => <ProfileMenu {...props} rootStack={this.props.rootStack}/>,
                navigationOptions : {
                    header : null
                }
            },
            CheckPassword : {
                screen : CheckPassword,
                navigationOptions : {
                    title: '비밀번호 확인',
                    headerTitleStyle: {
                        width: '75%',
                        textAlign: 'center',
                    },
                }
            },
            
        })

        return(
            <ProfileStacks/>
        );
    }
}