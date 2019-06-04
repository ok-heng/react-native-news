import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import Realm from 'realm';
import * as Schema from '../../schema';
import { v4 as uuid } from 'uuid';
import HeadlineNewsListItem from '../../component/headlineNewsListItem';
import loader from './loader';

const articleKeyExtractor = article => article.articleId;

export default class HeadlineNews extends Component {
    state = {
        dataVersion: 0
    };

    componentDidMount() {
        if(Realm.Sync.User.current) {
            this.authenticated(Realm.Sync.User.current);
        }
        this.loadData();
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

    loadData = async () => {
        try {
            this.setState({ error: undefined });
            const authUrl = 'https://news.us1.cloud.realm.io';
            const creds = Realm.Sync.Credentials.nickname(`visitor`);
            const user = await Realm.Sync.User.login(authUrl, creds);
            const config = user.createConfiguration({
                sync: {
                    url: 'realms://news.us1.cloud.realm.io/~/realmVisitor',
                    error: err => console.log(err)
                },
                schema: [
                    Schema.UserSchema, Schema.ArticleSchema, Schema.CommentSchema, Schema.ReplySchema,
                    Schema.BokeArticleSchema, Schema.BokeCommentSchema, Schema.BokeReplySchema,
                ],
            });
            //const realm = loader(new Realm(config), user);
            const realm = new Realm(config);
            const articles = realm.objects('Article');
            this.setState({ articles, realm });

            if (Realm.Sync.User.current) {
                Realm.Sync.User.current.logout();
                this.forceUpdate;
            }

            articles.addListener(() => {
                this.setState({ dataVersion: this.state.dataVersion + 1 });
            });
            this.subscription = articles.subscribe();
            this.subscription.addListener(this.onSubscriptionChange());
            this.setState({ articles });
        } catch (error) { 
            this.setState({ error });
        }
    };

    componentWillUnmount() {
        const { articles } = this.state;
        if (this.subscription) {
            this.subscription.removeAllListeners();
        }
        if (articles) {
            articles.removeAllListeners();
        }
    }

    render() {
        const { articles, dataVersion } = this.state;
        return (
            <View>
                {articles && (
                    <FlatList
                        data={articles}
                        extraData={dataVersion}
                        keyExtractor={articleKeyExtractor}
                        renderItem={({ item }) => this.renderArticle(item)}
                    />
                )}
            </View>
        );
    }

    onSubscriptionChange = () => {

    };

    renderArticle = (item) => {
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => this.articlePress(item)}>
                <HeadlineNewsListItem article={item} />
            </TouchableOpacity>
        );
    };

    articlePress = (article) => {
        const { realmUser, realm } = this.state;
        this.props.navigation.navigate('headlineNewsDetails', { article, realmUser, realm });
    };
}