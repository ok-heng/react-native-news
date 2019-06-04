import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, TextInput, Button, FlatList, Image, Alert,
    Dimensions,
} from 'react-native';
import Realm from 'realm';
import { v4 as uuid } from 'uuid';
import { Icon } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Overlay } from 'react-native-elements';

const commentKeyExtractor = (comment) => comment.commentId;
const replyKeyExtractor = (reply) => reply.replyId;

function replacer(value) {
    return JSON.stringify(value).replace(/\"/g, '');
}

export default class CommentList extends Component {
    state = {
        dataVersionComment: 0,
        dataVersionReply: 0,

        replyOverlayVisible: false,
        commentOverlayVisible: false,
    };

    render() {
        const { navigation } = this.props;
        const article = navigation.getParam('article', 'noArticle');

        return (
            <View style={{ flex: 1 }}>


                {/**评论 */}
                <View>
                    <View>
                        <Text>
                            热门评论
                        </Text>
                    </View>

                    <View>
                        {article.comments && this.commentList(article)}
                    </View>
                </View>

                {/**底部bar */}
                <View style={{
                    flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    position: 'absolute', bottom: 0, backgroundColor: '#ffffff'
                }}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => this.bottomBarTextInputPress(article)}
                    >
                        <Text style={{ fontSize: 14 }}>写评论</Text>
                    </TouchableOpacity>

                </View>

                {/**评论项回复点击 */}
                <KeyboardAwareScrollView>
                    <Overlay
                        isVisible={this.state.replyOverlayVisible}
                        overlayBackgroundColor='#ffffff'
                        width={Dimensions.get('window').width}
                        height={80}
                        overlayStyle={{ position: 'absolute', bottom: 260 }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                placeholder="请输入消息"
                                autoFocus={true}
                                onBlur={() => this.setState({ replyOverlayVisible: false })}
                                onChangeText={(text) => this.setState({ replyText: text })}
                                style={{ width: 100, height: 50, borderStyle: 'solid', borderColor: '#000000' }}
                            />
                            <Button title='发送' onPress={() => this.addReply(this.state.commentItem)} />
                        </View>
                    </Overlay>
                </KeyboardAwareScrollView>

                {/**底部评论输入框点击 */}
                <KeyboardAwareScrollView>
                    <Overlay
                        isVisible={this.state.commentOverlayVisible}
                        overlayBackgroundColor='#ffffff'
                        width={Dimensions.get('window').width}
                        height={80}
                        overlayStyle={{ position: 'absolute', bottom: 260 }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                placeholder="写评论"
                                autoFocus={true}
                                onBlur={() => this.setState({ commentOverlayVisible: false })}
                                onChangeText={(text) => this.setState({ commentText: text })}
                                style={{ width: 100, height: 50, borderStyle: 'solid', borderColor: '#000000' }}
                            />
                            <Button title='发送' onPress={() => this.addComment(article)} />
                        </View>
                    </Overlay>
                </KeyboardAwareScrollView>
            </View >
        );
    }



    //评论列表
    commentList = (article) => {
        const commentsSlice = article.comments.sorted('byPraiseNum', true).slice(0, 8);
        const { navigation } = this.props;
        const realm = navigation.getParam('realm', 'noRealm');
        const realmUser = navigation.getParam('realmUser', 'noRealm');

        return (
            <View>
                <View>
                    <FlatList
                        data={commentsSlice}
                        extraData={this.state.dataVersionComment}
                        keyExtractor={commentKeyExtractor}
                        renderItem={this.renderComment}
                    />
                </View>
            </View>
        );
    };

    //评论项
    renderComment = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Image style={{ width: 50, height: 50 }} source={{ uri: replacer(item.owners[0].avatar) }} />

                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{replacer(item.owners[0].nickname)}</Text>
                        <Icon name='ios-medal' size={25} color='#ff4040' />
                    </View>
                    <Text>{replacer(item.owners[0].adress)}</Text>

                    <Text>{replacer(item.content)}</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <Text>{replacer(item.timestamp)}</Text>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => this.replyPress(item)}>
                            <Text style={{ color: '#ff4040' }}>回复</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        {item.replies && this.replyList(item)}
                    </View>
                </View>

                <TouchableOpacity activeOpacity={0.7} onPress={() => this.commentPraisePress(item)}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name='ios-thumbs-up' size={25} color='#ff4040' />
                        <Text>{replacer(item.byPraiseNum)}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    //评论点赞
    commentPraisePress = (comment) => {
        const { navigation } = this.props;
        const realm = navigation.getParam('realm', 'noArticle');

        realm.write(() => {
            comment.byPraiseNum = comment.byPraiseNum + 1;
        });
    };

    //评论项回复点击
    replyPress = (comment) => {
        this.setState({ replyOverlayVisible: true, commentItem: comment });
    };

    //增加回复
    addReply = (comment) => {
        if (Realm.Sync.User.current) {
            const { navigation } = this.props;
            const realm = navigation.getParam('realm', 'noRealm');
            const realmUser = navigation.getParam('realmUser', 'norealm');
            const { replyText } = this.state;

            realmUser.write(() => {
                const user = realmUser.create('User', {
                    userId: Realm.Sync.User.current.identity,
                }, true);

                const reply = realmUser.create('Reply', {
                    replyId: uuid(),
                    timestamp: new Date(),
                    content: replyText,
                });

                user.repies.push(reply);
            });

            this.setState({ replyOverlayVisible: false });
        }
    };

    //回复列表
    replyList = (comment) => {
        const repliesSlice = comment.replies.sorted('timestamp', false).slice(0, 3);

        return (
            <View>
                <View>
                    <FlatList
                        data={repliesSlice}
                        extraData={this.state.dataVersionReply}
                        keyExtractor={replyKeyExtractor}
                        renderItem={({ item }) => this.renderReply(item)}
                    />
                </View>
                <Text>显示更多回复</Text>
            </View>
        );
    };

    //回复项
    renderReply = (item) => {
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: replacer(item.owners[0].avatar) }} />

                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>
                                {replacer(item.owners[0].nickname)}
                            </Text>
                            <Icon name='ios-medal' size={25} color='#ff4040' />
                        </View>
                        <Text>
                            {replacer(item.owners[0].adress)}
                        </Text>
                        <View>
                            <Text>
                                {replacer(item.content)}
                            </Text>
                        </View>
                    </View>

                    <Text>{replacer(item.timestamp)}</Text>
                </View>
            </View>
        );
    };

    //底部bar输入框点击
    bottomBarTextInputPress = () => {
        this.setState({ commentOverlayVisible: true });
    };

    //增加评论
    addComment = (article) => {
        if (Realm.Sync.User.current) {
            const { navigation } = this.props;
            const realm = navigation.getParam('realm', 'noArticle');
            const realmUser = navigation.getParam('realmUser', 'noArticle');
            const { commentText } = this.state;

            realmUser.write(() => {
                const user = realmUser.create('User', {
                    userId: Realm.Sync.User.current.identity,
                }, true);

                const comment = realmUser.create('Comment', {
                    commentId: uuid(),
                    timestamp: new Date(),
                    content: commentText,
                    byPraiseNum: 0
                });

                user.comments.push(comment);
            });

            this.setState({ commentOverlayVisible: false });
        }
    };
}