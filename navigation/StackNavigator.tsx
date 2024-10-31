import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import MainBottomTabNavigator from "./MainBottomTabNavigator";
import CommentsScreen from "../screens/CommentsScreen";
import ButtonIcon from "../components/ButtonIcon";
import ArrowBackIcon from "../icons/ArrowBackIcon";
import MapScreen from "../screens/MapScreen";

export type RootStackParamList = {
    Login: undefined;
    Registration: undefined;
    Home: { screen: string };
    Comments: undefined;
    Location: { latitude: number; longitude: number;};

}

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
            <Stack.Screen
                name="Registration"
                component={RegistrationScreen}
            />
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
        </Stack.Navigator>
    )
};


export default StackNavigator;