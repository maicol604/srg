import { StyleSheet, Platform } from 'react-native';
import { Color, Constants } from '@common';

export default StyleSheet.create({
  container: {
    marginHorizontal: 10,
    backgroundColor: '#fff',
    marginTop: 10,
    marginBottom: 3,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
          height: 1,
          width: 1,
        },
      },
      android: {
        elevation: 2,
      },
    }),
    flexDirection: 'row',
    padding: 10,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontFamily: Constants.fontHeader
  },
  text: {
    fontSize: 13,
    marginBottom: 3,
    fontFamily: Constants.fontFamily
  },
  buttons: {
    justifyContent: 'space-between',
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    margin: 10,
  },
});
