/** @format */

import { StyleSheet } from 'react-native';
import { Color, Constants } from '@common';

export default StyleSheet.create({
  container: dark => ({
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    height: 30,
    borderRadius: 15,
    backgroundColor: dark ? '#717070' : '#f2f4f8',
    marginRight: 4,
    marginBottom: 6,
  }),
  text: dark => ({
    fontSize: 14,
    color: dark ? '#fff' : Color.Text,
    fontFamily: Constants.fontFamily
  }),
  selected: dark => ({
    backgroundColor: dark ? '#434343' : '#fff',
    borderWidth: 1,
    borderColor: dark ? '#fff' : Color.primary,
  }),
  selectedText: dark => ({
    color: dark ? '#fff' : Color.primary,
  }),
});
