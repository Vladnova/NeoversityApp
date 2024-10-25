import {Image, StyleSheet, Text, View} from "react-native";
import {colors} from "../styles/global";

const PostsScreen = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.imgContainer} source={require('../assets/images/logo.png')} />
            <View style={styles.innerContainer}>
                <Text style={styles.name}>Natali Romanova</Text>
                <Text style={styles.email}>email@example.com</Text>
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