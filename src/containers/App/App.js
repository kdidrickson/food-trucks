import React, { Component, PropTypes } from 'react';

import Navbar from 'react-bootstrap/lib/Navbar';
import Helmet from 'react-helmet';
import config from '../../config';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Navbar fixedTop>
          {`Nav Bar`}
        </Navbar>

        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
