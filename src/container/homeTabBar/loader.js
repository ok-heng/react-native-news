import Realm from 'realm';
import { v4 as uuid } from 'uuid';

export default (realm, user) => {
    realm.write(() => {
        const henry = realm.create('User', {
            userId: uuid(),
            nickname: 'henry',
            avatar: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
            adress: '深圳',
        });

        const article1 = realm.create('Article', {
            articleId: uuid(),
            title: '为什么日本能借走那么多只大熊猫，别的国家却“眼巴巴”借不到？',
            content: '<Img src="https://facebook.github.io/react-native/docs/assets/favicon.png" style="width: 860px; height: 700px"/><p style="font-size: 40">民防部门称，15日，溃坝矿区的搜寻工作已进入第81天。当天共有138名消防人员动用81台挖掘机械开展搜寻工作。挖掘范围涉及溃坝矿区的餐厅、房屋、货运站、停车场、铁路区域和尾矿堆积场等18个场所。目前，何时结束搜寻仍未可知。</p>\n<Img src="https://facebook.github.io/react-native/docs/assets/favicon.png" style="width: 860px; height: 700px"/>\n<p style="font-size: 40">民防部门称，15日，溃坝矿区的搜寻工作已进入第81天。当天共有138名消防人员动用81台挖掘机械开展搜寻工作。挖掘范围涉及溃坝矿区的餐厅、房屋、货运站、停车场、铁路区域和尾矿堆积场等18个场所。目前，何时结束搜寻仍未可知。</p>\n<p style="font-size: 40">民防部门称，15日，溃坝矿区的搜寻工作已进入第81天。当天共有138名消防人员动用81台挖掘机械开展搜寻工作。挖掘范围涉及溃坝矿区的餐厅、房屋、货运站、停车场、铁路区域和尾矿堆积场等18个场所。目前，何时结束搜寻仍未可知。<p>\n',
            timestamp: '2019-4-1',
            source: '吱吱的毛驴',
            isAdvertisement: false,
            byPraiseNum: 134,
            images: ['https://facebook.github.io/react-native/docs/assets/favicon.png']
        });

        const comment1 = realm.create('Comment', {
            commentId: uuid(),
            timestamp: '2019-4-3',
            content: '文章写得很好文章写，得很好文章写得很好，文章写得很好文章写得很好文章写得很好文章写得很好文章写得很好文章写得很好',
            byPraiseNum: 64,
        });
        
        const reply1 = realm.create('Reply', {
            replyId: uuid(),
            timestamp: '2019-4-5',
            content: '你说得很有道理你，说得很有道理你说得，很有道理你说得很有，道理你说得很有道理',
        });

        henry.articles.push(article1);
        henry.comments.push(comment1);
        henry.replies.push(reply1);

        article1.comments.push(comment1);

        comment1.replies.push(reply1);

        const permissionUser = realm.objects("__User").filtered(`id == '${user.identity}'`)[0];
        const permission = realm.create(Realm.Permissions.Permission, {
            role: permissionUser.role,
            canRead: true,
            canUpdate: true,
            canDelete: true,
        })
        henry.permissions.push(permission);
        article1.permissions.push(permission);
        comment1.permissions.push(permission);
        reply1.permissions.push(permission);
    });
    return (realm);
}

