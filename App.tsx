import {useEffect} from "react";
import {useFonts} from "expo-font";
import {ActivityIndicator} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import RegistrationScreen from "./screens/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen";


SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  })
  useEffect(()=>{
    if (fontsLoaded){
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded]);

  if (!fontsLoaded){
    return <ActivityIndicator />
  }
  return (
    // <RegistrationScreen/>
    <LoginScreen />
  );
}

