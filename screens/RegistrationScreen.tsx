import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {baseTypography, colors, primaryBtn, title} from "../styles/global";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import Svg, {Circle, Path} from "react-native-svg";

const {width, height} = Dimensions.get("window");

const LoginScreen = () => {
    const showPassword = (
        <TouchableOpacity>
            <Text style={styles.secondaryText}>Показати</Text>
        </TouchableOpacity>
    )
    return (
        <View style={styles.container}>
            <Image style={styles.backgroundImg} source={require('../assets/images/background.png')} />
            <View style={styles.registrationAndLoginContainer}>
               <View style={styles.wrapperAvatar}>
                   <TouchableOpacity style={styles.plusContainer}>
                       <Text style={styles.plusSign}>+</Text>
                   </TouchableOpacity>
               </View>
                <Text style={[title, baseTypography]}>
                    Реєстрація
                </Text>
                <View style={[styles.innerWrapper, styles.wrapInputMarginBottom]}>
                    <Input placeholder="Логін"/>
                    <Input placeholder="Адреса електронної пошти"/>
                    <Input placeholder="Пароль" showBtn={showPassword} externalStyles={{...styles.passwordBtn}}/>
                </View>
                <View style={styles.innerWrapper}>
                    <PrimaryButton>
                        <Text style={[primaryBtn,baseTypography]}>
                            Зареєстуватися
                        </Text>
                    </PrimaryButton>
                    <View style={styles.textLinkContainer}>
                        <Text style={[styles.secondaryText, styles.rightMargin]}>Вже є акаунт?</Text>
                            <TouchableOpacity>
                                <Text style={[styles.secondaryText, styles.underline]}>
                                    Увійти
                                </Text>
                            </TouchableOpacity>

                    </View>
                </View>
            </View>
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
    },
    backgroundImg: {
        position: "absolute",
        height: height,
        width: width,
    },
    wrapperAvatar:{
        position: "absolute",
        width: 120,
        height: 120,
        backgroundColor: colors.lightGrey,
        borderRadius: 16,
        left: "50%",
        top: -60,
        marginLeft: 15,
        transform: [{ translateX: -60 }],
    },
    plusContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.orange,
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        right: -15,
        bottom: 15
    },
    plusSign: {
        position: "absolute",
        fontSize: 40,
        fontWeight: '200',
        color: colors.orange,
        top: '50%',
        left: '50%',
        transform: [{ translateX: -12 }, { translateY: -27 }],
    },
    registrationAndLoginContainer: {
        paddingHorizontal: 16,
        paddingTop: 92,
        paddingBottom: 78,
        width: width,
        backgroundColor: colors.white,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    },
    innerWrapper: {
        gap: 16,
    },
    wrapInputMarginBottom: {
        marginBottom: 43
    },
    secondaryText: {
        fontSize: 16,
        fontWeight: "400",
        color: colors.darkBlue,
    },
    passwordBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textLinkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    underline: {
        textDecorationLine: 'underline',
    },
    rightMargin: {
        marginRight: 2
    }
})