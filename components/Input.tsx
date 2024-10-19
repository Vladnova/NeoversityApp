import {StyleProp, StyleSheet, TextInput, View, ViewStyle} from "react-native";
import {colors} from "../styles/global";
import {FC} from "react";

type InputProps<T extends string> = {
    value: string;
    placeholder?: string;
    externalStyles?: StyleProp<ViewStyle>;
    showBtn?: React.ReactNode;
    inputType: T;
    secureTextEntry?: boolean;
    onTextChange: (value: string, input: T) => void;
};


const Input = <T extends string>(
    {
        value,
        onTextChange,
        placeholder,
        externalStyles,
        showBtn,
        inputType,
        secureTextEntry = false,
    }: InputProps<T>) =>{
    const handleChangeText = (text: string) => {
        onTextChange(text, inputType);
    };
    return(
        <View style={[styles.input, externalStyles]}>
            <TextInput
                value={value}
                onChangeText={handleChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
            />
            {showBtn}
        </View>
    )
}

export default Input;

const styles =StyleSheet.create( {
    input: {
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.borderGray,
        backgroundColor: colors.lightGrey,
    }
})