'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, View, Text, Modal, TouchableOpacity} from 'react-native';
import colors from '../../assets/colors';
import PropTypes from 'prop-types';

export default class SingleButtonAlert extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.closeNotification = this.closeNotification.bind(this);
  }

  closeNotification = () => {
    return this.props.handleCloseNotification();  
  }

  render() {

    const {title, message, visible, positiveButton} = this.props;
      const posButton = positiveButton || 'OK';
     
    return (
      <View>
       <Modal
        visible={visible}
        transparent={true}
        animationType={"fade"}
        onRequestClose={this.closeNotification} >

        <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>

          <View style={styles.Alert_Main_View}>

             <Text style={styles.Alert_Title}>
               {title}
              </Text>

             <View style={{ width: '100%', height: StyleSheet.hairlineWidth, backgroundColor: colors.button_border}} />
              <Text style={styles.Alert_Message}>
                {message} 
              </Text>

             <View style={{ width: '100%', height: StyleSheet.hairlineWidth, backgroundColor: colors.button_border}} />
              <View style={{flexDirection: 'row', height: '30%'}}>

                <TouchableOpacity 
                  style={styles.buttonStyle}
                  onPress={this.closeNotification } 
                  activeOpacity={0.2} 
                >

                  <Text style={styles.TextStyle}>
                    {posButton}
                  </Text>
         
                </TouchableOpacity>
             </View> 
            </View>
          </View>
        </Modal>
      </View>      
    )
  }
}


SingleButtonAlert.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  MainContainer :{ 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: (Platform.OS == 'ios') ? 20 : 0,    
   },
    
   Alert_Main_View:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : colors.white, 
    height: 155 ,
    width: '80%',
    borderWidth: 0.5,
    borderColor: colors.button_border,
    borderRadius:4,
    
   },
    
   Alert_Title:{  
    fontSize: 20, 
    color: colors.button_border,
    textAlign: 'center',
    padding: 5,
    height: '25%',
    fontFamily: 'Montserrat-Regular',
    
   },
    
   Alert_Message:{
    fontSize: 18, 
    color: colors.button_border,
    textAlign: 'center',
    padding: 10,
    height: '42%'
      
  },
    
   buttonStyle: {  
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
    
   },
      
   TextStyle:{
    color: colors.button_border,
    textAlign:'center',
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    marginTop: -5
   }
})