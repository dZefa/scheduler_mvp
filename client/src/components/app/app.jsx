import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Routes from './routes.jsx';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        HELLO
      </div>
    )
  }
};

export default withRouter(App);
