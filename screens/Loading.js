import React, { Component } from 'react';
import { View, ActivityIndicator, Dimensions, StatusBar } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { getUser } from '../actions/user';

const { height, width } = Dimensions.get('window');

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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <StatusBar hidden={true} />
                <ActivityIndicator size={65} color="#ff741a" />
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