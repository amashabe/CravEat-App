import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { getPosts, likePost, unlikePost } from '../actions/post'
import styles from '../styles';

class Home extends React.Component {
  componentDidMount() {
    this.props.getPosts()
  }

  likePost = (post) => {
    const { uid } = this.props.user
    if (post.likes.includes(uid)) {
      this.props.unlikePost(post)
    } else {
      this.props.likePost(post)
    }
  }

  render() {
    if (this.props.post === null) return null
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.post.feed}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const liked = item.likes.includes(this.props.user.uid)
            return (
              <View>
                <View style={[styles.row, styles.center]}>
                  <View style={[styles.row, styles.center]}>
                    <Image style={styles.roundImage} source={{ uri: `${item.photo}` }} />
                    <Text>{item.username}</Text>
                  </View>
                  <Ionicons style={{ margin: 5 }} name='ios-flag' size={25} />
                </View>
                <View>
                  <TouchableOpacity onPress={() => this.likePost(item)}>
                    <Image style={styles.postPhoto} source={{ uri: `${item.postPhoto}` }} />
                  </TouchableOpacity>
                  <LinearGradient colors={['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']} style={{ position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: 10, paddingVertical: 15 }}>
                    <Text style={{ color: "#FFF", fontWeight: "400", fontSize: 20 }}>{item.postDescription}</Text>
                  </LinearGradient>
                </View>
                <View style={styles.row}>
                  <Ionicons style={{ margin: 5 }} color={liked ? 'orange' : 'black'} name={liked ? 'ios-heart' : 'ios-heart-empty'} size={25} />
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment', item)}>
                    <Ionicons style={{ margin: 5 }} name='ios-chatbubbles' size={25} />
                  </TouchableOpacity>
                  <Ionicons style={{ margin: 5 }} name='ios-send' size={25} />
                </View>
                <Text>{item.postRecipe}</Text>
              </View>
            )
          }
          }
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  post: state.post,
  user: state.user
})

export default connect(mapStateToProps, { getPosts, likePost, unlikePost })(Home)

