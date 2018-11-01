import React, {Component} from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'
import PropTypes from 'prop-types';
class Category extends Component { 
    render() {
        return (
            <View style={{height : 130, width : 130, marginLeft : 20, borderWidth : 0.5, borderColor : '#dddddd'}}>
                <View style={{flex : 2}}>
                    <Image 
                        source={this.props.imageUri}
                        style={{flex : 1, width : null, height : null, resizeMode : 'cover'}}
                    />
                </View>
                <View style={{flex : 1, paddingLeft : 10, paddingTop : 10}}>
                    <Text>
                        {this.props.name}
                    </Text>
                </View>
            </View>
        );
    }
}

Category.propTypes = {
    imageUri : PropTypes.number.isRequired,
    name : PropTypes.string.isRequired
}

export default Category;

const styles = StyleSheet.create({

});