import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import BokeArticleItem from '../component/bokeArticleItem';
import Realm from 'realm';
import * as Schema from '../schema';

const articleKeyExtractor = (article) => article.articleId;

export default class Boke extends Component {
    state = {
        dataVersion: 0
    };
    render() {
        //const { realm } = this.state;
        //const articles = realm.objects('BokeArticle');

        return (
            <View>
                {/** 
                <FlatList
                    data={articles}
                    extraData={this.state.dataVersion}
                    keyExtractor={articleKeyExtractor}
                    renderItem={({ item }) => this.articleRenderItem(item)}
                />
                */}
            </View>
        );
    }

    articleRenderItem = (item) => {
        <BokeArticleItem article={item} />
    };
}