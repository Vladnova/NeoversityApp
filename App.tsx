import 'react-native-gesture-handler';
import {useEffect} from "react";
import {useFonts} from "expo-font";
import {ActivityIndicator} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {NavigationContainer} from "@react-navigation/native";
import StackNavigator from "./navigation/StackNavigator";



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
      <NavigationContainer>
          <StackNavigator/>
      </NavigationContainer>
  );
}

