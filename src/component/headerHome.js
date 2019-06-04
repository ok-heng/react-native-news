import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StatusBar, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Header extends Component {
    render() {
        return (
            <View style={{ height: 70, backgroundColor: '#eee' }}>
                <StatusBar
                    animated={true}
                    hidden={false}
                    barStyle='dark-content'
                    backgroundColor='transparent'
                    translucent={true}
                />

                <TouchableOpacity style={{ marginLeft: 20, position: 'absolute', bottom: 0 }}>
                    <Ionicons name='logo-designernews' size={45} />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', position: 'absolute', bottom: 10, marginLeft: 110 }}>
                    <TextInput
                        placeholder='搜索'
                        placeholderTextColor='#444'
                        style={{ width: 150, height: 25, borderRadius: 8, backgroundColor: '#fff' }}
                    />

                    <TouchableOpacity style={{ marginLeft: 20 }}>
                        <Ionicons name='ios-search' size={25} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}