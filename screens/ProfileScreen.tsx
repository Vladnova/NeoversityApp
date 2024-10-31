import {
    Image,
    StyleSheet, Text,
    TouchableOpacity,
    View,
    ScrollView
} from "react-native";
import BackgroundImg from "../components/BackgroundImg";
import {
    baseTypography,
    container, plusContainer, registrationAndLoginContainer, title, wrapperAvatar,
} from "../styles/global";
import CloseIcon from "../icons/CloseIcon";
import LogoutIcon from "../icons/LogoutIcon";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../navigation/StackNavigator";
import ListImg from "../components/ListImg";

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const ProfileScreen = () => {
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const onLogout = () => {
        navigation.navigate("Login");
    }
    return (
            <View
                style={container}
            >
                <BackgroundImg/>
                <View style={[styles.innerContainer, registrationAndLoginContainer]}>
                    <View style={wrapperAvatar}>
                        <Image  source={require('../assets/images/logo.png')}/>
                        <TouchableOpacity style={[plusContainer, {borderColor: 'transparent'}]} >
                            <CloseIcon/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.logoutBtn}>
                        <TouchableOpacity  onPress={onLogout}>
                            <LogoutIcon />
                        </TouchableOpacity>
                    </View>

                    <Text style={[title, baseTypography, {paddingTop: 40}]}>
                        Natali Romanova
                    </Text>
                    <ScrollView contentContainerStyle={{gap: 35, paddingBottom: 46}}>
                        <ListImg
                            sourceImg={require('../assets/images/wood.png')}
                            name={'Ліс'}
                            countComment={'8'}
                            countLikes={'153'}
                            location={'Ukraine'}
                            latitude={48.160076}
                            longitude={24.499850}
                        />
                        <ListImg
                            sourceImg={require('../assets/images/blackSea.png')}
                            name={'Захід на Чорному морі'}
                            countComment={'3'}
                            countLikes={'200'}
                            location={'Ukraine'}
                            latitude={46.225713}
                            longitude={30.610853}
                        />
                        <ListImg
                            sourceImg={require('../assets/images/house.png')}
                            name={'Старий будиночок у Венеції'}
                            countComment={'50'}
                            countLikes={'200'}
                            location={'Italy'}
                            latitude={41.920410}
                            longitude={12.391017}
                        />
                    </ScrollView>
                </View>
            </View>
    )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    innerContainer: {
        height: '82%',
    },
    logoutBtn: {
        marginTop: 22,
        alignItems: 'flex-end'
    },

})