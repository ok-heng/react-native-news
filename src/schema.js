export const UserSchema = {
    name: 'User',
    primaryKey: 'userId',
    properties: {
        userId: 'string',
        nickname: 'string?',
        avatar: 'string?',

        //home
        adress: 'string?',
        
        //boke
        signature: 'string?',

        //home
        articles: 'Article[]',
        comments: 'Comment[]',
        replies: 'Reply[]',
        collect: 'Article[]',
        attention: 'User[]',

        //boke
        bokeArticles: 'BokeArticle[]',
        bokeComments: 'BokeComment[]',
        bokeReplies: 'BokeReply[]',

        permissions: "__Permission[]"
    }
};

//realm
export const ArticleSchema = {
    name: 'Article',
    primaryKey: 'articleId',
    properties: {
        articleId: 'string',
        title: { type: 'string', indexed: true },
        content: { type: 'string', indexed: true },
        timestamp: 'string?',
        source: 'string?',
        isAdvertisement: 'bool?',
        byPraiseNum: 'int?',
        images: 'string?[]',
        video: 'string?',

        comments: 'Comment[]',
        owners: { type: 'linkingObjects', objectType: 'User', property: 'articles' },
        permissions: "__Permission[]"
    }
};

export const CommentSchema = {
    name: 'Comment',
    primaryKey: 'commentId',
    properties: {
        commentId: 'string',
        timestamp: 'string?',
        content: 'string?',
        byPraiseNum: 'int?',

        replies: 'Reply[]',
        owners: { type: 'linkingObjects', objectType: 'User', property: 'comments' },
        permissions: "__Permission[]"
    }
};

export const ReplySchema = {
    name: 'Reply',
    primaryKey: 'replyId',
    properties: {
        replyId: 'string',
        timestamp: 'string?',
        content: 'string?',

        owners: { type: 'linkingObjects', objectType: 'User', property: 'replies' },
        permissions: "__Permission[]"
    }
};

//homeAdvertisement
export const AdvertisementSchema = {
    name: 'Advertisement',
    primaryKey: 'advertisementId',
    properties: {
        advertisementId: 'string',
        name: 'string?',
        title: 'string?',
        images: 'string?[]',
        permissions: "__Permission[]"
    }
};

//realmBoke
export const BokeArticleSchema = {
    name: 'BokeArticle',
    primaryKey: 'articleId',
    properties: {
        articleId: 'string',
        content: { type: 'string', indexed: true },
        timestamp: 'string?',
        images: 'string?[]',
        
        video: 'string?',
        
        comments: 'BokeComment[]',
        owners: { type: 'linkingObjects', objectType: 'User', property: 'bokeArticles' },
        permissions: "__Permission[]"
    }
};

export const BokeCommentSchema = {
    name: 'BokeComment',
    primaryKey: 'commentId',
    properties: {
        commentId: 'string',
        content: 'string?',
        timestamp: 'string?',
        
        replies: 'BokeReply[]',
        owners: { type: 'linkingObjects', objectType: 'User', property: 'bokeComments' },
        permissions: "__Permission[]"
    }
};

export const BokeReplySchema = {
    name: 'BokeReply',
    primaryKey: 'replyId',
    properties: {
        replyId: 'string',
        content: 'string?',
        timestamp: 'string?',
        
        owners: { type: 'linkingObjects', objectType: 'User', property: 'bokeReplies' },
        permissions: "__Permission[]"
    }
};







