/** @format */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  Animated,
  I18nManager,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import { Styles, Constants, Images } from '@common';
import { getProductImage } from '@app/Omni';
import { TextHighlight, ProductPrice, ImageCache, TouchableScale } from '@components';

class Item extends React.PureComponent {
  state = {
    scaleAnimation: new Animated.Value(1),
    positionAnimation: new Animated.Value(0),
  };

  onViewPost = () => {
    this.props.onPress(this.props.item);
  };

  render() {
    const { item, currency, viewAll, config } = this.props;
    const textSting = 20;

    const imageUrl =
      typeof item.images[0] != 'undefined'
        ? getProductImage(item.images[0].src, Styles.width)
        : Images.PlaceHolderURL;

    let title = typeof item.name != 'undefined' ? item.name : '';

    const timePosition = this.state.positionAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 14 * (I18nManager.isRTL ? -1 : 1)],
    });

    const contentOpacity = this.state.positionAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const column = config.column || 1;
    const height = config.height || 160;
    const resizeMode = config.imageMode || 'cover';

    if (item.type == "bannerImage") {
      return (
        <TouchableScale onPress={() => viewAll({ ...item, name: item.label })} >
          <View activeOpacity={1} style={styles.imageBannerView(column, height)}>
            <ImageCache
              uri={item.images[0].src}
              style={styles.imageBanner(resizeMode)}
            />
            <View style={styles.overlay}>
              <Text style={styles.titleBanner}>{item.title}</Text>
              <Animated.Text
                style={[
                  styles.description,
                  {
                    transform: [
                      {
                        scale: this.state.scaleAnimation,
                      },
                    ],
                  },
                ]}
                numberOfLines={2} ellipsizeMode="tail">{item.description}</Animated.Text>
            </View>
          </View>
        </TouchableScale>
      )
    } else {
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.item}
          onPress={this.onViewPost}
        >
          <Animated.Image
            source={{
              uri: imageUrl,
            }}
            style={[
              styles.image,
              {
                transform: [
                  {
                    scale: this.state.scaleAnimation,
                  },
                ],
              },
            ]}
          />
          <View style={styles.content}>
            <Animated.View
              style={[
                styles.contentWrap,
                {
                  opacity: contentOpacity,
                },
              ]}
            >
              <TextHighlight
                marginTop={0}
                splitOn={
                  title.length > textSting
                    ? title.length / (title.length / textSting)
                    : title.length + 1
                }
                style={styles.contentText}
                textStyle={styles.titleStyle}
              >
                {title}
              </TextHighlight>
            </Animated.View>

            <Animated.View
              style={[
                styles.price,
                {
                  transform: [
                    {
                      translateX: timePosition,
                    },
                  ],
                },
              ]}
            >
              <ProductPrice
                fontStyle={styles.priceStyle}
                product={item}
                hideDisCount
                currency={currency}
              />
            </Animated.View>
          </View>
        </TouchableOpacity>
      );
    }
  }

  componentDidMount() {
    if (this.props.active) {
      this.startAnimation();
    }
  }

  startAnimation = () => {
    Animated.parallel([
      Animated.timing(this.state.scaleAnimation, {
        toValue: 1.2,
        duration: 6000,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.positionAnimation, {
        toValue: 1,
        delay: 2000,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  };

  stopAnimation = () => {
    this.state.scaleAnimation.setValue(1);
    this.state.positionAnimation.setValue(0);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.active != nextProps.active) {
      if (nextProps.active) {
        this.startAnimation();
      } else {
        this.stopAnimation();
      }
    }
  }
}

const styles = {
  imageBannerView: (column, height) => ({
    width: Styles.width / column - 20,
    height,
    borderRadius: 9,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    overflow: 'hidden',

    backgroundColor: '#eee',
  }),
  imageBanner: resizeMode => ({
    flex: 1,
    resizeMode,
  }),
  item: {
    height: height * 0.55,
    width: width - 20,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 6,
    paddingBottom: 15,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500',
    marginTop: 10,
  },
  titleStyle: {
    fontSize: 24,
    paddingVertical: 1,
    paddingHorizontal: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    color: '#333',
    marginLeft: 25,
    marginRight: 25,
    textAlign: 'left',
    fontFamily: Constants.fontHeader,
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  price: {
    alignItems: 'flex-start',
  },
  contentWrap: {
    padding: 4,
    alignSelf: 'flex-start',
    marginHorizontal: 10,
    marginBottom: 0,
    borderRadius: 2,
  },
  contentText: {
    fontSize: 16,
    color: '#fff',
  },
  priceStyle: {
    fontSize: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    fontFamily: Constants.fontHeader,
    color: '#406AB3',
    marginBottom: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    paddingBottom: 40,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  titleBanner: {
    color: 'white',
    fontSize: 12,
    paddingBottom: 5,
    fontStyle: 'italic',
    textAlign: 'center',
    fontFamily: Constants.fontFamily
  },
  description: {
    color: 'white',
    fontSize: 15,
    maxWidth: width - 150,
    textAlign: 'center',
    fontFamily: Constants.fontFamilyBold
  },
};

export default Item;
