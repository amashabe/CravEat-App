import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { signOut } from '../actions/user';
import moment from 'moment';

const { width, height } = Dimensions.get('window');

class UserDetails extends Component {

    Capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        return (
            <View>
                <View style={{ paddingTop: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#DCDCDC' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: width * 0.06, fontWeight: 'bold' }}>Username</Text>
                        <Text style={{ paddingLeft: width * 0.146, }}>{this.props.user.username}</Text>
                    </View>
                </View>
                <View style={{ paddingTop: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#DCDCDC' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: width * 0.06, fontWeight: 'bold' }}>Email</Text>
                        <Text style={{ paddingLeft: width * 0.219, }}>{this.props.user.email}</Text>
                    </View>
                </View>
                <View style={{ paddingTop: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#DCDCDC' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: width * 0.06, fontWeight: 'bold' }}>Joined</Text>
                        <Text style={{ paddingLeft: width * 0.2, }}>{this.Capitalize(moment(this.props.user.createdAt).fromNow())}</Text>
                    </View>
                </View>
                <View style={{ paddingTop: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#DCDCDC' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: width * 0.06, fontWeight: 'bold' }}>Followed</Text>
                        <Text style={{ paddingLeft: width * 0.15, }}>{this.props.user.followed.length}</Text>
                    </View>
                </View>
                <View style={{ paddingTop: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#DCDCDC' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: width * 0.06, fontWeight: 'bold' }}>Following</Text>
                        <Text style={{ paddingLeft: width * 0.14, }}>{this.props.user.following.length}</Text>
                    </View>
                </View>
                <View style={{ paddingTop: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#DCDCDC' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: width * 0.06, fontWeight: 'bold' }}>Bio</Text>
                        <Text style={{ paddingLeft: width * 0.25, }}>{this.props.user.bio}</Text>
                    </View>
                </View>
                <View style={{ paddingTop: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#DCDCDC' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: width * 0.06, fontWeight: 'bold' }}>Bio</Text>
                        <Text style={{ paddingLeft: width * 0.25, }}>{this.props.user.bio}</Text>
                    </View>
                </View>
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

export default connect(mapStateToProps, { signOut })(UserDetails);