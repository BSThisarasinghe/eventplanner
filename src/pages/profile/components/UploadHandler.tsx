import React, { useState, useEffect } from "react";
import { PermissionsAndroid, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import { Button } from "../../../components";

type Props = {
  onPressUpload: () => void
}

const UploadHandler = ({onPressUpload}: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    // Implement your authentication logic here
    // console.log('Username:', username);
    // console.log('Password:', password);
  };

  useEffect(() => {
    // requestCameraPermission();
    // requestGalleryPermission();
  }, [])

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Text style={styles.header}>Welcome</Text>
        <Text>You are logged in for the first time and can upload a profile photo</Text>
      </View>
      <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 30 }}>
        <Button
          buttonText={''}
          rightIcon={'camera'}
          buttonStyle={{ backgroundColor: '#f1e6e3', width: 150, height: 150, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}
          rightColor={'#da5e42'}
          onPress={onPressUpload}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 16,
    // backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000'
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#00b8a9',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    color: '#000'
  },
  button: {
    backgroundColor: '#00b8a9',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10
  },
  textStyle: {
    color: '#000',
    margin: 20
  },
  smallText: {
    color: '#000',
    fontSize: 10,
    margin: 10
  },
  facebookButton: { backgroundColor: '#4c69ba', flexDirection: 'row', padding: 5, borderRadius: 5, justifyContent: 'space-around', alignItems: 'center', width: 250, marginBottom: 10 },
  googleButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#d8d8d8', flexDirection: 'row', padding: 5, borderRadius: 5, justifyContent: 'space-around', alignItems: 'center', width: 250, marginBottom: 10 },
  appleButton: { backgroundColor: '#000', flexDirection: 'row', padding: 5, borderRadius: 5, justifyContent: 'space-around', alignItems: 'center', width: 250, marginBottom: 30 }
});

export { UploadHandler };