import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { connect } from 'react-redux';
import { getAllUsers } from '../actions/user';
import emails from '../emails';

const KEYS_TO_FILTERS = ['username'];

class Search extends Component {
  state = {
    searchTerm: '',
    users: []
  }

  componentDidMount() {
    this.props.getAllUsers()
    this.setState({ users: this.props.user })
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term })
  }
  render() {
    if (this.props.user.users === undefined) return null;
    const filterUSers = this.props.user.users.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    console.log(filterUSers)
    return (
      <View style={styles.container}>
        <SearchInput
          onChangeText={(term) => { this.searchUpdated(term) }}
          style={styles.searchInput}
          placeholder="Type a message to search"
        />
        <ScrollView>
          {filterUSers.map(user => {
            return (
              <TouchableOpacity onPress={() => alert(user.uid)} key={user.id} style={styles.emailItem}>
                <View>
                  <Text>{user.username}</Text>
                  <Text style={styles.emailSubject}>{user.bio}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, { getAllUsers })(Search)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },
  emailItem: {
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10
  },
  emailSubject: {
    color: 'rgba(0,0,0,0.5)'
  },
  searchInput: {
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1
  }
});

// import React from 'react';
// import styles from '../styles'
// import { View, Text, SafeAreaView, TextInput, FlatList, Image, Dimensions, StatusBar } from 'react-native';
// import db from '../config/firebase';
// import { Searchbar } from 'react-native-paper';
// const { width } = Dimensions.get('window');

// class Search extends React.Component {
//   state = {
//     search: '',
//     query: []
//   }


//   searchUser = async () => {
//     let search = []
//     const query = await db.collection('users').where('username', '>=', this.state.search).get()
//     query.forEach((response) => {
//       console.log(response.data())
//       search.push(response.data())
//     })
//     this.setState({ query: search })
//   }

//   render() {
//     return (
//       <SafeAreaView style={{ flex: 1, backgroundColor: '#ff' }}>
//         <StatusBar hidden={true} />
//         <Searchbar
//           onChangeText={(search) => this.setState({ search })}
//           value={this.state.search}
//           returnKeyType='send'
//           placeholder='Search'
//           onSubmitEditing={this.searchUser} />
//         <FlatList
//           data={this.state.query}
//           keyExtractor={(item) => JSON.stringify(item.date)}
//           renderItem={({ item }) => (
//             <View style={[styles.row, styles.space]} key={item.uid}>
//               <Image style={styles.roundImage} source={{ uri: item.photo }} />
//               <View style={{
//                 flex: 1,
//                 backgroundColor: '#fff', alignItems: 'flex-start'
//               }}>
//                 <Text style={styles.bold}>{item.username}</Text>
//                 <Text style={styles.gray}>{item.bio}</Text>
//               </View>
//             </View>
//           )} />
//       </SafeAreaView>
//     );
//   }
// }

// export default (Search)
