import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from "react-native";
import {FC} from "react";
import {colors} from "../../styles/global";


interface PrimaryButtonProps {
    children: React.ReactNode;
    handlePress: () => void;
    externalStyles: StyleProp<ViewStyle>;
    disabled: boolean;
}

const PrimaryButton: FC<PrimaryButtonProps>= ({children, handlePress, externalStyles, disabled}) => {
    return (
        <TouchableOpacity disabled={!disabled} onPress={handlePress} style={[styles.button, disabled ? externalStyles : {backgroundColor: colors.gray}, ]}>
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