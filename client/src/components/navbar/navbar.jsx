import React, { Component } from 'react';
import { connect } from 'react-redux';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>Navbar</div>
    )
  }
};

export default connect()(Navbar);
