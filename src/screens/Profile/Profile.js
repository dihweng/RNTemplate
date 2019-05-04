'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';


export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state ={
    overflowModalVisible: false,
      data : '',
      phone : 0,
      token : '',
      profile_id : '',
      showAlert : false,
      message : '',
      refreshing: false,
      gender: '',

    }
  }




  handleLogout = () => {
    this.closeModal()
    AsyncStorage.clear();
    setTimeout(() => {
      this.props.navigation.navigate('Login');
      }, 2000);
  }
  
  render () {
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
      <View>
        <DisplayText
          styles={StyleSheet.flatten(styles.exitTxt)}
          text = {'Logout'}
          onPress = {this.handleLogout}
        />  
      </View>
    </SafeAreaView>
    
   )
  }
} 
