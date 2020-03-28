import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'
import { updateUser, updateEmail, updateBio, updateUsername, updateUserDetails } from '../actions/user'
import styles from '../styles'

class UpdateDetails extends Component {

    _updateDetails = (navigation) => {
        this.props.updateUserDetails(navigation)
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled keyboardVerticalOffset={70}>
                <TextInput
                    editable={false}
                    style={styles.border}
                    value={this.props.user.email}
                    onChangeText={input => this.props.updateEmail(input)}
                    placeholder='Email'
                />
                <TextInput
                    editable={false}
                    style={styles.border}
                    value={'********'}
                    onChangeText={input => this.props.updatePassword(input)}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.border}
                    value={this.props.user.username}
                    onChangeText={input => this.props.updateUsername(input)}
                    placeholder='Username'
                />
                <TextInput
                    style={styles.border}
                    value={this.props.user.bio}
                    onChangeText={input => this.props.updateBio(input)}
                    placeholder='Bio'
                    multiline={true}
                    numberOfLines={1}
                    maxLength={150}
                />
                <TouchableOpacity style={styles.button} onPress={() => this._updateDetails(this.props.navigation)}>
                    {this.props.UI.loading ?
                        <ActivityIndicator size="small" color="#ffffff" animating /> : <Text>Update Details</Text>}
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, { updateUser, updateEmail, updateBio, updateUsername, updateUserDetails })(UpdateDetails)