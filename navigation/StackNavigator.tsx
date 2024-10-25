import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import MainBottomTabNavigator from "./MainBottomTabNavigator";

export type RootStackParamList = {
    Login: undefined;
    Registration: undefined;
    Home: undefined;

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
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Registration"
                component={RegistrationScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Home"
                component={MainBottomTabNavigator}
            />
        </Stack.Navigator>
    )
};


export default StackNavigator;