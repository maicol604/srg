/** @format */

import React, { PureComponent } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { withTheme } from '@common';
import styles from './styles';

class Item extends PureComponent {
  static defaultProps = {
    selected: false,
  };

  render() {
    const {
      item,
      selected,
      onPress,
      theme: {
        colors: { background, text, category, primary },
      },
    } = this.props;

    return (
      <TouchableOpacity
        style={[styles.container, selected && styles.selected(category)]}
        onPress={onPress}
      >
        <Text style={[styles.text, selected && styles.selectedText(primary)]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default withTheme(Item);
