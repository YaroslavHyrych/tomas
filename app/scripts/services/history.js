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
    var data,
      dataDate;

    function loadToCache(date) {
      dataDate = date;
      data = [];
      var storedData = $localStorage[date],
        parsedData = storedData ? JSON.parse(storedData) : [];
      for (var index in parsedData) {
        var activity = Activity.parse(parsedData[index]);
        data.push(activity);
      }
    }

    function saveCacheToStorage() {
      $localStorage[new Date().getDate()] = JSON.stringify(data);
    }

    return {
      load: function (date) {
        if (!data || dataDate !== date) {
          loadToCache(date);
        }

        return data;
      },
      save: function (activity) {
        if (!data) {
          loadToCache(new Date().getDate());
        }
        data.push(activity);
        saveCacheToStorage();
      }
    };
  }]);
