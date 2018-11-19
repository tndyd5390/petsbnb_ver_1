import React, {Component} from 'react';
import Colors from '../utils/Colors';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Button
} from 'react-native';
const{width, height} = Dimensions.get('window');

export default class PetList extends Component{

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerRight: <Icon name='plus' size={25} onPress={() => params.petRegView()} style={{marginRight : 20}}/>
        };
    };

    componentDidMount() {
        this.props.navigation.setParams({petRegView : this._saveDetails});
    }

    _saveDetails = () => {
        this.props.navigation.navigate('PetRegView');
    }

    render(){
        return(
            <View>
                <Text>펫리스트</Text>
            </View>
        );
    }
}
