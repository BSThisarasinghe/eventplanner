import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  PermissionsAndroid
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import RouteHandler from './routes/RouteHandler';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import store from './store';
import { User, onAuthStateChanged } from 'firebase/auth';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
// import { FIREBASE_AUTH } from './firebase/firebase-config';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(null)
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

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
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, []);


  // useEffect(() => {
  //   onAuthStateChanged(FIREBASE_AUTH, (user) => {
  //     console.log('user', user);
  //     setUser(user);
  //     storeData(user);
  //   })
  // }, []);

  useEffect(() => {
    const userStore = getData();
    // console.log(userStore);
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled: boolean =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // console.log('Authorization status:', authStatus);
    }
    return enabled;
  }

  useEffect(() => {
    const fetchData = async () => {
      const permissionGranted = await requestUserPermission();

      if (permissionGranted) {
        messaging().getToken().then(token => {
          console.log(token);
        });
      } else {
        // console.log("Failed");
      }

      messaging()
        .subscribeToTopic('weather')
        .then(() => console.log('Subscribed to topic!'));
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Provider store={store}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <NavigationContainer>
          <RouteHandler />
        </NavigationContainer>
      </Provider>
    </React.Fragment>
  );
}

export default App;
