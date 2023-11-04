import React from "react"
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/images/logo-teal.png')} // Replace this with the path to your splash screen image
                    style={styles.image}
                />
            </View>
            <TouchableOpacity style={styles.searchButtonStyle}>
                <Icon name="search" size={20} color="#00b8a9" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.accountButtonStyle} onPress={() => navigation.navigate('login')}>
                <Icon name="user" size={20} color="#00b8a9" />
                <Text style={styles.buttonTextStyle}>Account</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    image: {
        width: 100,
        resizeMode: 'contain',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        flexDirection: 'row'
    },
    logoText: {
        color: '#000'
    },
    searchButtonStyle: {
        borderWidth: 1,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#d8d8d8',
        borderRadius: 5
    },
    accountButtonStyle: {
        borderWidth: 1,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderColor: '#d8d8d8',
        borderRadius: 5,
        padding: 5

    },
    buttonTextStyle: {
        color: '#000',
        width: 70,
        padding: 5
    }
});


export { Header };