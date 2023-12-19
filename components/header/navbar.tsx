// Library
import { View, Platform } from 'react-native';
// Assets
import menuImg from '../../assets/images/menu.png';
import userImg from '../../assets/images/user.png';
import logoImg from '../../assets/images/logo.png';
import closeImg from '../../assets/images/close.png';
// Components
import ImgBtn from '../../components/buttons/img';
import LoginBtn from '../../components/buttons/login';
import RegisterBtn from '../../components/buttons/register';
// Styles
import navbar from './navbar.style';


const Navbar = ({ loggedIn, onPressLogin, onPressRegister, onPressUser, onPressNav, navMenuOpen }) => {
  return loggedIn ?

  <View style={navbar.container}>
    <ImgBtn
      width={34}
      height={34}
      image={navMenuOpen ? closeImg : menuImg}
      style={navbar.icon}
      onPress={onPressNav}
    />
    <ImgBtn
      width={34}
      height={34}
      image={logoImg}
      style={navbar.icon}
    />
    <ImgBtn
      width={34}
      height={34}
      image={userImg}
      style={navbar.icon}
      onPress={onPressUser}
    />
  </View>

  :

  <View style={navbar.container}>
    <ImgBtn
      width={34}
      height={34}
      image={logoImg}
      style={navbar.icon}
    />
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '100%',
      width: 225
    }}>
      <RegisterBtn onPress={onPressRegister}/>
      <LoginBtn onPress={onPressLogin}/>
    </View>
  </View>
}


export default Navbar;
