/** @format */

import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const isIphoneX =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (height >= 812 || width >= 812);

const iphoneXHeight = 44;

export default {
  isIphoneX,
  ToolbarHeight: isIphoneX ? iphoneXHeight : 0,
  isAndroid: Platform.OS === 'android',
  statusBarHeight: isIphoneX ? iphoneXHeight : 20
};
