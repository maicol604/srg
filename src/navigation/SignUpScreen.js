/** @format */

import React, { Component } from 'react';

import { SignUp } from '@containers';

// eslint-disable-next-line react/prefer-stateless-function
class SignUpScreen extends Component {
  render() {
    const { navigation, route } = this.props;
    const { goBack } = navigation;
    return (
      <SignUp
        params={route.params}
        onBack={goBack}
        onBackCart={() => navigation.navigate('Cart')}
      />
    );
  }
}

export default SignUpScreen;
