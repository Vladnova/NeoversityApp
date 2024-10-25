import {
    Image,
    StyleSheet, Text,
    TouchableOpacity,
    View,
    ScrollView
} from "react-native";
import BackgroundImg from "../components/BackgroundImg";
import {
    baseTypography, colors,
    container, plusContainer, registrationAndLoginContainer, title, wrapperAvatar,
} from "../styles/global";
import CloseIcon from "../icons/CloseIcon";
import LogoutIcon from "../icons/LogoutIcon";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../navigation/StackNavigator";
import CommentIcon from "../icons/CommentIcon";
import LikeIcon from "../icons/LikeIcon";
import LocationIcon from "../icons/LocationIcon";

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
                        <View >
                            <Image style={styles.img}  source={require('../assets/images/wood.png')}/>
                            <Text style={styles.nameImg}>
                                Ліс
                            </Text>
                            <View style={styles.wrapTextUnderImg}>
                                <View style={{flexDirection: 'row', gap: 24}}>
                                    <View style={styles.wrapCommentAndLike}>
                                        <CommentIcon/>
                                        <Text style={styles.text}>
                                            8
                                        </Text>
                                    </View>
                                    <View style={styles.wrapCommentAndLike}>
                                        <LikeIcon/>
                                        <Text style={styles.text}>
                                            153
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.wrapCommentAndLike}>
                                    <LocationIcon/>
                                    <Text style={[styles.text,{textDecorationLine: 'underline'}]}>
                                        Ukraine
                                    </Text>
                                </View>

                            </View>
                        </View>
                        <View >
                            <Image style={styles.img}  source={require('../assets/images/blackSea.png')}/>
                            <Text style={styles.nameImg}>
                                Захід на Чорному морі
                            </Text>
                            <View style={styles.wrapTextUnderImg}>
                                <View style={{flexDirection: 'row', gap: 24}}>
                                    <View style={styles.wrapCommentAndLike}>
                                        <CommentIcon/>
                                        <Text style={styles.text}>
                                            3
                                        </Text>
                                    </View>
                                    <View style={styles.wrapCommentAndLike}>
                                        <LikeIcon/>
                                        <Text style={styles.text}>
                                            200
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.wrapCommentAndLike}>
                                    <LocationIcon/>
                                    <Text style={[styles.text,{textDecorationLine: 'underline'}]}>
                                        Ukraine
                                    </Text>
                                </View>

                            </View>
                        </View>
                        <View >
                            <Image style={styles.img}  source={require('../assets/images/house.png')}/>
                            <Text style={styles.nameImg}>
                                Старий будиночок у Венеції
                            </Text>
                            <View style={styles.wrapTextUnderImg}>
                                <View style={{flexDirection: 'row', gap: 24}}>
                                    <View style={styles.wrapCommentAndLike}>
                                        <CommentIcon/>
                                        <Text style={styles.text}>
                                            50
                                        </Text>
                                    </View>
                                    <View style={styles.wrapCommentAndLike}>
                                        <LikeIcon/>
                                        <Text style={styles.text}>
                                            200
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.wrapCommentAndLike}>
                                    <LocationIcon/>
                                    <Text style={[styles.text,{textDecorationLine: 'underline'}]}>
                                        Italy
                                    </Text>
                                </View>

                            </View>
                        </View>
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
    img: {
        maxWidth: 361,
        height: 240,
        borderRadius: 8,
    },
    nameImg: {
        paddingTop: 16,
        color: colors.blackPrimary,
        fontSize: 16,
        fontWeight: 500,
    },
    wrapCommentAndLike: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },
    wrapTextUnderImg: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    text: {
        fontSize: 16,
        color: colors.blackPrimary,
        fontWeight: 400,
    }
})