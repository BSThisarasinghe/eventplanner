import React from 'react';
import { View, ActivityIndicator, StyleSheet, TouchableWithoutFeedback, Platform, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PostItem = ({ onPressItem, item }: any) => {
    return (
        <TouchableWithoutFeedback onPress={() => onPressItem(item)}>
            <View style={styles.listItem}>
                <View style={styles.iconContainer}>
                    <Icon name={'post-outline'} size={30} color={'#da5e42'} />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subtitle}>{item.subtitle}</Text>
                </View>
                <View style={styles.arrowContainer}>
                    <Icon name={'arrow-right-circle'} size={30} color={'#da5e42'} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

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
    arrowContainer: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});

export { PostItem };