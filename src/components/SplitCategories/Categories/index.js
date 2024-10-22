/** @format */

import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import { toast, warn } from '@app/Omni';
import { Languages } from '@common';
import styles from './styles';
import Item from './Item';
// categories sidebar
class Categories extends Component {
  render() {
    const { categories, selectedIndex, onPress } = this.props;
    const mainCategories = this._getCategories(categories);
    
    return (
      <View style={styles.container}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          {categories.map((item, index) => {
            if(!this.isMainCategory(mainCategories, item.id)) //is subcategory
              return <></>;
            return (
              // (item.id!==328 && item.id!==334 && item.id!==333) ?
              // <></>
              // :
              <Item
                item={item}
                key={index}
                selected={index == selectedIndex}
                onPress={() => onPress(index)}
              />
            )
          })}
        </ScrollView>
      </View>
    );
  }

  componentDidMount() {
    if (this.props.categories.length == 0) {
      this.props.fetchCategories();
    }
  }

  isMainCategory(cat, id){
    for(let i=0;i<cat.length;i++) {
      if(cat[i].id===id)
        return true;
    }
    return false;
  }

  _getCategories = (categories, section) => {
    if (categories && categories.length) {
      return categories.filter(cate => {
        if (section) {
          return cate.parent === section.id; // check is sub category
        }
        return cate.parent === 0;
      });
    }
    return [];
  };

}

Categories.defaultProps = {
  categories: [],
};

const mapStateToProps = state => {
  return {
    categories: state.categories.list,
    netInfo: state.netInfo,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { netInfo } = stateProps;
  const { dispatch } = dispatchProps;
  const { actions } = require('@app/redux-store/CategoryRedux');

  return {
    ...ownProps,
    ...stateProps,
    fetchCategories: () => {
      if (!netInfo.isConnected) return toast(Languages.noConnection);
      actions.fetchCategories(dispatch);
    },
  };
}

export default connect(mapStateToProps, undefined, mergeProps)(Categories);
