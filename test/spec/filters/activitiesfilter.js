'use strict';

describe('Filter: activitiesFilter', function () {

  // load the filter's module
  beforeEach(module('tomasApp'));

  // initialize a new instance of the filter before each test
  var activitiesFilter;
  beforeEach(inject(function ($filter) {
    activitiesFilter = $filter('activitiesFilter');
  }));

  it('should return the input prefixed with "activitiesFilter filter:"', function () {
    var text = 'angularjs';
    expect(activitiesFilter(text)).toBe('activitiesFilter filter: ' + text);
  });

});
