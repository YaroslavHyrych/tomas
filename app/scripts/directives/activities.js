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
        function loadToScope() {
          $scope.activities = history.load().reverse();
        }

        function timeFormat(time) {
          return time.toString().length == 1 ? '0' + time : time;
        }

        loadToScope();

        $scope.filteredTypes = [];
        $scope.checkboxModel = {
          work: Activity.TYPE.WORK,
          break: Activity.TYPE.BREAK
        };

        $scope.$on('stop-activity', function () {
          loadToScope();
        });

        $scope.$watchCollection('checkboxModel', function (value) {
          var newFilterTypes = [];
          for (var key in value) {
            newFilterTypes.push(value[key]);
          }
          $scope.filteredTypes = newFilterTypes;
        });

        this.makeDuration = function (activity) {
          var date = new Date(activity.stopDate - activity.startDate),
            hours = timeFormat(date.getHours() + date.getTimezoneOffset() / 60),
            minutes = timeFormat(date.getMinutes()),
            seconds = timeFormat(date.getSeconds());

          return ((hours == '00') ? '' : hours + ':') + minutes + ':' + seconds;
        };
        
        this.types = Activity.TYPE; 
      }]
    };
  });
