import {Image, ImageStyle, StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import {colors} from "../styles/global";
import {FC} from "react";

interface ItemCommentProps {
    comment: string;
    commentDate: string;
    icon: any;
    styleContainerExist: StyleProp<ViewStyle>;
    styleIconExist: StyleProp<ImageStyle>;
}

const ItemComment: FC<ItemCommentProps> = ({comment, commentDate, icon, styleContainerExist, styleIconExist}) => {
    return (
        <View style={[styles.containerComment, styleContainerExist]}>
            <Image
                style={[styles.logo, styleIconExist]}
                source={icon}
            />
            <View style={styles.containerText}>
                <Text
                    style={styles.textComment}
                >
                    {comment}
                </Text>
                <Text style={styles.textDate}>
                    {commentDate}
                </Text>
            </View>
        </View>
    )
}

export default ItemComment;

const styles = StyleSheet.create({
    logo: {
        width: 28,
        height: 28,
        borderRadius: 28
    },
    containerComment:{
        alignItems: 'flex-start',
        maxWidth: '100%'
    },
    containerText: {
        flex: 1,
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.03)',
        borderRadius: 8,
    },
    textComment: {
        color: colors.blackPrimary,
        fontSize: 13,
        fontWeight: 400,
    },
    textDate: {
        color: colors.gray,
        fontSize: 10,
        fontWeight: 400,
        textAlign: 'right',
        marginTop: 8,
    }
})