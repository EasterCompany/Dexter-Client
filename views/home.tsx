// Library
import { ScrollView } from 'react-native';
// Components
import Tutorial from '../components/tutorial/tutorialButtons';
// Styles
import theme from '../App.style';


const Home = ({ view } : any) => {
  return <ScrollView
    style={{
      width: view.width,
      height: view.height,
    }}
    contentContainerStyle={{
      alignItems: 'center',
      justifyContent: 'space-evenly',
      width: view.width,
      minHeight: view.height,
      backgroundColor: theme.default.backgroundColor
    }}
  >
    <Tutorial/>
  </ScrollView>;
};


export default Home;
