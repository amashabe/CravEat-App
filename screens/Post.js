import React from 'react';
import { connect } from 'react-redux'
import { updateDescription, uploadPost, updateRecipe } from '../actions/post'
import { Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import UploadImage from "../components/UploadImage";
import styles from '../styles'

class Post extends React.Component {
    _onUploadPost = () => {
        this.props.uploadPost();
        this.props.navigation.navigate('Home')
    }

  render() {
    return (
      <View style={styles.container}>
          <Image style={styles.postPhoto} source={{uri: this.props.post.photo }}/>
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
          <UploadImage />
      	<TouchableOpacity style={styles.button} onPress={() => this._onUploadPost()}>
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