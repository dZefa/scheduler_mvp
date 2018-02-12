import React, { Component } from 'react';
import ReactLoading from 'react-loading';

class Loading extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <ReactLoading type={'spin'} color={'#000000'} delay={0} height='100px' width='100px' />
    )
  }
};

export default Loading;
