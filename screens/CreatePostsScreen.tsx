import {
    Button,
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import PhotoIcon from "../icons/PhotoIcon";
import { baseTypography, colors, primaryBtn } from "../styles/global";
import { useState, useRef, useEffect } from "react";
import PrimaryButton from "../components/PrimaryButton";
import LocationIcon from "../icons/LocationIcon";
import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import {CompositeNavigationProp, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../navigation/StackNavigator";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";

const { width } = Dimensions.get("window");

const CreatePostsScreen = () => {
    const [inputQuery, setInputQuery] = useState({ name: "", location: "" });
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [facing, setFacing] = useState<CameraType>('back');
    const cameraRef = useRef<CameraView | null>(null);

    useEffect(() => {
        const getCameraPermission = async () => {
            const { status } = await requestCameraPermission();
            if (status !== 'granted') {
                alert("Ми потребуємо вашої дозволу на використання камери.");
            }
        };

        getCameraPermission();
    }, [requestCameraPermission]);

    const handlerInputChange = (value: string, input: 'name' | 'location') => {
        setInputQuery(prev => ({ ...prev, [input]: value }));
    };


    type NavigationProp = CompositeNavigationProp<
        StackNavigationProp<RootStackParamList, "Home">,
        BottomTabNavigationProp<RootStackParamList>
    >;
    const navigation = useNavigation<NavigationProp>();
    const handlerCreatePost =  () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    }

    // const takePicture = async () => {
    //     if (cameraRef.current) {
    //         const photo = await cameraRef.current.takePictureAsync();
    //         console.log(photo);
    //     }
    // };
    const [isPreview, setIsPreview] = useState(false);
    const takePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true, skipProcessing: true };
            const data = await cameraRef.current.takePictureAsync(options);
            const source = data?.uri;
            if (source) {
                await cameraRef.current.pausePreview();
                setIsPreview(true);
                console.log("picture source", source);
            }
        }
    };

    if (!cameraPermission) {
        return (
            <View style={styles.container}>
                <Text>Дозволи на використання камери ще не завантажено.</Text>
            </View>
        );
    }

    if (!cameraPermission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Ми потребуємо вашої дозволу на використання камери</Text>
                <Button onPress={requestCameraPermission} title="Надати дозвіл" />
            </View>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.cameraContainer}>
                    <CameraView style={styles.camera} ref={cameraRef} facing={facing}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.containerPhoto} onPress={takePicture}>
                                <PhotoIcon />
                            </TouchableOpacity>
                        </View>
                    </CameraView>
                </View>

                <TouchableOpacity style={styles.btnUpload}>
                    <Text style={styles.text}>Завантажте фото</Text>
                </TouchableOpacity>
                <View style={styles.containerInput}>
                    <TextInput
                        style={styles.borderBottom}
                        placeholder={'Назва'}
                        value={inputQuery.name}
                        onChangeText={(text) => handlerInputChange(text, 'name')}
                    />
                    <View style={[styles.borderBottom, styles.containerLocation]}>
                        <LocationIcon />
                        <TextInput
                            placeholder={'Місцевість'}
                            value={inputQuery.location}
                            onChangeText={(text) => handlerInputChange(text, 'location')}
                        />
                    </View>
                </View>
                <PrimaryButton externalStyles={{ backgroundColor: colors.lightGrey }} handlePress={handlerCreatePost}>
                    <Text style={[styles.textBtn, baseTypography]}>Опублікувати</Text>
                </PrimaryButton>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: colors.white,
    },
    cameraContainer: {
        height: 240, // Висота для камери
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 32,
        backgroundColor: colors.borderGray,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 10,
        borderRadius: 5,
    },
    text: {
        color: colors.gray,
        fontSize: 16,
        fontWeight: 'bold',
    },
    containerPhoto: {
        backgroundColor: colors.borderGray,
        borderRadius: 8,
        width: width - 32,
        height: 240,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 32,
    },
    btnUpload: {
        marginTop: 8,
    },
    containerInput: {
        paddingVertical: 32,
        gap: 16,
    },
    containerLocation: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderColor: colors.borderGray,
        paddingVertical: 16,
    },
    textBtn: {
        color: colors.gray,
        fontSize: 16,
        fontWeight: "400",
    }
});
