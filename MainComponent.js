// MainComponent.js
import React from 'react';
import { connect } from 'react-redux';
import {Text, View, Button} from 'react-native';

const MainComponent = ({ value, increment, decrement }) => (
  <View style={{ flex: 1, justifyContent:'center', alignItems:'center'}}>
  <Text>Value: {value}</Text>
    <Button onPress={increment} title="Increment" />
    <Button onPress={decrement} title="Decrement" />
    </View>
);

const mapStateToProps = (state) => ({
  value: state.example.value,
});

const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch({ type: 'INCREMENT' }),
  decrement: () => dispatch({ type: 'DECREMENT' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
