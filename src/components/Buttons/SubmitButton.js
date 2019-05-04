'use strict';

import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import colors from '../../assets/colors';
import {TouchableHighlight, TouchableOpacity, StyleSheet, Text} from 'react-native';


export default class SubmitButton extends Component {

  render(){
    const {disabled, onPress, title, btnstyle, titlestyle} = this.props;
    const opacityStyle = disabled ? 0.2 : null;
    const style = btnstyle || styles.button;
    const titstyle = titlestyle || styles.title;
    
    return(
      <TouchableOpacity 
        style = {[{opacity: opacityStyle}, style]}
        disabled = {disabled}
        onPress = {onPress}>
        <Text style = {titstyle}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}

SubmitButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onPress : PropTypes.func.isRequired,
  style : PropTypes.object,
  title : PropTypes.string.isRequired,

}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    marginTop: 40,
    borderColor: colors.button_border,
    borderWidth: 1,
    borderRadius: 15
    //backgroundColor: colors.gold,
  },

  title: {
    fontFamily: 'Montserrat-Regular',
    color: colors.text_color,
  },

  icon: {
    marginRight: -2,
    marginTop: -2,
  }
})