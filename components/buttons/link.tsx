// Library
import { useState } from 'react';
import { View, Text, Pressable, Linking } from 'react-native';
// Styles
import theme from '../../App.style';


const LinkBtn = ({ text, style, onHover, onPress, link, children}) => {
  const [ isHover, setHover ] = useState(false);
  const [ isPress, setPress ] = useState(false);
  return <Pressable
    style={[
      style ? style : theme.button,
      isHover ? onHover : undefined,
      isPress ? onPress : undefined
    ]}
    onPress={() => {Linking.openURL(link);}}
    onHoverIn={() => setHover(true)}
    onHoverOut={() => setHover(false)}
    onPressIn={() => setPress(true)}
    onPressOut={() => setPress(false)}
  >
    {children === undefined ? <Text style={theme.buttonText}>{text}</Text> : children}
  </Pressable>
}


export default LinkBtn;
