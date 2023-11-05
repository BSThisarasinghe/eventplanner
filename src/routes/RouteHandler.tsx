import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';
import Login from '../pages/login/Login';
import Home from '../pages/home/Home';
import { Header } from '../components';
import SignUp from '../pages/signup/SignUp';
import AddProfile from '../pages/profile/AddProfile';
import EditProfile from '../pages/profile/EditProfile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function DrawerTab() {
    return (
        <Drawer.Navigator initialRouteName="home">
          <Drawer.Screen name="home" component={Home}  options={{ headerShown: false }}/>
        </Drawer.Navigator>
    );
  }

function BottomTab() {
    return (
        <Tab.Navigator>
          <Tab.Screen name="drawer" component={DrawerTab}  options={{ headerShown: false }}/>
          <Tab.Screen name="edit-profile" component={EditProfile} />
        </Tab.Navigator>
    );
  }

export default function RouteHandler() {

    useEffect(() => {
        SplashScreen.hide();
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
            <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="signup" component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name="add-profile" component={AddProfile} options={{ headerShown: false }} />
            <Stack.Screen name="bottomtab" component={BottomTab} />
        </Stack.Navigator>
    );
}