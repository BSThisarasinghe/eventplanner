import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

const CommentItem = ({ item }: any) => {
    return (
        <View style={styles.listItem}>
            <View style={styles.iconContainer}>
                <FontAwesomeIcon name={'user-alt'} size={20} color={'#da5e42'} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subtitle}>{item.body}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
        minHeight: 100,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 20,
        borderRadius: 15,
    },
    iconContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f6f6f6',
        borderRadius: 50,
    },
    titleContainer: {
        padding: 10,
        flexDirection: 'column',
        flex: 3,
    },
    title: {
        color: '#000',
        fontWeight: '500',
        fontSize: 14,
    },
    subtitle: {
        color: '#000',
        fontWeight: '300',
        fontSize: 10,
    },
});

export { CommentItem };
