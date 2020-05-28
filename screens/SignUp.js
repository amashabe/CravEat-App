import React from "react";
import { Text, View, TextInput, TouchableOpacity, Dimensions, Image, KeyboardAvoidingView, ActivityIndicator, SafeAreaView, Modal, FlatList } from "react-native";
import { connect } from "react-redux";
import { updateEmail, updatePassword, updateUsername, updateBio, signup, } from "../actions/user";
import Hr from "react-native-hr-component";
import AppStatusBar from "../components/AppStatusBar";
import styles from "../styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { updateLocation } from "../actions/post";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { Header } from 'react-navigation-stack';

const { width, height } = Dimensions.get("window");
const GOOGLE_API =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const googleApiKey = "AIzaSyAgjhZeIV4iIBe4cDyudFsyVGgVFK3P38U";

class SignUp extends React.Component {
  state = {
    showPassword: true,
    showModal: false,
    locations: [],
  };
  setLocation = (location) => {
    const place = {
      name: location.name,
      coords: {
        lat: location.geometry.location.lat,
        lng: location.geometry.location.lng,
      },
    };
    this.setState({ showModal: false });
    this.props.updateLocation(place);
  };

  getLocations = async () => {
    this.setState({ showModal: true });
    const permission = await Permissions.askAsync(Permissions.LOCATION);
    if (permission.status === "granted") {
      const location = await Location.getCurrentPositionAsync();
      const url = `${GOOGLE_API}?location=${location.coords.latitude},${location.coords.longitude}&rankby=distance&key=${googleApiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      this.setState({ locations: data.results });
    }
  };
  render() {
    const { showPassword } = this.state;
    return (
      <>
        <SafeAreaView style={[styles.topSafeArea]} />
        <SafeAreaView style={[styles.bottomSafeArea]}>
          <AppStatusBar backgroundColor="#ff741a" barStyle="light-content" />
          <KeyboardAvoidingView style={{ ...styles.container, backgroundColor: "#fff" }} behavior="padding" keyboardVerticalOffset={Header.HEIGHT - 80} enabled>
            <Modal animationType="slide" transparent={false} visible={this.state.showModal}>
              <SafeAreaView style={[styles.container, styles.center]}>
                <FlatList
                  keyExtractor={(item) => item.id}
                  data={this.state.locations}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.border} onPress={() => this.setLocation(item)}>
                      <Text style={styles.gray}>{item.name}</Text>
                      <Text style={styles.gray}>{item.vicinity}</Text>
                    </TouchableOpacity>
                  )}
                />
              </SafeAreaView>
            </Modal>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image source={require("../assets/icon.png")} style={{ justifyContent: "center", width: 100, height: 100, alignItems: "center", marginBottom: 20, }} />
            </View>
            <TextInput
              autoCorrect={false}
              autoCompleteType="off"
              autoCapitalize="none"
              style={{ borderColor: "grey", borderRadius: 4, borderWidth: 1, height: 45, padding: 5, marginBottom: 3, backgroundColor: "#FFF", width: "95%", }}
              value={this.props.user.email}
              onChangeText={(input) => this.props.updateEmail(input)}
              placeholder="Email"
              placeholderTextColor="#202020"
            />
            <View style={{ width: "95%" }}>
              <TextInput
                secureTextEntry={showPassword}
                autoCorrect={false}
                autoCapitalize="none"
                style={{ borderColor: "grey", borderRadius: 4, borderWidth: 1, height: 45, padding: 5, marginBottom: 3, backgroundColor: "#FFF" }}
                value={this.props.user.password}
                placeholder="Password"
                placeholderTextColor="#202020"
                onChangeText={(input) => this.props.updatePassword(input)} />
              <TouchableOpacity onPress={() => this.setState({ showPassword: !showPassword })} style={{ position: "absolute", right: "5%", top: "15%" }}>
                <MaterialCommunityIcons name={showPassword ? "eye-off" : "eye"} size={25} />
              </TouchableOpacity>
            </View>
            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              style={{ borderColor: "grey", borderRadius: 4, borderWidth: 1, height: 45, padding: 5, marginBottom: 3, backgroundColor: "#FFF", width: "95%" }}
              value={this.props.user.username}
              placeholder="Username"
              placeholderTextColor="#202020"
              onChangeText={(input) => this.props.updateUsername(input)} />
            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              style={{ borderColor: "grey", borderRadius: 4, borderWidth: 1, height: 45, padding: 5, marginBottom: 3, backgroundColor: "#FFF", width: "95%" }}
              value={this.props.user.bio}
              placeholderTextColor="#202020"
              onChangeText={(input) => this.props.updateBio(input)}
              placeholder="Bio" />
            <TouchableOpacity style={{ borderColor: "grey", borderRadius: 4, borderWidth: 1, height: 45, padding: 5, marginBottom: 3, backgroundColor: "#FFF", width: "95%", justifyContent: 'center' }} onPress={this.getLocations}>
              <Text style={styles.gray}>
                {this.props.user.location ? this.props.user.location.name : "Add a Location"}
              </Text>
            </TouchableOpacity>
            {this.props.UI.errors ? (
              <Text style={{ fontSize: 12, fontWeight: "bold", color: "red", padding: 8, }}>
                {this.props.UI.errors}
              </Text>) : null}
            <TouchableOpacity disabled={this.props.UI.loading}
              style={{ marginTop: 2, backgroundColor: this.props.UI.loading ? "#FF9F67" : "#ff741a", width: width * 0.95, margin: 7, padding: 8, alignSelf: "center", borderColor: "#d3d3d3", borderWidth: 1, borderRadius: 4, fontSize: 16, height: 40, }}
              onPress={() => this.props.signup()} >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                {this.props.UI.loading ? (
                  <ActivityIndicator size="small" color="#ffffff" animating />
                ) : (
                    <Text style={{ color: "#fff", textAlign: "center" }}>
                      SignUp.
                    </Text>
                  )}
              </View>
            </TouchableOpacity>
            <Hr
              textColor="#000000"
              width={12}
              text="OR"
              fontSize={12}
              lineColor="#000000"
              textPadding={5}
              hrStyles={{ padding: 8 }}
            />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SignIn")}
            >
              <Text>SignIn</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    UI: state.UI,
  };
};

export default connect(mapStateToProps, {
  updateEmail,
  updatePassword,
  updateUsername,
  updateBio,
  signup,
  updateLocation,
})(SignUp);
