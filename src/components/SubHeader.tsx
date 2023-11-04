import * as React from 'react';
import { Text, View, StyleSheet, Animated, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function SubHeader({ orderDetails }: any) {

    return (
        <View
            style={styles.header}
        >
            <View style={styles.backgroundImageWrapper}>
                <ImageBackground
                    source={require('../assets/images/background.webp')} // Replace this with the path to your splash screen image
                    style={styles.backgroundImage}
                >
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.backButton}>
                            <Icon name="arrow-left" size={20} color="#00b8a9" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bottomButton}>
                            <Icon name="users" size={20} color="#00b8a9" />
                            <Text style={styles.buttonText}>Start group order</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
            {orderDetails && <View style={styles.contentWrapper}>
                <Text style={styles.orderTitle}>{orderDetails.companyName}</Text>
                <Text style={styles.orderText}>{orderDetails.duration} {orderDetails.orderName}</Text>
                <Text style={styles.orderText}>{orderDetails.distance} miles away·Closes at {orderDetails.closeAt}·£{orderDetails.price}</Text>
                <Text style={styles.orderText}>minimum·£{orderDetails.deliveryCharge} delivery</Text>
                <View style={styles.orderInfoWrapper}>
                    <View style={styles.iconWrapper}>
                        <Icon name="info-circle" size={20} color="#00b8a9" />
                    </View>
                    <View style={styles.infoTextWrapper}>
                        <Text style={styles.infoText}>Info</Text>
                        <Text style={styles.infoDetail}>Map, allergens and hygiene rating</Text>
                    </View>
                    <View style={styles.iconWrapper}>
                        <Icon name="arrow-right" size={20} color="#00b8a9" />
                    </View>
                </View>
                <View style={styles.orderInfoWrapper}>
                    <View style={styles.iconWrapper}>
                        <Icon name="star" size={20} color="#00b8a9" />
                    </View>
                    <View style={styles.infoTextWrapper}>
                        <Text style={styles.infoText}>{orderDetails.rating} Excellent</Text>
                        <Text style={styles.infoDetail}>See all 600 reviews</Text>
                    </View>
                    <View style={styles.iconWrapper}>
                        <Icon name="arrow-right" size={20} color="#00b8a9" />
                    </View>
                </View>
                <View style={styles.orderInfoWrapper}>
                    <View style={styles.iconWrapper}>
                        <Icon name="bicycle" size={15} color="#00b8a9" />
                    </View>
                    <View style={styles.infoTextWrapper}>
                        <Text style={styles.infoText}>Deliver in {orderDetails.duration}</Text>
                    </View>
                    <View style={styles.infoButtonWrapper}>
                        <Text style={styles.infoButtonText}>Change</Text>
                    </View>
                </View>
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        // justifyContent: 'center',
        // alignItems: 'center',
        // left: 0,
        // right: 0,
        // paddingTop: 10
        // backgroundColor: 'red'
    },
    backgroundImageWrapper: {
        flex: 1,
        height: 250
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch' if you want to stretch the image
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        width: 40,
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 1)', // semi-transparent white background
        padding: 10,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 1)', // semi-transparent white background
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonText: {
        color: '#000',
        marginLeft: 5,
        fontFamily: 'ProximaNovaRegular'
    },
    contentWrapper: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        // backgroundColor: 'red',
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    orderTitle: { fontSize: 20, color: '#000', fontWeight: "700", fontFamily: 'ProximaNovaBold' },
    orderText: { fontSize: 14, color: '#000', fontWeight: "300", fontFamily: 'ProximaNovaRegular' },
    orderInfoWrapper: {
        height: 60,
        flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center'
    },
    iconWrapper: {
        height: 60,
        width: 30, justifyContent: 'center', alignItems: 'center', padding: 5
    },
    infoTextWrapper: {
        flex: 1,
        justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column'
    },
    infoText: {
        color: '#000', fontSize: 14, fontWeight: "200"
    },
    infoDetail: {
        color: '#000',
        fontSize: 12,
        fontWeight: "200"
    },
    infoButtonWrapper: { height: 60, justifyContent: 'center', alignItems: 'center', padding: 5 },
    infoButtonText: { color: '#00b8a9', fontSize: 14, fontWeight: "300" }
});

export { SubHeader };