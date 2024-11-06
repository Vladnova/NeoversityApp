import {
    Image,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {colors, imgList} from "../../styles/global";
import ItemComment from "../components/ItemComment";
import ArrowUpIcon from "../../icons/ArrowUpIcon";
import {useEffect, useState} from "react";
import {RouteProp, useRoute} from "@react-navigation/native";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store/store";
import {addCommentToPost} from "../utils/firestore";
import {RootStackParamList} from "../navigation/StackNavigator";
import {CommentPost} from "./ProfileScreen";


const CommentsScreen = () => {
    const [comment, setComment] = useState('');
    const user = useSelector((state: RootState) => state.user.userInfo);
    const [commentsPost, setCommentsPost] = useState<CommentPost[] | []>([]);

    const handleCommentChange = (text: string) => {
        setComment(text);
    };
    type PostsRouteProp = RouteProp<RootStackParamList, 'Comments'>;
    const route = useRoute<PostsRouteProp>();

    const {postId, sourceImg, comments} = route.params;

    useEffect(() => {
        setCommentsPost(comments)
    }, [comments] )

    const handlerAddComment = async () => {
        if(user && route.params) {
            await addCommentToPost({postId, userId: user.uid, text: comment} )
        }
        setComment('');

    }

    return (
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
            <View style={styles.innerContainer}>
                {sourceImg ?(
                    <Image
                        style={[imgList, {marginTop: 32}]}
                        source={{uri: sourceImg}}
                    />
                ):(
                    <Image style={[imgList, {marginTop: 32}]} source={require('../../assets/images/defaultImgCard.jpg')}/>
                )}
                <View style={styles.containerComments}>
                    {commentsPost && commentsPost.length > 0 && commentsPost.map(({text, timestamp}) => (
                        <ItemComment
                            comment={text}
                            commentDate={timestamp}
                            icon={require('../../assets/images/logo2.png')}
                            styleContainerExist={{flexDirection: 'row-reverse',}}
                            styleIconExist={{marginLeft: 16}}
                        />

                    ))}

                </View>
                <View style={[styles.containerInput, styles.positionInput]}>
                    <TextInput
                        value={comment}
                        onChangeText={handleCommentChange}
                        placeholder={'Коментувати...'}
                    />
                    <TouchableOpacity onPress={handlerAddComment}>
                        <ArrowUpIcon/>
                    </TouchableOpacity>

                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}


export default CommentsScreen;


const styles = StyleSheet.create({
    positionInput: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        left: 16},
    innerContainer: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: colors.white
    },
    containerComments:{
        paddingTop: 32,
        gap: 24
    },
    containerInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:32,
        backgroundColor: colors.lightGrey,
        borderRadius: 100,
        borderColor: colors.borderGray,
        borderWidth: 1,
        paddingVertical: 8,
        paddingRight: 8,
        paddingLeft: 16
    },
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
