import React, {Component} from 'react';
import Colors from '../../utils/Colors';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator, withNavigation} from 'react-navigation';
import ProfileMenu from '../profile/ProfileMenu';
import CheckPassword from './CheckPassword';
import ProfileUserUpdate from './ProfileUserUpdate';
import PetList from './PetList';
import PetRegView from './PetRegView';
import PetUpdateView from './PetUpdateView';
import PetSitterApplyForm from '../petSitter/PetSitterApplyForm';
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
            PetRegView : {
                screen : PetRegView,
                navigationOptions : {
                    title: '반려동물 등록',
                    headerTitleStyle: {
                        width: '75%',
                        textAlign: 'center',
                    },
                }
            },
            PetList : {
                screen : PetList,
                navigationOptions : {
                    title: '반려동물 관리',
                    headerTitleStyle: {
                        width: '75%',
                        textAlign: 'center',
                    }
                }
            },
            PetUpdateView : {
                screen : PetUpdateView,
                navigationOptions : {
                    title: '반려동물 상세',
                    headerTitleStyle: {
                        width: '75%',
                        textAlign: 'center',
                    }
                }
            },
            PetSitterApplyForm : {
                screen : PetSitterApplyForm,
                navigationOptions : {
                    title: '펫시터 지원',
                    headerTitleStyle: {
                        width: '75%',
                        textAlign: 'center',
                    }
                }
            }
        })

        return(
            <ProfileStacks/>
        );
    }
}