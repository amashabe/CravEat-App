import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { Text, View, TextInput, FlatList, Image, KeyboardAvoidingView, StatusBar } from 'react-native';
import { addComment, getComments } from '../actions/post';

class Comment extends React.Component {
  state = {
    comment: ''
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.post.feed != prevProps.post.feed) {
      const { params } = this.props.navigation.state
      console.log(params)
      this.props.getComments(params)
    }
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
      <KeyboardAvoidingView enabled behavior='padding' keyboardVerticalOffset={75} style={{ flex: 1, backgroundColor: '#fff' }}>
        <FlatList
          keyExtractor={(item) => JSON.stringify(item.createdAt)}
          data={this.props.post.comments}
          renderItem={({ item }) => (
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', flexWrap: 'wrap' }}>
              <Image style={{ width: 40, height: 40, borderRadius: 20, margin: 10, backgroundColor: '#adadad' }} source={{ uri: item.commenterPhoto }} />
              <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'flex-start' }}>
                <Text>{item.commenterName}</Text>
                <Text>{item.comment}</Text>
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