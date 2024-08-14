/** @format */

import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';
import { SlideItem } from '@components';

export default class BannerLarge extends PureComponent {
  render() {
    const { data, onViewPost, currency, config, viewAll } = this.props;

    return (
      <ScrollView>
        <SlideItem
          items={data}
          currency={currency}
          onViewPost={onViewPost}
          config={config}
          viewAll={viewAll}
        />
      </ScrollView>
    );
  }
}
