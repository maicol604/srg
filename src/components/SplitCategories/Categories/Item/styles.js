/** @format */

import { Constants } from '@common';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  text: {
    fontSize: 14,
    fontFamily: Constants.fontFamily,
    color: 'rgb(95,95,95)',
    textAlign:'center'
  },
  selected: background => ({
    backgroundColor: background,
  }),
  selectedText: text => ({
    fontFamily: Constants.fontFamily,
    color: text,
  }),
});
