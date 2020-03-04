import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { updateEmail, updatePassword, login} from '../actions/user'
import firebase from 'firebase'
import styles from '../styles'

class SignIn extends React.Component {
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
        	style={styles.border}
        	value={this.props.user.password}
        	onChangeText={input => this.props.updatePassword(input)}
        	placeholder='Password'
        	secureTextEntry={true}
        />
      	<TouchableOpacity style={styles.button} onPress={() => this.props.login()}>
      		<Text>Login</Text>
      	</TouchableOpacity>
      	<Text>OR</Text>
      	<TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
      		<Text>Signup</Text>
      	</TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { updateEmail, updatePassword, login })(SignIn)