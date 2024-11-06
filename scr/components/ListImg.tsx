import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CommentIcon from "../../icons/CommentIcon";
import LikeIcon from "../../icons/LikeIcon";
import LocationIcon from "../../icons/LocationIcon";
import {colors, imgList} from "../../styles/global";
import {FC} from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/StackNavigator";
import { CommentPost} from "../screens/ProfileScreen";

type CommentsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Comments'>;

interface ListImgProps {
    sourceImg: any;
    name: string;
    countComment: number;
    countLikes?: string;
    location: string;
    latitude: number;
    longitude: number;
    postId: string;
    comments: CommentPost[]
}

const ListImg:FC<ListImgProps> = ({sourceImg, countLikes, countComment, location, name, latitude, longitude, postId, comments}) => {
    const navigation = useNavigation<CommentsScreenNavigationProp>();

    const handleComment = () => {
        navigation.navigate('Comments', {postId, sourceImg, comments});
    };

    const handlerLocation = () => {
        navigation.navigate('Location', { latitude, longitude });
    }



    return (
        <View >
            {sourceImg ?(
                <Image style={imgList} source={{uri:sourceImg}}/>
            ):(
                <Image style={imgList} source={require('../../assets/images/defaultImgCard.jpg')}/>
            )}
            <Text style={styles.nameImg}>
                {name}
            </Text>
            <View style={styles.wrapTextUnderImg}>
                <View style={{flexDirection: 'row', gap: 24}}>
                    <TouchableOpacity style={styles.wrapCommentAndLike} onPress={handleComment}>
                        <CommentIcon/>
                        <Text style={styles.text}>
                            {countComment}
                        </Text>
                    </TouchableOpacity>
                    {countLikes && (
                        <View style={styles.wrapCommentAndLike} >
                            <LikeIcon/>
                            <Text style={styles.text}>
                                {countLikes}
                            </Text>
                        </View>
                    )}

                </View>
                <TouchableOpacity style={styles.wrapCommentAndLike} onPress={handlerLocation}>
                    <LocationIcon/>
                    <Text style={[styles.text,{textDecorationLine: 'underline'}]}>
                        {location}
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}


export default ListImg

const styles = StyleSheet.create({
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
        marginRight: 16
    }
})