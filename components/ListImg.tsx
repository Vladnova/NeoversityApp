import {Image, StyleSheet, Text, View} from "react-native";
import CommentIcon from "../icons/CommentIcon";
import LikeIcon from "../icons/LikeIcon";
import LocationIcon from "../icons/LocationIcon";
import {colors} from "../styles/global";
import {FC} from "react";

interface ListImgProps {
    sourceImg: any;
    name: string;
    countComment: string;
    countLikes: string;
    location: string;

}

const ListImg:FC<ListImgProps> = ({sourceImg, countLikes, countComment, location, name}) => {
    return (
        <View >
            <Image style={styles.img}  source={sourceImg}/>
            <Text style={styles.nameImg}>
                {name}
            </Text>
            <View style={styles.wrapTextUnderImg}>
                <View style={{flexDirection: 'row', gap: 24}}>
                    <View style={styles.wrapCommentAndLike}>
                        <CommentIcon/>
                        <Text style={styles.text}>
                            {countComment}
                        </Text>
                    </View>
                    <View style={styles.wrapCommentAndLike}>
                        <LikeIcon/>
                        <Text style={styles.text}>
                            {countLikes}
                        </Text>
                    </View>
                </View>
                <View style={styles.wrapCommentAndLike}>
                    <LocationIcon/>
                    <Text style={[styles.text,{textDecorationLine: 'underline'}]}>
                        {location}
                    </Text>
                </View>

            </View>
        </View>
    )
}


export default ListImg

const styles = StyleSheet.create({

    img: {
        maxWidth: 361,
        height: 240,
        borderRadius: 8,
    },
    nameImg: {
        paddingTop: 16,
        color: colors.blackPrimary,
        fontSize: 16,
        fontWeight: 500,
    },
    wrapCommentAndLike: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },
    wrapTextUnderImg: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    text: {
        fontSize: 16,
        color: colors.blackPrimary,
        fontWeight: 400,
    }
})