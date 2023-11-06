import React, { useEffect, useState } from "react"
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, Platform } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../store/actions";
import { Post } from "../home/models/posts.model";

const SinglePost = ({ navigation }: any) => {
    const [postList, setPostList] = useState();
    const dispatch = useDispatch();

    const {
        posts
    } = useSelector<any, any>(({ event }) => event);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [])

    const onPressItem = () => {

    }

    const renderItem = ({ item }: { item: Post }) => {
        return (
            <TouchableWithoutFeedback onPress={onPressItem}>
                <View style={styles.listItem}>
                    <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f6f6f6', borderRadius: 50 }}>
                        <Icon name={'post-outline'} size={30} color={"#da5e42"} />
                    </View>
                    <View style={{ padding: 10, flexDirection: 'column', flex: 3 }}>
                        <Text style={{ color: '#000', fontWeight: '500', fontSize: 14 }}>
                            {item.title}
                        </Text>
                        <Text style={{ color: '#000', fontWeight: '300', fontSize: 10 }}>
                            {item.title}
                        </Text>
                    </View>
                    <View style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Icon name={'arrow-right-circle'} size={30} color={"#da5e42"} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    };

    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: '#f9f9f9' }}>
            <Text style={{ color: '#000', fontSize: 24, fontWeight: '700', marginBottom: 30 }}>All posts</Text>
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={<View style={{ height: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#d8d8d8' }}>--- You've got it all ---</Text>
                </View>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#da5e42',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10
    },
    listItem: {
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
        // height: 70,
        minHeight: 100,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 20,
        borderRadius: 15
    }
});


export default SinglePost;