import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TextInput, TouchableWithoutFeedback, View, Platform, Modal, Dimensions, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, fetchPosts } from "../../store/actions";
import { Post } from "../home/models/posts.model";
import { Comment } from "../home/models/comments.model";
import { Spinner } from "../../components";
import { PostItem } from "./components/PostItem";
import { CommentItem } from "./components/CommentItem";

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
            <PostItem
                onPressItem={onPressItem}
                item={item}
            />
        )
    };

    const renderComment = ({ item }: { item: Comment }) => {
        return (
            <CommentItem
                item={item}
            />
        )
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>All posts</Text>
            {!postsLoading ? <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={<View style={styles.footer}>
                    <Text style={styles.footerText}>--- You've got it all ---</Text>
                </View>}
            /> : <Spinner />}
            <Modal
                animationType="slide"
                transparent={true}
                visible={displayModal}
                onRequestClose={() => {
                    // Alert.alert('Modal has been closed.');
                    // setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalOverlay} />
                <View style={[styles.modalContainer, { height: windowHeight * 0.7 }]}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{postItem?.title}</Text>
                            <TouchableWithoutFeedback onPress={() => setDisplayModal(false)}>
                                <Icon name={'close-circle'} size={30} color={"#da5e42"} />
                            </TouchableWithoutFeedback>
                        </View>
                        <Text style={styles.modalText}>{postItem?.body}</Text>
                    </View>
                    <Text style={styles.commentsHeading}>Comments</Text>
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
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f9f9f9',
    },
    heading: {
        color: '#000',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 30,
    },
    footer: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        color: '#d8d8d8',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContainer: {
        flex: 0.5,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        // elevation: 5,
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20,
    },
    modalTitle: {
        color: '#000',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 30,
    },
    modalText: {
        fontSize: 14,
        fontWeight: '300',
        marginBottom: 30,
    },
    commentsHeading: {
        color: '#000',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 10,
    },
});

export default PostList;
