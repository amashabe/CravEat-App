import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';

class Listing extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <StatusBar hidden={true} />
                <Text>Listing</Text>
            </View>
        );
    }
}

export default Listing;