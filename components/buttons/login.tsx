// Library
import { useState } from 'react';
import { Text, Pressable } from 'react-native';
// Styles
import theme from '../../App.style';


const LoginBtn = ({ onPress }) => {
  return <Pressable onPress={onPress} style={[ theme.button, { width: 100, height: 34 }]}>
    <Text style={theme.buttonText}>Login</Text>
  </Pressable>
}


export default LoginBtn;
