import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const UserItem = ({ item }: any) => {
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
    );
}

const styles = StyleSheet.create({
    spinnerStyle: {
        height: 80
    }
});

export { UserItem };