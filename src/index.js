'use strict';

import React, {Component} from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Font } from 'expo';
import Navigator from './routes';
import colors from './assets/colors';
TextInput.defaultProps.selectionColor = colors.text_color;

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      fontsLoaded:false,
    };
  }
  componentDidMount() {

    (async() => {
      
      await Font.loadAsync({
      
        // 'Montserrat-Regular' : require('../src/assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Bold' : require('../src/assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-Regular' : require('../src/assets/fonts/Avenir.ttf'),
       // 'Montserrat-Light' : require('../src/assets/fonts/Montserrat-Light.otf'),
      
      });
      
      this.setState({ fontsLoaded: true });
  
    })();
  }

  render() {
    const { fontsLoaded } = this.state

    return (
      <View style={styles.container}>
      {fontsLoaded ?
        <Navigator/>
        :
        null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    elevation: 4,
  },
});