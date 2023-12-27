// Assets
import style from './style';
import dexterPNG from '../../shared/assets/image/dexter.png';
// Components
import TextButton from '../../shared/components/button/text';
// Hooks
import useDimensions from '../../shared/hooks/useDimensions';
// Library
import { View, Image, Text, NativeEventEmitter } from 'react-native';

const event = new NativeEventEmitter();

const NoUser = () => {
  const [w, v, s] = useDimensions()
  return <View style={[style.container, {
    width: v.width,
    height: v.height
  }]}>
    <Image source={dexterPNG} style={style.logo}/>
    <Text style={style.header1}>Dexter</Text>
    <Text style={style.header2}>Virtual Intelligence</Text>
    <Text style={[style.header3, {
      marginBottom: v.height * 0.1
    }]}>By Easter Company</Text>
    <TextButton
      text="Login"
      containerStyle={style.loginButtonContainer}
      textStyle={style.loginButtonText}
      onPress={() => event.emit("openUIElement", "loginModal")}
    />
    <Text style={style.loginMessage}>Login to use Dexter.</Text>
  </View>
}

export default NoUser;
