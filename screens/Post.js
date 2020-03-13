import React from 'react';
import { connect } from 'react-redux';
import * as Location from 'expo-location';
import { updateDescription, uploadPost, updateRecipe, updateLocation } from '../actions/post'
import { FlatList, Modal, SafeAreaView, Text, View, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native';
import * as Permissions from 'expo-permissions';
import styles from '../styles';
import ImagePicker from "./ImagePicker";
const GOOGLE_API = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const googleApiKey = 'AIzaSyAgjhZeIV4iIBe4cDyudFsyVGgVFK3P38U';

class Post extends React.Component {
    state = {
        showModal: false,
        locations: []
    }

    setLocation = (location) => {
        const place = {
            name: location.name,
            coords: {
                lat: location.geometry.location.lat,
                lng: location.geometry.location.lng
            }
        }
        this.setState({ showModal: false })
        this.props.updateLocation(place)
    }

    getLocations = async () => {
        this.setState({ showModal: true })
        const permission = await Permissions.askAsync(Permissions.LOCATION)
        if (permission.status === 'granted') {
            const location = await Location.getCurrentPositionAsync()
            const url = `${GOOGLE_API}?location=${location.coords.latitude},${location.coords.longitude}&rankby=distance&key=${googleApiKey}`
            const response = await fetch(url)
            const data = await response.json()
            this.setState({ locations: data.results })
        }
    }

    _onUploadPost = () => {
        this.props.uploadPost();
        this.props.navigation.navigate('Home')
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled keyboardVerticalOffset={100}>
                  <StatusBar hidden={true} />
                <Modal animationType='slide' transparent={false} visible={this.state.showModal}>
                    <SafeAreaView style={[styles.container, styles.center]}>
                        <FlatList
                            keyExtractor={(item) => item.id}
                            data={this.state.locations}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.border} onPress={() => this.setLocation(item)}>
                                    <Text style={styles.gray}>{item.name}</Text>
                                    <Text style={styles.gray}>{item.vicinity}</Text>
                                </TouchableOpacity>
                            )} />
                    </SafeAreaView>
                </Modal>
                <Image style={styles.postPhoto} source={{ uri: this.props.post.photo }} />
                <ImagePicker />
                <TextInput
                    style={styles.border}
                    value={this.props.post.description}
                    onChangeText={text => this.props.updateDescription(text)}
                    placeholder='Description'
                />
                <TextInput
                    style={styles.border}
                    value={this.props.post.recipe}
                    onChangeText={text => this.props.updateRecipe(text)}
                    placeholder='Recipe'
                />
                <TouchableOpacity style={styles.border} onPress={this.getLocations}>
                    <Text style={styles.gray}>{this.props.post.location ? this.props.post.location.name : 'Add a Location'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this._onUploadPost()}>
                    <Text>Post</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        post: state.post,
        user: state.user
    }
}

export default connect(mapStateToProps, { updateDescription, uploadPost, updateRecipe, updateLocation })(Post)