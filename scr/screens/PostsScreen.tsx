import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {colors} from "../../styles/global";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store/store";
import {useEffect, useState} from "react";
import {getAllPosts, getCommentsForPost, PostResponse} from "../utils/firestore";
import ListImg from "../components/ListImg";
import {CommentPost} from "./ProfileScreen";

const PostsScreen = () => {
    const user = useSelector((state: RootState) => state.user.userInfo);
    const [posts, setPosts] = useState<PostResponse[]>([]);
    const [commentsCount, setCommentsCount] = useState<{ [key: string]: number }>({});
    const [commentsPost, setCommentsPost] = useState<{  [key: string]: CommentPost[] | []}>({});

    const getPosts = async () => {
        const newPosts = await getAllPosts();

        // Перевірка на зміни в даних перед оновленням стану
        if (JSON.stringify(newPosts) !== JSON.stringify(posts)) {
            setPosts(newPosts);
        }
    };

    const fetchCommentsCount = async () => {
        const counts: { [key: string]: number } = {};
        const commentsP: { [key: string]: CommentPost[] } = {};
        for (const post of posts) {
            const comments = await getCommentsForPost(post.id);
            counts[post.id] = comments.length;

            // @ts-ignore
            commentsP[post.id] = comments;
        }
        setCommentsCount(counts);
        setCommentsPost(commentsP)
    };

    useEffect(() => {
        getPosts();
    }, []);

    useEffect(() => {
        if (posts.length > 0) {
            fetchCommentsCount();
        }
    }, [posts]);

    return (
        <View>
            <View style={styles.container}>
                {user?.avatar ?
                    (
                        <Image
                            style={styles.imgContainer}
                            source={{uri: user.avatar}}
                        />
                    ):
                    (
                        <Image
                            style={styles.imgContainer}
                            source={require('../../assets/images/defaultAvatar.png')}
                        />
                    )
                }
                <View style={[styles.innerContainer, {position: 'absolute', left: 84}]}>
                    <Text style={styles.name}>{user?.login}</Text>
                    <Text style={styles.email}>{user?.email}</Text>
                </View>
            </View>
            <View style={{marginTop: 124, paddingLeft: 16, marginBottom: 30}}>
                <ScrollView contentContainerStyle={{gap: 35, paddingBottom: 46}}>
                    {posts && posts.length > 0 && posts.map(({name, location, id, imageUrl}) => (
                        <ListImg
                            sourceImg={imageUrl}
                            name={name}
                            countComment={commentsCount[id]}
                            location={location}
                            latitude={46.225713}
                            longitude={30.610853}
                            postId={id}
                            comments={commentsPost[id]}
                        />
                    ))}

                </ScrollView>

            </View>

        </View>

    )
}


export default PostsScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        flexDirection: 'row',
    },
    imgContainer: {
        width: 60,
        height: 60,
        borderRadius: 16,
        marginTop: 32,
        marginLeft: 16
    },
    innerContainer: {
        paddingTop: 45,
        paddingLeft: 8,
    },
    name:{
        color:colors.blackPrimary,
        fontSize: 13,
        fontWeight: 'bold',
    },
    email: {
        color: 'rgba(33, 33, 33, 0.80)',
        fontSize: 11,
        fontWeight: 400,
    }
})