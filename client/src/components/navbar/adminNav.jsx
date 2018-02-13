import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Link to="/manage">MANAGE</Link>
      </div>
    )
  }
}

export default AdminNav;
