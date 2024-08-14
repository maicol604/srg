/** @format */

import React, { PureComponent } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, BackHandler, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppIntroSlider from 'react-native-app-intro-slider';
import { connect } from 'react-redux';

import { Config } from '@common';
import styles from './styles';

class AppIntro extends PureComponent {
  _renderItem = props => {
    const { item } = props;

    return (
      <LinearGradient
        style={[
          styles.mainContent,
          {
            paddingTop: props.topSpacer,
            paddingBottom: props.bottomSpacer,
            width: props.width,
            height: props.height,
          },
        ]}
        colors={item.colors}
        start={{ x: 0, y: 0.1 }}
        end={{ x: 0.1, y: 1 }}
      >
        {
          item.bgImage &&
          <Image
            source={item.bgImage}
            style={{width: '100%', height: '110%', opacity: .25, position: 'absolute', left: 0, top: 0}}
          />
        }
        {
          item.image && 
          <View
            style={{width: "100%", height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center'}}
          >
            <Image
              source={item.image}
              style={{width: '70%', height: '100%'}}
            />
          </View>
        }
        {
          item.icon && 
          <Ionicons
            style={{ backgroundColor: 'transparent' }}
            name={item.icon}
            size={200}
            color="white"
          />
        }

        <View style={{...CustomStyles.modal}}>
          <Text style={{...CustomStyles.title}}>{item.title}</Text>
          <View style={{...CustomStyles.buttonContainer}}> 
            <TouchableOpacity style={{...CustomStyles.button}} onPress={()=>this.props.finishIntro()}>
              <Text style={{...CustomStyles.buttonText}}>Si, soy mayor</Text>
              <Text style={{...CustomStyles.buttonText}}>de 18 años.</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...CustomStyles.button}} onPress={()=>BackHandler.exitApp()}>
              <Text style={{...CustomStyles.buttonText}}>No, soy mayor</Text>
              <Text style={{...CustomStyles.buttonText}}>de 18 años.</Text>
              </TouchableOpacity>
          </View>
        </View>

        {/* <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View> */}
      </LinearGradient>
    );
  };

  _renderNextButton = () => {
    return (
      // <View style={styles.buttonCircle}>
      //   <Ionicons
      //     name={
      //       I18nManager.isRTL ? 'arrow-back-outline' : 'arrow-forward-outline'
      //     }
      //     color="rgba(255, 255, 255, .9)"
      //     size={24}
      //     style={{ backgroundColor: 'transparent' }}
      //   />
      // </View>
      <></>
    );
  };

  _renderDoneButton = () => {
    return (
      // <View style={styles.buttonCircle}>
      //   <Ionicons
      //     name="checkmark"
      //     color="rgba(255, 255, 255, .9)"
      //     size={24}
      //     style={{ backgroundColor: 'transparent' }}
      //   />
      // </View>
      <></>
    );
  };

  render() {
    return (
      <AppIntroSlider
        data={Config.intro}
        renderItem={this._renderItem}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        onDone={this.props.finishIntro}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  const { actions } = require('@app/redux-store/UserRedux');
  return {
    finishIntro: () => dispatch(actions.finishIntro()),
  };
};


const CustomStyles = {
  modal: {
    backgroundColor: 'rgba(255, 255, 255, .5)',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    top: -150
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10
  },
  button: {
    backgroundColor: '#ad261c',
    alignSelf: 'center', 
    padding: 12,
    borderRadius: 5
  }, 
  buttonText: {
    color: '#fff',
    justifyContent: 'center',
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
    color: '#fff',
    padding: 20,
    paddingVertical: 25
  }
};

export default connect(null, mapDispatchToProps)(AppIntro);
