'use strict';

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
      this.id = getTime();

      return this;
    };

    Activity.prototype.stop = function () {
      if (!this.name) {
        this.name = this.type === Activity.TYPE.BREAK ? 'Break' : 'Activity';
      }

      var stopDate = getTime(),
        userTimezoneOffset = new Date().getTimezoneOffset() * 60000,
        date = new Date(stopDate - this.id + userTimezoneOffset),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();

      this.duration = {
        hours: hours,
        minutes: minutes,
        seconds: seconds
      };

      return this;
    };

    Activity.parse = function (object) {
      var activity = new Activity(object.type);
      //TODO change to Object.assign
      for (var key in object) {
        activity[key] = object[key];
      }

      return activity;
    };

    return Activity;
  }]);
