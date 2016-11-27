'use strict';

describe('Filter: date', function () {

  // load the filter's module
  beforeEach(module('tomasApp'));

  // initialize a new instance of the filter before each test
  var date;
  beforeEach(inject(function ($filter) {
    date = $filter('date');
  }));

  it('should return the input prefixed with "date filter:"', function () {
    var testDate = new Date();
    testDate.setDate(1);
    testDate.setMonth(11);
    testDate.setYear(2000);
    expect(date(testDate)).toBe('1.12');
  });

});
