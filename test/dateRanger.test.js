import dateRanger from '../src/index';
import { expect } from 'chai';

const startDate = '2013-01-01T05:00:00.000Z';
const endDate = '2013-01-03T00:00:00.000Z';

describe('test dateRanger', function() {
  const res = dateRanger(startDate, endDate, 'days').map((d) =>
    new Date(d).toISOString()
  );

  it('range should be as expected', function() {
    expect(res).to.deep.equal([
      '2013-01-01T00:00:00.000Z',
      '2013-01-02T00:00:00.000Z',
      '2013-01-03T00:00:00.000Z',
    ]);
  });
});
