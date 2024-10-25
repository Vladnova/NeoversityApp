import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from "react-native";
import {FC} from "react";
import {colors} from "../styles/global";


interface PrimaryButtonProps {
    children: React.ReactNode;
    handlePress: () => void;
    externalStyles: StyleProp<ViewStyle>;
}

const PrimaryButton: FC<PrimaryButtonProps>= ({children, handlePress, externalStyles}) => {
    return (
        <TouchableOpacity onPress={handlePress} style={[styles.button, externalStyles]}>
            {children}
        </TouchableOpacity>
    )
}

export default PrimaryButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 100,
        paddingHorizontal: 32,
        paddingVertical: 16,

    }
})