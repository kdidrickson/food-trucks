import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import Navbar from 'react-bootstrap/lib/Navbar';

import config from '../../config';
import {set} from '../../redux/modules/location';

@connect(null)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.initiateSearch = this.initiateSearch.bind(this);
  }

  initiateSearch(event) {
    event.preventDefault();

    const locationValue = this.locationValueInput.value;

    if (locationValue) {
      const setAction = set(locationValue);

      this.props.dispatch(setAction);
    }
  }

  render() {
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Navbar fixedTop>
          <form onSubmit={this.initiateSearch}>
            <label>
              Enter a location in San Francisco:
              <input
                type="text"
                name="locationValue"
                ref={locationValueInput => this.locationValueInput = locationValueInput}
              />
            </label>
            <input type="submit" name="Search"/>
          </form>
        </Navbar>

        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
