import React from 'react';
import Home from '../screens/Home'
import Search from '../screens/Search'
import Post from '../screens/Post'
import Activity from '../screens/Activity'
import Profile from '../screens/Profile'
import Comment from '../screens/Comment';
import UpdateDetails from '../screens/UpdateDetails';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

export const HomeNavigator = createAppContainer(createStackNavigator(
  {
    Home: { 
      screen: Home,
      navigationOptions: {
      	title: 'Home'
      }
    },
    Comment: {
      screen: Comment,
      navigationOptions: {
        title: 'Comment'
      }
    }
  }
));

HomeNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true
    if (navigation.state.routes.some(route => route.routeName === 'Map')) {
        tabBarVisible = false
    }
    if (navigation.state.routes.some(route => route.routeName === 'Comment')) {
      tabBarVisible = false
  }
    return {
        tabBarVisible,
    }
}

export const SearchNavigator = createAppContainer(createStackNavigator(
  {
    Search: { 
      screen: Search,
      navigationOptions: {
        title: 'Search'
      }
    }
  }
));

export const PostNavigator = createAppContainer(createStackNavigator(
  {
    Post: { 
      screen: Post,
      navigationOptions: {
        title: 'Post'
      }
    }
  }
));

export const ActivityNavigator = createAppContainer(createStackNavigator(
  {
    Activity: { 
      screen: Activity,
      navigationOptions: {
        title: 'Activity'
      }
    }
  }
));

export const ProfileNavigator = createAppContainer(createStackNavigator(
  {
    Profile: { 
      screen: Profile,
      navigationOptions: {
        title: 'Profile'
      }
    },
      UpdateDetails: {
        screen:UpdateDetails,
          navigationOptions: {
            title: 'Edit user details'
          }
      }
  }
));

ProfileNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true
    if (navigation.state.routes.some(route => route.routeName === 'UpdateDetails')) {
        tabBarVisible = false
    }
    return {
        tabBarVisible,
    }
}