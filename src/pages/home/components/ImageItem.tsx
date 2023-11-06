import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const ImageItem = ({ item }: any) => {
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
    );
}

const styles = StyleSheet.create({
    spinnerStyle: {
        height: 80
    }
});

export { ImageItem };