import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { User } from '../models/users.model';
import { PROFILE_AVATAR } from '../../../../constants.config';

type Props = {
    item: User;
}

const UserItem = ({ item }: Props) => {
    return (
        <View style={styles.userItemContainer}>
            <View style={styles.userImageContainer}>
                <Image
                    source={{ uri: PROFILE_AVATAR }}
                    style={styles.userImage}
                />
            </View>
            <View style={styles.userInfoContainer}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
            </View>
            <View style={styles.messageIconContainer}>
                <Icon name={'message-square'} size={20} color={'#000'} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    userItemContainer: {
        height: 60,
        padding: 4,
        flexDirection: 'row',
        marginBottom: 5,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#d8d8d8',
    },
    userImageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 30,
    },
    userInfoContainer: {
        flex: 4,
        paddingLeft: 8,
    },
    userName: {
        color: '#000',
    },
    userEmail: {},
    messageIconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export { UserItem };
