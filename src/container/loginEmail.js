import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Realm from 'realm';
import * as Schema from '../schema';
import styles from './loginEmailStyle';
import Icon from 'react-native-vector-icons/Ionicons';

export default class LoginEmail extends Component {
    state = {

    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.close}>
                    <TouchableOpacity
                        style={styles.close1}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Icon name='ios-close' size={30} />
                    </TouchableOpacity>
                </View>

                <View style={styles.image}>
                    <Image
                        style={styles.image1}
                        source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                    />
                </View>

                <View style={styles.module}>
                    <Text style={styles.textLogin}>邮箱帐号登陆</Text>

                    <TextInput
                        style={styles.textInputAccount}
                        placeholder='邮箱'
                        onChangeText={(textAccount) => this.setState({ textAccount })}
                    />

                    <TextInput
                        style={styles.textInputEmail}
                        placeholder='密码'
                        onChangeText={(textPassword) => this.setState({ textPassword })}
                    />

                    <TouchableOpacity
                        style={styles.login}
                        onPress={() => this.loginPress()}
                    >
                        <Text style={styles.login1}>开始登陆</Text>
                    </TouchableOpacity>

                    <View style={styles.loginPhone}>
                        <TouchableOpacity
                            style={styles.loginPhone1}
                            onPress={() => this.props.navigation.navigate('loginPhone')}
                        >
                            <Icon name="ios-phone-portrait" size={15} />
                            <Text style={styles.loginPhone11}>手机号登陆</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.loginPhone2}
                            onPress={() => this.props.navigation.navigate('signupEmail')}
                        >
                            <Text style={styles.loginPhone21}>邮箱注册</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.forget}
                        onPress={() => { }}
                    >
                        <Text style={styles.forget1}>忘记密码?</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.icon}>
                    <TouchableOpacity
                        style={styles.icon1}
                        onPress={() => { }}
                    >
                        <Icon name="logo-facebook" size={35} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.icon2}
                        onPress={() => { }}
                    >
                        <Icon name="logo-twitter" size={35} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.icon3}
                        onPress={() => { }}
                    >
                        <Icon name="logo-skype" size={35} />
                    </TouchableOpacity>
                </View>

                <View style={styles.clause}>
                    <Text style={styles.clause1}>
                        登陆即代表您已阅读并同意
                        <Text> 服务条款 </Text>和<Text> 隐私政策 </Text>
                    </Text>
                </View>
            </View>
        );
    }

    loginPress = () => {
        const authUrl = 'https://news.us1.cloud.realm.io';
        const account = `${this.state.account}`
        const password = `${this.state.password}`
        const creds = Realm.Sync.Credentials.usernamePassword(account, password, false);

        Realm.Sync.User.login(authUrl, creds).then(user => {
            const config = user.createConfiguration({
                sync: {
                    url: 'realms://news.us1.cloud.realm.io/~/news',
                    error: err => console.log(err)
                },
                schema: [
                    Schema.UserSchema, Schema.ArticleSchema, Schema.CommentSchema, Schema.ReplySchema,
                    Schema.BokeArticleSchema, Schema.BokeCommentSchema, Schema.BokeReplySchema,
                ],
                schemaVersion: this.state.dataVersion
            });

            new Realm(config);
        }).catch(error => console.log(error));

        this.props.navigation.goBack();
    };
}