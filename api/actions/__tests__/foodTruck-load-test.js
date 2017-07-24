import {expect} from 'chai';
import load from '../food-truck/load';
import timekeeper from 'timekeeper';

describe('food truck load', () => {
  it('loads all food trucks', () => {
    return load().then(data => {
      expect(data).to.be.an('array');
    });
  });

  it('loads the first page when an invalid page is provided', () => {
    return load({
      query: {
        page: 'abc'
      }
    }).then(data => {
      expect(data).to.be.an('array');
    });
  });

  it('loads default trucks when invalid location is provided', () => {
    return load({
      query: {
        location_lat: 'abc123',
        location_lng: 123
      }
    }).then(data => {
      expect(data).to.be.an('array');
    });
  });
});
