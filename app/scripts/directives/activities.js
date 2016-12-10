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
      controller: ['$scope', 'history', 'Activity', function ($scope, history, Activity) {
        var self = this;

        this.date = new Date();

        function calculateTotalDuration() {
          var date = new Date(new Date().setHours(0, 0, 0, 0));
          for (var index in $scope.activities) {
            var time = $scope.activities[index].duration;
            date.setSeconds(date.getSeconds() + time.seconds);
            date.setMinutes(date.getMinutes() + time.minutes);
            date.setHours(date.getHours() + time.hours);
          }

          var hours = date.getHours() === 0 ? '' : timeFormat(date.getHours()) + ':';
          $scope.totalDuration = hours + timeFormat(date.getMinutes()) + ':' + timeFormat(date.getSeconds());
        }

        function loadActivities() {
          $scope.activities = history.load(self.date);
        }

        function reload() {
          loadActivities();
          $scope.checkboxChanged();
        }

        function timeFormat(time) {
          return time.toString().length === 1 ? '0' + time : time;
        }

        $scope.isWorkChecked = true;
        $scope.isBreakChecked = true;
        $scope.types = [Activity.TYPE.WORK, Activity.TYPE.BREAK];

        loadActivities();
        calculateTotalDuration();

        $scope.checkboxChanged = function () {
          var types = [];
          if ($scope.isWorkChecked) {
            types.push(Activity.TYPE.WORK);
          }
          if ($scope.isBreakChecked) {
            types.push(Activity.TYPE.BREAK);
          }

          $scope.types = types;

          calculateTotalDuration();
        };

        $scope.$on('after-save-activity', function () {
          if (self.date.getDate() === new Date().getDate()) {
            reload();
          }
        });

        this.changeDate = function (calcDate) {
          var date = self.date;
          date.setDate(date.getDate() + parseInt(calcDate));
          self.date = date;

          reload();
        };

        this.makeDuration = function (activity) {
          var time = activity.duration;
          var hours = time.hours === 0 ? '' : timeFormat(time.hours) + ':';
          return hours + timeFormat(time.minutes) + ':' + timeFormat(time.seconds);
        };
      }]
    };
  });
