// Library
import { REACT_APP_NAME } from 'env';
import { Text, View, Image, Platform, Dimensions, StyleSheet, } from 'react-native';
// Assets
import ReactPNG from '../../assets/images/react.png';
import ReactSVG from '../../assets/svgs/react.svg';
import OverlordPNG from '../../assets/images/logo_white.png';
import OverlordSVG from '../../assets/svgs/logo.svg';
import AwsPNG from '../../assets/images/aws.png';
import AwsSVG from '../../assets/svgs/aws.svg';
import ePanelPNG from '../../assets/images/epanel.png';
import ePanelSVG from '../../assets/svgs/epanel.svg';
// Components
import LinkBtn from '../buttons/link';


const Tutorial = () => <>
  <View style={tutorial.headerSection}>
    <View style={tutorial.headerBackgroundImg}>
      <Image resizeMode="contain" source={OverlordPNG} style={{ width: '100%', height: '100%' }}/>
    </View>
    <View style={tutorial.headerTitle}>
      <Text style={tutorial.welcomeText}>Welcome to your new Overlord Native Client,</Text>
      <Text style={tutorial.clientName}>{REACT_APP_NAME}</Text>
    </View>
  </View>
  <View style={tutorial.container}>
    <LearnMoreBtn
      text="Learn Native"
      png={ReactPNG}
      svg={ReactSVG}
      link="https://reactnative.dev/docs/getting-started"
    />
    <LearnMoreBtn
      text="Learn Overlord"
      png={OverlordPNG}
      svg={OverlordSVG}
      link="https://easter.company/overlord/getting_started"
    />
    <LearnMoreBtn
      text="Learn AWS"
      png={AwsPNG}
      svg={AwsSVG}
      link="https://aws.amazon.com/free/compute/lightsail-vs-ec2/"
    />
    <LearnMoreBtn
      text="Learn ePanel"
      png={ePanelPNG}
      svg={ePanelSVG}
      link="https://easter.company/overlord/epanel"
    />
  </View>
</>;


const LearnMoreBtn = ({ text, link, png, svg }) => {
  return <LinkBtn
    link={link}
    style={tutorial.linkBtn}
    onHover={{
      "background": "radial-gradient(farthest-corner at 40px 40px, rgba(75, 75, 75, 0.75) 0%, rgba(0, 0, 0, 0) 100%)"
    }}
    onPress={{opacity: '25%'}}
  >
    <Image
      resizeMode="contain"
      source={Platform.OS === 'web' ? svg : png}
      style={tutorial.image}
    />
    <Text style={tutorial.text}>{text}</Text>
  </LinkBtn>
};


const tutorial = StyleSheet.create({

  headerSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    width: '100%',
    height: '25%',
    maxHeight: '25%'
  },

  headerBackgroundImg: {
    zIndex: 0,
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    opacity: 0.1
  },

  headerTitle: {
    zIndex: 1,
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },

  welcomeText: {
    textAlign: 'center',
    color: '#ffff',
    fontSize: Platform.OS === 'web' ? 'calc(18px + 1.2vmin)' : 16,
    fontFamily: 'Metro'
  },

  clientName: {
    textAlign: 'center',
    color: '#ffff',
    fontSize: Platform.OS === 'web' ? 'calc(26px + 1.2vmin)' : 24,
    fontFamily: 'Metro-Bold',
    textTransform: 'uppercase'
  },

  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: Platform.OS === 'web' ? '75%' : '100%',
    maxWidth: 1080
  },

  linkBtn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: Platform.OS === 'web' ? '20vmin' : 150,
    height: Platform.OS === 'web' ? '20vmin' : 150,
    margin: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'rgba(175, 175, 175, 0.75)'
  },

  text: {
    userSelect: 'none',
    textAlign: 'center',
    fontSize: Platform.OS === 'web' ? 'calc(6px + 1.2vmin)' : 14,
    fontFamily: 'Metro',
    color: 'rgba(255,255,255,0.66)',
    marginTop: 16,
  },

  image: {
    width: '100%',
    height: '50%'
  }

});

export default Tutorial;
