import {Image, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from "react-native";
import {colors, imgList} from "../styles/global";
import ItemComment from "../components/ItemComment";
import ArrowUpIcon from "../icons/ArrowUpIcon";
import {useState} from "react";


const CommentsScreen = () => {
    const [comment, setComment] = useState('');

    const handleCommentChange = (text: string) => {
        setComment(text);
    };

    return (
        <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
            <View style={styles.innerContainer}>
                <Image
                    style={[imgList, {marginTop: 32}]}
                    source={require('../assets/images/blackSea.png')}
                />
                <View style={styles.containerComments}>
                    <ItemComment
                        comment={'Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!'}
                        commentDate={'09 червня, 2020 | 08:40'}
                        icon={require('../assets/images/logo2.png')}
                        styleContainerExist={{flexDirection: 'row',}}
                        styleIconExist={{marginRight: 16}}
                    />
                    <ItemComment
                        comment={'A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.'}
                        commentDate={'09 червня, 2020 | 09:14'}
                        icon={require('../assets/images/logo.png')}
                        styleContainerExist={{flexDirection: 'row-reverse',}}
                        styleIconExist={{marginLeft: 16}}
                    />
                    <ItemComment
                        comment={'Thank you! That was very helpful!'}
                        commentDate={'09 червня, 2020 | 09:20'}
                        icon={require('../assets/images/logo2.png')}
                        styleContainerExist={{flexDirection: 'row',}}
                        styleIconExist={{marginRight: 16}}
                    />
                </View>
                <View style={styles.containerInput}>
                    <TextInput
                        value={comment}
                        onChangeText={handleCommentChange}
                        placeholder={'Коментувати...'}
                    />
                    <ArrowUpIcon/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}


export default CommentsScreen;


const styles = StyleSheet.create({
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
    }
})