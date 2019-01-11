import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView
} from "react-native";
import CalendarPicker from 'react-native-calendar-picker';
import Colors from '../../utils/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import Moment from 'react-moment';

export default class BookingDate extends Component{
    constructor(props) {
        super(props);
        this.state = {
          selectedStartDate: null,
          selectedEndDate: null,
          stDate : '',
          edDate : ''
        };
        this.onDateChange = this.onDateChange.bind(this);
      }
    
      onDateChange(date, type) {
        if (type === 'END_DATE') {
          this.setState({
            selectedEndDate: date,
          });
        } else {
          this.setState({
            selectedStartDate: date,
            selectedEndDate: null,
          });
        }
      }


    render(){
        const { selectedStartDate, selectedEndDate } = this.state;
        const minDate = new Date(); // Today
        const maxDate = new Date(2019, 6, 3);
        const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
        const endDate = selectedEndDate ? selectedEndDate.toString() : '';
        const date = {stDate : startDate, edDate : endDate};
        return(
            <SafeAreaView style={styles.safeAreaViewStyle}>
            <View style={styles.container}>
                <CalendarPicker
                startFromMonday={true}
                allowRangeSelection={true}
                minDate={minDate}
                maxDate={maxDate}
                weekdays={['월', '화', '수', '목', '금', '토', '일']}
                months={['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']}
                previousTitle="이전"
                nextTitle="다음"
                todayBackgroundColor={Colors.chatGreen}
                selectedDayColor={Colors.buttonSky}
                selectedDayTextColor={Colors.white}
                scaleFactor={375}
                textStyle={{
                    fontFamily: 'Cochin',
                    color: '#000000',
                }}
                onDateChange={this.onDateChange}
                />
            <View>
              <Caution/>
              <SelectedDate startDate={startDate} endDate={endDate}/>
            </View>
          </View>
            <BottomRequest navigation={this.props.navigation} date={date} petsitterNo={this.props.navigation.getParam('petsitterNo')}/>
        </SafeAreaView>
        );
    };
};

class Caution extends Component {
    constructor(props) {
        super(props); 
    }

    render(){
        return(
            <View style={styles.EnvBar}>
                <View style={{flex:0.5,alignItems : 'center', flexDirection: 'row',marginLeft : 20 }}>
                    <View style={styles.blueCircle}/>
                    <Text style={{fontWeight:'bold'}}>주의사항</Text>
                </View>
                <View style={{flex:1,alignItems : 'center', flexDirection: 'row'}}>
                    <Text>데이케어 이용자는 하루만 선택해주세요!</Text>
                </View>
            </View>
        )
    };
};

class SelectedDate extends Component {
    constructor(props) {
        super(props);
    }
    
    render(){
        chgDateFormat = (date) => {
            const chgDate = new Date(date);
            const rstl = {'year' : chgDate.getFullYear() ? chgDate.getFullYear() +"년" : '' , 
                            'month' : chgDate.getMonth()>=0 ? (chgDate.getMonth()+1)+ "월" : '', 
                            'day' : chgDate.getDate() ? chgDate.getDate() +"일" : ''};
            return rstl;
        };

        const stDate = chgDateFormat(this.props.startDate);
        const edDate = chgDateFormat(this.props.endDate);

        return(
            <View style={{flexDirection: 'row', flex:1, marginTop : 15}}>
                <View style={{flex:1,flexDirection :'column', alignItems :'center'}}>
                    <Text style={{fontSize : 17, fontWeight :'bold'}}>시작일</Text>
                    <Text style={{fontSize : 20, fontWeight :'bold', marginTop : 10}}>{stDate.year}</Text>
                    <View style={{flexDirection :'row', alignItems :'center', marginTop : 15}}>
                    <Text>{stDate.month}</Text><Text>{stDate.day}</Text>
                    </View>
                </View>
                <View style={{flex:1,flexDirection :'column',alignItems :'center'}}>
                    <Text style={{fontSize : 17, fontWeight :'bold'}}>종료일</Text>
                    <Text style={{fontSize : 20, fontWeight :'bold', marginTop : 10}}>{edDate.year}</Text>
                    <View style={{flexDirection :'row', alignItems :'center', marginTop : 15}}>
                    <Text>{edDate.month}</Text><Text>{edDate.day}</Text>
                    </View>
                </View>
            </View>
        )
    };
};


