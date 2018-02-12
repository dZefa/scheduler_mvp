import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Nav from '../navbar/navbar.jsx';
import Routes from './routes.jsx';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Nav />
        <Routes />
      </div>
    )
  }
};

export default withRouter(App);
