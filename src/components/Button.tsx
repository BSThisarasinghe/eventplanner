import React from "react"
import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/AntDesign';

const Button = ({ navigation, buttonStyle, buttonTextStyle, buttonText, rightIcon, onPress, rightColor, leftColor, leftIcon, backgroundImage, imageStyle }: any) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
            <ImageBackground source={backgroundImage} style={[{ flexDirection: 'row' }, imageStyle]}>
                {leftIcon && <Icon name={leftIcon} size={20} color={leftColor || "#fff"} />}
                {buttonText && <Text style={[styles.buttonText, buttonTextStyle]}>{buttonText}</Text>}
                {rightIcon && <Icon name={rightIcon} size={20} color={rightColor || "#fff"} />}
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#da5e42',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10
    },
});


export { Button };