import { StyleSheet, Platform } from 'react-native';

const theme = StyleSheet.create({

  default: {
    color: '#ffff',
    backgroundColor: '#202029',
    fontFamily: 'Metro'
  },

  alt: {
    color: '#202029',
    backgroundColor: '#E5E7EB',
    fontFamily: 'Metro'
  },

  text: {
    color: '#ffff',
    textAlign: 'left',
    fontWeight: 300,
    margin: '2%',
    fontSize: 16,
    fontFamily: 'Metro'
  },

  error: {
    color: '#ffff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '95%',
    padding: 6,
    maxWidth: 420,
    borderRadius: 4,
    backgroundColor: '#E53935',
    fontFamily: 'Metro'
  },

  loginInputContainer: {
    width: '95%',
    maxWidth: 420,
    height: 84,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#ffff'
  },

  loginInputIconContainer: {
    zIndex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 32,
    paddingTop: 12,
    backgroundColor: 'transparent'
  },

  loginInputIcon: {
    width: 24,
    height: 16,
    marginTop: 'auto',
    marginLeft: 12,
    marginBottom: 'auto',
    marginRight: 6,
    padding: 0
  },

  loginInputLabel: {
    userSelect: 'none',
    fontSize: 12,
    fontFamily: 'Metro-Bold'
  },

  loginInput: {
    zIndex: 0,
    userSelect: 'none',
    color: '#202029',
    width: '100%',
    height: 84,
    fontSize: 18,
    marginTop: -32,
    paddingTop: 28,
    paddingLeft: 16,
    borderRadius: 8,
    backgroundColor: 'transparent',
    fontFamily: 'Metro'
  },

  hyperlink: {
    color: '#3996CF',
    width: '100%',
    textAlign: 'left',
    fontWeight: '300',
    margin: '2%',
    fontSize: 15,
    fontFamily: 'Metro'
  },

  header: {
    color: '#ffff',
    textAlign: 'center',
    fontWeight: 'normal',
    marginTop: 32,
    marginBottom: 16,
    fontSize: 28,
    fontFamily: 'Metro'
  },

  boldHeader: {
    color: '#ffff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom: 16,
    fontSize: 28,
    fontFamily: 'Metro-Bold'
  },

  subtext: {
    color: '#0000',
    textAlign: 'center',
    fontWeight: 200,
    margin: '1%',
    fontSize: 12,
    fontFamily: 'Metro-Light'
  },

  /*
    --------------------------- BUTTON STYLES --------------------------------------------------------------------------
  */

  button: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 48,
    margin: 0,
    padding: 0,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#FE8605',
    backgroundColor: '#FE8605',
  },

  buttonHover: {
    opacity: '75%'
  },

  buttonPress: {
    opacity: '25%'
  },

  buttonText: {
    userSelect: 'none',
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    color: '#ffff',
    fontSize: 16,
    fontWeight: 900,
    fontFamily: 'Metro',
    textTransform: 'uppercase',
  },

  ImgBtn: {
    backgroundColor: 'rgba(0,0,0,0)',
    pointerEvents: 'auto'
  },

  /*
    --------------------------- MODAL STYLES ---------------------------------------------------------------------------
  */

  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    overflowX: 'hidden',
    width: '100%',
    minWidth: 300,
    maxWidth: Platform.OS === 'web' ? 1024 : '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    elevation: 5,
    borderBottomLeftRadius: Platform.OS === 'web' ? 6 : 0,
    borderBottomRightRadius: Platform.OS === 'web' ? 6 : 0,
    backgroundColor: '#E5E7EB',
    boxShadow: '1px 1px 10px rgba(0,0,0,.66)',
    fontFamily: 'Metro'
  },

  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Platform.OS === 'web' ? '100%' : '100%',
    maxWidth: Platform.OS === 'web' ? 1024 : '100%',
    height: 52,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 24,
    paddingRight: 24,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: '#282C34',
    boxShadow: '1px 1px 10px rgba(0,0,0,.66)',
    fontFamily: 'Metro'
  },

  modalTitle: {
    userSelect: 'none',
    color: '#ffff',
    fontSize: 22,
    fontFamily: 'Metro'
  },

});


export default theme;
