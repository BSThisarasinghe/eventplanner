import React, { useState, useEffect } from 'react';
import { ScrollView, Text, FlatList, View, TouchableOpacity, StyleSheet } from 'react-native';
import Slideshow from 'react-native-image-slider-show';
import { useDispatch, useSelector } from "react-redux";
import { fetchEventImages, fetchPosts, fetchUsers, userFetch } from '../../store/actions';
import { User } from './models/users.model';
import { EventItem } from './models/event-list-response.model';
import { UserItem } from './components/UserItem';
import { ImageItem } from './components/ImageItem';
import { Button } from '../../components';

export default function Home({ navigation }: any) {
    const [tab, setTab] = useState(0);
    const [imageList, setImageList] = useState<string[]>([]);

    const dispatch = useDispatch();

    const {
        eventDetails,
        users,
        posts
    } = useSelector<any, any>(({ event }) => event);

    const {
        userDetails,
        userDetailsLoading
    } = useSelector<any, any>(({ auth }) => auth);

    useEffect(() => {
        dispatch(userFetch());
        dispatch(fetchEventImages());
        dispatch(fetchUsers());
        dispatch(fetchPosts());
    }, []);

    useEffect(() => {
        const thumbnailUrls = eventDetails.slice(0, 10).filter((item: any) => item && item.thumbnailUrl).map((item: any) => ({ // Limit array to 10 objects/ Null filter
            url: item.thumbnailUrl
        }));
        setImageList(thumbnailUrls);
    }, [eventDetails]);

    const renderItem = ({ item }: { item: User }) => {
        return (
            <UserItem
                item={item}
            />
        )
    };

    const renderImageItem = ({ item }: { item: EventItem }) => {
        return (
            <ImageItem
                item={item}
            />
        )
    };

    const onViewPosts = () => {
        navigation.navigate('post-list')
    }

    return (
        <ScrollView style={styles.container}>
            <Slideshow
                dataSource={imageList}
            />
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Christmas party</Text>
                <Text style={styles.sectionSubtitle}>Godaparagaha watta, Yatalamatta, Galle</Text>
                <View style={styles.organizersContainer}>
                    <Text style={styles.organizersTitle}>Organizers</Text>
                    <FlatList
                        data={users.slice(0, 10)}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        scrollEnabled={false}
                    />
                </View>
            </View>
            <View style={styles.sectionContainer}>
                <View style={styles.postsHeader}>
                    <Text style={styles.sectionTitle}>Posts</Text>
                    <Button
                        buttonText={'All photos'}
                        rightIcon={'arrow-right'}
                        buttonStyle={styles.transparentButton}
                        buttonTextStyle={styles.buttonText}
                        rightColor={'#da5e42'}
                    />
                </View>
                <FlatList
                    data={eventDetails.slice(0, 10)}
                    renderItem={renderImageItem}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                />
                <TouchableOpacity style={styles.postsCountContainer} onPress={onViewPosts}>
                    <Text style={styles.postsCount}>{posts.length}</Text>
                    <Text>Posts</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0
    },
    sectionContainer: {
        flex: 1,
        padding: 20,
    },
    sectionTitle: {
        fontWeight: '700',
        fontSize: 24,
        color: '#000',
    },
    sectionSubtitle: {
        fontWeight: '300',
        fontSize: 14,
        color: '#000',
        paddingTop: 20,
    },
    organizersContainer: {
        flex: 2,
        paddingTop: 20,
    },
    organizersTitle: {
        fontWeight: '700',
        fontSize: 20,
    },
    postsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    transparentButton: {
        backgroundColor: 'transparent',
    },
    buttonText: {
        color: '#da5e42',
    },
    postsCountContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
    },
    postsCount: {
        color: '#da5e42',
        fontSize: 24,
    },
});
