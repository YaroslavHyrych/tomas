
/**
 * @ngdoc service
 * @name tomasApp.Activity
 * @description
 * # Activity instance
 * Service in the tomasApp.
 */
angular.module('tomasApp')
.factory('Activity', ['$localStorage', function($localStorage) {
  function getTime() {
    var date = new Date();
    return date.getTime();
  }
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
    this.startDate = getTime();

    return this;
  };

  Activity.prototype.stop = function() {
    this.stopDate = getTime();

    return this;
  };

  Activity.prototype.save = function() {
    if (!this.stopDate) this.stopDate = getTime();

    if (!this.name) {
      this.name = this.type == Activity.TYPE.BREAK ? 'Break': 'Activity';
    }

    $localStorage[this.startDate] = JSON.stringify(this);
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
