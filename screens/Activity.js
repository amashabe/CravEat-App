import React from 'react';
import { connect } from 'react-redux'
import { Text, View, FlatList, ActivityIndicator, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { getPost } from '../actions/post';
import db from '../config/firebase';
import moment from 'moment';
import orderBy from 'lodash/orderBy';
import styles from '../styles'
import AppStatusBar from '../components/AppStatusBar';

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
            if (response.data().commenterId !== response.data().uid && response.data().likerId !== response.data().uid) {
                notification.push(response.data())
            }

        })
        this.setState({ notification: orderBy(notification, "createdAt", "desc") })
    }

    _readLike = async (postId, navigate) => {
        await this.props.getPost(postId, navigate);
        // this.props.navigation.navigate('Comment', this.props.post.singlePost)
    }

    renderList = (item) => {
        switch (item.type) {
            case 'LIKE':
                return (
                    <TouchableOpacity onPress={() => this._readLike(item.postId, this.props.navigation)} style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: item.read ? 'transparent' : '#DCDCDC' }}>
                        <Image style={{ width: 40, height: 40, borderRadius: 20, margin: 10, backgroundColor: item.read ? '#adadad' : '#DCDCDC' }} source={{ uri: item.likerPhoto }} />
                        <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'flex-start' }}>
                            <Text style={{ fontWeight: 'bold' }}>{item.likerName}</Text>
                            <Text style={{ color: '#000' }}>Liked Your Photo</Text>
                            <Text style={{ color: '#000', fontSize: 10 }}>{moment(item.createdAt).fromNow()}</Text>
                        </View>
                        <Image style={{ width: 40, height: 40, borderRadius: 20, margin: 10, backgroundColor: '#DCDCDC' }} source={{ uri: item.postPhoto }} />
                    </TouchableOpacity>
                )
            case 'COMMENT':
                return (
                    <TouchableOpacity onPress={() => alert(item.postId)} style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: item.read ? 'transparent' : '#DCDCDC' }}>
                        <Image style={{ width: 40, height: 40, borderRadius: 20, margin: 10, backgroundColor: item.read ? '#adadad' : '#DCDCDC' }} source={{ uri: item.commenterPhoto }} />
                        <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'flex-start' }}>
                            <Text style={{ fontWeight: 'bold', }}>{item.commenterName}</Text>
                            <Text style={{ color: '#000' }}>Commented On Your Photo</Text>
                            <Text style={{ color: '#000', fontSize: 10 }}>{moment(item.createdAt).fromNow()}</Text>
                        </View>
                        <Image style={{ width: 40, height: 40, borderRadius: 20, margin: 10, backgroundColor: '#DCDCDC' }} source={{ uri: item.postPhoto }} />
                    </TouchableOpacity>
                )
            default: null
        }
    }

    render() {
        if (this.state.notification.length <= 0 || this.state.notification === undefined) return <ActivityIndicator style={{ flex: 1, backgroundColor: '#fff' }} />

        return (
            <>
             <SafeAreaView style={[styles.topSafeArea]} />
                <SafeAreaView style={[styles.bottomSafeArea]}>
                    <AppStatusBar backgroundColor='#ff741a' barStyle="light-content" />
                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
                        <FlatList
                            onRefresh={() => this.getNotifications()}
                            refreshing={false}
                            data={this.state.notification}
                            keyExtractor={(item) => JSON.stringify(item.createdAt)}
                            renderItem={({ item }) => this.renderList(item)} />
                    </View>
                </SafeAreaView>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        post: state.post
    }
}

export default connect(mapStateToProps, { getPost })(Activity)