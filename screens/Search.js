import React from 'react';
import styles from '../styles'
import { View, Text, SafeAreaView, TextInput, FlatList, Image, Dimensions, StatusBar } from 'react-native';
import db from '../config/firebase';
import {Searchbar} from 'react-native-paper';
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
           <Searchbar
               onChangeText={(search) => this.setState({ search })}
               value={this.state.search}
               returnKeyType='send'
               placeholder='Search'
               onSubmitEditing={this.searchUser} />
        <FlatList
          data={this.state.query}
          keyExtractor={(item) => JSON.stringify(item.date)}
          renderItem={({ item }) => (
            <View key={item.uid} style={[styles.row, styles.space]}>
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
