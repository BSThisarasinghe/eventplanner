import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp, createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';
import Login from '../pages/login/Login';
import Home from '../pages/home/Home';
import { Button, Header } from '../components';
import SignUp from '../pages/signup/SignUp';
import AddProfile from '../pages/profile/AddProfile';
import EditProfile from '../pages/profile/EditProfile';
import auth from '@react-native-firebase/auth';
import PostList from '../pages/post-list/PostList';
import Icon from 'react-native-vector-icons/AntDesign';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser, userFetch } from '../store/actions';
import { PROFILE_AVATAR } from '../../constants.config';
import { getData, storeData } from '../utils/async-storage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

type DrawerNavigationProps = DrawerNavigationProp<RootStackParamList, 'drawertab'>;
type BottomTabNavigationProps = BottomTabNavigationProp<RootTabParamList, 'drawer'>;
type RootStackParamList = {
  splash: undefined;
  drawertab: undefined;
  addprofile: undefined;
  postlist: undefined;
  login: undefined;
  signup: undefined;
};
type RootTabParamList = {
  drawer: undefined;
  editprofile: undefined;
};


function DrawerContent({ navigation }: any) {
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const dispatch = useDispatch();

    const {
        userDetails
    } = useSelector<any, any>(({ auth }) => auth);

    useEffect(() => {
        for (const userId in userDetails) {
            if (userDetails.hasOwnProperty(userId)) {
                const userData = userDetails[userId];
                setFirstName(userData.firstName);
                setLastName(userData.lastName);
                setEmail(userData.email);
            }
        }
    }, [JSON.stringify(userDetails)])

    const onLogout = () => {
        dispatch(logOutUser());
    }

    return (
        <View style={{ flex: 1, padding: 5 }}>
            <View style={{ height: 60, padding: 4, flexDirection: 'row', marginBottom: 5, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#d8d8d8' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={{ uri: PROFILE_AVATAR }}
                        style={{ width: 50, height: 50, borderRadius: 30 }}
                    />
                </View>
                <View style={{ flex: 4, paddingLeft: 8 }}>
                    <Text style={{ color: '#000' }}>{firstName} {lastName}</Text>
                    <Text>{email}</Text>
                </View>
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <Button 
                buttonText={'Logout'}
                leftIcon={'log-out'}
                buttonStyle={{ backgroundColor: 'transparent' }}
                buttonTextStyle={{ color: '#da5e42' }}
                leftColor={'#da5e42'}
                onPress={() => onLogout()}
            />
            </View>
        </View>
    );
}

function DrawerTab() {
    return (
        <Drawer.Navigator initialRouteName="home" drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="home" component={BottomTab} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
}

function BottomTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="drawer" component={Home} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Icon name={'home'} size={20} color={"#da5e42"} />
                ),
                tabBarLabel: 'Home',
            }} />
            <Tab.Screen name="edit-profile" component={EditProfile} options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <AntDesignIcon name={'profile'} size={20} color={"#da5e42"} />
                ),
                tabBarLabel: 'Profile',
            }}/>
        </Tab.Navigator>
    );
}

export default function RouteHandler() {

    const [user, setUser] = useState<any | null>(null)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userFetch());
    }, []);

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
        setUser(user);
    }, []);
    
    return (
        <Stack.Navigator
            initialRouteName="splash"
        >
            {(user != 'null' && user !== null) ? <>
                 <Stack.Screen name="drawertab" component={DrawerTab} options={{ headerShown: false }}  />
                <Stack.Screen name="add-profile" component={AddProfile} options={{ headerShown: false }} />
                <Stack.Screen name="post-list" component={PostList} options={{ headerTitle: 'Posts & Comments' }} />
            </> : <>
                <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="signup" component={SignUp} options={{ headerShown: false }} />
            </>}

        </Stack.Navigator>
    );
}