import React from 'react';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './home';
import Video from './video';
import Boke from './boke';
import Person from './person';
import HeaderHome from '../component/headerHome';


const HomeStack = createStackNavigator(
    {
        home: {
            screen: Home,
            navigationOptions: () => ({
                header: <HeaderHome />
            })
        }
    }
);

const BottomTabNavigator= createBottomTabNavigator(
    {
        主页: HomeStack,
        视频: Video,
        动态: Boke,
        我的: Person
    },
    {
        initialRouteName: '主页',
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                if (routeName == '主页') {
                    if (focused) {
                        return (<Icon name="ios-home" size={25} color={tintColor} />);
                    } else {
                        return (<Icon name="ios-home" size={25} color={tintColor} />);
                    }
                } else if (routeName == '视频') {
                    if (focused) {
                        return (<Icon name='ios-play-circle' size={25} color={tintColor} />);
                    } else {
                        return (<Icon name='ios-play-circle' size={25} color={tintColor} />);
                    }
                } else if (routeName == '动态') {
                    if (focused) {
                        return (<Icon name='ios-aperture' size={25} color={tintColor} />);
                    } else {
                        return (<Icon name='ios-aperture' size={25} color={tintColor} />);
                    }
                } else if (routeName == '我的') {
                    if (focused) {
                        return (<Icon name='ios-person' size={25} color={tintColor} />);
                    } else {
                        return (<Icon name='ios-person' size={25} color={tintColor} />);
                    }
                }
            }
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray'
        },
    }
);

export default createAppContainer(BottomTabNavigator);