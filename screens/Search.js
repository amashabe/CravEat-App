import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { connect } from 'react-redux';
import { getAllUsers } from '../actions/user';
import AppStatusBar from '../components/AppStatusBar';
import style from '../styles';

const KEYS_TO_FILTERS = ['username', 'bio'];

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
    return (
      <>
        <SafeAreaView style={[style.topSafeArea]} />
        <SafeAreaView style={[style.bottomSafeArea]}>
          <AppStatusBar backgroundColor='#ff741a' barStyle="light-content" />
          <View style={styles.container} >
            <SearchInput
              onChangeText={(term) => { this.searchUpdated(term) }}
              style={styles.searchInput}
              placeholder="Type a message to search"
            />
            <ScrollView>
              {filterUSers.map(user => {
                return (
                  <TouchableOpacity key={user.uid} onPress={() => alert(user.uid)} key={user.id} style={styles.emailItem}>
                    <View >
                      <Text>{user.username}</Text>
                      <Text style={styles.emailSubject}>{user.bio}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      </>
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