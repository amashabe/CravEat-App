import React, { Component } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { HomeNavigator, ActivityNavigator, ProfileNavigator, SearchNavigator } from './StackNavigator';
import { AntDesign, Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default createAppContainer(createBottomTabNavigator(
    {
        Home: {
            screen: HomeNavigator,
            navigationOptions: {
                tabBarLabel: ' ',
                tabBarIcon: ({ focused }) => (
                    Platform.OS === 'ios'
                        ? <Ionicons name='ios-home' size={28} style={{ marginTop: 15, color: focused ? 'orange' : 'black' }} />
                        : <AntDesign name='home' size={28} style={{ marginTop: 15, color: focused ? 'orange' : 'black' }} />
                )
            }
        },
        Search: {
            screen: SearchNavigator,
            navigationOptions: {
                tabBarLabel: ' ',
                tabBarIcon: ({ focused }) => (
                    Platform.OS === 'ios'
                        ? <Ionicons name='ios-pin' size={28} style={{ marginTop: 15, color: focused ? 'orange' : 'black' }} />
                        : <MaterialCommunityIcons name='map-marker-radius' size={28} style={{ marginTop: 15, color: focused ? 'orange' : 'black' }} />
                )
            }
        },
        Activity: {
            screen: ActivityNavigator,
            navigationOptions: {
                tabBarLabel: ' ',
                tabBarIcon: ({ focused }) => (
                    Platform.OS === 'ios'
                        ? <Ionicons name={focused ? 'ios-heart' : 'ios-heart-empty'} size={28} style={{ marginTop: 15, color: focused ? 'orange' : 'black' }} />
                        : <AntDesign name={focused ? 'heart' : 'hearto'} size={28} style={{ marginTop: 15, color: focused ? 'orange' : 'black' }} />
                )
            }
        },
        MyProfile: {
            screen: ProfileNavigator,
            navigationOptions: {
                tabBarLabel: ' ',
                tabBarIcon: ({ focused }) => (
                    Platform.OS === 'ios'
                        ? <Ionicons name='ios-person' size={28} style={{ marginTop: 15, color: focused ? 'orange' : 'black' }}/>
                        : <Feather name='user' size={28} style={{ marginTop: 15, color: focused ? 'orange' : 'black' }} />
                )
            }
        }
    },
    {
        tabBarOptions: {
            style: {
                paddingVertical: 15,
                height: 50
            }
        }
    }
)
);
