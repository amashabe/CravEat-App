import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { signOut } from '../actions/user';
import moment from 'moment';

const { width, height } = Dimensions.get('window');

class UserDetails extends Component {
    Capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        const { user } = this.props;
        return (
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={{ paddingTop: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#DCDCDC' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: width * 0.06, fontWeight: 'bold' }}>Username</Text>
                        <Text style={{ paddingLeft: width * 0.146, }}>{user.username}</Text>
                    </View>
                </View>
                <View style={{ paddingTop: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#DCDCDC' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: width * 0.06, fontWeight: 'bold' }}>Email</Text>
                        <Text style={{ paddingLeft: width * 0.219, }}>{user.email}</Text>
                    </View>
                </View>
                <View style={{ paddingTop: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#DCDCDC' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: width * 0.06, fontWeight: 'bold' }}>Joined</Text>
                        <Text style={{ paddingLeft: width * 0.2, }}>{this.Capitalize(moment(user.createdAt).fromNow())}</Text>
                    </View>
                </View>
                {/* <View style={{ paddingTop: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#DCDCDC' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: width * 0.06, fontWeight: 'bold' }}>Followed</Text>
                        <Text style={{ paddingLeft: width * 0.15, }}>{user.followed.length}</Text>
                    </View>
                </View>
                <View style={{ paddingTop: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#DCDCDC' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: width * 0.06, fontWeight: 'bold' }}>Following</Text>
                        <Text style={{ paddingLeft: width * 0.14, }}>{user.following.length}</Text>
                    </View>
                </View> */}
                <View style={{ paddingTop: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#DCDCDC' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: width * 0.06, fontWeight: 'bold' }}>Location</Text>
                        <Text style={{ paddingLeft: width * 0.16, }}>Johannesburg, South Africa</Text>
                    </View>
                </View>
                <View style={{ paddingTop: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#DCDCDC' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: width * 0.06, fontWeight: 'bold' }}>Bio</Text>
                        <Text multiline={true}
                            numberOfLines={6}
                            maxLength={100} style={{ paddingLeft: width * 0.25, paddingRight: width * 0.12, flexWrap: 'wrap' }}>{user.bio}</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        post: state.post
    }
}

export default connect(mapStateToProps, { signOut })(UserDetails);

/*
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
                        <Text style={{ paddingLeft: width * 0.06, fontWeight: 'bold' }}>Location</Text>
                        <Text style={{ paddingLeft: width * 0.16, }}>Johannesburg, South Africa</Text>
                    </View>
                </View>
                <View style={{ paddingTop: 15, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#DCDCDC' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: width * 0.06, fontWeight: 'bold' }}>Bio</Text>
                        <Text multiline={true}
                            numberOfLines={4}
                            maxLength={100} style={{ paddingLeft: width * 0.25,paddingRight: width * 0.15}}>{this.props.user.bio}</Text>
                    </View>
                </View>
            </View>
            */