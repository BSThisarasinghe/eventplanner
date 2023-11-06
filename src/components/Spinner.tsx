import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import {
    UIActivityIndicator
} from 'react-native-indicators';

const Spinner = ({ size, spinnerStyle, color }: any) => {
    return(
        <View style={[styles.spinnerStyle, spinnerStyle]}>
            <UIActivityIndicator size={size || 40} color={color || "#da5e42"} />
        </View>
    );
}

const styles = StyleSheet.create({
    spinnerStyle: {
        height: 80
    }
});

export { Spinner };