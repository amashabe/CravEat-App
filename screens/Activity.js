import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { Text, View, FlatList, ActivityIndicator, Image} from 'react-native';
import db from '../config/firebase';
import moment from 'moment';
import orderBy from 'lodash/orderBy';

class Activity extends React.Component {
    state = {
        notification: []
    }

    componentDidMount = () => {
        this.getNotifications()
    }

    getNotifications = async () => {
        let notification = []
        const query = await db.collection('notifications').where('uid', '==', this.props.user.uid).get()
        query.forEach((response) => {
            notification.push(response.data())
        })

        this.setState({notification: orderBy(notification, "createdAt", "desc")})
  
    }

    renderList = (item) => {
        switch(item.type) {
            case 'LIKE':
                return (
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <Image style={{width: 40, height: 40, borderRadius: 20, margin: 10, backgroundColor: '#adadad'}} source={{uri: item.likerPhoto}}/>
                        <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'flex-start',}}>
                            <Text style={{ fontWeight: 'bold'}}>{item.likerName}</Text>
                            <Text style={{color: '#adadad'}}>Liked Your Photo</Text>
                            <Text style={{color: '#adadad', fontSize: 10}}>{moment(item.createdAt).fromNow()}</Text>
                        </View>
                        <Image style={{width: 40, height: 40, borderRadius: 20, margin: 10, backgroundColor: '#adadad'}} source={{uri: item.postPhoto}}/>
                    </View>
                )
            case 'COMMENT':
                return (
                    <View style={ {alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                        <Image style={{width: 40, height: 40, borderRadius: 20, margin: 10, backgroundColor: '#adadad'}} source={{uri: item.commenterPhoto}}/>
                        <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'flex-start'}}>
                            <Text style={{ fontWeight: 'bold',}}>{item.commenterName}</Text>
                            <Text style={{ color: '#adadad'}}>{item.comment}</Text>
                            <Text style={{ color: '#adadad', fontSize: 10}}>{moment(item.createdAt).fromNow()}</Text>
                        </View>
                        <Image style={{width: 40, height: 40, borderRadius: 20, margin: 10, backgroundColor: '#adadad'}} source={{uri: item.postPhoto}}/>
                    </View>
                )
            default: null
        }
    }

    render() {
        if (this.state.notification.length <= 0 ) return <ActivityIndicator style={{flex: 1, backgroundColor: '#fff'}}/>
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <FlatList
                    onRefresh={() => this.getNotifications()}
                    refreshing={false}
                    data={this.state.notification}
                    keyExtractor={(item) => JSON.stringify(item.createdAt)}
                    renderItem={({ item }) => this.renderList(item)} />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Activity)