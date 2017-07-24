import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import GoogleMap from 'google-map-react';

import config from '../../config';
import ListItem from '../../components/ListItem';
import MapItem from '../../components/MapItem';

@connect(({ foodTrucks }) => ({ foodTrucks }))
export default class Home extends Component {
  static propTypes = {
    foodTrucks: PropTypes.array
  };

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
                foodTrucks.data ? (
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
                      foodItems={fooditems.replace(': ', ', ')}
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
              {
                foodTrucks.data ? (
                  <GoogleMap
                    bootsteapURLkeys={{ key: config.apis.googleMaps.token }}
                    defaultCenter={{
                      lat: 37.7582467,
                      lng: -122.4552385
                    }}
                    defaultZoom={12}
                    style={{
                      width: `100%`,
                      height: `500px`
                    }}
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
                            latitude={latitude}
                            longitude={longitude}
                          />
                        ))
                      ) : (
                        null
                      )
                    }
                  />
                ) : (
                  null
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
