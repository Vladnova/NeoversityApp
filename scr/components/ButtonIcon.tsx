import {StyleSheet, TouchableOpacity} from "react-native";
import {FC} from "react";

interface ButtonIconProps {
    children: React.ReactNode;
    onPress: () => void;
}

const ButtonIcon: FC<ButtonIconProps> = ({children, onPress}) =>{
    return(
        <TouchableOpacity onPress={onPress}>
            {children}
        </TouchableOpacity>
    )
}


export default ButtonIcon;
