import React from 'react';
import SwitchNavigator from './navigation/SwitchNavigator.js'
import { Provider } from 'react-redux'
import firebase from './config/firebase'
import store from './store';
console.disableYellowBox = true;

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <SwitchNavigator />
            </Provider>
        );
    }
}