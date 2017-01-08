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
      loadTo(data, key);
    }

    function loadTo(data, key) {
      var storedData = $localStorage[key],
        parsedData = storedData ? JSON.parse(storedData) : [];
      for (var index in parsedData) {
        var activity = Activity.parse(parsedData[index]);
        data.push(activity);
      }
    }

    function saveCacheToStorage(newData) {
      $localStorage[key] = JSON.stringify(newData || data);
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
          data.unshift(activity);
          saveCacheToStorage();
        } else if (key !== todayKey) {
          var backup = {
            key: key,
            data: data
          };
          loadToCache(todayKey);
          data.unshift(activity);
          saveCacheToStorage();
          key = backup.key;
          data = backup.data;
        }
      },
      delete: function (activity) {
        var date = new Date(activity.id);
        var dateKey = createKey(date);
        var activities = [];
        if (dateKey === key) {
          if (!data) {
            loadToCache(dateKey);
          } else {
            activities = data;
          }
        } else {
          loadTo(activities, dateKey);
        }

        var index;
        for (index in activities) {
          var obj = activities[index];
          if (obj.id === activity.id) {
            break;
          }
        }
        activities.splice(index, 1);
        saveCacheToStorage(activities);
      }
    };
  }]);
