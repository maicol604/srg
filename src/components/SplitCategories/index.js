/** @format */

import React, { Component, componentDidUpdate } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { toast, warn, getProductImage } from '@app/Omni';
import {
  Color,
  Constants,
  Tools,
  Languages,
  Images,
  Config,
  Styles,
  withTheme,
} from '@common';
import styles from './styles';
import Categories from './Categories';
import ProductItem from '../HorizonLayout/ThreeColumn';
import { ScrollView } from 'react-native';
import Collapse from '../Collapse';
import { WebView } from 'react-native-webview';

class SplitCategories extends Component {
  state = {
    selectedIndex: 0,
    history: "",
    awards: "",
    loading: false,
    isAtTop: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedIndex !== this.state.selectedIndex) {
      this.setState({ loading:true });
      this.fetchData();
    }
  }

  fetchData = async () => {
    try {
      const response = await fetch('https://saborruralgalicia.com/wp-json/custom/v1/product-cat/'+this.props.categories[this.state.selectedIndex].id);
      const data = await response.json();
      const { history, awards } = data;
      this.setState({ history, awards, loading:false });
    } catch (error) {
      console.error('Error al hacer la llamada a la API:', error);
    }
  };

  handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY <= 0) {
      this.setState({ isAtTop: true });
    } else {
      this.setState({ isAtTop: false });
    }
  };

  render() {
    const {
      categories,
      products,
      isFetching,
      theme: {
        colors: { background, primary },
      },
    } = this.props;

    return (
      <View style={[styles.container, { backgroundColor: background, height: '100%' }]}>
        <Categories
          selectedIndex={this.getCatFather(categories, categories[this.state.selectedIndex], this.state.selectedIndex)}//this.state.selectedIndex}
          onPress={this.selectCategory}
        />
        <View style={styles.content}>

          <View>
            {/* custom code subcategories */}
            {
              categories && categories.length > 0 &&
              !this.isChild(categories[this.state.selectedIndex]) &&
              categories[this.state.selectedIndex].image.src &&
              <View
                style={{
                  padding: 10,
                  marginBottom: 10,
                  width: '100%'
                }}
              >
                <Image
                  source={{ uri: categories[this.state.selectedIndex].image.src }}
                  style={{ width: '100%', height: 100, borderRadius: 5 }} 
                  resizeMode="cover"
                />
              </View>
            }
            { categories && categories.length > 0 &&
              !this.isChild(categories[this.state.selectedIndex]) ?
              <FlatList
                style={{
                  padding: 10,
                }}
                data={this._getCategories(categories, categories[this.getCatFather(categories, categories[this.state.selectedIndex], this.state.selectedIndex)])}//categories[this.state.selectedIndex])}
                renderItem={({item})=>(
                  <TouchableOpacity
                    key={item.id}
                    style={{
                      backgroundColor: this.isActive(categories, this.state.selectedIndex, item)?'rgba(0,0,0,.1)':'rgba(0,0,0,0)', 
                      padding: 5, 
                      borderRadius: 5,
                      marginBottom: 10
                    }}
                    onPress={()=>{this.selectCategory(this.getCatIndexById(categories, item.id))}}
                  >
                    {
                      item.image &&
                      <View
                        style={{marginBottom: 10}}
                      >
                        <Image
                          source={{ uri: item.image.src }}
                          style={{ width: 75, height: 75, borderRadius: 5 }} 
                          resizeMode="cover"
                        />
                      </View>
                    }
                    <Text style={{ width: 75, textAlign: 'center' }}>{ item.name }</Text>
                  </TouchableOpacity>
                )}
                numColumns={3}
              />
              : 
              <ScrollView
                horizontal
                contentContainerStyle={{
                  alignItems: 'center',
                  paddingRight: 50,
                  // height: 200,
                  // maxHeight: 100
                }}
                style={{
                  // height: 100,
                  // maxHeight: 100,
                  padding: 10,
                  alignSelf: 'flex-start',
                  width: '100%'
                }}
                showsHorizontalScrollIndicator={false}
              >
                {
                categories && categories.length > 0 && 
                categories.map((section, catIndex) => {
                  const subCategories = this._getCategories(categories, section);
                  if(section.id===categories[this.getCatFather(categories, categories[this.state.selectedIndex], this.state.selectedIndex)].id)
                    return subCategories.map((item, index)=>(
                      <TouchableOpacity
                        key={item.id}
                        style={{
                          backgroundColor: this.isActive(categories, this.state.selectedIndex, item)?'rgba(0,0,0,.1)':'rgba(0,0,0,0)', 
                          padding: 5, 
                          borderRadius: 5,
                          marginBottom: 10,
                          alignItems: 'center', 
                          alignSelf: 'flex-start',
                        }}
                        onPress={()=>{this.selectCategory(this.getCatIndexById(categories, item.id))}}
                      >
                        {
                          item.image &&
                          <View
                            style={{marginBottom: 10}}
                          >
                            <Image
                              source={{ uri: item.image.src }}
                              style={{ width: 75, height: 75, borderRadius: 5 }} 
                              resizeMode="cover"
                            />
                          </View>
                        }
                        <Text style={{ width: 75, textAlign: 'center' }}>{ item.name }</Text>
                      </TouchableOpacity>
                    ))
                  return (<></>)
                })
                }
              </ScrollView>
            }
            {/* custom code subcategories */}
          </View>
          {/* Child category */}
          {
            !isFetching && categories && categories.length > 0 &&
            this.isChild(categories[this.state.selectedIndex]) &&
            categories[this.state.selectedIndex].image.src &&
            <View
              style = {{
                paddingHorizontal: 10
              }}
            >
              <View
                style={{
                  // padding: 10,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <View
                  style={{
                    backgroundColor: '#000',
                    width: '100%', 
                    height: 100,//this.state.isAtTop?150:75,
                    borderRadius: 5,
                    marginBottom: 5
                  }}
                >
                  <Image
                    source={{ uri: categories[this.state.selectedIndex].image.src }}
                    style={{ width: '100%', height: 100, borderRadius: 5, opacity: .5 }} // this.state.isAtTop?150:75, borderRadius: 5, opacity: .5 }} 
                    resizeMode="cover"
                  />
                </View>
                <Text 
                  style={{
                    fontSize: 18, 
                    position: 'absolute',
                    color: '#fff'
                  }}
                >
                  {categories[this.state.selectedIndex].name}
                </Text>
              </View>

              <View
                style={{
                  marginBottom: 5,
                  width: '100%'
                }}
              >
                <Collapse
                  text={this.state.history}
                  title={"Historia"}
                  loading={this.state.loading}
                  loaderColor={primary}
                />
              </View>

              <View
                style={{
                  marginBottom: 10,
                  width: '100%'
                }}
              >
                <Collapse
                  text={""}
                  title={"Premios"}
                  loading={this.state.loading}
                  loaderColor={primary}
                >                
                  <View style={{ width: '100%', height: 300 }}>
                    <WebView
                      originWhitelist={['*']}
                      source={{ html: this.state.awards }} 
                      style={{ height: 300 }}
                      injectedJavaScript={`window.ReactNativeWebView.postMessage(document.body.scrollHeight);`}
                    />
                  </View>
                </Collapse>
              </View> 
            </View>
          }
          {/* Child category */}

          {this.isChild(categories[this.state.selectedIndex]) &&
          <>
            {isFetching && (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color={primary} />
              </View>
            )}
            {!isFetching && (
              <FlatList
                overScrollMode="never"
                contentContainerStyle={{ ...styles.list }}
                data={products}
                numColumns={2}
                renderItem={this.renderItem}
                onScroll={this.handleScroll}
              />
            )}
          </>
          }
        </View>
      </View>
    );
  }

  isChild(section) {
    if(!section)
      return false;
    if(section.parent)
      return true;
    return false;
  }

  getCatFather(cat, section, index) {
    for(let i=0;i<cat.length;i++) {
      if(cat[i].id===section.parent)
          return i;
    }
    return index;
  }

  getCatIndexById(cat, id) {
    for(let i=0;i<cat.length;i++){
      if(cat[i].id===id)
        return i;
    }
    return 0;
  }

  isActive(cat, act, sub) {
    if(cat[act].id===sub.id)
      return true;
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

  renderItem = ({ item }) => {
    const { onViewPost } = this.props;
    const title = Tools.getDescription(item.name);

    const imageURL =
      item.images.length > 0
        ? getProductImage(item.images[0].src, Styles.width)
        : Images.PlaceHolderURL;

    const props = {
      imageURL,
      title,
      product: item,
    };
    return <ProductItem {...props} viewPost={() => onViewPost(item)} />;
  };

  selectCategory = index => {
    this.setState({ selectedIndex: index });
    const { categories, fetchProductsByCategoryId, clearProducts } = this.props;
    clearProducts();
    fetchProductsByCategoryId(categories[index].id, 1);
  };

  componentDidMount() {
    const { categories, fetchProductsByCategoryId, clearProducts } = this.props;
    clearProducts();
    if (categories.length > 0) {
      fetchProductsByCategoryId(categories[0].id, 1);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.categories.length == 0 && nextProps.categories.length > 0) {
      this.props.fetchProductsByCategoryId(nextProps.categories[0].id, 1);
    }
  }
}

SplitCategories.defaultProps = {
  categories: [],
  products: [],
};

const mapStateToProps = state => {
  return {
    categories: state.categories.list,
    netInfo: state.netInfo,
    products: state.products.list,
    isFetching: state.products.isFetching,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { netInfo } = stateProps;
  const { dispatch } = dispatchProps;
  const { actions } = require('@app/redux-store/CategoryRedux');
  const { fetchProductsByCategoryId, clearProducts } =
    require('@app/redux-store/ProductRedux').actions;
  return {
    ...ownProps,
    ...stateProps,
    fetchCategories: () => {
      if (!netInfo.isConnected) return toast(Languages.noConnection);
      actions.fetchCategories(dispatch);
    },
    fetchProductsByCategoryId: (categoryId, page, per_page = 20) => {
      if (!netInfo.isConnected) return toast(Languages.noConnection);
      fetchProductsByCategoryId(dispatch, categoryId, per_page, page);
    },
    clearProducts: () => dispatch(clearProducts()),
    setSelectedCategory: category =>
      dispatch(actions.setSelectedCategory(category)),
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps,
)(withTheme(SplitCategories));
