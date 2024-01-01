// Assets
import style from './style';
import mdStyle from './md.style';
import errorSVG from '../../shared/assets/svg/error.svg';
import micSVG from '../../shared/assets/svg/mic.svg';
import sendSVG from '../../shared/assets/svg/send.svg';
// Components
import ImageButton from '../../shared/components/button/image';
// Hooks
import useDimensions from '../../shared/hooks/useDimensions';
// Library
import { Audio } from 'expo-av';
import { POST, clientAPI, socketAdr } from '../../shared/library/api';
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
  const [recording, setRecording] = useState(undefined);
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
            type: 'text',
            content: userQuery.prompt,
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
          if (data.status === 'finished') {
            userQuery.prompt = '';
            setAwaitResponse(false);
            setMessageLog({ history: [ ...messageLog.history, {
              sender: 'dexter',
              type: 'text',
              content: data.response,
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
      {
        messages: messageLog.history,
      }
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
        <DexterBubble key={idx} content={m.content} timestamp={m.timestamp}/>
      :
        <UserInputBubble key={idx} content={m.content} timestamp={m.timestamp}/>
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
        readOnly={awaitResponse !== false || recording}
        style={[
          style.userTextInputField,
          { opacity: awaitResponse !== false || recording ? 0.25 : 1 }
        ]}
        onChangeText={(text) => userQuery.prompt = text}
        onSubmitEditing={submitUserInput}
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Enter") submitUserInput();
        }}
      />
      <SpeechInputButton
        disabled={awaitResponse}
        recording={recording}
        setRecording={setRecording}
        postTranscription={(transcribedText) => {
          userQuery.prompt = transcribedText;
          submitUserInput();
        }}
      />
      <ImageButton
        disabled={awaitResponse || recording}
        image={sendSVG}
        imageStyle={style.userTextInputSubmitButtonImage}
        containerStyle={[
          style.userTextInputSubmitButtonContainer,
          { opacity: awaitResponse || recording ? 0.25 : 1 }
        ]}
        containerHoverStyle={
          awaitResponse || recording ? {} : style.userTextInputSubmitButtonContainerHover
        }
        onPress={submitUserInput}
      />
    </View>
  </View>
}

const UserInputBubble = ({ content, timestamp }) => {
  return <View style={style.messageContainerUser}>
    <View style={style.userInputBubbleTail}/>
    <View style={style.userInputBubbleContainer}>
      <Markdown style={mdStyle} mergeStyle={false}>{content}</Markdown>
      <Text style={style.userInputBubbleTimestamp}>{timestamp}</Text>
    </View>
  </View>;
};

const DexterBubble = ({ content, timestamp }) => {
  return  <View style={style.messageContainerDexter}>
    <View style={style.dexterBubbleTail}/>
    <View style={style.dexterBubbleContainer}>
      <Markdown style={mdStyle} mergeStyle={false}>{content}</Markdown>
      <Text style={style.dexterBubbleTimestamp}>{timestamp}</Text>
    </View>
  </View>;
};

const SpeechInputButton = ({ disabled, recording, setRecording, postTranscription }) => {

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    // read the file into a blob
    await recording.stopAndUnloadAsync();
    const data = await fetch(recording.getURI());
    const blob = await data.blob();

    // create a new form data
    let formData = new FormData();
    formData.append('file', blob);

    // send the data to the API endpoint
    fetch(`${clientAPI}transcribe`, {
      method: 'POST',
      credentials: 'include',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    return setRecording(undefined);
  }

  return <ImageButton
    disabled={disabled}
    image={micSVG}
    imageStyle={style.userTextInputSubmitButtonImage}
    containerStyle={[ style.userTextInputSubmitButtonContainer, { opacity: disabled ? 0.25 : 1 } ]}
    containerHoverStyle={disabled ? {} : style.userTextInputSubmitButtonContainerHover}
    onPress={recording ? stopRecording : startRecording}
  />
}

export default ChatBox;
