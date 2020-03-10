import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Dimensions, Image, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import { updateEmail, updatePassword, updateUsername, updateBio, signup } from '../actions/user';
import Hr from "react-native-hr-component";
import styles from '../styles'
const { width } = Dimensions.get('window');

class SignUp extends React.Component {
	render() {
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding" enabled keyboardVerticalOffset={-60}>
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>
					<Image source={require('../assets/icon.png')} style={{ justifyContent: 'center', width: 100, height: 100, alignItems: 'center', marginBottom: 20 }} />
				</View>
				<TextInput
					autoCorrect={false}
					autoCompleteType="off"
					autoCapitalize="none"
					style={{ borderColor: 'grey', borderRadius: 4, borderWidth: 1, height: 45, padding: 5, marginBottom: 3, backgroundColor: '#FFF', width: '95%' }}
					value={this.props.user.email}
					onChangeText={input => this.props.updateEmail(input)}
					placeholder='Email'
					placeholderTextColor="#202020"
				/>
				<TextInput
					secureTextEntry
					autoCorrect={false}
					autoCapitalize="none"
					style={{ borderColor: 'grey', borderRadius: 4, borderWidth: 1, height: 45, padding: 5, marginBottom: 3, backgroundColor: '#FFF', width: '95%' }}
					value={this.props.user.password}
					placeholder='Password'
					placeholderTextColor="#202020"
					onChangeText={input => this.props.updatePassword(input)}
				/>
				<TextInput
					autoCorrect={false}
					autoCapitalize="none"
					style={{ borderColor: 'grey', borderRadius: 4, borderWidth: 1, height: 45, padding: 5, marginBottom: 3, backgroundColor: '#FFF', width: '95%' }}
					value={this.props.user.username}
					placeholder='Username'
					placeholderTextColor="#202020"
					onChangeText={input => this.props.updateUsername(input)}
				/>
				<TextInput
					autoCorrect={false}
					autoCapitalize="none"
					style={{ borderColor: 'grey', borderRadius: 4, borderWidth: 1, height: 45, padding: 5, marginBottom: 3, backgroundColor: '#FFF', width: '95%' }}
					value={this.props.user.bio}
					placeholderTextColor="#202020"
					onChangeText={input => this.props.updateBio(input)}
					placeholder='Bio'
				/>
				{
					this.props.UI.errors ? <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'red', padding: 8 }}>{this.props.UI.errors}</Text> : null
				}
				<TouchableOpacity disabled={this.props.UI.loading} style={{ marginTop: 2, borderRadius: 3, backgroundColor: this.props.UI.loading ? '#FF9F67' : '#ff741a', width: width * .95, margin: 7, padding: 8, alignSelf: 'center', borderColor: '#d3d3d3', borderWidth: 1, borderRadius: 4, fontSize: 16, height: 40 }}
					onPress={() => this.props.signup()}>
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						{
							this.props.UI.loading ?
								<ActivityIndicator size="small" color="#ffffff" animating /> :
								<Text style={{ color: "#fff", textAlign: 'center' }}>SignUp.</Text>
						}
					</View>
				</TouchableOpacity>
				<Hr textColor='#000000' width={12} text="OR" fontSize={12} lineColor="#000000" textPadding={5} hrStyles={{ padding: 8 }} />
				<TouchableOpacity onPress={() => this.props.navigation.navigate('SignIn')}>
					<Text>SignIn</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		UI: state.UI
	}
}

export default connect(mapStateToProps, { updateEmail, updatePassword, updateUsername, updateBio, signup })(SignUp)