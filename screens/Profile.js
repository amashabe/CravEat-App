import React from 'react';
import firebase from 'firebase';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, Image, SafeAreaView, Dimensions, StatusBar } from 'react-native';
import { signOut } from '../actions/user';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Paragraph, Menu, Divider, Provider } from 'react-native-paper';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

class Profile extends React.Component {
  state = {
    counter: null,
      visible: false
  }
  componentDidMount() {
    let counter = 1;
    this.props.post.feed.map(post => {
      if (this.props.user.uid === post.uid) {
        this.setState({ counter: counter++ })
      }
    })
  }
    _openMenu = () => this.setState({ visible: true });
    _closeMenu = () => this.setState({ visible: false });

  render() {
    return (
      <SafeAreaView style={{ flex: 1, position: 'relative' }}>
        <StatusBar hidden={true} />
        <Image source={require('../assets/profile-header.jpg')} style={{ position: 'absolute', width: width, height: height * 0.25, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
        <LinearGradient colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)']} style={{ height: height * 0.25 }}>
          <Text style={{ top: height * 0.175, left: width * 0.30, fontSize: 17, fontWeight: 'bold', color: '#fff' }}>@{this.props.user.username}</Text>
          <Text style={{ top: height * 0.177, left: width * 0.30, fontSize: 13, color: '#fff' }}>{this.props.user.email}</Text>
        </LinearGradient>
        <TouchableOpacity onPress={() => this._openMenu()} style={{ margin: 7, position: 'absolute', top: height * 0.01, right: width * 0.01, }}>
            <Menu style={{margin: 7, position: 'absolute', top: height * 0.01, marginTop: 20, paddingRight: 20}} visible={this.state.visible} onDismiss={this._closeMenu} anchor={ <MaterialCommunityIcons style={{ color: '#fff' }} name='dots-vertical' size={30} /> }>
                <Menu.Item onPress={() => {}} title="Edit"  icon="webcam"/>
                <Menu.Item onPress={() => this.props.signOut()} title="Sign Out." />
            </Menu>
        </TouchableOpacity>
        <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.1)']} style={{ height: height * 0.08 }}>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <View style={{ left: width * 0.30 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{this.state.counter}</Text>
              <Text>POSTS</Text>
            </View>
            <View style={{ left: width * 0.35, }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{this.props.user.followed.length}</Text>
              <Text>FOLLOWERS</Text>
            </View>
            <View style={{ left: width * 0.40, }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{this.props.user.following.length}</Text>
              <Text>FOLLOWING</Text>
            </View>
          </View>
        </LinearGradient>
        <Image
          style={{ width: 90, height: 90, borderRadius: 90 / 2, position: 'absolute', left: width * 0.02, right: 0, borderColor: '#fff', borderWidth: 2, top: height * 0.175 }}
          source={{ uri: this.props.user.photo }}
        />
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

export default connect(mapStateToProps, { signOut })(Profile)

/** <View style={styles.container}>
        <Text> Profile</Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: this.props.user.photo }}
        />
        <Text>{this.props.user.email}</Text>
        <Text>{this.props.user.username}</Text>
        <Text>{this.props.user.bio}</Text>
        <Button title='Logout' onPress={() => this.props.signOut()} />
        <Button title='Edit Details' onPress={() => this.props.navigation.navigate('UpdateDetails')} />
      </View> */
