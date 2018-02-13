import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GroupNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to="/contacts">Contacts</Link>
    )
  }
};

export default GroupNav;
