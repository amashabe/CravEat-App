import React from 'react';
import { connect } from 'react-redux'
import { updateDescription, uploadPost, updateRecipe } from '../actions/post'
import { Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import styles from '../styles'

class Post extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      	<Image style={styles.postPhoto} source={{uri: "https://firebasestorage.googleapis.com/v0/b/crav-eat-full-stack.appspot.com/o/meal-918639_640.jpg?alt=media&token=53fb6f0c-b398-4a88-ac24-0397df8bf35d"}}/>
        <TextInput
        	style={styles.border}
        	value={this.props.post.description}
        	onChangeText={text => this.props.updateDescription(text)}
        	placeholder='Description'
        />
          <TextInput
              style={styles.border}
              value={this.props.post.recipe}
              onChangeText={text => this.props.updateRecipe(text)}
              placeholder='Recipe'
          />
      	<TouchableOpacity style={styles.button} onPress={this.props.uploadPost}>
      		<Text>Post</Text>
      	</TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.post,
    user: state.user
  }
}

export default connect(mapStateToProps, { updateDescription, uploadPost, updateRecipe })(Post)