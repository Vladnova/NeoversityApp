import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {secondaryText} from "../styles/global";
import {FC} from "react";

interface AuthPromptProps {
    answer: string;
    textBtn: string;
}

const AuthPrompt: FC<AuthPromptProps> = ({answer, textBtn}) => {
    return(
        <View style={styles.textLinkContainer}>
            <Text style={[secondaryText, styles.rightMargin]}>{answer}</Text>
            <TouchableOpacity>
                <Text style={[secondaryText, styles.underline]}>
                    {textBtn}
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default AuthPrompt;

const styles = StyleSheet.create({
    textLinkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    underline: {
        textDecorationLine: 'underline',
    },
    rightMargin: {
        marginRight: 2
    }
})