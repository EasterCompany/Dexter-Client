// Library
import {
  Modal,
  View,
  ScrollView,
  Text,
  Dimensions,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
// Assets
import closeImg from '../../assets/images/close.png';
// Components
import ImgBtn from '../buttons/img';
// Styles
import theme from '../../App.style';


const SlideModal = ({ title, visible, style, onClose, children }) => {
  const window = Dimensions.get('window');
  return <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        top:
          Platform.OS === 'web' ? window.height * 0.1 :
          Platform.OS === 'ios' ? 34 : 0,
        height:
          Platform.OS === 'web' ? '75%' : '100%'
      }}
    >
      <View style={theme.modalHeader}>
        <Text style={theme.modalTitle}>
          {title}
        </Text>
        <ImgBtn
          onPress={onClose}
          width={34}
          height={34}
          image={closeImg}
        />
      </View>
      <ScrollView
        style={{
          width: '100%',
        }}
        contentContainerStyle={[
          theme.modalContent,
          {
            height: Platform.OS === 'web' ? '100%' : undefined,
            minHeight:
              Platform.OS === 'ios' ? window.height - 86 :
              Platform.OS === 'android' ? window.height - 72 :
              '100%'
          },
          style
        ]}
      >{children}</ScrollView>
    </KeyboardAvoidingView>
  </Modal>;
}


export default SlideModal;
