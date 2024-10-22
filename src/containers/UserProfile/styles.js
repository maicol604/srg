/** @format */

import { Constants } from '@common';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: dark => ({
    borderTopWidth: 10,
    borderColor: dark ? '#101425' : '#F5F5F5',
  }),
  headerSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 14,
    color: '#4A4A4A',
    fontFamily: Constants.fontFamilyBold,
    textTransform:'capitalize'
  },
});
