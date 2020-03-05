import * as React from 'react';
import { Button, Image, View, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux';
import {updatePostPhoto} from '../actions/post';

const width = Dimensions.get('window').width;

class UploadImage extends React.Component {
    render() {
        return (
                <Button title="Pick an image from camera roll" onPress={this._pickImage} />
        );
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.cancelled) {
           this.props.updatePostPhoto(result.uri)
        }
    };
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { updatePostPhoto })(UploadImage)