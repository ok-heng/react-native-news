import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Icon, CheckBox } from 'native-base';
import Realm from 'realm'
import * as Schema from '../schema';

export default class SignupEmail extends Component {
    state = {
        dataVersion: 0
    };

    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Icon name='ios-home' style={{ position: 'relative', top: 0, right: 0 }} />
                </TouchableOpacity>

                <View>
                    <Image source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                        style={{ width: 50, height: 50, borderRadius: 25 }} />
                </View>
                <View>
                    <Text>邮箱注册</Text>
                </View>
                <View>
                    <TextInput placeholder='邮箱帐号' onChangeText={(account) => this.setState({ account })} />
                </View>
                <View>
                    <TextInput placeholder='密码' onChangeText={(passwordFirst) => this.setState({ passwordFirst })} />
                </View>
                <View>
                    <TextInput placeholder='确认密码' onChangeText={(passwordSecondly) => this.setState({ passwordSecondly })} />
                </View>

                <View>
                    {this.state.passwordFirst !== this.state.passwordFirst ?
                        (<TouchableOpacity style={{ backgroundColor: 'gray' }}>
                            <Text>立即注册</Text>
                        </TouchableOpacity>) :

                        (<TouchableOpacity onPress={() => this.signupPress()} style={{ backgroundColor: 'green' }}>
                            <Text>立即注册</Text>
                        </TouchableOpacity>)
                    }
                </View>

                <View>
                    <CheckBox />
                    <Text>
                        我已阅读并同意
                        <Text> 服务条款 </Text>和<Text> 隐私政策 </Text>
                    </Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="arrow-forward" />
                        <Text>帐号登陆</Text>
                    </View>
                    <Text>手机号注册</Text>
                </View>
            </View>
        );
    }

    signupPress = () => {
        const authUrl = 'https://news.us1.cloud.realm.io';
        const account = `${this.state.account}`
        const password = `${this.state.passwordSecondly}`
        const creds = Realm.Sync.Credentials.usernamePassword(account, password, true);

        Realm.Sync.User.login(authUrl, creds).then((user) => {
            const config = user.createConfiguration({
                sync: {
                    url: 'realms://news.us1.cloud.realm.io/~/news',
                    error: err => console.log(err)
                },
                schema: [Schema.UserSchema, Schema.ArticleSchema, Schema.CommentSchema, Schema.ReplySchema,
                Schema.BokeArticleSchema, Schema.BokeCommentSchema, Schema.BokeReplySchema,
                ],
                schemaVersion: this.state.dataVersion
            });

            Realm.open(config).then((realmUser) => {
                realmUser.write(() => {
                    realmUser.create('User', {
                        userId: user.identity,
                        nickname: `用户${account}`,
                        avatar: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
                        adress: '深圳'
                    });
                });
            }).catch((error) => console.log(error));
            this.setState({userIdentity: user.identity});
        }).catch((error) => console.log(error));

        this.props.navigation.goBack();
    };
}