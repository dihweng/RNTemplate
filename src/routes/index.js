import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

import { StatusBar } from 'react-native';
import  Home  from '../screens/Home/Home';
// import  Login  from '../screens/Login/Login';
// import  Register  from '../screens/Register/Register';
// import ForgetPassword from '../screens/ForgetPassword/ForgetPassword';
import Profile from '../screens/Profile/Profile';

 const AuthStack = createStackNavigator({ 
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },

  // Login: {
  //   screen: Login,
  //   navigationOptions: {
  //     header: null
  //   },
  // },

  // Register: {
  //   screen: Register,
  //    navigationOptions : {
  //      header: null
  //    }
  // },

  // ForgetPassword: {
  //  screen: ForgetPassword,
  //   navigationOptions: {
  //    header: null
  //   }
  // },

});

const MenuStack = createStackNavigator({ 

  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null,
    }
  },
});


const NavStack = createSwitchNavigator({
  AuthLoading:Home,
  Auth:AuthStack,
  Menu: MenuStack,
},
  {
    initialRouteName: 'AuthLoading',
  }
);

const App = createAppContainer(NavStack);

export default App;