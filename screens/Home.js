import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Image, FlatList, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { getPosts } from '../actions/post'
import styles from '../styles';

class Home extends React.Component {

  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    if(this.props.post === null) return null
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.post.feed}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View>
              <View style={[styles.row, styles.center]}>
                <View style={[styles.row, styles.center]}>
                  <Image style={styles.roundImage} source={{uri: `${item.photo}`}}/>
                  <Text>{item.username}</Text>
                </View>
                <Ionicons style={{margin: 5}} name='ios-flag' size={25} />
              </View>
                <View>
                    <Image style={styles.postPhoto} source={{uri: `${item.postPhoto}`}}/>
                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']} style={{ position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: 10, paddingVertical: 15 }}>
                        <Text style={{ color: "#FFF", fontWeight: "400", fontSize: 20 }}>{item.postDescription}</Text>
                    </LinearGradient>
                </View>

              <View style={styles.row}>
                <Ionicons style={{margin: 5}} name='ios-heart-empty' size={25} />
                <Ionicons style={{margin: 5}} name='ios-chatbubbles' size={25} />
                <Ionicons style={{margin: 5}} name='ios-send' size={25} />
              </View>
              <Text>{item.postDescription}</Text>
                <Text>{item.postRecipe}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.post
  }
}

export default connect(mapStateToProps, {getPosts})(Home)

