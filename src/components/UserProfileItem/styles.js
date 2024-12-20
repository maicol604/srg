/** @format */

import { Constants } from '@common';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#F5F5F5',
    paddingHorizontal: 20,
    height: 60,
  },
  leftText: {
    fontSize: 16,
    color: '#9B9B9B',
    fontFamily: Constants.fontFamily
  },
  rightText: textColor => ({
    fontSize: 16,
    color: textColor,
    alignSelf: 'flex-start',
    fontFamily: Constants.fontFamilyBold
  }),
  rightContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
