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
    Image,
    AsyncStorage,
    ActivityIndicator,
    FlatList
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
            userNo : '',
            petList : null,
            activityIndicator : false,
            noPetList : false
        }
        this._getUserNo();
        this._getPetList();
    }

    _getUserNo = async() => {
        const userNo = await AsyncStorage.getItem('userInfo');
        this.setState({
            userNo : userNo
        })
    }

    _getPetList = async() => {
        const userNo = await AsyncStorage.getItem('userInfo');
        const params = {
            userNo : userNo
        }
        await fetch('http://192.168.0.10:8080/pet/getPetList.do', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
          })
          .then((response) => response.json())
          .then((res => {
                if(res != null){
                    this.setState({
                        petList : res
                    })
                }else{
                    this.setState({
                        noPetList : true
                    })
                }
          }))
          
    }



    componentDidMount() {
        this.props.navigation.setParams({petRegView : this._saveDetails});
    }

    _saveDetails = () => {
        this.props.navigation.navigate('PetRegView');
    }

    _onPressPetFlatList = (petNo) => {
        console.log(petNo);
        this.props.navigation.navigate('PetUpdateView', {petNo : petNo});
    }

    render(){
        return(
            <View style={{width : width, height : height, backgroundColor : Colors.white}}>
                {this.state.activityIndicator ? (
                    <View style={{backgroundColor : 'rgba(0,0,0,0.2)', width : width, height : height, position : 'absolute', zIndex : 10, alignItems : 'center', justifyContent : 'center'}}>
                        <ActivityIndicator size="large" color="#10b5f1"/>
                    </View>
                ) : (null)}
                <ScrollView>
                    <FlatList
                        data={this.state.petList}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => <PetFlatList item={item} onPressPetFlatList={this._onPressPetFlatList}/>}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </ScrollView>    
            </View>
        );
    }
}

class PetFlatList extends Component{
    render() {
        const{petName, petNo, petKind, petFileName, age, petGender} = this.props.item;
        const uri = {uri : 'http://192.168.0.10:8080/petImageFile/' + this.props.item.petFileName};
        return(
            <View>
                <View style={{height : 80, alignItems : 'center', marginTop : 10}}>
                    <TouchableOpacity 
                        style={{ 
                            height : '100%', 
                            width : '90%', 
                            flexDirection : 'row'
                        }}
                        onPress={() => this.props.onPressPetFlatList(petNo)}
                    >
                        <View style={{ height : '100%', width : '20%', alignItems : 'center', justifyContent : 'center'}}>
                            <Image source={uri} style={{width : '100%', height : '100%', borderRadius : width/2}}/>
                        </View>
                        <View style={{height : '100%', width : '80%', alignItems : 'center', justifyContent : 'center'}}>
                            <Text style={{fontSize : 15}}>{this.props.item.petName}/{petGender == 'male' ? '남' : '여'}/{age}살/{petKind}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{borderBottomWidth : 1, borderBottomColor : Colors.lightGrey, marginTop : 10}}></View>
            </View>
        );
    }

    
}

PetFlatList.propTypes = {
    item : PropTypes.object.isRequired,
    onPressPetFlatList : PropTypes.func.isRequired
}