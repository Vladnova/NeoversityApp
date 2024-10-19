import {Text, TouchableOpacity} from "react-native";
import {secondaryText} from "../styles/global";
import {FC} from "react";

interface ShowPasswordBtnProps {
    handlerHidePassword: () => void;
}

const ShowPasswordBtn: FC<ShowPasswordBtnProps> = ({handlerHidePassword}) => {
    return (
        <TouchableOpacity onPress={handlerHidePassword}>
            <Text style={secondaryText}>Показати</Text>
        </TouchableOpacity>
    )
}

export default ShowPasswordBtn;

