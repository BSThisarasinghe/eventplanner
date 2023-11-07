import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { EventItem } from '../models/event-list-response.model';

type Props = {
    item: EventItem;
}

const ImageItem = ({ item }: Props) => {
    return (
        <View style={styles.imageContainer}>
            <Image
                source={{ uri: item.thumbnailUrl }}
                style={styles.image}
            />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>
                    {item.title}
                </Text>
                <Text style={styles.linkText}>
                    Link: {item.url}
                </Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    imageContainer: {
        flexDirection: 'column',
        width: 300,
        borderWidth: 1,
        borderColor: '#d8d8d8',
    },
    image: {
        height: 200,
        marginBottom: 20,
    },
    contentContainer: {
        padding: 10,
    },
    title: {
        color: '#000',
        fontWeight: '700',
        fontSize: 16,
    },
    linkText: {
        fontWeight: '300',
    },
});

export { ImageItem };
