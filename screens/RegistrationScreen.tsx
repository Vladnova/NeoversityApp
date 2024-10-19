import Input from "../components/Input";
import {useState} from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity, TouchableWithoutFeedback,
    View
} from "react-native";
import {
    baseTypography,
    colors,
    container, innerWrapper, passwordBtn,
    primaryBtn,
    registrationAndLoginContainer,
    title, wrapInputMarginBottom
} from "../styles/global";
import PrimaryButton from "../components/PrimaryButton";
import BackgroundImg from "../components/BackgroundImg";
import ShowPasswordBtn from "../components/ShowPasswordBtn";
import AuthPrompt from "../components/AuthPrompt";


const LoginScreen = () => {
    const [inputQuery, setInputQuery] = useState({email: "", password: "", login: ""});
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const handlerInputChange = (value: string, input: 'email' | 'password' | 'login') => {
        setInputQuery(prev=>({...prev, [input]: value}));
    }

    const handlerShowPassword = () => {
        setIsPasswordVisible(prev => !prev)
    }

    const handlerOnRegistration = () => {
        console.log('Your registration information', inputQuery);
    }

    return (
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
            <KeyboardAvoidingView
                style={container}
                behavior={Platform.OS == "ios" ? 'padding' : 'height'}
            >
                <BackgroundImg/>
                <View style={[styles.registrationContainer, registrationAndLoginContainer]}>
                   <View style={styles.wrapperAvatar}>
                       <TouchableOpacity style={styles.plusContainer}>
                           <Text style={styles.plusSign}>+</Text>
                       </TouchableOpacity>
                   </View>
                    <Text style={[title, baseTypography]}>
                        Реєстрація
                    </Text>
                    <KeyboardAvoidingView style={[innerWrapper, wrapInputMarginBottom]} behavior={Platform.OS === "ios" ? "padding" : "height"} >
                        <View style={[innerWrapper, wrapInputMarginBottom]}>
                            <Input
                                value={inputQuery.login}
                                inputType={'login'}
                                onTextChange={handlerInputChange}
                                placeholder="Логін"
                            />
                            <Input
                                value={inputQuery.email}
                                inputType={'email'}
                                onTextChange={handlerInputChange}
                                placeholder="Адреса електронної пошти"
                            />
                            <Input
                                value={inputQuery.password}
                                inputType={'password'}
                                onTextChange={handlerInputChange}
                                placeholder="Пароль"
                                secureTextEntry={isPasswordVisible}
                                showBtn={<ShowPasswordBtn handlerHidePassword={handlerShowPassword}/>}
                                externalStyles={{...passwordBtn}}/>
                        </View>
                    </KeyboardAvoidingView>
                    <View style={innerWrapper}>
                        <PrimaryButton handlePress={handlerOnRegistration}>
                            <Text style={[primaryBtn,baseTypography]}>
                                Зареєстуватися
                            </Text>
                        </PrimaryButton>
                        <AuthPrompt answer={'Вже є акаунт?'} textBtn={'Увійти'}/>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
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
    registrationContainer: {
        paddingTop: 92,
        height: '70%',
        paddingBottom: 60,
    },
})