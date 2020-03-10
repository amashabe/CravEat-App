import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { updateUser, updateEmail, updateBio, updateUsername } from '../actions/user'
import styles from '../styles'

class UpdateDetails extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.border}
                    value={this.props.user.email}
                    onChangeText={input => this.props.updateEmail(input)}
                    placeholder='Email'
                />
                <TextInput
                    editable={false}
                    style={styles.border}
                    value={this.props.user.password}
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
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
})

export default connect(mapStateToProps, { updateUser, updateEmail, updateBio, updateUsername })(UpdateDetails)