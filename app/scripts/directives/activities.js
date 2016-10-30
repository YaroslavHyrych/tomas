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
      controller: ['$scope', 'history', function($scope, history) {
        function loadToScope() {
          $scope.activities = history.load().reverse();
        }

        function timeFormat(time) {
          return time.toString().length == 1 ? '0' + time : time;
        }

        loadToScope();

        $scope.$on('stop-activity', function () {
          loadToScope();
        });

        this.makeDuration = function (activity) {
          var date = new Date(activity.stopDate - activity.startDate),
            hours = timeFormat(date.getHours() + date.getTimezoneOffset()/60),
            minutes = timeFormat(date.getMinutes()),
            seconds = timeFormat(date.getSeconds());

          return ((hours == '00') ? '' : hours + ':') +  minutes + ':' +  seconds;
        };
      }]
      // link: function postLink(scope, element, attrs) {
      //   element.text('this is the activities directive');
      // }
    };
  });
