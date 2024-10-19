import {useState} from "react";
import {Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {
    baseTypography,
    container,
    innerWrapper, passwordBtn, primaryBtn,
    registrationAndLoginContainer,
    title,
    wrapInputMarginBottom
} from "../styles/global";
import BackgroundImg from "../components/BackgroundImg";
import Input from "../components/Input";
import ShowPasswordBtn from "../components/ShowPasswordBtn";
import PrimaryButton from "../components/PrimaryButton";
import AuthPrompt from "../components/AuthPrompt";

const LoginScreen = () => {
    const [inputQuery, setInputQuery] = useState({email: "", password: ""});
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const handlerInputChange = (value: string, input: 'email' | 'password') => {
        setInputQuery(prev=>({...prev, [input]: value}));
    }

    const handlerShowPassword = () => {
        setIsPasswordVisible(prev => !prev)
    }

    const handlerOnLogin = () => {
        console.log('Your login information', inputQuery);
    }
    return (
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
            <KeyboardAvoidingView
                style={container}
                behavior={Platform.OS == "ios" ? 'padding' : 'height'}
            >
                <BackgroundImg/>
                <View style={[registrationAndLoginContainer, styles.loginContainer]}>
                    <Text style={[title, baseTypography]}>
                        Увійти
                    </Text>
                    <KeyboardAvoidingView style={[innerWrapper, wrapInputMarginBottom]} behavior={Platform.OS === "ios" ? "padding" : "height"} >
                        <View style={[innerWrapper, wrapInputMarginBottom]}>
                            <Input
                                value={inputQuery.email}
                                onTextChange={handlerInputChange}
                                inputType={'email'}
                                placeholder={'Адреса електронної пошти'}
                            />
                            <Input
                                value={inputQuery.password}
                                onTextChange={handlerInputChange}
                                inputType={'password'}
                                placeholder={'Пароль'}
                                showBtn={<ShowPasswordBtn handlerHidePassword={handlerShowPassword}/>}
                                externalStyles={{...passwordBtn}}
                                secureTextEntry={isPasswordVisible}
                            />
                        </View>
                    </KeyboardAvoidingView>
                    <View style={innerWrapper}>
                        <PrimaryButton handlePress={handlerOnLogin}>
                            <Text style={[primaryBtn, baseTypography]}>Увійти</Text>
                        </PrimaryButton>
                        <AuthPrompt answer={'Немає акаунту?'} textBtn={'Зареєструватися'}/>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}


export default LoginScreen;

const styles = StyleSheet.create({
    loginContainer: {
        paddingTop: 32,
        height: '50%',
        paddingBottom: 120,
    }
})