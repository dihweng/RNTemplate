'use strict';
import React, {Component} from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import {DisplayText, SubmitButton} from '../../components';
import styles, { IMAGE_HEIGHT, }  from './styles';
import { Permissions, Notifications } from 'expo';
import {saveExpoToken, getProfile} from '../Utils/Utils';


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state ={
      restoring : true ,

    }

    this.animatedValue1 = new Animated.Value(0)
    this.animatedValue2 = new Animated.Value(0)
    this.animatedValue3 = new Animated.Value(0)


    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
  }

  componentWillMount(){
    this.checkLogin();

  }

  componentDidMount () {
    this.animate()
    this.registerForPushNotificationsAsync();
    this.listener = Notifications.addListener(this.handleNotification);
  }

  componentWillUnmount() {
    this.listener && this.listener.remove();
  }


  checkLogin =  async() => {

    let profile = await getProfile();
    

    if(typeof profile.token !== 'undefined' && profile.token !== null ) {
      this.setState({
        restoring : false,
      });
      return this.props.navigation.navigate('Profile');
    }
    else {
      this.setState({
        restoring : false,
      });
    }

  }

  handleNotification = ({ origin, data }) => {
    this.props.navigation.navigate('Notification')
    // console.log(
    //   `Push notification ${origin} with data: ${JSON.stringify(data)}`,
    // );
  };


  registerForPushNotificationsAsync = async ()=> {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      saveExpoToken('denied');
      return;
    }
  
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    saveExpoToken(token);
    console.log("expo token", token);
   }
  

  animate () {
    this.animatedValue1.setValue(0)
    this.animatedValue2.setValue(0)
    this.animatedValue3.setValue(0)
    const createAnimation = function (value, duration, easing, delay = 0) {
      return Animated.timing(
       value,
        {
          toValue: 1,
          duration,
          easing,
          delay
        }
      )
    }
    Animated.parallel([
      createAnimation(this.animatedValue1, 2000, Easing.ease),
      createAnimation(this.animatedValue2, 1000, Easing.ease, 1000),
      createAnimation(this.animatedValue3, 1000, Easing.ease, 2000)
    ]).start()
  }


  handleLogin = () => {
    return this.props.navigation.navigate('Login');
  };

  handleRegistration = () => {
    return this.props.navigation.navigate('Register');
  };

  render () {
    
    const {restoring } = this.state;
    if(restoring) {
      return (
        <View>

        </View>
      );

    }
    else {

      const scaleText = this.animatedValue1.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 1]
      })
    
      return(
        <View style={styles.container}>  
              
          <Animated.View style={[StyleSheet.flatten(styles.logoWrapper), { transform: [{scale: scaleText}] }]}>

            <Animated.Image source={require('../../assets/images/logo.jpg')} style={[styles.logo, { height: this.imageHeight }]} />
          </Animated.View>

          <Animated.View style={[StyleSheet.flatten(styles.buttonWrapper)]}>

            <SubmitButton
              title={'Let\'s Get Started'}
              disabled={false}
              onPress={this.handleRegistration}
            />

          </Animated.View>


          <View style = {StyleSheet.flatten(styles.signupLinkView)}>
            <DisplayText
              text={'Already have an account? Sign In '}
              styles = {styles.signupText}
              onPress = {this.handleLogin}
            />
          </View>

        </View>
      )
    }
   
  }
  
} 


