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
    var data, key;

    function loadToCache(newKey) {
      key = newKey;
      data = [];
      var storedData = $localStorage[key],
        parsedData = storedData ? JSON.parse(storedData) : [];
      for (var index in parsedData) {
        var activity = Activity.parse(parsedData[index]);
        data.push(activity);
      }
    }

    function saveCacheToStorage() {
      $localStorage[key] = JSON.stringify(data);
    }

    function createKey(date) {
      return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getYear();
    }

    return {
      load: function (date) {
        var newKey = createKey(date);
        if (!data || key !== newKey) {
          loadToCache(newKey);
        }

        return data;
      },
      save: function (activity) {
        var todayKey = createKey(new Date());
        if (key === todayKey || !key) {
          if (!data) {
            loadToCache(todayKey);
          }
          data.push(activity);
          saveCacheToStorage();
        } else if (key !== todayKey) {
          var backup = {
            key: key,
            data: data
          };
          loadToCache(todayKey);
          data.push(activity);
          saveCacheToStorage();
          key = backup.key;
          data = backup.data;
        }
      }
    };
  }]);
