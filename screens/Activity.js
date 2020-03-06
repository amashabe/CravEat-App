import React from 'react';
import {Text, View, ActivityIndicator, FlatList, Image} from 'react-native';
import styles from '../styles'
import db from '../config/firebase';
import {connect} from 'react-redux';

class Activity extends React.Component {
    state = {
        notification: []
    }

    componentDidMount() {
        this.getNotifications();
    }

    getNotifications = async () => {
        let notification = [];
        const query = await db.collection('notifications').where('uid', '==', this.props.user.uid).get();
        query.forEach((response) => {
            notification.push(response.data())
        })
        this.setState({notification: notification})
    }

    render() {
        console.log(this.state.notification)
        if(this.state.notification.length <= 0) return <ActivityIndicator color="orange" size={52} style={{flex: 1, justifyContent: "center", alignItems: "center"}}/>
    return (
      <View style={{flex: 1}}>
          <FlatList
          data={this.state.notification}
          keyExtractor={(item) => JSON.stringify(item.date)}
          renderItem={({item}) => (
              <View>
                  <Image source={{uri: item.likerPhoto}}/>
                  <View>
                      <Text>{item.likerName} liked your photo</Text>
                  </View>
                  <Image source={{uri: item.postPhoto}}/>
              </View>
          )}
          />
      </View>
    );
  }
}

const mapStateToProps = state => ({
    user: state.user,
    post: state.post
})

export default connect(mapStateToProps, null)(Activity);