import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { HomeNavigator, ActivityNavigator, ProfileNavigator, SearchNavigator } from './StackNavigator';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default createAppContainer(createBottomTabNavigator(
    {
        Home: {
            screen: HomeNavigator,
            navigationOptions: {
                tabBarLabel: ' ',
                tabBarIcon: ({ focused }) => (
                    <AntDesign name='home' size={28} style={{ marginTop: 15, color: focused ? 'orange' : 'black' }} />
                )
            }
        },
        Search: {
            screen: SearchNavigator,
            navigationOptions: {
                tabBarLabel: ' ',
                tabBarIcon: ({ focused }) => (
                    <MaterialCommunityIcons name='map-marker-radius' size={28} style={{ marginTop: 15, color: focused ? 'orange' : 'black' }} />
                )
            }
        },
        Activity: {
            screen: ActivityNavigator,
            navigationOptions: {
                tabBarLabel: ' ',
                tabBarIcon: ({ focused }) => (
                    <AntDesign name={focused ? 'heart' : 'hearto'} size={28} style={{ marginTop: 15, color: focused ? 'orange' : 'black' }} />
                )
            }
        },
        Profile: {
            screen: ProfileNavigator,
            navigationOptions: {
                tabBarLabel: ' ',
                tabBarIcon: ({ focused }) => (
                    <Feather name='user' size={28} style={{ marginTop: 15, color: focused ? 'orange' : 'black' }} />
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
