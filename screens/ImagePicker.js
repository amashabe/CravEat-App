import * as React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux';
import {FontAwesome, SimpleLineIcons} from '@expo/vector-icons';
import { updatePhoto } from '../actions/post';
import { uploadImage } from '../actions/index';

class ImagePickerExample extends React.Component {
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
            this.props.uploadImage(result.uri);
        }
    };

    render() {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={this._pickImage}>
                    <FontAwesome  name='camera' size={30} />
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { uploadImage, updatePhoto })(ImagePickerExample);
