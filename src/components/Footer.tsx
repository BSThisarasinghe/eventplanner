import React from "react"
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = () => {
    return (
        <View style={styles.container}>
            <View style={styles.contentWrapper}>
                <Text style={styles.footerTitle}>Discover Deliveroo</Text>
                <Text>Investors</Text>
                <Text>About us</Text>
                <Text>Takeaway</Text>
                <Text>Newsroom</Text>
                <Text>Engineering blog</Text>
                <Text>Design blog</Text>
                <Text>Gift Cards</Text>
                <Text>Deliveroo Students</Text>
                <Text>Careers</Text>
                <Text>Restaurant signup</Text>
                <Text>Become a rider</Text>
            </View>
            <View style={styles.contentWrapper}>
                <Text style={styles.footerTitle}>Legal</Text>
                <Text>Terms and conditions</Text>
                <Text>Privacy</Text>
                <Text>Cookies</Text>
                <Text>Modern Slavery Statement</Text>
                <Text>Tax Strategy</Text>
                <Text>Section 172 Statement</Text>
            </View>
            <View style={styles.contentWrapper}>
                <Text style={styles.footerTitle}>Help</Text>
                <Text>Contact</Text>
                <Text>FAQs</Text>
                <Text>Cuisines</Text>
                <Text>Brands</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { backgroundColor: '#2e3333', padding: 20 },
    contentWrapper: { backgroundColor: '#434848', borderRadius: 5, margin: 5, padding: 10 },
    footerTitle: { fontSize: 16, color: '#fff', fontWeight: '700' }
});


export { Footer };