// @flow
import * as _ from 'lodash';
import * as React from 'react';
import { Image as RNImage, Animated, StyleSheet, View, Platform } from 'react-native';
import { BlurView } from 'expo';
import { type StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import CacheManager from './CacheManager';

type ImageProps = {
    style?: StyleObj,
    preview?: string,
    uri: string,
};

type ImageState = {
    uri: string,
    intensity: Animated.Value,
};

export default class Image extends React.PureComponent<ImageProps, ImageState> {
    style: StyleObj;
    subscribedToCache = true;

    load(props: ImageProps) {
        const { uri, style } = props;
        this.style = [
            StyleSheet.absoluteFill,
            _.transform(
                _.pickBy(StyleSheet.flatten(style), (value, key) => propsToCopy.indexOf(key) !== -1),
                // $FlowFixMe
                (result, value, key) => Object.assign(result, { [key]: value - (style.borderWidth || 0) }),
            ),
        ];
        CacheManager.cache(uri, this.setURI);
    }

    componentWillMount() {
        const intensity = new Animated.Value(100);
        this.setState({ intensity });
        this.load(this.props);
    }

    UNSAFE_componentWillReceiveProps(props: ImageProps) {
        this.load(props);
    }

    setURI = (uri: string) => {
        if (this.subscribedToCache) {
            this.setState({ uri });
        }
    };

    componentDidUpdate(prevProps: ImageProps, prevState: ImageState) {
        const { preview } = this.props;
        const { uri, intensity } = this.state;
        if (uri && preview && uri !== preview && prevState.uri === undefined) {
            Animated.timing(intensity, { duration: 300, toValue: 0, useNativeDriver: false }).start();
        }
    }

    componentWillUnmount() {
        this.subscribedToCache = false;
    }

    render(): React.Node {
        const { style: computedStyle } = this;
        const { preview, style } = this.props;
        const { uri, intensity } = this.state;
        const hasPreview = !!preview;
        const opacity = intensity.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 0.5],
        });
        let isImageReady = false;
        if (uri && uri !== preview && uri !== '') {
            isImageReady = true;
        }
        return (
            <Animated.View {...{ style }}>
                {hasPreview && <Animated.Image source={{ uri: preview }} resizeMode="cover" style={computedStyle} />}
                {isImageReady && <Animated.Image source={{ uri }} resizeMode="cover" style={computedStyle} />}
                {hasPreview && Platform.OS === 'ios' && (
                    <AnimatedBlurView tint="dark" style={computedStyle} {...{ intensity }} />
                )}
                {hasPreview && Platform.OS === 'android' && (
                    <Animated.View style={[computedStyle, { backgroundColor: black, opacity }]} />
                )}
            </Animated.View>
        );
    }
}

const black = 'black';
const propsToCopy = [
    'borderRadius',
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
    'borderTopLeftRadius',
    'borderTopRightRadius',
];

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
