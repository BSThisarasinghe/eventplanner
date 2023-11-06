import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';
import Login from '../pages/login/Login';
import Home from '../pages/home/Home';
import { Header } from '../components';
import SignUp from '../pages/signup/SignUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddProfile from '../pages/profile/AddProfile';
import EditProfile from '../pages/profile/EditProfile';
import auth from '@react-native-firebase/auth';
import PostList from '../pages/post-list/PostList';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function DrawerTab() {
    return (
        <Drawer.Navigator initialRouteName="home">
            <Drawer.Screen name="home" component={Home} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
}

function BottomTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="drawer" component={DrawerTab} options={{ headerShown: false }} />
            <Tab.Screen name="edit-profile" component={EditProfile} />
        </Tab.Navigator>
    );
}

export default function RouteHandler() {
    const [user, setUser] = useState<any | null>(null)

    const storeData = async (value: any) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('user', jsonValue);
        } catch (e) {
            // saving error
        }
    };

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('user');
            setUser(jsonValue);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            // error reading value
        }
    };

    function onAuthStateChanged(user: any) {
        setUser(user);
        storeData(user);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

        return subscriber; // unsubscribe on unmount
    }, []);

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    useEffect(() => {
        let user = getData();
    }, []);

    return (
        <Stack.Navigator
            initialRouteName="splash"
            screenOptions={({ navigation }) => ({
                header: () => {
                    return <Header navigation={navigation} />;
                },
            })}
        >
            {user ? <>
                <Stack.Screen name="bottomtab" component={BottomTab} />
                <Stack.Screen name="add-profile" component={AddProfile} options={{ headerShown: false }} />
                <Stack.Screen name="post-list" component={PostList} />
            </> : <>
                <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="signup" component={SignUp} options={{ headerShown: false }} />
            </>}

        </Stack.Navigator>
    );
}