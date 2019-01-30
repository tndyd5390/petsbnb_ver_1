import React, { Component } from 'react';
import {View, Text} from 'react-native';
import IMP from 'iamport-react-native';
export default class Payment extends Component {
    static navigationOptions = {
        title: 'Payment'
      }
    
      callback = (response) => {
        const { navigation } = this.props;
        navigation.replace('PaymentResult', response);
      }
    
      render() {
        const { navigation } = this.props;
        const pg = navigation.getParam('pg');
        const pay_method = navigation.getParam('pay_method');
        let data = {
          pg,
          pay_method,
          app_scheme: "example",
          name : navigation.getParam("name"),
          amount : '100',//navigation.getParam("amount"),
          buyer_email : navigation.getParam("buyer_email"),
          buyer_name: navigation.getParam("buyer_name"),
          buyer_addr: navigation.getParam("buyer_addr"),
          buyer_tel : navigation.getParam("buyer_tel"),
          buyer_postcode: navigation.getParam("buyer_postcode"),
          merchant_uid: navigation.getParam("merchant_uid"),
          custom_data : {
              "mid" : navigation.getParam("merchant_uid"),
              "stDate" : navigation.getParam("stDate"),
              "edDate" : navigation.getParam("edDate"),
              "serviceProvider": navigation.getParam("serviceProvider"),
              "serviceReceiver": navigation.getParam("serviceReceiver"),
              "careKind": navigation.getParam("careKind"),
              "checkin": navigation.getParam("checkin"),
              "checkout": navigation.getParam("checkout"),
              "petNo": navigation.getParam("petNo").toString()
          }
      }

      console.log(data);
    
        /* 가상계좌의 경우, 입금기한 추가 */
        const vbank_due = navigation.getParam('vbank_due');
        if (pay_method === 'vbank' && vbank_due) {
          data['vbank_due'] = vbank_due;
        }
    
        /* 정기결제의 경우, customer_uid는 필수입력필드 */
        if (pg === 'kcp_billing') {
          data['customer_uid'] = `cuid_${new Date().getTime()}`;
        }
    
        /* 네이버 체크아웃 대비 */
        if (pg === 'naverco') {
          data['naverProducts'] = [{
            id: 1286,
            name: '\uae40\uce58 with icebox',
            basePrice: '10000',
            taxType: 'TAX',
            quantity: 1,
            infoUrl: 'http://demo.movingcart.kr/\uc0c1\ud488/%ea%b9%80%ec%b9%98-with-icebox',
            imageUrl: 'http://demo.movingcart.kr/wp-content/uploads/2015/08/blueberry.jpg',
            shipping: {
              groupId: '1-5',
              method: 'DELIVERY',
              baseFee: 5000,
              feeType: 'CONDITIONAL_FREE',
              feePayType: 'PREPAYED',
              feeRule: {
                freeByThreshold: 50000
              }
            }
          }, {
              id: 1287,
              name: 'just \uae40\uce58',
              basePrice: '20000',
              taxType: 'TAX',
              quantity: 1,
              infoUrl: 'http://demo.movingcart.kr/\uc0c1\ud488/just-%ea%b9%80%ec%b9%98',
              imageUrl: 'http://demo.movingcart.kr/wp-content/uploads/2015/08/fancybox.jpg',
              shipping: {
                groupId: '1-5',
                method: 'DELIVERY',
                baseFee: 3000,
                feeType: 'CONDITIONAL_FREE',
                feePayType: 'PREPAYED',
                feeRule: {
                  freeByThreshold: 50000
                }
            }
          }];
        }
    
        if (pay_method === 'phone') {
          data['digital'] = false;
        }
        
        return (
          <IMP.Payment 
            userCode={"imp79804178"}
            data={data}
            callback={this.callback}
            loading={{
              message: '잠시만 기다려주세요...',
              //image: require('../../img/iamport-logo.png')
            }}
          />
        );
      }
}