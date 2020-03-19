import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { getUserPosts } from '../actions/post';
import moment from 'moment';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';

class UserPosts extends Component {
    getNewPosts = () => {
        this.props.getUserPosts();
    }
    componentDidMount() {
        this.props.getUserPosts();
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    onRefresh={() => this.getNewPosts()}
                    refreshing={false}
                    data={this.props.post.userPosts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        const liked = item.likes.includes(this.props.user.uid)
                        return (
                            <View key={item.id} style={{ marginBottom: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 1, borderColor: "#DCDCDC", borderWidth: 0.5 }}>
                                <View style={[styles.row, styles.center]}>
                                    <View style={[styles.row, styles.center]}>
                                        <Image style={styles.roundImage} source={{ uri: `${item.photo}` }} />
                                        <Text>{item.username}</Text>
                                    </View>
                                    <Ionicons style={{ margin: 5 }} name='ios-flag' size={25} />
                                </View>
                                <View>
                                    <TouchableOpacity onPress={() => { }}>
                                        <Image style={styles.postPhoto} source={{ uri: `${item.postPhoto}` }} />
                                    </TouchableOpacity>
                                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']} style={{ position: "absolute", bottom: 0, left: 0, right: 0, paddingHorizontal: 10, paddingVertical: 15 }}>
                                        <Text style={{ color: "#FFF", fontWeight: "400", fontSize: 20 }}>{item.postDescription}</Text>
                                        <View style={{ position: "absolute", right: 10, top: 26 }}>
                                            <Text style={{ fontSize: 12, fontWeight: "400", color: "#fff" }}>{moment(item.createdAt).fromNow()}</Text>
                                        </View>
                                    </LinearGradient>
                                </View>
                                <View style={styles.row}>
                                    <View style={styles.row}>
                                        <Text style={{ fontSize: 15, marginTop: 7, marginBottom: 7, marginLeft: 0, marginRight: 0 }}>{item.likes.length}</Text>
                                        <SimpleLineIcons style={{ margin: 7 }} color={liked ? 'orange' : 'black'} name='fire' size={20} />
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={{ fontSize: 15, marginTop: 7, marginBottom: 7, marginLeft: 0, marginRight: 0 }}>{item.comments.length}</Text>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment', item)}>
                                            <SimpleLineIcons style={{ margin: 7 }} name='bubble' size={20} />
                                        </TouchableOpacity>
                                    </View>
                                    <SimpleLineIcons style={{ marginTop: 7 }} name='paper-clip' size={20} />
                                </View>
                            </View>
                        )
                    }
                    }
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        post: state.post
    }
}

export default connect(mapStateToProps, { getUserPosts })(UserPosts);