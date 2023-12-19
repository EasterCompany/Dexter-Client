// Components
import Navbar from "./shared/components/navbar/navbar";
import StaticUIManager from "./shared/components/staticUIManager";
import AppBackground from "./shared/components/appBackground/particleNetwork";
// Library
import * as Font from "expo-font";
import { useState, useEffect } from "react";
import { View, ScrollView, Platform, StatusBar, NativeEventEmitter } from "react-native";
import useSession from "./shared/hooks/useSession";
import { removeTemplateTags } from "./shared/library/devTools";
import * as serviceWorkerRegistration from "./src/serviceWorkerRegistration";
// Views
import Loading from "./shared/views/loading/view";
import ViewManager from './views/viewManager';

const nativeEvent = new NativeEventEmitter();

const App = () => {
  const [session, reloadSession] = useSession();
  const [appLoaded, setAppLoaded] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (!appLoaded) {
      reloadSession();
      removeTemplateTags();
      setAppLoaded(true);
    }

    if (!fontsLoaded) Font.loadAsync({
      "Montserrat": require("./shared/assets/font/Montserrat.ttf"),
      "Metro": require("./shared/assets/font/Metropolis-Regular.otf"),
      "Metro-Thin": require("./shared/assets/font/Metropolis-Thin.otf"),
      "Metro-Bold": require("./shared/assets/font/Metropolis-Bold.otf"),
      "Metro-Light": require("./shared/assets/font/Metropolis-Light.otf"),
      "Metro-Italic": require("./shared/assets/font/Metropolis-RegularItalic.otf"),
    }).then(() => {
      setFontsLoaded(true);
    });

    const reloadAppListener = nativeEvent.addListener('reloadApp', () => {
      setAppLoaded(false);
    });

    return () => reloadAppListener.remove();
  }, [fontsLoaded, appLoaded]);

  return <>
    <StatusBar barStyle="light-content" backgroundColor="#202029"/>
    <AppBackground/>
    {
      fontsLoaded && appLoaded ? <View>
        <Navbar session={session}/>
        <ViewManager session={session}/>
        <StaticUIManager session={session}/>
      </View> : <>
        <Loading fontFamily={Platform.OS === "web" || fontsLoaded ? "Metro" : "serif"}/>
      </>
    }
  </>
};

if (process.env.REACT_APP_PWA === "true") serviceWorkerRegistration.register();
else serviceWorkerRegistration.unregister();

export default App;
