import { View, Image, Text, TextInput, Platform } from 'react-native';
import theme from '../../App.style';


const InputText = ({
  icon, label, placeholder, secureText, maxLength,
  autoCapitalize, validInput, onChangeText, ref,
  autoComplete, onPressEnter
}) => {
  const borderHighlight = {
    borderColor: '#ffff',
    borderWidth: 0
  }

  if (validInput !== undefined && validInput !== null) {
    validInput ? borderHighlight.borderColor = "#00695C" : borderHighlight.borderColor = "#BF360C";
    borderHighlight.borderWidth = 2;
  }

  return <View style={theme.loginInputContainer}>
    <View style={theme.loginInputIconContainer}>
      <Image source={icon} resizeMode='contain' style={theme.loginInputIcon}/>
      <Text style={theme.loginInputLabel}>{label}</Text>
    </View>
    <TextInput
      ref={ref}
      maxLength={maxLength}
      autoCapitalize={autoCapitalize ? 'characters' : 'none'}
      secureTextEntry={secureText}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor= "#475569"
      style={[ theme.loginInput, borderHighlight ]}
      autoComplete={autoComplete}
      onSubmitEditing={onPressEnter}
      onKeyPress={({ nativeEvent }) => {
        if (nativeEvent.key === 'Enter' && onPressEnter !== undefined) onPressEnter();
      }}
    />
  </View>;
}


export default InputText;
