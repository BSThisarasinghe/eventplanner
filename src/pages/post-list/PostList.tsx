import React, { useEffect, useState } from "react"
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, Platform, Modal, Dimensions } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, fetchPosts } from "../../store/actions";
import { Post } from "../home/models/posts.model";
import { Comment } from "../home/models/comments.model";
import { Spinner } from "../../components";

const windowHeight = Dimensions.get('window').height;

const PostList = ({ navigation }: any) => {
    const [displayModal, setDisplayModal] = useState(false);
    const [postItem, setPostItem] = useState<Post | null>(null);

    const dispatch = useDispatch();

    const {
        posts,
        comments,
        postsLoading,
        commentsLoading
    } = useSelector<any, any>(({ event }) => event);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [])

    const onPressItem = (post: Post) => {
        setPostItem(post);
        setDisplayModal(true);
        dispatch(fetchComments(post.id));
    }

    const renderItem = ({ item }: { item: Post }) => {
        return (
            <TouchableWithoutFeedback onPress={() => onPressItem(item)}>
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

    const renderComment = ({ item }: { item: Comment }) => {
        return (
            <View style={styles.listItem}>
                <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f6f6f6', borderRadius: 50 }}>
                    <FontAwesomeIcon name={'user-alt'} size={20} color={"#da5e42"} />
                </View>
                <View style={{ padding: 10, flexDirection: 'column', flex: 3 }}>
                    <Text style={{ color: '#000', fontWeight: '500', fontSize: 14 }}>
                        {item.name}
                    </Text>
                    <Text style={{ color: '#000', fontWeight: '300', fontSize: 10 }}>
                        {item.body}
                    </Text>
                </View>
            </View>
        )
    };

    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: '#f9f9f9' }}>
            <Text style={{ color: '#000', fontSize: 24, fontWeight: '700', marginBottom: 30 }}>All posts</Text>
            {!postsLoading ? <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={<View style={{ height: 30, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#d8d8d8' }}>--- You've got it all ---</Text>
                </View>}
            /> : <Spinner />}
            <Modal
                animationType="slide"
                transparent={true}
                visible={displayModal}
                style={{ flex: 1, backgroundColor: 'red' }}
                onRequestClose={() => {
                    // Alert.alert('Modal has been closed.');
                    // setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalOverlay} />
                <View style={[styles.modalContainer, { height: windowHeight * 0.7 }]}>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20 }}>
                            <Text style={{ color: '#000', fontSize: 24, fontWeight: '700', marginBottom: 30 }}>{postItem?.title}</Text>
                            <TouchableWithoutFeedback onPress={() => setDisplayModal(false)}>
                                <Icon name={'close-circle'} size={30} color={"#da5e42"} />
                            </TouchableWithoutFeedback>
                        </View>
                        <Text style={{ fontSize: 14, fontWeight: '300', marginBottom: 30 }}>{postItem?.body}</Text>
                    </View>
                    <Text style={{ color: '#000', fontSize: 24, fontWeight: '700', marginBottom: 30 }}>Comments</Text>
                    {!commentsLoading ? <FlatList
                        data={comments}
                        renderItem={renderComment}
                        keyExtractor={(item, index) => index.toString()}
                    /> : <Spinner />}
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#da5e42',
        // backgroundColor: 'red',
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
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContainer: {
        flex: 0.5,
        backgroundColor: '#fff',
        // height: 500,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        elevation: 5,
    },
});


export default PostList;