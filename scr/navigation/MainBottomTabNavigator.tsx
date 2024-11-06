import {useState} from "react";
import {View} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DeleteIcon from "../../icons/DeleteIcon";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import ButtonIcon from "../components/ButtonIcon";
import ArrowBackIcon from "../../icons/ArrowBackIcon";
import PostsIcon from "../../icons/PostsIcon";
import CreatePostIcon from "../../icons/CreatePostIcon";
import ProfileIcon from "../../icons/ProfileIcon";
import PostsScreen from "../screens/PostsScreen";
import LogoutIcon from "../../icons/LogoutIcon";
import ProfileScreen from "../screens/ProfileScreen";
import {colors} from "../../styles/global";
import {useDispatch} from "react-redux";
import {logoutDB} from "../utils/auth";

const Tab = createBottomTabNavigator();

export type TabNames = 'PostsTab' | 'CreatePostTab' | 'ProfileTab';

const MainBottomTabNavigator = () => {
    const [activeTab, setActiveTab] = useState<TabNames>("PostsTab");
    const dispatch = useDispatch();

    const handlerLogout = () => logoutDB(dispatch)

    return (
        activeTab === 'CreatePostTab' ? (
            <Tab.Navigator
                screenOptions={{
                    tabBarLabel: '',
                    headerLeftContainerStyle: { paddingLeft: 16 },
                    headerRightContainerStyle: { paddingRight: 16 },
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                width: 70,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: focused ? colors.lightGrey : 'transparent',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <DeleteIcon strokeColor={focused ? colors.gray: "#212121"} />
                        </View>
                    ),
                    tabBarStyle: {
                        paddingTop: 30,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        elevation: 0,
                        backgroundColor: colors.white,
                        height: 70,
                    }
                }}
            >
                <Tab.Screen
                    name="CreatePostTab"
                    component={CreatePostsScreen}
                    options={({ navigation }) => ({
                        headerTitle: 'Створити публікацію',
                        headerLeft: () => (
                            <ButtonIcon onPress={() =>
                                    navigation.reset({
                                        index: 0,
                                        routes: [{name: 'Home'}],
                                    })
                                }
                            >
                                <ArrowBackIcon />
                            </ButtonIcon>
                        ),
                    })}
                />
            </Tab.Navigator>

        ) : (
            <Tab.Navigator
                initialRouteName="PostsTab"
                screenOptions={({ route }) => ({
                    tabBarLabel: '',
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: '#212121',
                    headerLeftContainerStyle: {paddingLeft: 16},
                    headerRightContainerStyle: {paddingRight: 16},
                    tabBarStyle: {
                        paddingTop: 30,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        elevation: 0,
                        backgroundColor: colors.white,
                        height: 70,
                    },
                    tabBarIcon: ({ focused }) => {
                        let IconComponent;
                        let backgroundColor = focused ? '#FF6C00' : 'transparent';

                        if (route.name === 'PostsTab') {
                            IconComponent = <PostsIcon stroke={focused ? "white" : "#212121"} />;
                        } else if (route.name === 'CreatePostTab') {
                            IconComponent = <CreatePostIcon stroke={focused ? "white" : "#212121"} />;
                        } else if (route.name === 'ProfileTab') {
                            IconComponent = <ProfileIcon stroke={focused ? "white" : "#212121"} />;
                        }

                        return (
                            <View
                                style={{
                                    width: 70,
                                    height: 40,
                                    borderRadius: 20,
                                    backgroundColor,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {IconComponent}
                            </View>
                        );
                    },
                })}
            >
                <Tab.Screen
                    name="PostsTab"
                    component={PostsScreen}
                    options={{
                        headerTitle: 'Публікації',
                        headerRight: () => (
                            <ButtonIcon onPress={handlerLogout}>
                                <LogoutIcon />
                            </ButtonIcon>
                        ),
                    }}
                    listeners={{
                        focus: () => setActiveTab('PostsTab'),
                    }}
                />
                <Tab.Screen
                    name="CreatePostTab"
                    component={CreatePostsScreen}
                    listeners={{
                        focus: () => setActiveTab('CreatePostTab'),
                    }}
                />
                <Tab.Screen
                    name="ProfileTab"
                    component={ProfileScreen}
                    options={{
                        headerShown: false,
                    }}
                    listeners={{
                        focus: () => setActiveTab('ProfileTab'),
                    }}
                />
            </Tab.Navigator>
        )
    );
};

export default MainBottomTabNavigator;