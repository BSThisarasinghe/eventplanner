import React from 'react';
import { View, TextInput, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
    label?: string;
    value?: string;
    onChangeText?: (value: string) => void;
    secureTextEntry?: boolean;
    placeholder?: string;
    placeholderTextColor?: string;
    labelStyle?: object;
    style?: object;
    returnKeyType?: string;
    blurOnSubmit?: (e: any) => void;
    onSubmitEditing?: (nativeEvent: any) => void;
    ref?: string;
    multiline?: boolean;
    numberOfLines?: number;
    maxLength?: number;
    inputStyle?: object;
    labelIcon?: object;
    editable?: boolean;
    keyboardType?: string;
    errorText?: string;
    onBlur?: (e: any) => void;
    onPressIcon?: () => void;
    leftIcon?: string;
    rightIcon?: string;
    key?: string;
    onPressRightIcon?: string;
}

const Input = ({
    label,
    value,
    onChangeText,
    secureTextEntry,
    placeholder,
    placeholderTextColor,
    labelStyle,
    style,
    returnKeyType,
    blurOnSubmit,
    onSubmitEditing,
    ref,
    multiline,
    numberOfLines,
    maxLength,
    inputStyle,
    labelIcon,
    editable,
    keyboardType,
    errorText,
    onBlur,
    onPressIcon,
    leftIcon,
    rightIcon,
    key,
    onPressRightIcon
}: any) => {
    return (
        <View style={[styles.containerStyle, inputStyle]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
            </View>
            <View style={styles.inputWrapper}>
                {leftIcon && <View style={{ justifyContent: 'center', alignItems: 'center', width: 40, flex: 1 }}>
                    <Icon name={leftIcon} size={20} color="#d8d8d8" />
                </View>}
                <TextInput
                    key={key}
                    ref={ref}
                    secureTextEntry={secureTextEntry}
                    onChangeText={onChangeText}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    style={[styles.inputStyle, style]}
                    returnKeyType={returnKeyType}
                    blurOnSubmit={blurOnSubmit}
                    onSubmitEditing={onSubmitEditing}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    maxLength={maxLength}
                    editable={editable}
                    keyboardType={keyboardType}
                    onBlur={onBlur}
                />
                {rightIcon && <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: 40, flex: 1 }} onPress={onPressRightIcon}>
                    <Icon name={rightIcon} size={20} color="#d8d8d8" />
                </TouchableOpacity>}
            </View>
            <View style={styles.errorContainerStyle}>
                <Text style={styles.errorStyle}>{errorText}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputStyle: {
        color: '#333333',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 14,
        lineHeight: 18,
        flex: 5,
        backgroundColor: '#F4F7FC',
        // width: '80%'
    },
    inputWrapper: {
        backgroundColor: '#F4F7FC',
        borderWidth: 1,
        borderColor: '#d8d8d8',
        flexDirection: 'row',
        borderRadius: 5,
        height: 40
    },
    labelStyle: {
        fontSize: 14,
        color: '#333333',
        marginBottom: 7,
        marginRight: 7
    },
    containerStyle: {
        // flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        color: '#000',
        // borderBottomWidth: 1,
        // borderBottomColor: 'rgba(82, 109, 127, 1)',
        marginBottom: 20
    },
    labelContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    addStyle: {
        width: 14,
        height: 14
    },
    errorContainerStyle: {
        paddingLeft: 20
    },
    errorStyle: {
        fontSize: 12,
        color: 'red',
        marginTop: 5
    }
});

export { Input };