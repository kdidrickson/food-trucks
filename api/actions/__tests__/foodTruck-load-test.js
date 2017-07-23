import {expect} from 'chai';
import load from '../food-truck/load';
import timekeeper from 'timekeeper';

describe('food truck load', () => {
  it('loads all food trucks', () => {
    return load().then(data => {
      expect(data).to.be.an('array');
    });
  });
});
