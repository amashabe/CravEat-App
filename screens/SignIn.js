import React from 'react';
import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, Dimensions, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';
import { connect } from 'react-redux'
import { updateEmail, updatePassword, login } from '../actions/user'
import styles from '../styles';
import Hr from "react-native-hr-component";
import AppStatusBar from '../components/AppStatusBar';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

class SignIn extends React.Component {
	state = {
		showPassword: false
	}
	render() {
		const { showPassword } = this.state;
		return (
			<>
				<SafeAreaView style={[styles.topSafeArea]} />
				<SafeAreaView style={[styles.bottomSafeArea]}>
					<AppStatusBar backgroundColor='#ff741a' barStyle="light-content" />
					<KeyboardAvoidingView style={{ ...styles.container, backgroundColor: '#fff' }} behavior="padding" enabled keyboardVerticalOffset={-100}>
						<View style={{ justifyContent: 'center', alignItems: 'center' }}>
							<Image source={require('../assets/icon.png')} style={{
								justifyContent: 'center',
								width: 100,
								height: 100,
								alignItems: 'center',
								marginBottom: 20
							}} />
						</View>
						<TextInput
							autoCorrect={false}
							autoCompleteType="off"
							autoCapitalize="none"
							style={{
								borderColor: 'grey',
								borderRadius: 4,
								borderWidth: 1,
								height: 45,
								padding: 5,
								marginBottom: 3,
								backgroundColor: '#FFF',
								width: '95%'
							}}
							value={this.props.user.email}
							onChangeText={input => this.props.updateEmail(input)}
							placeholder='Email'
							placeholderTextColor="#202020"
						/>
						<View style={{ width: '95%' }}>
							<TextInput
								secureTextEntry={showPassword}
								autoCorrect={false}
								autoCapitalize="none"
								style={{
									borderColor: 'grey',
									borderRadius: 4,
									borderWidth: 1,
									height: 45,
									padding: 5,
									marginBottom: 3,
									backgroundColor: '#FFF',

								}}
								value={this.props.user.password}
								placeholder='Password'
								placeholderTextColor="#202020"
								onChangeText={input => this.props.updatePassword(input)}
							/>
							<TouchableOpacity
								onPress={() => this.setState({ showPassword: !showPassword })}
								style={{ position: 'absolute', right: '5%', top: '15%' }}>
								<MaterialCommunityIcons name={showPassword ? "eye-off" : "eye"} size={25} />
							</TouchableOpacity>
						</View>
						{
							this.props.UI.errors ? <Text style={{
								fontSize: 12,
								fontWeight: 'bold',
								color: 'red',
								padding: 8
							}}>{this.props.UI.errors}</Text> : null
						}
						<TouchableOpacity disabled={this.props.UI.loading} style={{
							marginTop: 2,
							borderRadius: 3,
							backgroundColor: this.props.UI.loading ? '#FF9F67' : '#ff741a',
							width: width * .95,
							margin: 7,
							padding: 8,
							alignSelf: 'center',
							borderColor: '#d3d3d3',
							borderWidth: 1,
							fontSize: 16,
							height: 40
						}}
							onPress={() => this.props.login()}>
							<View style={{ justifyContent: 'center', alignItems: 'center' }}>
								{
									this.props.UI.loading ?
										<ActivityIndicator size="small" color="#ffffff" animating /> :
										<Text style={{ color: "#fff", textAlign: 'center' }}>SignIn.</Text>
								}
							</View>
						</TouchableOpacity>
						<Hr textColor='#000000' width={12} text="OR" fontSize={12} lineColor="#000000" textPadding={5}
							hrStyles={{ padding: 8 }} />
						<TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
							<Text>SignUp</Text>
						</TouchableOpacity>
					</KeyboardAvoidingView>
				</SafeAreaView>
			</>
		)

	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		UI: state.UI
	}
}

export default connect(mapStateToProps, { updateEmail, updatePassword, login })(SignIn)