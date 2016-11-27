'use strict';

/**
 * @ngdoc filter
 * @name tomasApp.filter:date
 * @function
 * @description
 * # date
 * Filter in the tomasApp.
 */
angular.module('tomasApp')
  .filter('date', function () {
    function makeString(val) {
      return val < 10 ? '0' + val : val;
    }
    return function (date) {
      return makeString(date.getDate()) + '.' + makeString(date.getMonth() + 1);
    };
  });
