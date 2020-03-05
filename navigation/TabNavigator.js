import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import {HomeNavigator,ActivityNavigator,PostNavigator,ProfileNavigator,SearchNavigator} from './StackNavigator';

export default createAppContainer(createBottomTabNavigator(
    {
                Home: {
                    screen: HomeNavigator
                },
                Search: {
                    screen: SearchNavigator
                },
                Post: {
                    screen: PostNavigator
                },
                Activity: {
                    screen: ActivityNavigator
                },
                Profile: {
                    screen: ProfileNavigator
                }
            }
        )
);