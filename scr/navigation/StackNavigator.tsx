import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import MainBottomTabNavigator from "./MainBottomTabNavigator";
import CommentsScreen from "../screens/CommentsScreen";
import ButtonIcon from "../components/ButtonIcon";
import ArrowBackIcon from "../../icons/ArrowBackIcon";
import MapScreen from "../screens/MapScreen";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store/store";
import {CommentPost} from "../screens/ProfileScreen";

export type RootStackParamList = {
    Login: undefined;
    Registration: undefined;
    Home: { screen?: string };
    Comments: {postId: string, sourceImg: string, comments: CommentPost[]};
    Location: { latitude: number; longitude: number;};

}

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
    const user = useSelector((state: RootState) => state.user.userInfo);
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
            }}
        >
            {user ? (
                <>
                    <Stack.Screen
                        name="Home"
                        component={MainBottomTabNavigator}
                    />
                    <Stack.Screen
                        name="Comments"
                        component={CommentsScreen}
                        options={({navigation}) =>({
                            headerShown: true,
                            headerTitle: 'Коментарі',
                            headerLeftContainerStyle: { paddingLeft: 16 },
                            headerRightContainerStyle: { paddingRight: 16 },
                            headerLeft: () =>(
                                <ButtonIcon onPress={()=>navigation.goBack()}>
                                    <ArrowBackIcon />
                                </ButtonIcon>
                            ),

                        })}
                    />
                    <Stack.Screen
                        name="Location"
                        component={MapScreen}
                        options={({navigation}) =>({
                        headerShown: true,
                        headerTitle: 'Місце знаходження',
                        headerLeftContainerStyle: { paddingLeft: 16 },
                        headerRightContainerStyle: { paddingRight: 16 },
                        headerLeft: () =>(
                                <ButtonIcon onPress={()=>navigation.goBack()}>
                                    <ArrowBackIcon />
                                </ButtonIcon>
                            ),
                        })}
                    />
                </>
                ) : (
                <>
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                    />
                    <Stack.Screen
                        name="Registration"
                        component={RegistrationScreen}
                    />
                </>
            )}
        </Stack.Navigator>
    )
};


export default StackNavigator;