import {
    Button,
    Dimensions, Image,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import PhotoIcon from "../../icons/PhotoIcon";
import { baseTypography, colors, primaryBtn } from "../../styles/global";
import { useState, useRef, useEffect } from "react";
import PrimaryButton from "../components/PrimaryButton";
import LocationIcon from "../../icons/LocationIcon";
import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import {CompositeNavigationProp, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../navigation/StackNavigator";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store/store";
import {addPost} from "../utils/firestore";
import * as ImagePicker from "expo-image-picker";

const { width } = Dimensions.get("window");

const CreatePostsScreen = () => {
    const [inputQuery, setInputQuery] = useState({ name: "", location: "" });
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState('');
    const cameraRef = useRef<CameraView | null>(null);
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

    const isFormComplete = Object.values(inputQuery).every(field => field.trim() !== "");
    const user = useSelector((state: RootState) => state.user.userInfo);

    const {name, location} = inputQuery;

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
    const handlerCreatePost =  async () => {
        let imageFile: File | undefined;
        let fileName;
        if(selectedImg) {
            const response = await fetch(selectedImg);
            const file = await response.blob();

            // Перетворюємо Blob на File, якщо це необхідно
            fileName = selectedImg.split('/').pop() || "post"; // Отримуємо ім'я файлу з URI
            const fileType = file.type; // Отримуємо тип файлу

            imageFile = new File([file], fileName, { type: fileType });
        }
        const post = {
            name,
            location,
            fileName,
            imageFile
        }
        if(user){
            addPost(user.uid, post)
        }

        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    }

    const takePhoto = async () => {
        const photo = await cameraRef?.current?.takePictureAsync();
        if (photo) {
            setPhoto(photo.uri);
        }

    };

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
                <View style={styles.photo}>
                    <CameraView style={styles.camera} ref={cameraRef}>
                            <View style={styles.takePhotoContainer}>
                                {photo ? ( <Image
                                    source={{ uri: photo }}
                                    style={{ height: 100, width: 100 }}
                                />
                                ): selectedImg && <Image
                                    source={{ uri: selectedImg }}
                                    style={{height:240, width: 360 }}
                                />}
                            </View>
                        {!selectedImg &&(
                            <TouchableOpacity style={styles.containerIcon} onPress={takePhoto}>
                                <PhotoIcon />
                            </TouchableOpacity>
                        )}

                    </CameraView>
                </View>

                <TouchableOpacity style={styles.btnUpload} onPress={pickImage}>
                    <Text style={styles.text}>{!selectedImg?'Завантажте фото':'Редагувати фото'}</Text>
                </TouchableOpacity>
                <View style={styles.containerInput}>
                    <TextInput
                        style={styles.borderBottom}
                        placeholder={'Назва'}
                        value={name}
                        onChangeText={(text) => handlerInputChange(text, 'name')}
                    />
                    <View style={[styles.borderBottom, styles.containerLocation]}>
                        <LocationIcon />
                        <TextInput
                            placeholder={'Місцевість'}
                            value={location}
                            onChangeText={(text) => handlerInputChange(text, 'location')}
                        />
                    </View>
                </View>
                <PrimaryButton disabled={isFormComplete} externalStyles={{ backgroundColor: colors.orange }} handlePress={handlerCreatePost}>
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
        paddingTop: 20
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
        // backgroundColor: colors.borderGray,
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
        color: colors.white,
        fontSize: 16,
        fontWeight: "400",
    },
    takePhotoContainer: {
        position: 'absolute',
        // top: 10,
        // left: 10,
        borderColor: '#ffffff',
        borderWidth: 1,
    },
    photo: {
        height: 240,
        borderRadius: 8,
        backgroundColor: '#F6F6F6',
        marginBottom: 8,
    },
    containerIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 90,
        marginBottom: 90,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#FFFFFF',
    },
});
