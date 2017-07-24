import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');

    // require the logo image both from client and server
    // const logoImage = require('./logo.png');

    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              List
            </div>
            <div className="col-md-8">
              Map
            </div>
          </div>
        </div>
      </div>
    );
  }
}