class BottomRequest extends Component{
    constructor(props) {
        super(props);
    }

    onSubmit = async() => {
        if(this.props.date.stDate==''){
            alert('시작일을 선택해주세요.');
            return false;
        }else if(this.props.date.edDate==''){
            alert('종료일을 선택해주세요.');
            return false;
        }else{
            if(this.props.date.stDate === this.props.date.edDate){
                    const params = {
                        petSitterNo : this.props.petsitterNo.toString()
                    }
                    await fetch('http://192.168.0.10:8080/petSitter/getPDTO.do', {
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(params),
                    })
                    .then((response) => response.json())
                    .then((res => {
                        if(res){
                            //여기는 사용자가 날짜를 선택하고나서 다음 화면으로 넘어가는 코드인데
                            //만약 펫시터가 데이케어를 모두 이용 불가를 해놓았다면 넘어가선 안된다.
                            if(
                                res.smallPetDayPrice === '0' &&
                                res.middlePetDayPrice === '0' &&
                                res.bigPetDayPrice === '0'
                            ){
                                alert('선택하신 펫시터는 데이케어를 제공하지 않습니다.');
                                return;
                            }
                            this.props.navigation.navigate('DayBookingDetails', {date : this.props.date, pDTO : res});
                        }else{
                            alert('잠시후 다시 시도해주세요.');
                            this.props.navigation.goBack();
                        }
                        
                    }))
                    .catch((err) => {
                        console.log(err);
                        this.setState({activityIndicator : false});
                    })
            }else{
                const params = {
                    petSitterNo : this.props.petsitterNo.toString()
                }
                await fetch('http://192.168.0.10:8080/petSitter/getPDTO.do', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(params),
                })
                .then((response) => response.json())
                .then((res => {
                    if(res){
                        //여기는 사용자가 1박 케어를 선택하고 나서 다음화면으로 넘어가는 코드인데
                        //만약 펫시터가 1박 케어를 이용불가 해놓았다면 화면이 넘어가선 안된다.
                        if(
                            res.smallPetNightPrice === '0' &&
                            res.middlePetNightPrice === '0' &&
                            res.bigPetNightPrice === '0'
                        ){
                            alert('선택하신 펫시터는 하루 이상의 데이케어를 제공하지 않습니다.');
                            return;
                        }
                        this.props.navigation.navigate('NightBookingDetails', {date : this.props.date, pDTO : res});
                    }else{
                        alert('잠시후 다시 시도해주세요.');
                        this.props.navigation.goBack();
                    }
                    
                }))
                .catch((err) => {
                    console.log(err);
                    this.setState({activityIndicator : false});
                })
            }
        }
    }

    render(){
        return(
            <View style={styles.bottomRequest}>
                <TouchableOpacity style={styles.bottomButton} onPress={()=>this.onSubmit()}>
                    <Text style={styles.bottomText}>선택 완료</Text>
                </TouchableOpacity>
            </View>
        )
    };
};


const styles = StyleSheet.create({
    safeAreaViewStyle : {
        flex: 1,
        backgroundColor : Colors.lightGrey,
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: 3,
    },
    EnvBar : {
        flex:1,
        flexDirection: 'row',
        justifyContent : 'space-around',
        paddingHorizontal: 10,
        paddingVertical: 5,
        height : 60,
        backgroundColor : Colors.white,
        marginBottom : 20,
        marginTop : 30
    },
    blueCircle:{
        height: 10,
        width: 10,
        backgroundColor: Colors.buttonSky,
        borderRadius: 50,
        marginRight : 10
    },
    bottomRequest : {
        justifyContent: 'center', 
        alignItems: 'center',
        bottom: 0,
        width:'100%',
        height : 70,
        backgroundColor : Colors.buttonSky
    },
    bottomButton : {
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        width : '100%',
        height : '100%'
    },
    bottomText : {
        fontSize : 17,
        color : Colors.white
    },
  });
  