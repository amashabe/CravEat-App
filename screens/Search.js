import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { connect } from 'react-redux';
import { getAllUsers, getUser } from '../actions/user';
import AppStatusBar from '../components/AppStatusBar';
import style from '../styles';
import { GET_PROFILE } from '../types';

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

  goToUser = async (user) => {
    const response = await this.props.getUser(user.uid, GET_PROFILE)
    this.props.navigation.navigate('Profile')
  }

  render() {
    if (this.props.user.users === undefined) {
      return (
        <>
          <SafeAreaView style={[style.topSafeArea]} />
          <SafeAreaView style={[style.bottomSafeArea]}>
            <AppStatusBar backgroundColor='#ff741a' barStyle="light-content" />
            <ActivityIndicator color="#ff741a" style={{ flex: 1, backgroundColor: '#fff' }} />
          </SafeAreaView>
        </>
      )
    }
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
                  <View key={user.uid}>
                    {
                      user.uid === this.props.user.uid ? null :
                        <TouchableOpacity onPress={() => this.goToUser(user)} style={styles.emailItem}>
                          <View >
                            <Text>{user.username}</Text>
                            <Text style={styles.emailSubject}>{user.bio}</Text>
                          </View>
                        </TouchableOpacity>
                    }
                  </View>

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

export default connect(mapStateToProps, { getAllUsers, getUser })(Search)

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