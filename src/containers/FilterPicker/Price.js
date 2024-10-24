/** @format */

import React from 'react';
import { View, Text } from 'react-native';
import Slider from 'react-native-fluid-slider';

import { Color, Styles, Tools, withTheme } from '@common';

class Price extends React.PureComponent {
  static defaultProps = {
    value: 1000,
  };

  state = { value: this.props.value };

  _onValueChange = value => {
    const { type } = this.props;

    this.setState({ value }, () => {
      this.props.onChange(value, type);
    });
  };

  render() {
    const { value } = this.state;
    const {
      theme: {
        colors: { text, primary },
      },
    } = this.props;

    return (
      <View style={styles.priceContainer}>
        <View style={styles.priceView}>
          <Text style={styles.titleSection(text)}>Precio</Text>
          <Text style={styles.price(primary)}>
            {Tools.getCurrencyFormatted(value)}
          </Text>
        </View>
        <Slider
          value={value}
          onValueChange={this._onValueChange}
          onSlidingComplete={value => {}}
          minimumTrackTintColor={Color.primary}
          maximumTrackTintColor="#bdc2cc"
          thumbTintColor={Color.primary}
          minimumValue={0}
          maximumValue={200}
        />
      </View>
    );
  }
}

const styles = {
  priceContainer: {
    marginTop: 20,
    paddingHorizontal: 8,
  },
  priceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleSection: text => ({
    color: text,
    fontSize: Styles.FontSize.medium,
  }),
  price: primary => ({
    color: primary,
    fontSize: Styles.FontSize.medium,
  }),
};

export default withTheme(Price);
