'use strict';

/**
 * @ngdoc filter
 * @name tomasApp.filter:activitiesFilter
 * @function
 * @description
 * # activitiesFilter
 * Filter activities by type.
 */
angular.module('tomasApp')
  .filter('activitiesFilter', function () {
    return function (activities, types) {
      var filter = function (activity) {
        return types.indexOf(activity.type) !== -1;
      };

      return activities.filter(filter);
    };
  });
