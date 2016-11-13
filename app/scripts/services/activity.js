/**
 * @ngdoc service
 * @name tomasApp.Activity
 * @description
 * # Activity instance
 * Service in the tomasApp.
 */
angular.module('tomasApp')
  .factory('Activity', [function () {
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

    Activity.prototype.start = function () {
      this.startDate = getTime();

      return this;
    };

    Activity.prototype.stop = function () {
      if (!this.name) {
        this.name = this.type == Activity.TYPE.BREAK ? 'Break' : 'Activity';
      }

      var stopDate = getTime(),
        userTimezoneOffset = new Date().getTimezoneOffset() * 60000,
        date = new Date(stopDate - this.startDate + userTimezoneOffset),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();

      this.duration = {
        hours: hours,
        minutes: minutes,
        seconds: seconds
      };

      delete this.startDate;

      return this;
    };

    Activity.parse = function (object) {
      var activity = new Activity(object.type);
      //TODO change to Object.assign
      activity.name = object.name;
      activity.description = object.description;
      activity.duration = object.duration;

      return activity;
    };

    return Activity;
  }]);
