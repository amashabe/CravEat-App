import React from 'react';
import firebase from 'firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, Image, SafeAreaView, Dimensions, StatusBar, ActivityIndicator } from 'react-native';
import { signOut, updatePP, followUser, unfollowUser } from '../actions/user';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { Menu } from 'react-native-paper';
import styles from '../styles'
import AppStatusBar from '../components/AppStatusBar';

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

  componentDidMount() {
    const { counter } = this.state;
    this.props.post.feed.map(post => {
      if (this.props.user.uid === post.uid) {
        this.setState({ counter: counter + 1 })
      }
    })
  }

  _navigateTab = (text) => {
    this.setState({ tab: text })
  }

  follow = (user) => {
    if (user.followers.indexOf(this.props.user.uid) >= 0) {
      this.props.unfollowUser(user)
    } else {
      this.props.followUser(user)
    }
  }

  _update = () => {
    this.setState({ visible: false })
    this.props.navigation.navigate('UpdateDetails')
  }
  _openMenu = () => this.setState({ visible: true });
  _closeMenu = () => this.setState({ visible: false });

  render() {
    const { tab } = this.state;
    let user = {}

    const { state, navigate } = this.props.navigation
    if (state.routeName === 'Profile') {
      user = this.props.profile
    } else {
      user = this.props.user
    }
    return (
      <>
        <SafeAreaView style={[styles.topSafeArea]} />
        <SafeAreaView style={[styles.bottomSafeArea]}>
          <AppStatusBar backgroundColor='#ff741a' barStyle="light-content" />
          <SafeAreaView style={{ flex: 1, position: 'relative', backgroundColor: '#fff' }}>
            <Image source={require('../assets/profile-header.jpg')} style={{ position: 'absolute', width: width, height: height * 0.25, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
            <LinearGradient colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)']} style={{ height: height * 0.25 }}>
              <Text style={{ top: height * 0.19, left: width * 0.30, fontSize: 17, fontWeight: 'bold', color: '#fff' }}>_{user.username}</Text>
              <TouchableOpacity style={{ top: height * 0.15, left: width * 0.6, paddingVertical: 8, alignItems: 'center', borderColor: '#d3d3d3', borderWidth: 1, borderRadius: 5, width: 135 }} onPress={() => this.follow(user)}>
                <Text style={styles.bold}>{user.followers.indexOf(this.props.user.uid) >= 0 ? 'UnFollow User' : 'Follow User'}</Text>
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity onPress={() => this._openMenu()} style={{ margin: 7, position: 'absolute', top: height * 0.01, right: width * 0.01, }}>
              <Menu style={{ margin: 7, position: 'absolute', top: height * 0.01, marginTop: 20, paddingRight: 20 }} visible={this.state.visible} onDismiss={this._closeMenu} anchor={<MaterialCommunityIcons style={{ color: '#fff' }} name='dots-vertical' size={30} />}>
                <Menu.Item onPress={() => this._update()} title="Edit" />
                <Menu.Item onPress={() => firebase.auth().signOut()} title="Sign Out." />
              </Menu>
            </TouchableOpacity>
            <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.1)']} style={{ height: height * 0.08, borderBottomWidth: 0.5, borderColor: '#fff' }}>
              <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-evenly', left: width * 0.12, }}>
                <TouchableOpacity style={{ marginVertical: 9 }} onPress={() => this._navigateTab('USER')}>
                  <Text style={{ fontWeight: 'bold' }}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginVertical: 9 }} onPress={() => this._navigateTab('POSTS')} >
                  <Text style={{ fontWeight: 'bold' }}>Posts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginVertical: 9 }} onPress={() => this._navigateTab('PINS')} >
                  <Text style={{ fontWeight: 'bold' }}>Pins</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
            <TouchableOpacity
              onPress={() => this.props.updatePP()}
              style={{ backgroundColor: '#fff', width: 94, height: 94, borderRadius: 94 / 2, position: 'absolute', left: width * 0.021, right: 0, borderColor: '#fff', borderWidth: 2, top: height * 0.175 }}>
              {
                this.props.UI.loading ? <ActivityIndicator size={32} color="#ff741a" style={{ marginVertical: '30%' }} /> : <Image source={{ uri: user.photo }} style={{ width: 90, height: 90, borderRadius: 90 / 2, }} />
              }
            </TouchableOpacity>
            {tab === "USER" && <UserDetails user={user} />}
            {tab === "POSTS" && <UserPosts />}
            {tab === "PINS" && <UserPins />}
          </SafeAreaView>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    post: state.post,
    UI: state.UI,
    profile: state.profile
  }
}

export default connect(mapStateToProps, { signOut, updatePP, followUser, unfollowUser })(Profile)
