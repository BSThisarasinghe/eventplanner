import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, Animated, StyleSheet, View, Image, Alert, FlatList, TouchableOpacity } from 'react-native';
import Slideshow from 'react-native-image-slider-show';
import { Button, Footer, SubHeader } from '../../components';
import { useDispatch, useSelector } from "react-redux";
import DataItem from '../../models/data-item.model';
import MenuItem from '../../models/menu-item.model';
import { fetchEventImages, fetchPosts, fetchUsers, userFetch } from '../../store/actions';
import Icon from 'react-native-vector-icons/Feather';
import { User } from './models/users.model';
import { EventItem } from './models/event-list-response.model';

export default function Home({ navigation }: any) {
    const flatListRef = useRef<FlatList<DataItem>>(null);
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
    }, []);

    useEffect(() => {
        dispatch(fetchEventImages());
        dispatch(fetchUsers());
        dispatch(fetchPosts());
    }, []);

    useEffect(() => {
        const thumbnailUrls = eventDetails.slice(0, 10).filter((item: any) => item && item.thumbnailUrl).map((item: any) => ({
            url: item.thumbnailUrl
        }));
        setImageList(thumbnailUrls);
    }, []);

    const renderItem = ({ item }: { item: User }) => {
        return (
            <View style={{ height: 60, padding: 4, flexDirection: 'row', marginBottom: 5, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#d8d8d8' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={{ uri: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg' }}
                        style={{ width: 50, height: 50, borderRadius: 30 }}
                    />
                </View>
                <View style={{ flex: 4, paddingLeft: 8 }}>
                    <Text style={{ color: '#000' }}>{item.name}</Text>
                    <Text>{item.email}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name={'message-square'} size={20} color={"#000"} />
                </View>
            </View>
        )
    };

    const renderImageItem = ({ item }: { item: EventItem }) => {
        return (
            <View style={{ flexDirection: 'column', width: 300, borderWidth: 1, borderColor: '#d8d8d8' }}>
                <Image
                    source={{ uri: item.thumbnailUrl }}
                    style={{ height: 200, marginBottom: 20 }}
                />
                <View style={{ padding: 10 }}>
                    <Text style={{ color: '#000', fontWeight: '700', fontSize: 16 }}>
                        {item.title}
                    </Text>
                    <Text style={{ fontWeight: '300' }}>
                        Link: {item.url}
                    </Text>
                </View>
            </View>
        )
    };

    const onViewPosts = () => {
        navigation.navigate('post-list')
    }

    // console.log("imageList", imageList);


    return (
        <ScrollView style={styles.container}>
            <Slideshow
                dataSource={imageList}
            />
            <View style={{ flex: 1, padding: 20 }}>
                <Text style={{ fontWeight: '700', fontSize: 24, color: '#000' }}>Christmas party</Text>
                <Text style={{ fontWeight: '300', fontSize: 14, color: '#000' }}>Godaparagaha watta, Yatalamatta, Galle</Text>
                <View style={{ flex: 2, paddingTop: 20 }}>
                    <Text style={{ fontWeight: '700', fontSize: 20 }}>Orgranizers</Text>
                    <FlatList
                        data={users.slice(0, 10)}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        // style={{ backgroundColor: 'yellow' }}
                        scrollEnabled={false}
                    />
                </View>
            </View>
            <View style={{ flex: 1, padding: 20 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: '700', fontSize: 24, color: '#000' }}>Posts</Text>
                        <Button style={{ flexDirection: 'row', alignItems: 'center' }}
                            buttonText={'All photos'}
                            rightIcon={'arrow-right'}
                            buttonStyle={{ backgroundColor: 'transparent' }}
                            buttonTextStyle={{ color: '#da5e42' }}
                            rightColor={'#da5e42'}
                        // onPress={onViewPosts}
                        />
                    </View>
                    <FlatList
                        data={eventDetails.slice(0, 10)}
                        renderItem={renderImageItem}
                        keyExtractor={(item, index) => index.toString()}
                        // style={{ backgroundColor: 'yellow' }}
                        horizontal
                    />
                </View>
                <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'center', padding: 10 }} onPress={onViewPosts}>
                    <Text style={{ color: '#da5e42', fontSize: 24 }}>{posts.length}</Text>
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
});
