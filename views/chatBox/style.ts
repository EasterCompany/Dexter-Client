import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    alignSelf: 'center',
    maxWidth: 1280,
    backgroundColor: '#161618BB',
    boxShadow: '1px 3px 6px #12121399',
    backDropFilter: 'blur(6px)',
    webKitBackdropFilter: 'blur(6px)'
  },

  chatScrollView: {
    width: '100%'
  },

  chatContainerView: {
    flexDirection: 'column'
  },

  messageContainerUser: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    marginVertical: 28
  },

  messageContainerDexter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginVertical: 28
  },

  userInputBubbleTail: {
    position: 'absolute',
    right: 14,
    bottom: 2,
    width: 8,
    height: 8,
    transform: 'rotate(45deg)',
    backgroundColor: '#FE8605'
  },

  userInputBubbleContainer: {
    alignSelf: 'flex-end',
    maxWidth: '75%',
    padding: 8,
    marginRight: 16,
    borderRadius: 8,
    borderBottomRightRadius: 4,
    borderBottomWidth: 3,
    borderBottomColor: '#a15402',
    backgroundColor: '#FE8605'
  },

  userInputBubbleText: {
    color: '#FFFFFF'
  },

  userInputBubbleTimestamp: {
    userSelect: 'none',
    position: 'absolute',
    bottom: 0,
    left: -42,
    color: '#404040'
  },

  dexterBubbleTail: {
    position: 'absolute',
    left: 14,
    bottom: 2,
    width: 8,
    height: 8,
    transform: 'rotate(45deg)',
    backgroundColor: '#BCBCC1'
  },

  dexterBubbleContainer: {
    maxWidth: "75%",
    padding: 8,
    marginLeft: 16,
    borderRadius: 8,
    borderBottomLeftRadius: 4,
    borderBottomWidth: 3,
    borderBottomColor: '#9f9fa1',
    backgroundColor: '#BCBCC1'
  },

  dexterBubbleText: {
    color: '#000000'
  },

  dexterBubbleTimestamp: {
    userSelect: 'none',
    position: 'absolute',
    bottom: 0,
    right: -42,
    color: '#404040'
  },

  userInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    padding: 24
  },

  userTextInputField: {
    width: '90%',
    height: 38,
    paddingHorizontal: 8,
    color: '#E0E0E0',
    fontFamily: 'Metro',
    fontSize: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FE8605',
    backgroundColor: '#262628BB',
    underlineColorAndroid: 'transparent'
  },

  userTextInputSubmitButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    width: 48,
    height: 38,
    padding: 5,
    marginLeft: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FE8605',
    backgroundColor: '#262628BB',
  },

  userTextInputSubmitButtonContainerHover: {
    backgroundColor: '#FE8605BB',
  },

  userTextInputSubmitButtonImage: {
    width: 28,
    height: 28
  },

  awaitResponseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: -8,
    left: 32
  },

  awaitResponseText: {
    userSelect: 'none',
    color: '#FFFFFF',
    fontFamily: 'Metro-Thin',
    fontSize: 13,
    marginLeft: 12
  },

  errorEncounteredIcon: {
    width: 16,
    height: 16
  },

  errorEncounteredText: {
    userSelect: 'none',
    color: '#eb4034',
    fontFamily: 'Metro-Thin',
    fontSize: 13,
    marginLeft: 12
  },

  recordingPopup: {
    flexDirection: 'column',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: -118,
    left: -32,
    width: 128,
    height: 98,
    borderRadius: 8,
    backgroundColor: '#202029'
  },

  recordingPopupTail: {
    position: 'absolute',
    top: -38,
    left: 18,
    width: 24,
    height: 24,
    transform: 'rotate(45deg)',
    backgroundColor: '#202029',
  },

  recordingStateText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Metro-Thin',
    fontSize: 16,
    width: '100%',
    marginBottom: -12,
    paddingVertical: 12
  },
});
