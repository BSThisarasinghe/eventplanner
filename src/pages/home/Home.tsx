import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, Animated, StyleSheet, View, Image, Alert, FlatList, TouchableOpacity } from 'react-native';
import { Footer, SubHeader } from '../../components';
import { useDispatch, useSelector } from "react-redux";
import DataItem from '../../models/data-item.model';
import MenuItem from '../../models/menu-item.model';
import { fetchMockdata } from '../../store/actions';

export default function Home() {
    const flatListRef = useRef<FlatList<DataItem>>(null);
    const [tab, setTab] = useState(0);
    const [itemHeight, setItemHeight] = useState(0);

    const dispatch = useDispatch();

    const {
        orderDetails
      } = useSelector<any, any>(({ order }) => order);

    const scrollToItem = (index: number) => {
        setTab(index);
        if (flatListRef.current) {
            let data: any = orderDetails?.menu;
            flatListRef.current.scrollToItem({ animated: true, item: data[index] });
        }
    };

    useEffect(() => {
        dispatch(fetchMockdata());
    }, []);

    const renderMenuItem = ({ item }: { item: MenuItem }) => {
        return (
            <View style={styles.menuItemWrapper}>
                <View style={styles.menuItemTextWrapper}>
                    <Text style={styles.menuItemTitle}>{item.title}</Text>
                    {item.description && <Text style={styles.menuItemText}>{item.description}</Text>}
                    {item.kcal && <Text style={styles.menuItemText}>{item.kcal} kcal</Text>}
                    {item.price && <Text style={styles.menuItemText}>${item.price} sold out</Text>}
                </View>
                <View style={styles.menuImageWrapper}>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.menuImage}
                    />
                </View>
            </View>
        )
    }


    const renderItem = ({ item }: { item: DataItem }) => {
        if (item.type == "header") {
            return (
                <View>
                    <ScrollView style={styles.stickyHeader} contentContainerStyle={styles.stickyHeaderContainer} horizontal>
                        <View style={styles.stickyHeaderButtonWrapper}>
                            <TouchableOpacity style={[styles.stickyHeaderButton, { backgroundColor: tab == 0 ? '#00b8a9' : 'transparent' }]} onPress={() => scrollToItem(0)}>
                                <Text style={{ color: tab == 0 ? 'white' : '#00b8a9' }}>New daily Specials</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.stickyHeaderButton, { backgroundColor: tab == 1 ? '#00b8a9' : 'transparent' }]} onPress={() => scrollToItem(1)}>
                                <Text style={{ color: tab == 1 ? 'white' : '#00b8a9' }}>Salads</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.stickyHeaderButton, { backgroundColor: tab == 2 ? '#00b8a9' : 'transparent' }]} onPress={() => scrollToItem(2)}>
                                <Text style={{ color: tab == 2 ? 'white' : '#00b8a9' }}>How power bowls</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.stickyHeaderButton, { backgroundColor: tab == 3 ? '#00b8a9' : 'transparent' }]} onPress={() => scrollToItem(3)}>
                                <Text style={{ color: tab == 3 ? 'white' : '#00b8a9' }}>Gym food</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.stickyHeaderButton, { backgroundColor: tab == 4 ? '#00b8a9' : 'transparent' }]} onPress={() => scrollToItem(4)}>
                                <Text style={{ color: tab == 4 ? 'white' : '#00b8a9' }}>Bundles</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.stickyHeaderButton, { backgroundColor: tab == 5 ? '#00b8a9' : 'transparent' }]} onPress={() => scrollToItem(5)}>
                                <Text style={{ color: tab == 5 ? 'white' : '#00b8a9' }}>Rainbow Wraps</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.stickyHeaderButton, { backgroundColor: tab == 6 ? '#00b8a9' : 'transparent' }]} onPress={() => scrollToItem(6)}>
                                <Text style={{ color: tab == 6 ? 'white' : '#00b8a9' }}>Vegan menu</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.stickyHeaderButton, { backgroundColor: tab == 7 ? '#00b8a9' : 'transparent' }]} onPress={() => scrollToItem(7)}>
                                <Text style={{ color: tab == 7 ? 'white' : '#00b8a9' }}>Snacks and sides</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.stickyHeaderButton, { backgroundColor: tab == 8 ? '#00b8a9' : 'transparent' }]} onPress={() => scrollToItem(8)}>
                                <Text style={{ color: tab == 8 ? 'white' : '#00b8a9' }}>Yoghurt & fruit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.stickyHeaderButton, { backgroundColor: tab == 9 ? '#00b8a9' : 'transparent' }]} onPress={() => scrollToItem(9)}>
                                <Text style={{ color: tab == 9 ? 'white' : '#00b8a9' }}>Cold drinks</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.stickyHeaderButton, { backgroundColor: tab == 10 ? '#00b8a9' : 'transparent' }]} onPress={() => scrollToItem(10)}>
                                <Text style={{ color: tab == 10 ? 'white' : '#00b8a9' }}>Smoothies, shakes & juice</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            )
        } else {
            return (
                <View style={styles.listItem}
                    onLayout={(event) => {
                        const { height } = event.nativeEvent.layout;
                        if (height !== itemHeight) {
                            setItemHeight(height);
                        }
                    }}
                >
                    <Text style={styles.itemType}>{item.type}</Text>
                    <FlatList
                        data={item.menuList}
                        renderItem={renderMenuItem}
                        keyExtractor={(i, index) => index.toString()}
                    />
                </View>
            );
        }
    };

    const renderHeader = () => (
        <SubHeader
            orderDetails={orderDetails}
        />
    );

    const renderFooter = () => (
        <Footer />
    );

    const handleScroll = (event: any) => {
        const yOffset = event.nativeEvent.contentOffset.y;
        const approxIndex = Math.floor(yOffset / itemHeight);
        setTab(approxIndex);
    };

    return (
        <View style={styles.container}>
            <View>
                {/* <Text style={{ color: '#000' }}>{JSON.stringify(orderDetails)}</Text> */}
                <FlatList
                    ref={flatListRef}
                    data={orderDetails?.menu}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    stickyHeaderIndices={orderDetails?.menu.length > 0 ? [1] : [0]}
                    ListHeaderComponent={renderHeader}
                    ListFooterComponent={renderFooter}
                    onScroll={handleScroll}
                    getItemLayout={(data, index) => ({
                        length: itemHeight,
                        offset: itemHeight * index,
                        index,
                    })}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0
    },
    menuItemWrapper: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 20 },
    menuItemTextWrapper: { flex: 3 },
    menuItemTitle: { color: '#000', fontSize: 16, fontWeight: "700" },
    menuItemText: { color: '#000', fontSize: 12, fontWeight: "300" },
    menuImageWrapper: { flex: 1 },
    menuImage: { width: 100, height: 100 },
    stickyHeader: { flexDirection: 'row', height: 100 },
    stickyHeaderContainer: { alignItems: 'center', flexDirection: 'row', maxHeight: 100 },
    stickyHeaderButtonWrapper: { flexDirection: 'row', height: 100, alignItems: 'center', backgroundColor: '#fff', padding: 10 },
    stickyHeaderButton: {
        height: 30,
        justifyContent: 'center', alignItems: 'center', borderRadius: 20, marginRight: 10, paddingLeft: 10, paddingRight: 10
    },
    listItem: {
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20
    },
    itemType: { color: '#000', fontSize: 18, fontWeight: "700" }
});
