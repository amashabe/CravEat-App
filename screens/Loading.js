import React, { Component } from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { getUser } from '../actions/user';
import styles from "../styles";

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
            <View style={styles.container}>
                <ActivityIndicator color="orange" size={69} />
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