/** @format */

import { Constants } from '@common';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    margin: 15,
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  label: {
    color: '#919191',
    fontSize: 14,
    fontFamily: Constants.fontFamily
  },
  value: {
    fontSize: 14,
    fontFamily: Constants.fontFamilyBold
  },
  divider: {
    height: 0.5,
    backgroundColor: '#919191',
  },
});
