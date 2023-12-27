// Assets
import style from './style';
import mdStyle from './md.style';
import errorSVG from '../../shared/assets/svg/error.svg';
import submitTextSVG from '../../assets/svg/submitText.svg';
// Components
import ImageButton from '../../shared/components/button/image';
// Hooks
import useDimensions from '../../shared/hooks/useDimensions';
// Library
import { POST, socketAdr } from '../../shared/library/api';
import { useState, useRef, useEffect } from 'react';
import Markdown from 'react-native-markdown-display';
import { ScrollView, View, Image, Text, TextInput, ActivityIndicator } from 'react-native';

const createTimestamp = () => {
  const now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  if (hour < 10) hour = "0" + hour;
  if (minutes < 10) minutes = "0" + minutes;
  return `${hour}:${minutes}`;
};

const ChatBox = () => {
  const [w, v, s] = useDimensions();
  const [errorEncountered, setErrorEncountered] = useState(null);
  const [awaitResponse, setAwaitResponse] = useState(false);
  const [messageLog, setMessageLog] = useState({
    history: []
  });

  const promptSocket = useRef(null);
  const messageView = useRef<ScrollView>();
  const userInputField = useRef<TextInput>();
  const userQuery = useRef({
    prompt: '',
  }).current;

  const chatBoxWidth = v.width >= 1280 ? 1280 : v.width;
  const submitUserInput = () => {
    if (userQuery.prompt.length === 0 || awaitResponse) return;
    setAwaitResponse('Sending request');
    setMessageLog({
      history: [
          ...messageLog.history,
          {
            sender: 'user',
            text: userQuery.prompt,
            timestamp: createTimestamp()
          }
      ]
    });
    userInputField.current.value = "";
  };

  useEffect(() => {
    if (userQuery.prompt.length > 0 && awaitResponse === 'Sending request') POST(
      'prompt',
      (resp) => {
        userQuery.prompt = '';
        if (resp.status === 'OK' && resp.error) setErrorEncountered(`${resp.error}`);
        else setErrorEncountered(`${resp}`);
      },
      (resp) => {
        promptSocket.current = new WebSocket(`${socketAdr}dexter/prompt?promptId=${resp}`);
        promptSocket.current.onopen = () => setAwaitResponse("Creating prompt request");
        promptSocket.current.onmessage = (event:any) => {
          const data = JSON.parse(event.data);
          if (data.status === 'queued') setAwaitResponse("Waiting to process your request");
          if (data.status === 'processing') setAwaitResponse("Dexter is thinking");
          if (data.response !== null) {
            setMessageLog({ history: [ ...messageLog.history, {
              sender: 'dexter',
              text: data.response,
              timestamp: createTimestamp()
            }]});
          }
        };
        promptSocket.current.onclose = (event:any) => {
          userQuery.prompt = '';
          setAwaitResponse(false);
        };
        promptSocket.current.onerror = (event:any) => {
          userQuery.prompt = '';
          setErrorEncountered("Failed to process your request.");
        }
      },
      userQuery
    );
  }, [awaitResponse]);

  return <View style={[ style.container, { width: v.width, height: v.height } ]}>
    <ScrollView
      ref={messageView}
      style={[ style.chatScrollView, { maxHeight: v.height - 68 } ]}
      containerStyle={style.chatContainerView}
      onContentSizeChange={() => messageView.current.scrollToEnd({animated: true})}
    >{
      messageLog.history.map((m, idx) => m.sender === 'dexter' ?
        <DexterBubble key={idx} text={m.text} timestamp={m.timestamp}/>
      :
        <UserInputBubble key={idx} text={m.text} timestamp={m.timestamp}/>
    )}</ScrollView>
    <View style={style.userInputContainer}>

      {awaitResponse && errorEncountered === null && <View style={style.awaitResponseContainer}>
        <ActivityIndicator size="small" color="#FE8605" animate/>
        <Text style={style.awaitResponseText}>{awaitResponse}...</Text>
      </View>}

      {errorEncountered !== null && <View style={style.awaitResponseContainer}>
        <Image style={style.errorEncounteredIcon} source={errorSVG}/>
        <Text style={style.errorEncounteredText}>{errorEncountered}</Text>
      </View>}

      <TextInput
        ref={userInputField}
        maxLength={300}
        readOnly={awaitResponse !== false}
        style={[ style.userTextInputField, { opacity: awaitResponse !== false ? 0.25 : 1 } ]}
        onChangeText={(text) => userQuery.prompt = text}
        onSubmitEditing={submitUserInput}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Enter") submitUserInput();
        }}
      />
      <ImageButton
        disabled={awaitResponse}
        image={submitTextSVG}
        imageStyle={style.userTextInputSubmitButtonImage}
        containerStyle={[ style.userTextInputSubmitButtonContainer, { opacity: awaitResponse ? 0.25 : 1 } ]}
        containerHoverStyle={awaitResponse ? {} : style.userTextInputSubmitButtonContainerHover}
        onPress={submitUserInput}
      />
    </View>
  </View>
}

const UserInputBubble = ({ text, timestamp }) => {
  return <View style={style.messageContainerUser}>
    <View style={style.userInputBubbleTail}/>
    <View style={style.userInputBubbleContainer}>
      <Markdown style={mdStyle} mergeStyle={false}>{text}</Markdown>
      <Text style={style.userInputBubbleTimestamp}>{timestamp}</Text>
    </View>
  </View>;
};

const DexterBubble = ({ text, timestamp }) => {
  return  <View style={style.messageContainerDexter}>
    <View style={style.dexterBubbleTail}/>
    <View style={style.dexterBubbleContainer}>
      <Markdown style={mdStyle} mergeStyle={false}>{text}</Markdown>
      <Text style={style.dexterBubbleTimestamp}>{timestamp}</Text>
    </View>
  </View>;
};

export default ChatBox;
