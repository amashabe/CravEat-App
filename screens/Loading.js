import React, { Component } from 'react';
import { View, ActivityIndicator, Image, Dimensions } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { getUser } from '../actions/user';
import styles from "../styles";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class Loading extends Component {
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.getUser(user.uid)
                if (this.props.user != null) {
                    this.props.navigation.navigate('Home')
                }
            }
            else {
                this.props.navigation.navigate('SignIn')
            }
        })
    }
    render() {
        return (
            <View >
                <Image source={require('../assets/splash.png')} style={{ height: height * 1, width: width * 1 }} />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUser })(Loading);