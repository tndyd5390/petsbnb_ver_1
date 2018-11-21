import React, {Component} from 'react';
import Colors from '../../utils/Colors';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Button,
    ScrollView,
    Image
} from 'react-native';
const{width, height} = Dimensions.get('window');

export default class PetList extends Component{

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerRight: <Icon name='plus' size={25} onPress={() => params.petRegView()} style={{marginRight : 20}}/>
        };
    };

    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.navigation.setParams({petRegView : this._saveDetails});
    }

    _saveDetails = () => {
        this.props.navigation.navigate('PetRegView');
    }

    render(){
        return(
            <View style={{width : width, height : height, backgroundColor : Colors.white}}>
                <ScrollView>
                    <View style={{borderWidth : 1, borderColor : Colors.black, height : 80, alignItems : 'center'}}>
                        <TouchableOpacity style={{borderWidth : 1, borderColor : Colors.black, height : '100%', width : '90%', flexDirection : 'row'}}>
                            <View style={{borderWidth : 1, borderColor : Colors.black, height : '100%', width : '20%', alignItems : 'center', justifyContent : 'center'}}>
                                <Image source={require('../../../img/petCare.jpg')} style={{width : '100%', height : '100%', borderRadius : width/2}}/>
                            </View>
                            <View style={{borderWidth : 1, borderColor : Colors.black, height : '100%', width : '80%', alignItems : 'center', justifyContent : 'center'}}>
                                <Text>누리/남/2살</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>    
            </View>
        );
    }
}
