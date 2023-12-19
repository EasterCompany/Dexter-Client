// Library
import { useState } from 'react';
import { Text, Pressable } from 'react-native';
// Styles
import theme from '../../App.style';


const RegisterBtn = ({ onPress }) => {
  return <Pressable onPress={onPress} style={[ theme.button, {
    width: 100,
    height: 34,
    backgroundColor: 'transparent'
  }]}>
    <Text style={theme.buttonText}>Sign Up</Text>
  </Pressable>
}


export default RegisterBtn;
