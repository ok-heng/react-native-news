import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Platform } from 'react-native';
import PropTypes from 'prop-types';
import Video from 'react-native-video';


export default class HeadlineNewsListItem extends Component {
/** static propTypes = {
        article: PropTypes.shape({
            title: PropTypes.string,
            images: PropTypes.arrayOf(PropTypes.string),
            video: PropTypes.string,
            source: PropTypes.string,
            comments: PropTypes.arrayOf(PropTypes.object)
        })
    };
*/
    render() {
        const { article } = this.props;
        if (article.images.length == 3) {
            return this.threeImages(article);
        } else if (article.images.length == 1) {
            return this.oneImage(article);
        } else if (article.images.length == 0) {
            return this.noImage(article);
        } else if (article.video) {
            return this.oneVideo(article);
        } else if (article.isAdvertisement) {
            return this.advertisement(article);
        }
    }

    threeImages = (article) => {
        return (
            <View style={styles.listItem}>
                    <Text style={styles.listTitle}>{article.title}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', 
                alignItems: 'center' }}>
                    <Image style={styles.imageThree} source={{ uri: article.images[0] }} />
                    <Image style={styles.imageThree} source={{ uri: article.images[1] }} />
                    <Image style={styles.imageThree} source={{ uri: article.images[2] }} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={styles.listDim}>{article.source}     评论数:{article.comments.length}</Text>
                </View>
            </View>
        );
    };

    oneImage = (article) => {
        return (
            <View style={styles.listItem}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.listTitle}>{article.title}</Text>
                        <Text style={styles.listDim}>{article.source}     评论数:{article.comments.length}</Text>
                    </View>
                    <Image style={styles.listImage} source={{ uri: article.images[0] }} />
                </View>
            </View>
        );
    };

    noImage = (article) => {
        return (
            <View style={styles.listItem}>
                <View>
                    <Text style={styles.listTitle}>{article.title}</Text>
                </View>
                <View>
                    <Text style={styles.listDim}>{article.source}     评论数:{article.comments.length}</Text>
                </View>
            </View>
        );
    };


    oneVideo = (article) => {
        return (
            <view style={styles.listItem}>
                <View style={styles.listVideo}>
                    <Video
                        source={{ uri: article.video }}
                        ref={(ref) => { this.player = ref }}
                        onBuffer={this.onBuffer}
                        onError={this.videoError}
                        style={styles.backgroundVideo}
                    />
                </View>
            </view>
        );
    };

    advertisement = (article) => {
        return (
            <View style={styles.listItem}>
                <View>
                    <Text style={styles.listTitle}>{article.title}</Text>
                </View>
                <View>
                    <Image style={styles.advertisementImage} source={{ uri: article.images[0] }} />
                </View>
                <View>
                    <Text style={{ color: '#000fff' }}>广告   </Text>
                </View>
            </View>
        );
    };
}

const smallWidth = (Dimensions.get('window').width - 120) / 3;
const smallHeight = (Dimensions.get('window').width - 120) * 10 / 43;
const largeWidth = (Dimensions.get('window').width - 150);
const largeHeight = (Dimensions.get('window').width - 150);

const styles = StyleSheet.create({
    listItem: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: '#ffffff',
    },
    listTitle: {
        fontSize: 14,
        color: '#000000',
    },
    listImage: {
        width: (Dimensions.get('window').width - 40) / 3,
        height: (Dimensions.get('window').width - 40) / 3-50,
        backgroundColor: '#eeeeee',
    },
    imageThree: {
        flex: 1,
        width: (Dimensions.get('window').width - 40) / 3,
        height: (Dimensions.get('window').width - 40) / 3-50,
        backgroundColor: '#eeeeee',
        margin: 2
    },
    listDim: {
        fontSize: 12,
        color: 'gray',
        marginTop: 10,
    },
    listVideo: {
        width: largeWidth,
        height: largeHeight,
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    advertisingImage: {
        width: largeWidth,
        height: largeHeight,
    },
});