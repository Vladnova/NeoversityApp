import {StyleSheet, TouchableOpacity} from "react-native";
import {FC} from "react";
import {colors} from "../styles/global";


interface PrimaryButtonProps {
    children: React.ReactNode;
}

const PrimaryButton: FC<PrimaryButtonProps>= ({children}) => {
    return (
        <TouchableOpacity style={styles.button}>
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