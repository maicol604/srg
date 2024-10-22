/** @format */

import React, {
  Platform,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from 'react-native';
import { Color, Constants, Styles } from '@common';

const { width, height, scale } = Dimensions.get('window'),
  vw = width / 100,
  vh = height / 100,
  vmin = Math.min(vw, vh),
  vmax = Math.max(vw, vh);

export default StyleSheet.create({
  imageButton: {
    width: 13,
    height: 13,
  },
  buttonStyle: {
    position: 'absolute',
    right: 8,
    top: 8,
    zIndex: 9999,
  },
});
