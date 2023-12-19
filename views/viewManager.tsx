// Assets
import style from './style';
// Hooks
import useDimensions from '../shared/hooks/useDimensions';
// Library
import { useState, useRef } from 'react';
import { ScrollView, Platform, NativeEventEmitter } from 'react-native';
// Views
import Home from './home/view';
import Loading from '../shared/views/loading/view';
import ServerOffline from '../shared/views/serverOffline/view';

const eventEmitter = new NativeEventEmitter();

const ViewManager = ({ user, isLoggedIn }) => {
  const [w, v, s] = useDimensions();
  const [currentView, setView] = useState<String>('home');
  const eventHandlersAdded = useRef<bool>(false);

  if (!eventHandlersAdded.current) {
    eventEmitter.addListener('navMenuChangeView', (view:string) => setView(view));
    eventEmitter.addListener('navChangeView', (view:string) => setView(view));
    eventHandlersAdded.current = true;
  }

  return <ScrollView
    style={[ style.scroll, {
      minWidth: Platform.OS === "web" ? "100vw" : w.width,
      maxWidth: Platform.OS === "web" ? "100vw" : w.width,
      maxHeight: Platform.OS === "web" ? "100vh" : w.height,
      minHeight: Platform.OS === "web" ? "100vh" : w.height
    }]}
    containerStyle={style.container}
  >{
    currentView === "home" ? <Home/> :
    currentView === "serverOffline" ? <ServerOffline/> :
    <Loading/>
  }</ScrollView>
};

export default ViewManager;
