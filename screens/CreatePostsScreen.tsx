import {
    Dimensions, Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import PhotoIcon from "../icons/PhotoIcon";
import {baseTypography, colors, primaryBtn} from "../styles/global";
import {useState} from "react";
import PrimaryButton from "../components/PrimaryButton";
import LocationIcon from "../icons/LocationIcon";

const {width} = Dimensions.get("window");
const CreatePostsScreen = () => {
    const [inputQuery, setInputQuery] = useState({name: "", location: ""});
    const handlerInputChange = (value: string, input: 'name' | 'location')=>{
        setInputQuery(prev=>({...prev, [input]: value}));
    }
    return (
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.containerPhoto}>
                    <PhotoIcon/>
                </View>
                <TouchableOpacity style={styles.btnUpload}>
                    <Text style={styles.text}>Завантажте фото</Text>
                </TouchableOpacity>
                <View style={styles.containerInput}>
                    <TextInput
                        style={styles.borderBottom}
                        placeholder={'Назва'}
                        value={inputQuery.name}
                        onChangeText={(text)=>handlerInputChange(text, 'name')}
                    />
                    <View style={ [styles.borderBottom, styles.containerLocation]}>
                        <LocationIcon/>
                        <TextInput
                            placeholder={'Місцевість'}
                            value={inputQuery.location}
                            onChangeText={(text)=>handlerInputChange(text, 'location')}
                        />
                    </View>

                </View>
                <PrimaryButton externalStyles={{backgroundColor: colors.lightGrey}} handlePress={()=>console.log('publish photo')}>
                    <Text style={[styles.textBtn, baseTypography]}>Опублікувати</Text>
                </PrimaryButton>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}


export default CreatePostsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: colors.white,
    },
    containerPhoto: {
        backgroundColor: colors.borderGray,
        borderRadius: 8,
        width: width-32,
        height: 240,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 32,
    },
    btnUpload: {
        marginTop: 8,
    },
    text: {
        color: colors.gray,
        fontSize: 16,
        fontWeight: 400,
    },
    containerInput: {
       paddingVertical: 32,
        gap: 16,
    },
    containerLocation: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4},
    borderBottom: {
        borderBottomWidth: 1,
        borderColor: colors.borderGray,
        paddingVertical: 16
    },
    textBtn: {
        color: colors.gray,
        fontSize: 16,
        fontWeight: "400",
    }
})