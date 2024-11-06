import 'react-native-gesture-handler';
import {useEffect} from "react";
import {useFonts} from "expo-font";
import {Provider} from "react-redux";
import {ActivityIndicator, Text} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {PersistGate} from "redux-persist/integration/react";
import * as SplashScreen from 'expo-splash-screen';
import StackNavigator from "./scr/navigation/StackNavigator";
import store from "./scr/redux/store/store";



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
      <Provider store={store.store}>
        <PersistGate
            persistor={store.persistor}
            loading={<Text>Loading...</Text>}
        >
            <NavigationContainer>
                <StackNavigator/>
            </NavigationContainer>
        </PersistGate>
      </Provider>
  );
}


