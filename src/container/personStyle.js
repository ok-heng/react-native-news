import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    icon: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    icon1: {
        marginRight: 25
    },
    icon2: {
        marginLeft: 25,
        marginRight: 25
    },
    icon4: {
        marginLeft: 25,
    },
    login: {
        alignItems: 'center',
        marginTop: 30,
    },
    login1: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 30,
        borderRadius: 15,
        borderWidth: 0.4,
        borderColor: '#ddd',
        backgroundColor: '#ddd',
    },
    login11: {
        fontSize: 12,
    },
    logout: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    logout1: {
        flexDirection: 'column',
        marginRight: 60 
    },
    logout11: {
        fontSize: 12,
    },
    logout2: {
        marginLeft: 60,
        marginRight: 60 
    },
    logout3: {
        marginLeft: 60
    },
    list: {
        marginTop: 20
    }
});