// Library
import { useRef, useState, useEffect } from 'react';
import { View, Image, Text, TextInput } from 'react-native';
// Assets
import CalendarIcon from '../../assets/images/calendar.png';
// Styles
import theme from '../../App.style';


const InputDate = ({ label, textAlign, onChangeText, validInput, onPressEnter }) => {
  const dayInput = useRef();
  const monthInput = useRef();
  const yearInput = useRef();
  const [ currentDay, setDay ] = useState('');
  const [ currentMonth, setMonth ] = useState('');
  const [ currentYear, setYear ] = useState('');
  const alignment = textAlign === undefined ? 'center' : textAlign;

  useEffect(() => {
    onChangeText(`${currentDay}/${currentMonth}/${currentYear}`);
  }, [ currentDay, currentMonth, currentYear, onChangeText ])

  const borderHighlight = {
    borderColor: '#ffff',
    borderWidth: 0
  };

  if (validInput !== undefined && validInput !== null) {
    validInput ? borderHighlight.borderColor = "#00695C" : borderHighlight.borderColor = "#BF360C";
    borderHighlight.borderWidth = 2;
  };

  return <View style={theme.loginInputContainer}>
    <View style={theme.loginInputIconContainer}>
      <Image source={CalendarIcon} resizeMode='contain' style={theme.loginInputIcon}/>
      <Text style={theme.loginInputLabel}>{label}</Text>
    </View>
    <View style={[{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      maxWidth: 420,
      height: '100%',
      marginTop: '-3.5%',
    }, borderHighlight]}>
      <TextInput
        ref={dayInput}
        maxLength={2}
        keyboardType="numeric"
        onChangeText={(text) => {
          const numericText = text.replace(/\D/g,'');
          setDay(numericText);
          if (numericText.length === 2) monthInput.current.focus();
        }}
        placeholder="DD"
        placeholderTextColor= "#475569"
        style={[
          theme.loginInput,
          { textAlign: alignment, paddingLeft: 0, width: '32%' }
        ]}
        onSubmitEditing={onPressEnter}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === 'Enter' && onPressEnter !== undefined) onPressEnter();
        }}
      />
      <Text style={{ fontWeight: 'bold' }}> / </Text>
      <TextInput
        ref={monthInput}
        maxLength={2}
        keyboardType="numeric"
        onChangeText={(text) => {
          const numericText = text.replace(/\D/g,'');
          setMonth(numericText);
          if (numericText.length === 2) yearInput.current.focus();
        }}
        placeholder="MM"
        placeholderTextColor= "#475569"
        style={[
          theme.loginInput,
          { textAlign: alignment, paddingLeft: 0, width: '32%' }
        ]}
        onSubmitEditing={onPressEnter}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === 'Enter' && onPressEnter !== undefined) onPressEnter();
        }}
      />
      <Text style={{ fontWeight: 'bold' }}> / </Text>
      <TextInput
        ref={yearInput}
        maxLength={4}
        keyboardType="numeric"
        onChangeText={(text) => {
          const numericText = text.replace(/\D/g,'');
          setYear(numericText);
        }}
        placeholder="YYYY"
        placeholderTextColor= "#475569"
        style={[
          theme.loginInput,
          { textAlign: alignment, paddingLeft: 0, width: '32%' }
        ]}
        onSubmitEditing={onPressEnter}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === 'Enter' && onPressEnter !== undefined) onPressEnter();
        }}
      />
    </View>
  </View>;
};


export default InputDate;
