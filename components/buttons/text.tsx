// Library
import { useState } from 'react';
import { Pressable, Text } from 'react-native';
// Styles
import theme from '../../App.style';


const TextBtn = ({ text, onPress, style }) => {
  const [ isHover, setHover ] = useState(false);
  const [ isPress, setPress ] = useState(false);
  return <Pressable
    style={(pressed) => [
      theme.button, style,
      isHover ? theme.buttonHover : undefined,
      isPress ? theme.buttonPress : undefined
    ]}
    onPress={onPress}
    onHoverIn={() => setHover(true)}
    onHoverOut={() => setHover(false)}
    onPressIn={() => setPress(true)}
    onPressOut={() => setPress(false)}
  >
    <Text style={[
      theme.buttonText,
      style !== undefined && style.color !== undefined ? {
        color: style.color,
      } : {}
    ]}>{text}</Text>
  </Pressable>;
}


export default TextBtn;
