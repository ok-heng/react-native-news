import React, { Component } from 'react';
import { createStackNavigator, createAppContainer, SafeAreaView } from 'react-navigation';
import BottomTabBar from './bottomTabBar';
import HeadlineNewsDetails from './headlineNewsDetails';
import CommentList from './commentList';
import LoginEmail from './loginEmail';
import SignupEmail from './signupEmail';

const BottomTabBarStack = createStackNavigator(
    {
        bottomTabBar: {
            screen: BottomTabBar,
            navigationOptions: () => ({
                header: null,
                headerBackTitle: null
            })
        },
        headlineNewsDetails: {
            screen: HeadlineNewsDetails,
            navigationOptions: () => ({
                headerTitle: 'B',
            })
        },

    }
);

const RootStack = createStackNavigator(
    {
        bottomTabBarStack: BottomTabBarStack,
        commentList: CommentList,
        loginEmail: LoginEmail,
        signupEmail: SignupEmail
    },
    {
        mode: 'modal',
        headerMode: 'none'
    }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
    render() {
        return (
            <AppContainer />
        );
    }
}


