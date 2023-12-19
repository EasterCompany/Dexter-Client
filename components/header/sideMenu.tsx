// Library
import { useRef, useEffect } from 'react';
import { ScrollView, View, Platform, Animated } from 'react-native'


const SideMenu = ({ view, children }) => {
  const slideAnim = useRef(new Animated.Value(-640)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0, duration: 333 , useNativeDriver: false
    }).start()
  }, [ slideAnim ])

  return <View style={{
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    left: 0,
    width: view.width,
    height: view.height,
    backgroundColor: 'rgba(0,0,0,.66)'
  }}>
    <Animated.View style={{
      position: 'absolute',
      alignItems: 'center',
      bottom: 0,
      left: slideAnim,
      width: Platform.OS === 'web' ? view.width * 0.5 : view.width,
      minWidth: 300,
      maxWidth: 640,
      height: view.height,
      backgroundColor: '#16161C'
    }}>
      {children}
    </Animated.View>
  </View>;
}


export default SideMenu;
