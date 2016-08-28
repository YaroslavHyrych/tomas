
/**
 * @ngdoc service
 * @name tomasApp.Activity
 * @description
 * # Activity instance
 * Service in the tomasApp.
 */
angular.module('tomasApp')
.factory('Activity', ['$localStorage', function($localStorage) {
  function Activity(type) {
    this.name = '';
    this.description = '';
    this.type = type || Activity.TYPE.WORK;
  }

  Activity.TYPE = {
    BREAK: 'break',
    WORK: 'work'
  };

  Activity.prototype.start = function() {
    this.startDate = new Date();

    return this;
  };

  Activity.prototype.stop = function() {
    this.stopDate = new Date();

    return this;
  };

  Activity.prototype.save = function() {
    if (!this.stopDate) this.stopDate = new Date();

    if (!this.name) this.name = 'Activity';

    $localStorage[this.startDate.getTime()] = JSON.stringify(this);
  };

  Activity.parse = function(str) {
    var object = JSON.parse(str, function(key, value) {
      if (key == 'startDate' || key == 'stopDate') {
        return new Date(value);
      }

      return value;
    });
    var activity = new Activity(object.type);
    activity.name = object.name;
    activity.description = object.description;
    activity.startDate = object.startDate;
    activity.stopDate = object.stopDate;

    return activity;
  };

  return Activity;
}]);
