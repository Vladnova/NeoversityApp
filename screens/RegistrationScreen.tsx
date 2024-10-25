import Input from "../components/Input";
import {FC, useState} from "react";
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity, TouchableWithoutFeedback,
    View
} from "react-native";
import {
    backgroundOrange,
    baseTypography,
    colors,
    container, innerWrapper, passwordBtn, plusContainer, plusSign,
    primaryBtn,
    registrationAndLoginContainer,
    title, wrapInputMarginBottom, wrapperAvatar
} from "../styles/global";
import PrimaryButton from "../components/PrimaryButton";
import BackgroundImg from "../components/BackgroundImg";
import ShowPasswordBtn from "../components/ShowPasswordBtn";
import AuthPrompt from "../components/AuthPrompt";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParamList} from "../navigation/StackNavigator";

type RegistrationScreenProps = StackScreenProps<RootStackParamList, 'Registration'>


const RegistrationScreen: FC<RegistrationScreenProps> = ({navigation}) => {
    const [inputQuery, setInputQuery] = useState({email: "", password: "", login: ""});
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const handlerInputChange = (value: string, input: 'email' | 'password' | 'login') => {
        setInputQuery(prev=>({...prev, [input]: value}));
    }

    const handlerShowPassword = () => {
        setIsPasswordVisible(prev => !prev)
    }

    const handlerOnRegistration = () => {
        navigation.navigate('Home')
    }
    
    const handlerLogin = () => {
        navigation.navigate('Login')
    }

    return (
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
            <KeyboardAvoidingView
                style={container}
                behavior={Platform.OS == "ios" ? 'padding' : 'height'}
            >
                <BackgroundImg/>
                <View style={[styles.registrationContainer, registrationAndLoginContainer]}>
                   <View style={wrapperAvatar}>
                       <Image  source={require('../assets/images/logo.png')}/>
                       <TouchableOpacity style={plusContainer}>
                           <Text style={plusSign}>+</Text>
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
                        <PrimaryButton externalStyles={backgroundOrange} handlePress={handlerOnRegistration}>
                            <Text style={[primaryBtn,baseTypography]}>
                                Зареєстуватися
                            </Text>
                        </PrimaryButton>
                        <AuthPrompt handlerTouch={handlerLogin} answer={'Вже є акаунт?'} textBtn={'Увійти'}/>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default RegistrationScreen;

const styles = StyleSheet.create({

    registrationContainer: {
        paddingTop: 92,
        height: '70%',
        paddingBottom: 60,
    },
})