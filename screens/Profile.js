import React from 'react';
import firebase from 'firebase';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, Image, SafeAreaView, Dimensions, StatusBar } from 'react-native';
import { signOut, updatePP } from '../actions/user';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Paragraph, Menu, Divider, Provider } from 'react-native-paper';

import UserDetails from './UserDetails';
import UserPosts from './UserPosts';
import UserPins from './UserPins';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Profile extends React.Component {
  state = {
    counter: 0,
    visible: false,
    tab: 'USER'
  }

  _pinTab = () => {
    this.setState({ tab: "PINS" })
  };

  _postTab = () => {
    this.setState({ tab: "POSTS" });
  };

  _userTab = () => {
    this.setState({ tab: 'USER' })
  }
  componentDidMount() {
    const { counter } = this.state;

    this.props.post.feed.map(post => {
      if (this.props.user.uid === post.uid) {
        this.setState({ counter: counter + 1 })
      }
    })
  }
  _openMenu = () => this.setState({ visible: true });
  _closeMenu = () => this.setState({ visible: false });

  render() {
    const { tab } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, position: 'relative' }}>
        <StatusBar hidden={true} />
        <Image source={require('../assets/profile-header.jpg')} style={{ position: 'absolute', width: width, height: height * 0.25, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
        <LinearGradient colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)']} style={{ height: height * 0.25 }}>
          <Text style={{ top: height * 0.19, left: width * 0.30, fontSize: 17, fontWeight: 'bold', color: '#fff' }}>_{this.props.user.username}</Text>
        </LinearGradient>
        <TouchableOpacity onPress={() => this._openMenu()} style={{ margin: 7, position: 'absolute', top: height * 0.01, right: width * 0.01, }}>
          <Menu style={{ margin: 7, position: 'absolute', top: height * 0.01, marginTop: 20, paddingRight: 20 }} visible={this.state.visible} onDismiss={this._closeMenu} anchor={<MaterialCommunityIcons style={{ color: '#fff' }} name='dots-vertical' size={30} />}>
            <Menu.Item onPress={() => this.props.navigation.navigate('UpdateDetails')} title="Edit" />
            <Menu.Item onPress={() => this.props.signOut()} title="Sign Out." />
          </Menu>
        </TouchableOpacity>
        <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.1)']} style={{ height: height * 0.08, borderBottomWidth: 0.5, borderColor: '#fff' }}>
          <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-evenly', left: width * 0.12, }}>
            <TouchableOpacity style={{ marginVertical: 9 }} onPress={() => this._userTab()}>
              <Text style={{ fontWeight: 'bold' }}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginVertical: 9 }} onPress={() => this._postTab()} >
              <Text style={{ fontWeight: 'bold' }}>Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginVertical: 9 }} onPress={() => this._pinTab()} >
              <Text style={{ fontWeight: 'bold' }}>Pins</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <TouchableOpacity
          onPress={() => this.props.updatePP()}
          style={{ width: 94, height: 94, borderRadius: 94 / 2, position: 'absolute', left: width * 0.021, right: 0, borderColor: '#fff', borderWidth: 2, top: height * 0.175 }}>
          <Image source={{ uri: this.props.user.photo }} style={{ width: 90, height: 90, borderRadius: 90 / 2, }} />
        </TouchableOpacity>
        {tab === "USER" && <UserDetails />}
        {tab === "POSTS" && <UserPosts />}
        {tab === "PINS" && <UserPins />}

      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    post: state.post
  }
}

export default connect(mapStateToProps, { signOut, updatePP })(Profile)