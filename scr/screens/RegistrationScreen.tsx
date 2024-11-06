import Input from "../components/Input";
import {FC, useState} from "react";
import {StackScreenProps} from "@react-navigation/stack";
import PrimaryButton from "../components/PrimaryButton";
import BackgroundImg from "../components/BackgroundImg";
import ShowPasswordBtn from "../components/ShowPasswordBtn";
import AuthPrompt from "../components/AuthPrompt";
import {RootStackParamList} from "../navigation/StackNavigator";
import {registerDB} from "../utils/auth";
import * as ImagePicker from 'expo-image-picker';
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
    baseTypography, colors,
    container, innerWrapper, passwordBtn, plusContainer,
    primaryBtn,
    registrationAndLoginContainer,
    title, wrapInputMarginBottom, wrapperAvatar
} from "../../styles/global";
import {useDispatch} from "react-redux";
import AddAvatarIcon from "../../icons/AddAvatarIcon";
import CloseIcon from "../../icons/CloseIcon";


type RegistrationScreenProps = StackScreenProps<RootStackParamList, 'Registration'>


const RegistrationScreen: FC<RegistrationScreenProps> = ({navigation}) => {
    const [inputQuery, setInputQuery] = useState({email: "", password: "", login: ""});
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [selectedImg, setSelectedImg] = useState<string | null>(null);
    const  dispatch = useDispatch();

    const {login, password, email} = inputQuery;

    const isFormComplete = Object.values(inputQuery).every(field => field.trim() !== "");

    const handlerInputChange = (value: string, input: 'email' | 'password' | 'login') => {
        setInputQuery(prev=>({...prev, [input]: value}));
    }

    const handlerShowPassword = () => {
        setIsPasswordVisible(prev => !prev)
    }

    const handlerOnRegistration =  async () => {
        let imageFile: File | undefined;
        let fileName;
        if(selectedImg) {
            const response = await fetch(selectedImg);
            const file = await response.blob();

            // Перетворюємо Blob на File, якщо це необхідно
            fileName = selectedImg.split('/').pop() || "avatar"; // Отримуємо ім'я файлу з URI
            const fileType = file.type; // Отримуємо тип файлу

            imageFile = new File([file], fileName, { type: fileType });
        }

        registerDB({
            email,
            password,
            login,
            imageFile,
            fileName,
            dirName: 'avatars'
        }, dispatch);
    }

    const handlerDeleteAvatar = () => {
        setSelectedImg(null)
    }
    
    const handlerLogin = () => {
        navigation.navigate('Login')
    }

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Permission to access media library is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setSelectedImg(uri);
        }
    };


    return (
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
            <KeyboardAvoidingView
                style={container}
                behavior={Platform.OS == "ios" ? 'padding' : 'height'}
            >
                <BackgroundImg/>
                <View style={[styles.registrationContainer, registrationAndLoginContainer]}>
                   <View style={wrapperAvatar}>
                       {selectedImg ? (
                           <Image source={{uri:selectedImg}} style={styles.avatar}/>
                       ) : (<Image style={[styles.avatar, {backgroundColor: colors.lightGrey}]} source={require('../../assets/images/defaultAvatar.png')}/>)}

                       <TouchableOpacity
                           style={plusContainer}
                           onPress={ selectedImg ? handlerDeleteAvatar  : pickImage}>
                           {selectedImg ? (<CloseIcon/>) : (<AddAvatarIcon/>)}
                       </TouchableOpacity>
                   </View>
                    <Text style={[title, baseTypography]}>
                        Реєстрація
                    </Text>
                    <KeyboardAvoidingView
                        style={[innerWrapper, wrapInputMarginBottom]}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
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
                        <PrimaryButton disabled={isFormComplete} externalStyles={backgroundOrange} handlePress={handlerOnRegistration}>
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
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 16,
        objectFit: 'cover',
    }
})