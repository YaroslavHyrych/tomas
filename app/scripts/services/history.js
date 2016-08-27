'use strict';

/**
 * @ngdoc service
 * @name tomasApp.history
 * @description
 * # Activities history
 * Service in the tomasApp.
 */
angular.module('tomasApp')
  .service('history', ['$localStorage', 'Activity', function ($localStorage, Activity) {
    return {
      load: function() {
        var activities = [];
        for (var key in $localStorage) {
          var value = $localStorage[key];

          if (typeof value == 'function') continue;

          value = Activity.parse(value);

          activities.push(value);
        }

        return activities;
      }
    };
  }]);
