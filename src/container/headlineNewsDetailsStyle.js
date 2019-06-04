import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    containerMargin: {
        marginLeft: 12,
        marginRight: 12,
    },
    title: {
        marginTop: 15,
    },
    title1: {
        fontSize: 20,
    },
    author: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
        width: '100%',
        height: 30,
    },
    author1: {
        marginLeft: 15,
    },
    author11: {
        width: 28,
        height: 28,
        borderRadius: 14,
    },
    author2: {
        marginLeft: 5,
    },
    author21: {
        fontSize: 12,
    },
    author22: {
        fontSize: 12,
    },
    author3: {
        marginLeft: 150,
    },
    content: {
        flex: 1,
        marginTop: 15,
    },
    content1: {
        width: '100%',
        height: 950,
    },
    share: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    share1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
        width: 52,
        height: 26,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#aaa',
    },
    share11: {
        fontSize: 14,
    },
    comment: {
        flex: 1,
    },
    comment1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    comment11: {
        fontSize: 22,
        letterSpacing: 8,
    },
    comment2: {
        flex: 1,
        marginTop: 30,
    },
    bottom: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute', 
        bottom: 0,
        marginLeft: 12, 
        marginRight: 12,
        width: '100%',
        height: 30,
        backgroundColor: '#ffffff',
    },
    bottom1:{
        flexDirection: 'row',
        alignItems: 'center',
        width: 150,
        height: 24,
        borderRadius: 12,
        borderWidth: 0.4,
        borderColor: '#dddddd',
        backgroundColor: '#dddddd',
    },
    bottom11: {
        marginLeft: 10,
        fontSize: 12,
    },
    bottom2:{
        marginLeft: 30, 
        marginRight: 15,
    },
    bottom3:{
        marginLeft: 15, 
        marginRight: 15,
    },
    bottom4:{
        marginLeft: 15, 
        marginRight: 15,
    },
    replyOverlay: {
        flex: 1,
        flexDirection: 'row',
    },
    replyOverlay1: {

    },
    replyOverlay11: {
        width: 130, 
        height: 26, 
        borderRadius: 13,
        borderWidth: 0.4, 
        borderColor: '#dddddd',
    },
    replyOverlay2: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        width: 52, 
        height: 26, 
        borderRadius: 13,
        borderWidth: 0.4, 
        borderColor: '#dddddd',
        backgroundColor: '#dddddd'
    },
    replyOverlay21: {
        fontSize: 14,
    },
    commentOverlay: {
        flex: 1,
        flexDirection: 'row',
    },
    commentOverlay1: {
        
    },
    commentOverlay11: {
        width: 130, 
        height: 26, 
        borderRadius: 13,
        borderWidth: 0.4, 
        borderColor: '#dddddd',
    },
    commentOverlay2: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        width: 52, 
        height: 26, 
        borderRadius: 13,
        borderWidth: 0.4, 
        borderColor: '#dddddd',
        backgroundColor: '#dddddd'
    },
    commentOverlay21: {
        fontSize: 14,
    },
    commentList: {
        flex: 1,
        marginTop: 15,
    },
    commentList1: {

    },
    commentList2: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,

    },
    commentList21: {
        fontSize: 14,
    },
    commentItem: {
        flexDirection: 'row',
    },
    commentItem1: {
        height: 28,
    },
    commentItem11: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 0.4,
        borderColor: '#eeeeee',
        backgroundColor: '#eeeeee',
    },
    commentItem2: {
        width: 290,
        marginLeft: 5,
    },
    commentItem21: {
        flexDirection: 'row',
    },
    commentItem211: {
        fontSize: 11,
        color: 'blue',
        marginRight: 5,
    },
    commentItem22: {

    },
    commentItem221: {
        fontSize: 10,
        color: '#666'
    },
    commentItem23: {
        marginTop: 15,
    },
    commentItem231: {
        fontSize: 12,
    },
    commentItem24: {
        flexDirection: 'row',
        marginTop: 20,
    },
    commentItem241: {
        
    },
    commentItem2411: {
        fontSize: 12,
        color: '#aaa',
    },
    commentItem242: {
        marginLeft: 25,
    },
    commentItem2421: {
        fontSize: 12,
        color: '#aaa',
    },
    commentItem25: {
        marginTop: 15,
    },
    commentItem3: {
        position: 'absolute',
        right: 0,
    },
    commentItem31: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    commentItem311: {
        marginLeft: 3,
        fontSize: 12,
    },
    replyList: {
       
    },
    replyList1: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    replyList11: {
        marginTop: 15,
        fontSize: 12,
    },
    replyItem: {
        flexDirection: 'row'
    },
    replyItem1: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 0.4,
        borderColor: '#ddd',
        backgroundColor: '#ddd',
    },
    replyItem2: {
        marginLeft: 5,
        width:250
    },
    replyItem21: {
        flexDirection: 'row',
    },
    replyItem211: {
        fontSize: 10,
    },
    replyItem212: {
        position: 'absolute',
        right: 0,
        fontSize: 10,
    },
    replyItem22: {
        fontSize: 10,
    },
    replyItem23: {
        marginTop: 15,
        fontSize: 12,
    },
});