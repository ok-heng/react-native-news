import React, { Component } from 'react'
import { View, Button, TextInput, StyleSheet } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Person from './person'
import LoginEmail from './loginEmail'

export default class LoginPhone extends Component {
    render() {
        return (
            <View>
                {/** 
                <View>
                    <Image />
                </View>
                <View>
                    <Text>手机号登陆</Text>
                </View>
                <View>
                    <TextInput placeHolder='手机号'>
                        <Button style={{ marginRight: 0 }}>获取验证码</Button>
                    </TextInput>
                </View>
                <View>
                    <TextInput placeHolder='验证码' />
                </View>
                <View>
                    <Button onPress={() => { this.loginPhonePress() }}>开始登陆</Button>
                </View>
                <View style={styles.layoutRow}>
                    <TouchableOpacity onPress={() => this.loginEmailPress()}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="arrow-forward" />
                            <Text>邮箱登陆</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginRight: 0 }}>手机号注册</Text>
                </View>
                <View style={styles.layoutRow}>
                    <View style={styles.layoutCenter}>
                        <Button><Icon name="arrow-forward" /></Button>
                    </View>
                    <View style={styles.layoutCenter}>
                        <Button><Icon name="arrow-forward" /></Button>
                    </View>
                    <View style={styles.layoutCenter}>
                        <Button><Icon name="arrow-forward" /></Button>
                    </View>
                </View>
                <View style={styles.layoutCenter}>
                    <Text>
                        登陆即代表您已阅读并同意
                        <Text style={{ borderBottomColor: '#333333' }}> 服务条款 </Text>
                        和
                        <Text> 隐私政策 </Text>
                    </Text>
                </View>
                */}
            </View>
        );
    }

    loginPhonePress = () => {

    }

    loginEmailPress = () => {
        this.navigation.navigate('LoginEmail');
    }
}

const styles = StyleSheet.create({
    layoutRow: {
        flex: 1,
        flexDirection: 'row'
    },
    layoutCenter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});


