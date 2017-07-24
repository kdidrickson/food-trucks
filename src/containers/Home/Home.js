import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import GoogleMap from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';

import config from '../../config';
import ListItem from '../../components/ListItem';
import MapItem from '../../components/MapItem';

@connect(({ foodTrucks, location }) => ({ foodTrucks, location }))
export default class Home extends Component {
  static propTypes = {
    foodTrucks: PropTypes.array
  };

  constructor() {
    super();

    this.state = {
      fitProps: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    const { foodTrucks } = nextProps;

    // Determine the bounds of the results
    if (foodTrucks.data.length && this.googleMap) {
      const bounds = foodTrucks.data.reduce( (reducingBounds, { latitude, longitude }) => {
        return {
          nw: {
            lat: Number(reducingBounds.nw.lat && reducingBounds.nw.lat > latitude ? reducingBounds.nw.lat : latitude),
            lng: Number(reducingBounds.nw.lng && reducingBounds.nw.lng < longitude ? reducingBounds.nw.lng : longitude)
          },
          se: {
            lat: Number(reducingBounds.se.lat && reducingBounds.se.lat < latitude ? reducingBounds.se.lat : latitude),
            lng: Number(reducingBounds.se.lng && reducingBounds.se.lng > longitude ? reducingBounds.se.lng : longitude)
          }
        };
      }, {
        nw: {},
        se: {}
      });

      const size = this.googleMap.getBoundingClientRect();
      console.log(bounds);

      this.setState({ fitProps: fitBounds(bounds, size) });
    }
  }

  render() {
    const styles = require('./Home.scss');

    const { foodTrucks } = this.props;

    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              {
                foodTrucks.data.length ? (
                  foodTrucks.data.map( ({
                    applicant,
                    address,
                    fooditems,
                    facilityType,
                    dayshours,
                    objectid
                  }, index) => (
                    <ListItem
                      key={objectid}
                      number={index + 1}
                      name={applicant}
                      address={address}
                      foodItems={fooditems.replace(/:\s/g, ', ')}
                      facilityType={facilityType}
                      hours={dayshours}
                    />
                  ))
                ) : (
                  null
                )
              }
            </div>
            <div className="col-md-8">
              <div ref={ googleMap => this.googleMap = googleMap }>
                <GoogleMap
                  bootsteapURLkeys={{ key: config.apis.googleMaps.token }}
                  defaultCenter={{
                    lat: 37.7582467,
                    lng: -122.4552385
                  }}
                  debounced={false}
                  defaultZoom={15}
                  style={{
                    width: `100%`,
                    height: `500px`
                  }}
                  {...this.state.fitProps}
                  children={
                    foodTrucks.data ? (
                      foodTrucks.data.map( ({
                        objectid,
                        latitude,
                        longitude
                      }, index) => (
                        <MapItem
                          key={objectid}
                          number={index + 1}
                          lat={latitude}
                          lng={longitude}
                        />
                      ))
                    ) : (
                      null
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
