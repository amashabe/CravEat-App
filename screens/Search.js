import React from 'react';
import styles from '../styles'
import { View, Text, SafeAreaView, TextInput, FlatList, Image, Dimensions, StatusBar } from 'react-native';
import db from '../config/firebase';
const { width } = Dimensions.get('window');

class Search extends React.Component {
  state = {
    search: '',
    query: []
  }


  searchUser = async () => {
    let search = []
    const query = await db.collection('users').where('username', '>=', this.state.search).get()
    query.forEach((response) => {
      search.push(response.data())
    })
    this.setState({ query: search })
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ff' }}>
          <StatusBar hidden={true} />
           <StatusBar hidden={true} />
        <TextInput
          style={{
            width: width * .90,
            margin: 15,
            padding: 15,
            alignSelf: 'center',
            borderColor: '#d3d3d3',
            borderWidth: 1,
            borderRadius: 50,
            fontSize: 16,
          }}
          onChangeText={(search) => this.setState({ search })}
          value={this.state.search}
          returnKeyType='send'
          placeholder='Search'
          onSubmitEditing={this.searchUser} />
        <FlatList
          data={this.state.query}
          keyExtractor={(item) => JSON.stringify(item.date)}
          renderItem={({ item }) => (
            <View style={[styles.row, styles.space]}>
              <Image style={styles.roundImage} source={{ uri: item.photo }} />
              <View style={{
                flex: 1,
                backgroundColor: '#fff', alignItems: 'flex-start'
              }}>
                <Text style={styles.bold}>{item.username}</Text>
                <Text style={styles.gray}>{item.bio}</Text>
              </View>
            </View>
          )} />
      </SafeAreaView>
    );
  }
}

export default (Search)