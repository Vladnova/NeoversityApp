import {StyleSheet, TouchableOpacity} from "react-native";
import {FC} from "react";
import {colors} from "../styles/global";


interface PrimaryButtonProps {
    children: React.ReactNode;
    handlePress: () => void;
}

const PrimaryButton: FC<PrimaryButtonProps>= ({children, handlePress}) => {
    return (
        <TouchableOpacity onPress={handlePress} style={styles.button}>
            {children}
        </TouchableOpacity>
    )
}

export default PrimaryButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.orange,
        borderRadius: 100,
        paddingHorizontal: 32,
        paddingVertical: 16,

    }
})