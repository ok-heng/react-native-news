import React, { Component } from "react";
import { View, Text, Image } from 'react-native';
import { Icon } from 'native-base';

export default class BokeArticleItem extends Component {
    render() {
        const { article } = this.props;

        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Image source={{ uri: article.owners[0].avatar }} />
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <Text>
                            {article.owners[0].name}
                        </Text>
                        <Text>
                            {article.owners[0].signature}
                        </Text>
                    </View>
                </View>

                <View>
                    <Text>
                        {article.content}
                    </Text>
                </View>

                <View>
                    <View style={{ flexDirection: 'row' }}>
                        {article.images[0] && (
                            <View>
                                <Image source={{ uri: article.images[0] }} />
                            </View>
                        )}
                        {article.images[1] && (
                            <View>
                                <Image source={{ uri: article.images[1] }} />
                            </View>
                        )}
                        {article.images[2] && (
                            <View>
                                <Image source={{ uri: article.images[2] }} />
                            </View>
                        )}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        {article.images[3] && (
                            <View>
                                <Image source={{ uri: article.images[3] }} />
                            </View>
                        )}
                        {article.images[4] && (
                            <View>
                                <Image source={{ uri: article.images[4] }} />
                            </View>
                        )}
                        {article.images[5] && (
                            <View>
                                <Image source={{ uri: article.images[5] }} />
                            </View>
                        )}
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Icon name='ios-home' />
                        <Text>62</Text>
                    </View>

                    <View>
                        <Icon name='ios-home' />
                        <Text>74</Text>
                    </View>

                    <View>
                        <Icon name='ios-home' />
                        <Text>24</Text>
                    </View>
                </View>
            </View>
        );
    }
}