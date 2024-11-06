import {
    Image,
    StyleSheet, Text,
    TouchableOpacity,
    View,
    ScrollView
} from "react-native";
import BackgroundImg from "../components/BackgroundImg";
import {
    baseTypography, colors,
    container, plusContainer, registrationAndLoginContainer, title, wrapperAvatar,
} from "../../styles/global";
import CloseIcon from "../../icons/CloseIcon";
import LogoutIcon from "../../icons/LogoutIcon";
import ListImg from "../components/ListImg";
import {useDispatch, useSelector} from "react-redux";
import {logoutDB} from "../utils/auth";
import {RootState} from "../redux/store/store";
import * as ImagePicker from "expo-image-picker";
import {useEffect, useState} from "react";
import AddAvatarIcon from "../../icons/AddAvatarIcon";
import {deleteImage, handleImageUpload} from "../utils/imageUtils";
import {getCommentsForPost, getUserPosts, PostResponse, updateUserInFirestore} from "../utils/firestore";
import {setAvatarPath, setUserInfo} from "../redux/reducers/userSlice";

export interface CommentPost {
    id: string;
    text: string;
    userId: string;
    timestamp: string;
}


const ProfileScreen = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.userInfo);
    const avatarPath = useSelector((state: RootState) => state.user.avatarPath);
    const [posts, setPosts] = useState<PostResponse[]>([]);
    const [commentsCount, setCommentsCount] = useState<{ [key: string]: number }>({});
    const [commentsPost, setCommentsPost] = useState<{  [key: string]: CommentPost[] | []}>({});

    const getPosts = async () => {
        if(user) {
            const newPosts = await getUserPosts(user?.uid);
            if (JSON.stringify(newPosts) !== JSON.stringify(posts)) {
                setPosts(newPosts);
            }
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



    const onLogout = () => logoutDB(dispatch);
    const handlerDeleteAvatar = async () => {
        if (avatarPath){
            deleteImage(avatarPath)
        }
        if(user){
            updateUserInFirestore(user.uid,{avatar: ''});
            dispatch(setUserInfo({
                ...user,
                avatar: '',
            }));
            dispatch(setAvatarPath(''));
        }

    }

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Permission to access media library is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        });



        if (!result.canceled && user) {
            const uri = result.assets[0].uri;

            const response = await fetch(uri);
            const file = await response.blob();

            // Перетворюємо Blob на File, якщо це необхідно
            const fileName = uri.split('/').pop() || "avatar"; // Отримуємо ім'я файлу з URI
            const fileType = file.type; // Отримуємо тип файлу
            const dirName = 'avatars'

            const imageFile = new File([file], fileName, { type: fileType });
            const imageUrl = await handleImageUpload(user.uid, imageFile, fileName, dirName, dispatch );
            updateUserInFirestore(user.uid,{avatar: imageUrl});
            dispatch(setUserInfo({
                ...user,
                avatar: imageUrl,
            }));
        }
    };

    return (
            <View
                style={container}
            >
                <BackgroundImg/>
                <View style={[styles.innerContainer, registrationAndLoginContainer]}>
                    <View style={{marginBottom: 92}}>
                        <View style={[wrapperAvatar, {marginLeft: 0}]}>
                            {user?.avatar ?
                                (
                                    <Image
                                        style={styles.avatar}
                                        source={{uri: user.avatar}}
                                    />
                                ):
                                (
                                    <Image
                                        style={[styles.avatar, {backgroundColor: colors.lightGrey}]}
                                        source={require('../../assets/images/defaultAvatar.png')}
                                    />
                                )
                            }
                            <TouchableOpacity
                                style={plusContainer}
                                onPress={user?.avatar ? handlerDeleteAvatar : pickImage}
                            >
                                {user?.avatar ? (<CloseIcon/>) : (<AddAvatarIcon/>)}
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.logoutBtn}>
                        <TouchableOpacity  onPress={onLogout}>
                            <LogoutIcon />
                        </TouchableOpacity>
                    </View>

                    <Text style={[title, baseTypography, {paddingTop: 0}]}>
                        {user?.login}
                    </Text>
                    <View >
                        <ScrollView contentContainerStyle={{gap: 35, }}>
                            {posts && posts?.length > 0 && posts.map(({imageUrl, location, name, id })=>(
                                <ListImg
                                    sourceImg={imageUrl}
                                    name={name}
                                    countComment={commentsCount[id]}
                                    countLikes={'153'}
                                    location={location}
                                    latitude={48.160076}
                                    longitude={24.499850}
                                    postId={id}
                                    comments={commentsPost[id]}
                                />))
                            }
                        </ScrollView>
                    </View>

                </View>
            </View>
    )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    innerContainer: {
        height: '82%',
    },
    logoutBtn: {
        marginTop: 22,
        position: 'absolute',
        right: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 16,
        objectFit: 'cover',
    }

})