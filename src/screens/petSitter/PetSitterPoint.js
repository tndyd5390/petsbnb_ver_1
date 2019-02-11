import React, { Component } from "react";
import PropTypes from "prop-types";
import Colors from "../../utils/Colors";
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    ListView,
    TouchableOpacity
} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
const{ width, height } = Dimensions.get("window");

export default class PetSitterPoint extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <View style={{width: width, height: height, backgroundColor: Colors.white, flex: 1}}>
                <View style={{alignItems: "center", width: width}}>
                    <View style={{width: "95%", height: 120, flexDirection: "row"}}>
                        <View style={{width: "40%", alignItems: "center", justifyContent: "center"}}>
                            <Image
                                style={{width: 100, height: 100}}
                                source={require("../../../img/user.png")}
                            />
                        </View>
                        <View style={{width: "60%"}}>
                            <View style={{ height: "60%", justifyContent: "center"}}>
                                <Text style={{fontSize: 20}}>박수용</Text>
                            </View>
                            <View style={{height: "40%", justifyContent: "center"}}>
                                <Text style={{fontSize: 18}}>보유한 포인트 : 0p</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{width: width, alignItems: "center"}}>
                    <View style={{ width: "95%", height: 385}}>
                        <PointTabs/>
                    </View>
                </View>

                <View style={{alignItems: "center", width: width, position: "absolute", bottom: 10}}>
                    <View style={{width: "95%"}}>
                        <View style={[styles.bottomRequest, {borderRadius: 10}]}>
                            <TouchableOpacity style={styles.bottomButton} onPress={this._approvalReservation}>
                                <Text style={styles.bottomText}>환급 받기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>  
            </View>
        )
    }
}

class PointTabs extends Component{ 
    constructor(props){
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'getPoint', title: '취득 내역'},
                { key: 'refundPoint', title: '환급 내역' },
            ],
        };
    }

    render() {
        const FirstRoute = () => (
            <GetPointListView/>
        );
        const SecondRoute = () => (
            <RefundPointListView/>
        );
        return(
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    getPoint: FirstRoute,
                    refundPoint: SecondRoute,
                })}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width }}
            />
        );
    }
}

class GetPointListView extends Component {
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const sample = [
            {
                id: "1",
                date: "2018/02/11",
                point: "200"
            },
            
        ]
        this.state = {
            dataSource: ds.cloneWithRows(sample)
        }

    }

    _renderItem = (data) => {
        return(
            <View style={{borderBottomWidth: 1, borderBottomColor: Colors.grey}}>
                <TouchableOpacity
                    onPress={() => console.log(data.id)}
                >
                    <View style={{height: 50, alignItems: "center", justifyContent: "center"}}>
                        <View style={{width: "70%", justifyContent: "space-between", flexDirection: "row"}}>
                            <View>
                                <Text style={{fontSize: 20}}>{data.date}</Text>
                            </View>
                            <View>
                                <Text style={{fontSize: 20}}>{data.point}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return(
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderItem}
            />
        )
    }
}

class RefundPointListView extends Component{
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const sample = [
            {
                id: "1",
                date: "2018/02/11",
                point: "3500",
                status: "처리중"
            },
            
        ]
        this.state = {
            dataSource: ds.cloneWithRows(sample)
        }
    }

    _renderItem = (data) => {
        return(
            <View style={{borderBottomWidth: 1, borderBottomColor: Colors.grey}}>
                <TouchableOpacity
                    onPress={() => console.log(data.id)}
                >
                    <View style={{flexDirection: "row", justifyContent: "center", height: 50}}>
                        <View style={{width: "40%", alignItems: "center", justifyContent: "center"}}>
                            <Text style={{fontSize: 17}}>{data.date}</Text>
                        </View>
                        <View style={{width: "30%", alignItems: "center", justifyContent: "center"}}>
                            <Text style={{fontSize: 17}}>{data.point}</Text>
                        </View>
                        <View style={{width: "30%", alignItems: "center", justifyContent: "center"}}>
                            <Text style={{fontSize: 17}}>{data.status}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return(
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderItem}
            />
        )
    }
}



const styles = StyleSheet.create({
    scene: {
      flex: 1,
    },
    bottomRequest : {
        justifyContent: 'center', 
        alignItems: 'center',
        width:'100%',
        height : 60,
        backgroundColor : Colors.buttonSky,
        flexDirection : 'row'
    },
    bottomButton : {
        alignItems: 'center',
        justifyContent: 'center',
        width : '100%',
        height : '100%'
    },
    bottomText : {
        fontSize : 20,
        color : Colors.white,
        fontWeight: "600"
    },
});