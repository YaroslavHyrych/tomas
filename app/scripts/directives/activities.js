'use strict';

/**
 * @ngdoc directive
 * @name tomasApp.directive:activities
 * @description
 * # activities
 */
angular.module('tomasApp')
  .directive('activities', function () {
    return {
      templateUrl: 'views/activities.html',
      restrict: 'E',
      controllerAs: 'activitiesCtrl',
      controller: ['$scope', 'history', 'Activity' , 'activitiesFilterFilter', function ($scope, history, Activity, activitiesFilterFilter) {
        var self = this;

        function getActivityDuration(activity) {
          var userTimezoneOffset = new Date().getTimezoneOffset() * 60000,
            date = new Date(activity.stopDate - activity.startDate + userTimezoneOffset),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();

          return {
            hours: hours,
            minutes: minutes,
            seconds: seconds
          };
        }

        function calculateTotalDuration() {
          var date = new Date(new Date().setHours(0, 0, 0, 0));
          for (var index in $scope.activities) {
            var time = getActivityDuration($scope.activities[index]);
            date.setSeconds(date.getSeconds() + time.seconds);
            date.setMinutes(date.getMinutes() + time.minutes);
            date.setHours(date.getHours() + time.hours);
          }

          var hours = date.getHours() === 0 ? '' : timeFormat(date.getHours()) + ':';
          $scope.totalDuration = hours + timeFormat(date.getMinutes()) + ':' + timeFormat(date.getSeconds());
        }

        function loadActivities() {
          return self.loadedActivities = history.load().reverse();
        }

        function timeFormat(time) {
          return time.toString().length === 1 ? '0' + time : time;
        }

        $scope.activities = loadActivities() || [];
        $scope.isWorkChecked = true;
        $scope.isBreakChecked = true;

        calculateTotalDuration();

        $scope.checkboxChanged = function () {
          var types = [];
          if ($scope.isWorkChecked) {
            types.push(Activity.TYPE.WORK);
          }
          if ($scope.isBreakChecked) {
            types.push(Activity.TYPE.BREAK);
          }

          $scope.activities = activitiesFilterFilter(self.loadedActivities, types);
          calculateTotalDuration();
        };

        $scope.$on('after-save-activity', function () {
          loadActivities();
          $scope.checkboxChanged();
        });

        this.makeDuration = function (activity) {
          var time = getActivityDuration(activity);
          var hours = time.hours === 0 ? '' : timeFormat(time.hours) + ':';
          return hours + timeFormat(time.minutes) + ':' + timeFormat(time.seconds);
        };

        this.types = Activity.TYPE;

      }]
    };
  });
