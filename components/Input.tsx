import {StyleProp, StyleSheet, TextInput, View, ViewStyle} from "react-native";
import {colors} from "../styles/global";
import {FC, useState} from "react";

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
    const [isFocused, setIsFocused] = useState(false)
    const handleChangeText = (text: string) => {
        onTextChange(text, inputType);
    };
    const handlerToggleFocus = () => {
        setIsFocused(!isFocused);
    }
    return(
        <View style={[styles.input, externalStyles, isFocused && styles.inputFocused]}>
            <TextInput
                value={value}
                onChangeText={handleChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                onFocus={handlerToggleFocus}
                onBlur={handlerToggleFocus}
            />
            {showBtn}
        </View>
    )
}

export default Input;

const styles = StyleSheet.create( {
    input: {
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.borderGray,
        backgroundColor: colors.lightGrey,
    },
    inputFocused: {
        borderColor: colors.orange,
    },
})