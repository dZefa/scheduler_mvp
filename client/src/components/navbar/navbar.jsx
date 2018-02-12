import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Link to="/">HOME</Link>
        <Link to="/login" >LOGIN</Link>
      </div>
    )
  }
};

export default connect()(Navbar);
