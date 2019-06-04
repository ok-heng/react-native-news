import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, TextInput, FlatList, Image, Alert, StyleSheet,
    Dimensions, ScrollView, WebView
} from 'react-native';
import Realm from 'realm';
import { v4 as uuid } from 'uuid';
import styles from './headlineNewsDetailsStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Overlay } from 'react-native-elements';

const style = StyleSheet.create({
    attentionButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 52,
        height: 26,
        borderRadius: 13,
        backgroundColor: '#BBFFFF'
    },
    attentionButton1: {
        color: '#ff0000',
    },
});

const commentKeyExtractor = (comment) => comment.commentId;
const replyKeyExtractor = (reply) => reply.replyId;

function replacer(value) {
    return JSON.stringify(value).replace(/\"/g, '');
}

export default class HeadlineNewsDetails extends Component {
    state = {
        dataVersionComment: 0,
        dataVersionReply: 0,

        attentionText: '关注',

        replyOverlayVisible: false,
        commentOverlayVisible: false,
    };
    componentWillMount() {
        const { navigation } = this.props;
        const article = navigation.getParam('article', 'noArticle');
        const realmUser = navigation.getParam('realmUser', 'noArticle');
        const realm = navigation.getParam('realm', 'noArticle');
        this.setState({ article, realmUser, realm });
    }

    componentDidMount() {
        /** 
            const { article } = this.state;
            article.addListener(() => {
                this.setState({ dataVersion: this.state.dataVersion + 1 });
            });
            this.subscription = article.subscribe();
            this.subscription.addListener(this.onSubscriptionChange());
            this.setState({ article });
            */
    }

    componentWillUnmount() {
        /**
        const { article } = this.state;
        if (this.subscription) {
            this.subscription.removeAllListeners();
        }
        if (article) {
            article.removeAllListeners();
        }
         */
    }

    render() {
        const { article } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.containerMargin}>
                        {/**标题 */}
                        <View style={styles.title}>
                            <Text style={styles.title1}>{article.title}</Text>
                        </View>

                        {/**作者 */}
                        <View style={styles.author}>
                            <View style={styles.author1}>
                                <Image style={styles.author11} source={{ uri: article.owners[0].avatar }} />
                            </View>

                            <View style={styles.author2}>
                                <Text style={styles.author21}>{article.owners[0].nickname}</Text>
                                <Text style={styles.author22}>{article.timestamp}</Text>
                            </View>

                            <View style={styles.author3}>
                                {this.isByAttention(article.owners[0])}
                            </View>
                        </View>

                        {/**内容 */}
                        <View style={styles.content}>
                            <WebView
                                originWhitelist={['*']}
                                source={{ html: article.content }}
                                scrollEnabled={false}
                                style={styles.content1}
                            />
                        </View>

                        {/**分享 */}
                        <View style={styles.share}>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => this.articlePraisePress(article)}>
                                <View style={styles.share1}>
                                    <Icon name='ios-thumbs-up' size={17} />
                                    <Text style={styles.share11}>{article.byPraiseNum}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.7} onPress={() => this.shareWeiXin(article)}>
                                <View style={styles.share1}>
                                    <Text style={styles.share11}>微信</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.7} onPress={() => this.shareAperture(article)}>
                                <View style={styles.share1}>
                                    <Text style={styles.share11}>朋友圈</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.7} onPress={() => this.shareWeiBo(article)}>
                                <View style={styles.share1}>
                                    <Text style={styles.share11}>微博</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/**评论 */}
                        <View style={styles.comment}>
                            <View style={styles.comment1}>
                                <Text style={styles.comment11}>热门评论</Text>
                            </View>

                            <View style={styles.comment2}>
                                {article.comments && this.commentList(article)}
                            </View>
                        </View>

                        <View style={{ width: Dimensions.get('window').width, height: 80 }} />
                    </View>
                </ScrollView>

                <View style={styles.bottom}>
                    {/**底部评论输入框 */}
                    <TouchableOpacity activeOpacity={0.7} onPress={() => this.bottomBarTextInputPress(article)}>
                        <View style={styles.bottom1}>
                            <Text style={styles.bottom11}>写评论...</Text>
                        </View>
                    </TouchableOpacity>

                    {/**底部评论图标 */}
                    <TouchableOpacity activeOpacity={0.7} onPress={() => this.loadMoreComments(article)}>
                        <View style={styles.bottom2}>
                            <Icon name="ios-text" size={23} color='#ff4040' />
                        </View>
                    </TouchableOpacity>

                    {/**底部收藏 */}
                    <TouchableOpacity activeOpacity={0.7} onPress={() => this.bottomCollectPress(article)}>
                        <View style={styles.bottom3}>
                            <Icon name="ios-star-outline" size={22} color='#ff4040' />
                        </View>
                    </TouchableOpacity>

                    {/**底部分享 */}
                    <TouchableOpacity activeOpacity={0.7} onPress={() => this.bottomSharePress()}>
                        <View style={styles.bottom4}>
                            <Icon name="ios-share" size={21} color='#ff4040' />
                        </View>
                    </TouchableOpacity>
                </View>

                {/**评论项回复点击 */}
                <KeyboardAwareScrollView>
                    <Overlay
                        isVisible={this.state.replyOverlayVisible}
                        overlayBackgroundColor='#ffffff'
                        width={Dimensions.get('window').width}
                        height={50}
                        overlayStyle={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 260 }}
                    >
                        <View style={styles.replyOverlay}>
                            <View style={styles.replyOverlay1}>
                                <TextInput
                                    placeholder={this.state.replyPlaceholder}
                                    autoFocus={true}
                                    onBlur={() => this.setState({ replyOverlayVisible: false })}
                                    onChangeText={(text) => this.setState({ replyText: text })}
                                    style={styles.replyOverlay11}
                                />
                            </View>

                            <TouchableOpacity onPress={() => this.addReply(this.state.comment)}>
                                <View style={styles.replyOverlay2}>
                                    <Text style={styles.replyOverlay21}>发送</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Overlay>
                </KeyboardAwareScrollView>

                {/**底部评论输入框点击 */}
                <KeyboardAwareScrollView>
                    <Overlay
                        isVisible={this.state.commentOverlayVisible}
                        overlayBackgroundColor='#ffffff'
                        width={Dimensions.get('window').width}
                        height={50}
                        overlayStyle={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 260 }}
                    >
                        <View style={styles.commentOverlay}>
                            <View style={styles.commentOverlay1}>
                                <TextInput
                                    placeholder="写评论"
                                    autoFocus={true}
                                    onBlur={() => this.setState({ commentOverlayVisible: false })}
                                    onChangeText={(text) => this.setState({ commentText: text })}
                                    style={styles.commentOverlay11}
                                />
                            </View>

                            <TouchableOpacity onPress={() => this.addComment(article)}>
                                <View style={styles.commentOverlay2}>
                                    <Text style={styles.commentOverlay21}>发送</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Overlay>
                </KeyboardAwareScrollView>
            </View >
        );
    }

    onSubscriptionChange = () => {

    };

    //是否已关注
    isByAttention = (articleOwner) => {
        if (Realm.Sync.User.current) {
            const { navigation } = this.props;
            const realmUser = navigation.getParam('realmUser', 'norealm');
            const user = realmUser.objects('User').filted(`userId=='${Realm.Sync.User.current.identity}'`)[0];

            user.attention.map((item) => {
                if (item.identity == articleOwner.identity) {
                    return (
                        <TouchableOpacity
                            style={style.attentionButton}
                        >
                            <Text style={style.attentionButton1}>已关注</Text>
                        </TouchableOpacity>
                    );
                } else {
                    return (
                        <TouchableOpacity
                            style={style.attentionButton}
                            onPress={() => this.attentionButtonPress(articleOwner)}
                        >
                            <Text style={style.attentionButton1}>{this.state.attentionText}</Text>
                        </TouchableOpacity>
                    );
                }
            });
        } else {
            return (
                <TouchableOpacity
                    style={style.attentionButton}
                    onPress={() => Alert.alert('请登录', '', [{ text: '取消' }, { text: '确定' }], { cancelable: false })}
                >
                    <Text style={style.attentionButton1}>关注</Text>
                </TouchableOpacity>
            );
        }
    };

    //关注点击
    attentionButtonPress = (articleOwner) => {
        if (Realm.Sync.User.current) {
            const { navigation } = this.props;
            const realmUser = navigation.getParam('realmUser', 'norealm');

            realmUser.write(() => {
                const user = realmUser.create('User', {
                    userId: Realm.Sync.User.current.identity,
                }, true);

                user.attention.push(articleOwner);
            });
            this.setState({ attentionText: '已关注' });
        }
    };

    //文章点赞
    articlePraisePress = (article) => {
        const { realm } = this.state;
        realm.write(() => {
            article.byPraiseNum = article.byPraiseNum + 1;
        });
    };

    //分享微信
    shareWeiXin = (article) => {

    };

    //分享朋友圈
    shareAperture = (article) => {

    };

    //分享微博
    shareWeiBo = (article) => {

    };

    //评论列表
    commentList = () => {
        const { article, realmUser, realm } = this.state;
        const commentsSlice = article.comments.sorted('byPraiseNum', true).slice(0, 8);
        return (
            <View style={styles.commentList}>
                <FlatList
                    data={commentsSlice}
                    extraData={this.state.dataVersionComment}
                    keyExtractor={commentKeyExtractor}
                    renderItem={this.renderComment}
                />

                <TouchableOpacity
                    style={styles.commentList2}
                    onPress={() => this.props.navigation.navigate('commentList', { article, realm, realmUser })}
                >
                    <Text style={styles.commentList21}>加载更多评论</Text>
                </TouchableOpacity>
            </View>
        );
    };

    //评论项
    renderComment = ({ item }) => {
        return (
            <View style={styles.commentItem}>

                <View style={styles.commentItem1}>
                    <Image style={styles.commentItem11} source={{ uri: item.owners[0].avatar }} />
                </View>

                <View style={styles.commentItem2}>

                    <View style={styles.commentItem21}>
                        <Text style={styles.commentItem211}>{item.owners[0].nickname}</Text>
                        <Icon name='ios-medal' size={14} color='#ff4040' />
                    </View>


                    <View style={styles.commentItem22}>
                        <Text style={styles.commentItem221}>{item.owners[0].adress}</Text>
                    </View>


                    <View style={styles.commentItem23}>
                        <Text style={styles.commentItem231}>{item.content}</Text>
                    </View>

                    <View style={styles.commentItem24}>

                        <View style={styles.commentItem241}>
                            <Text style={styles.commentItem2411}>{item.timestamp}</Text>
                        </View>

                        <TouchableOpacity activeOpacity={0.7} onPress={() => this.replyPress(item)}>
                            <View style={styles.commentItem242}>
                                <Text style={styles.commentItem2421}>回复</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.commentItem25}>
                        {item.replies && this.replyList(item)}
                    </View>
                </View>

                <View style={styles.commentItem3}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => this.commentPraisePress(item)}>
                        <View style={styles.commentItem31}>
                            <Icon name='ios-thumbs-up' size={18} color='#ff4040' />
                            <Text style={styles.commentItem311}>{item.byPraiseNum}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    //评论点赞
    commentPraisePress = (comment) => {
        const { realm } = this.state;
        realm.write(() => {
            comment.byPraiseNum = comment.byPraiseNum + 1;
        });
    };

    //评论项回复点击
    replyPress = (comment) => {
        const replyPlaceholder = `回复${comment.owners[0].nickname}`
        this.setState({ replyOverlayVisible: true, comment, replyPlaceholder });
    };

    //增加回复
    addReply = (comment) => {
        if (Realm.Sync.User.current) {
            const { article, realmUser, realm, replyText } = this.state;
            const time = `${new Date()}`;

            realmUser.write(() => {
                const user = realmUser.create('User', {
                    userId: Realm.Sync.User.current.identity,
                }, true);

                const reply = realmUser.create('Reply', {
                    replyId: uuid(),
                    timestamp: time,
                    content: replyText,
                });

                user.repies.push(reply);
            });

            realm.write(() => {
                const reply = realmUser.create('Reply', {
                    replyId: uuid(),
                    timestamp: time,
                    content: replyText,
                });

                comment.repies.push(reply);
            });

            this.setState({ replyOverlayVisible: false });
        }
    };

    //回复列表
    replyList = (comment) => {
        const repliesSlice = comment.replies.sorted('timestamp', false).slice(0, 3);

        return (
            <View style={styles.replyList}>
                <FlatList
                    data={repliesSlice}
                    extraData={this.state.dataVersionReply}
                    keyExtractor={replyKeyExtractor}
                    renderItem={({ item }) => this.renderReply(item)}
                />
                <View style={styles.replyList1}>
                    <Text style={styles.replyList11}>更多回复</Text>
                </View>
            </View>
        );
    };

    //回复项
    renderReply = (item) => {
        return (
            <View style={styles.replyItem}>
                <Image style={styles.replyItem1} source={{ uri: item.owners[0].avatar }} />

                <View style={styles.replyItem2}>
                    <View style={styles.replyItem21}>
                        <Text style={styles.replyItem211}>{item.owners[0].nickname}</Text>
                        <Icon name='ios-medal' size={14} color='#ff4040' />

                        <Text style={styles.replyItem212}>{item.timestamp}</Text>
                    </View>
                    <Text style={styles.replyItem22}>{item.owners[0].adress}</Text>
                    <Text style={styles.replyItem23}>{item.content}</Text>
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
            const { realmUser, realm, commentText } = this.state;
            const time = `${new Date()}`;

            realmUser.write(() => {
                const user = realmUser.create('User', {
                    userId: Realm.Sync.User.current.identity,
                }, true);

                const comment = realmUser.create('Comment', {
                    commentId: uuid(),
                    timestamp: time,
                    content: commentText,
                    byPraiseNum: 0
                });

                user.comments.push(comment);
            });

            realm.write(() => {
                const comment = realmUser.create('Comment', {
                    commentId: uuid(),
                    timestamp: time,
                    content: commentText,
                    byPraiseNum: 0
                });

                article.comments.push(comment);
            });

            this.setState({ commentOverlayVisible: false });
        }
    };

    //底部bar评论图标点击
    bottomCommentIconPress = () => {
        const {article, realmUser, realm} = this.state;
        this.props.navigation.navigate('commentList', { article, realm, realmUser });
    };

    //底部bar收藏图标点击
    bottomCollectPress = () => {
        if (Realm.Sync.User.current) {
            const {article, realmUser} = this.state;
            
            realmUser.write(() => {
                const user = realmUser.create('user', {
                    userId: Realm.Sync.User.current.identity
                }, true);

                user.collect.push(article);
            });
        }
    };

    bottomSharePress = () => {

    };
}