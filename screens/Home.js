import React from 'react';
import { Ionicons, SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import { Text, View, Image, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import { getPosts, likePost, unlikePost } from '../actions/post';
import { getUser } from '../actions/user';
import AppStatusBar from '../components/AppStatusBar';
import styles from '../styles';

class Home extends React.Component {
  componentDidMount() {
    this.props.getPosts();
  }

  likePost = (post) => {
    const { uid } = this.props.user
    if (post.likes.includes(uid)) {
      this.props.unlikePost(post)
    } else {
      this.props.likePost(post)
    }
  }

  _goToProfile = (uid) => {
    if (uid === this.props.user.uid) {
      this.props.navigation.navigate('MyProfile')
    }
  }

  getNewPosts = () => {
    this.props.getPosts();
  }

  _pinPost = (post) => {
    console.log(post)
  }

  render() {
    if (this.props.post === null) {
      return (
        <>
          <SafeAreaView style={[styles.topSafeArea]} />
          <SafeAreaView style={[styles.bottomSafeArea]}>
            <AppStatusBar backgroundColor='#ff741a' barStyle="light-content" />
            <ActivityIndicator color="#ff741a" style={{ flex: 1, backgroundColor: '#fff' }} />
          </SafeAreaView>
        </>
      )
    }
    return (
      <>
        <SafeAreaView style={[styles.topSafeArea]} />
        <SafeAreaView style={[styles.bottomSafeArea]}>
          <AppStatusBar backgroundColor='#ff741a' barStyle="light-content" />
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <FlatList
              onRefresh={() => this.getNewPosts()}
              refreshing={false}
              data={this.props.post.feed}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const liked = item.likes.includes(this.props.user.uid)
                return (
                  <View key={item.id} style={{ marginBottom: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 1, borderColor: "#DCDCDC", borderWidth: 0.5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', justifyContent: 'space-between', padding: 5 }}>
                      <TouchableOpacity style={[styles.row, styles.center]} onPress={() => this._goToProfile(item.uid)}>
                        <Image style={styles.roundImage} source={{ uri: `${item.photo}` }} />
                        <View style={{ left: 4 }}>
                          <Text>{item.username}</Text>
                          <Text style={{ fontSize: 10, fontWeight: "400", color: "#000" }}>{moment(item.createdAt).fromNow()}</Text>
                        </View>
                      </TouchableOpacity>
                      <Ionicons style={{ margin: 5 }} name='ios-flag' size={25} />
                    </View>
                    <View>
                      <Image style={styles.postPhoto} source={{ uri: `${item.postPhoto}` }} />
                      <LinearGradient colors={['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']} style={{ position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: 10, paddingVertical: 15 }}>
                        <Text style={{ color: "#FFF", fontWeight: "400", fontSize: 20 }}>{item.postDescription}</Text>
                        <View style={{ position: "absolute", right: 10, top: 26 }}>
                          <Text style={{ fontSize: 12, fontWeight: "400", color: "#fff" }}>{moment(item.createdAt).fromNow()}</Text>
                        </View>
                      </LinearGradient>
                    </View>
                    <View style={{ ...styles.row, padding: 3 }}>
                      <TouchableOpacity onPress={() => this.likePost(item)}>
                        <View style={styles.row}>
                          <Text style={{ fontSize: 15, marginTop: 7, marginBottom: 7, marginLeft: 0, marginRight: -3 }}>{item.likes.length}</Text>
                          <SimpleLineIcons style={{ margin: 7 }} color={liked ? 'orange' : 'black'} name='fire' size={20} />
                          <Text style={{ fontSize: 15, marginTop: 7, marginBottom: 7, marginLeft: -3, marginRight: 0 }}>Cravers</Text>
                        </View>
                      </TouchableOpacity>
                      <View style={styles.row}>
                        <View style={styles.row}>
                          <Text style={{ fontSize: 15, marginTop: 7, marginBottom: 7, marginLeft: -3, marginRight: 0 }}>{item.comments.length}</Text>
                          <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment', item)}>
                            <SimpleLineIcons style={{ margin: 7 }} name='bubble' size={20} />
                          </TouchableOpacity>
                          <Text style={{ fontSize: 15, marginTop: 7, marginBottom: 7, marginLeft: -3, marginRight: 0 }}>Comments</Text>
                        </View>
                      </View>
                      <View style={styles.row}>
                        <TouchableOpacity onPress={() => this._pinPost(item)}>
                          <View style={styles.row}>
                            <MaterialIcons style={{ marginTop: 7 }} name='library-add' size={23} />
                            <Text style={{ fontSize: 15, marginTop: 7, marginBottom: 7, marginLeft: 3, marginRight: 1 }}>Save</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )
              }
              }
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.props.navigation.navigate('Post')}
              style={{ position: 'absolute', width: 45, height: 45, alignItems: 'center', justifyContent: 'center', right: 15, bottom: 10, backgroundColor: 'orange', borderRadius: 25, elevation: 4, zIndex: 10 }}>
              <Image source={require("../assets/tabBarIcons/dish2.png")} style={{ resizeMode: 'contain', width: 45, height: 45, }} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  post: state.post,
  user: state.user
})

export default connect(mapStateToProps, { getPosts, likePost, unlikePost, getUser })(Home)

