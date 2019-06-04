import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import WorldInfo from './homeTabBar/worldInfo';
import HeadlineNews from './homeTabBar/headlineNews';
import ShortVideo from './homeTabBar/shortVideo';
import CompetitiveSports from './homeTabBar/competitiveSports';
import RiddleOfWorld from './homeTabBar/riddleOfWorld';

const MaterialTopTabNavigator = createMaterialTopTabNavigator(
    {
        环球: WorldInfo,
        头条: HeadlineNews,
        短视频: ShortVideo,
        竞技: CompetitiveSports,
        奇谜: RiddleOfWorld
    },
    {
        initialRouteName: '头条',
        swipeEnabled: true,
        tabBarOptions: {
            activeTintColor: '#ff0000',
            inactiveTintColor: '#000000',
            labelStyle: {
                fontSize: 10,
            },
            style: {
                backgroundColor: '#ffffff',
            },
            indicatorStyle: {
                opacity: 0
            },

        }
    }
);

export default createAppContainer(MaterialTopTabNavigator);





