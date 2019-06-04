import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import styles from './personStyle';
import Realm from 'realm';
import * as Schema from '../schema';
import { List, ListItem, Left, Right, Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Person extends Component {
    state = {
        dataVersion: 0
    };

    componentDidMount() {
        if (Realm.Sync.User.current) {
            this.authenticated(Realm.Sync.User.current);
        }
    }

    authenticated = (user) => {
        const config = user.createConfiguration({
            sync: {
                url: 'realms://news.us1.cloud.realm.io/~/realmUser',
                error: (err) => console.log(err)
            },
            schema: [Schema.UserSchema, Schema.ArticleSchema, Schema.CommentSchema, Schema.ReplySchema,
            Schema.BokeArticleSchema, Schema.BokeCommentSchema, Schema.BokeReplySchema,
            ],
            schemaVersion: this.state.dataVersion
        });
        const realmUser = new Realm(config);
        this.setState({ realmUser });
    };

    render() {
        const { realmUser } = this.state;

        return (
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        <View style={styles.icon}>
                            <TouchableOpacity style={styles.icon1}>
                                <Ionicons name='logo-facebook' size={35} color='#444' />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.icon2}>
                                <Ionicons name='logo-twitter' size={35} color='#444' />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.icon2}>
                                <Ionicons name='logo-youtube' size={35} color='#444' />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.icon4}>
                                <Ionicons name='logo-linkedin' size={35} color='#444' />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.login}>
                            {!Realm.Sync.User.current && (
                                <TouchableOpacity style={styles.login1} onPress={() => this.props.navigation.navigate('loginEmail')}>
                                    <Text style={styles.login11}>
                                        登陆/注册
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={styles.logout}>
                            <View style={styles.logout1}>
                                <Ionicons name='ios-text' size={30} color='#444' />
                                <Text style={styles.logout11}>
                                    评论
                                </Text>
                            </View>

                            <View style={styles.logout2}>
                                <Ionicons name='ios-star-outline' size={30} color='#444' />
                                <Text style={styles.logout11}>
                                    收藏
                                </Text>
                            </View>

                            <View style={styles.logout3}>
                                <Ionicons name='ios-time' size={30} color='#444' />
                                <Text style={styles.logout11}>
                                    历史
                                </Text>
                            </View>
                        </View>
                    </View>

                    <List style={styles.list}>
                        <View>
                            <ListItem>
                                <Left>
                                    <Text>我的消息</Text>
                                </Left>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text>我的钱包</Text>
                                </Left>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text>我的签到</Text>
                                </Left>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text>京东在线</Text>
                                </Left>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                        </View>

                        <View style={{marginTop: 15}}>
                            <ListItem>
                                <Left>
                                    <Text>设置</Text>
                                </Left>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>

                            {Realm.Sync.User.current && (
                                <View>
                                    <ListItem>
                                        <Left>
                                            <Text>帐号管理</Text>
                                        </Left>
                                        <Right>
                                            <Icon name="arrow-forward" />
                                        </Right>
                                    </ListItem>
                                    <TouchableOpacity onPress={() => this.logoutPress(currentUser)}>
                                        <ListItem>
                                            <Left>
                                                <Text>退出登陆</Text>
                                            </Left>
                                            <Right>
                                                <Icon name="arrow-forward" />
                                            </Right>
                                        </ListItem>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </List>
                </ScrollView>
            </View>
        );
    }

    logoutPress = () => {
        if (Realm.Sync.User.current) {
            Realm.Sync.User.current.logout();
            this.forceUpdate();
        }
    };
}