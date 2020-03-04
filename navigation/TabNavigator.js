import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Home from '../screens/Home';
import Activity from "../screens/Activity";
import Post from "../screens/Post";
import Search from "../screens/Search";
import Profile from "../screens/Profile";

export default createAppContainer(createBottomTabNavigator(
    {
                Home: {
                    screen: Home
                },
                Search: {
                    screen: Search
                },
                Post: {
                    screen: Post
                },
                Activity: {
                    screen: Activity
                },
                Profile: {
                    screen: Profile
                }
            }
        )
);