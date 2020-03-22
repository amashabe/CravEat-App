import React, { Component } from 'react';
import { View, ActivityIndicator, Dimensions, StatusBar } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { getUser, updateToken } from '../actions/user';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import axios from 'axios';
const HERE_MAPS_API = 'https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json';
const HERE_MAPS_KEY_API = 'EGd7qrUMgE5euGI08Uzs6CbA8CG-MEaiNvHE97uThlg';

const { height, width } = Dimensions.get('window');

class Loading extends Component {
    componentDidMount = () => {
        this.registerForPushNotificationsAsync();
         this.getLocations()
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
    

    getLocations = async () => {
        const permission = await Permissions.askAsync(Permissions.LOCATION)
        if (permission.status === 'granted') {
            const location = await Location.getCurrentPositionAsync()
            console.log(location)
            axios.get(`${HERE_MAPS_API}?apiKey=${HERE_MAPS_KEY_API}&mode=retrieveAddresses&prox=${location.coords.latitude},${location.coords.longitude}, 1`)
            .then(response => {
                }).catch((error) => {
                    console.log('error 3 ' + error);
                });
        }
    }

    registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(
                Permissions.NOTIFICATIONS
            );
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(
                    Permissions.NOTIFICATIONS
                );
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            let token = await Notifications.getExpoPushTokenAsync();
            if (token != null) {
                this.props.updateToken(token);
            }
        } else {
            this.props.updateToken(null);
        }
    };
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

export default connect(mapStateToProps, { getUser, updateToken })(Loading);