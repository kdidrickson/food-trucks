import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import Navbar from 'react-bootstrap/lib/Navbar';
import LoadingIndicator from 'react-loading-indicator';

import config from '../../config';
import {set} from '../../redux/modules/location';

@connect(({foodTrucks}) => ({ foodTrucks }))
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    foodTrucks: PropTypes.array
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
                className="form-control"
                ref={locationValueInput => this.locationValueInput = locationValueInput}
              />
            </label>
            <input type="submit" name="Search" className="btn btn-primary"/>
            {this.props.foodTrucks.isFetchingFoodTruckData ? <LoadingIndicator /> : null}
          </form>
        </Navbar>

        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
