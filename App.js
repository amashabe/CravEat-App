import React from 'react';
import SwitchNavigator from './navigation/SwitchNavigator';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import firebase from './config/firebase';
import store from './store';
console.disableYellowBox = true;

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        accent: 'yellow',
    },
};


export default class App extends React.Component {
    render() {
        return (
            <StoreProvider store={store}>
                <PaperProvider theme={theme}>
                    <SwitchNavigator />
                </PaperProvider>
            </StoreProvider>
        );
    }
}
