// Library
import { View, Text, StyleSheet } from 'react-native';
// Components
import LinkBtn from '../buttons/link';


const NavMenuContent = () => <>
  <Header text="Educational Resources"/>
  <Option text="Learn Native" link="https://reactnative.dev/docs/getting-started"/>
  <Option text="Learn Overlord" link="https://easter.company/overlord/getting_started"/>
  <Option text="Learn AWS" link="https://aws.amazon.com/free/compute/lightsail-vs-ec2/"/>
  <Option text="Learn ePanel" link="https://easter.company/overlord/epanel" last/>
</>;


const Header = ({ text }) => <Text style={navMenu.header}>{text}</Text>;


const Option = ({ text, link, last }) => <LinkBtn
  text={text}
  link={link}
  style={[ navMenu.option, { borderBottomWidth: last ? 1 : 0 } ]}
  onHover={navMenu.optionHover}
>
  <Text style={navMenu.optionText}>{text}</Text>
</LinkBtn>


const navMenu = StyleSheet.create({

  header: {
    userSelect: 'none',
    color: 'rgba(200,200,200,1)',
    fontSize: 18,
    fontFamily: 'Metro',
    marginTop: 32,
    marginLeft: 18,
    marginRight: 'auto',
    marginBottom: 18
  },

  option: {
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 64,
    fontSize: 24,
    margin: 0,
    borderWidth: 1,
    borderColor: '#ffff',
    borderLeftWidth: 0,
    borderRightWidth: 0
  },

  optionHover: {
    backgroundColor: 'rgba(175,175,175,0.2)'
  },

  optionText: {
    userSelect: 'none',
    color: '#ffff',
    fontSize: 16,
    fontFamily: 'Metro'
  }

});


export default NavMenuContent;
