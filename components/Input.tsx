import {StyleProp, StyleSheet, TextInput, View, ViewStyle} from "react-native";
import {colors} from "../styles/global";
import {FC} from "react";

interface InputProps {
    placeholder?: string;
    externalStyles?: StyleProp<ViewStyle>;
    showBtn?: React.ReactNode;
}


const Input: FC<InputProps> = ({placeholder, externalStyles, showBtn}) => {
    return(
        <View style={[styles.input, externalStyles]}>
            <TextInput  placeholder={placeholder}/>
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