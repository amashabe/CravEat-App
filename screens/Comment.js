import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { Text, View, TextInput, FlatList, Image, KeyboardAvoidingView, StatusBar, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import { addComment, getComments } from '../actions/post';
const { width, height } = Dimensions.get("window");

class Comment extends React.Component {
  state = {
    comment: ''
  }

  componentDidMount = () => {
    const { params } = this.props.navigation.state
    this.props.getComments(params)
  }

  postComment = () => {
    const { params } = this.props.navigation.state
    this.props.addComment(this.state.comment, params)
    this.setState({ comment: '' })
  }

  render() {
    return (
      <KeyboardAvoidingView enabled behavior='padding' keyboardVerticalOffset={0} style={{ flex: 1, backgroundColor: '#fff' }}>
        <>
          <View>
            <Image style={styles.postPhoto} source={{ uri: `${this.props.navigation.state.params.postPhoto}` }} />
            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']} style={{ position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: 10, paddingVertical: 15 }}>
              <Text style={{ color: "#FFF", fontWeight: "400", fontSize: 20 }}>{this.props.navigation.state.params.postDescription}</Text>
              <View style={{ position: "absolute", right: 10, top: 26 }}>
                <Text style={{ fontSize: 12, fontWeight: "400", color: "#fff" }}>{moment(this.props.navigation.state.params.createdAt).fromNow()}</Text>
              </View>
            </LinearGradient>
          </View>
          <View>
            <Text>{this.props.navigation.state.params.postRecipe}</Text>
          </View>
        </>
        <FlatList
          keyExtractor={(item) => JSON.stringify(item.createdAt)}
          data={this.props.post.comments}
          renderItem={({ item }) => (
            <View key={`${item.id}`} style={{ justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap' }}>
              <Image style={{ width: 40, height: 40, borderRadius: 20, margin: 10, backgroundColor: '#adadad' }} source={{ uri: item.commenterPhoto }} />
              <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'flex-start' }}>
                <Text style={{ fontWeight: 'bold', marginTop: 7 }}>{item.commenterName}</Text>
                <Text style={{ paddingRight: 5 }}>{item.comment}</Text>
              </View>
            </View>
          )} />
        <TextInput
          style={styles.input}
          onChangeText={(comment) => this.setState({ comment })}
          value={this.state.comment}
          returnKeyType='send'
          placeholder='Add Comment'
          onSubmitEditing={this.postComment} />
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    post: state.post
  }
}

export default connect(mapStateToProps, { addComment, getComments })(Comment)