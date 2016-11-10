'use strict';

/**
 * @ngdoc directive
 * @name tomasApp.directive:timer
 * @description
 * # timer
 */
angular.module('tomasApp')
  .directive('timer', function () {
    return {
      scope: {
        activity: '=',
        onStop: '&'
      },
      templateUrl: 'views/timer.html',
      restrict: 'E',
      controllerAs: 'ctrl',
      controller: ['$interval', '$scope', 'Activity', function ($interval, $scope, Activity) {
        var timer;
        var startTime = '00:00';

        $scope.time = startTime;

        function updateTimer() {
          var timeArr = $scope.time.split(':');
          var minutes = timeArr[0];
          var seconds = timeArr[1];

          if (seconds == 59) {
            minutes++;
            seconds = 0;

            // Check every minute
            if ($scope.time == '24:59' && $scope.activity.type == Activity.TYPE.WORK) {
              console.log('Please make a break!');
            } else if ($scope.time == '04:59' && $scope.activity.type == Activity.TYPE.BREAK) {
              console.log('Break is so log...');
            }

            if (minutes < 10) {
              minutes = '0' + minutes;
            }
          } else {
            seconds++;
          }
          if (seconds < 10) {
            seconds = '0' + seconds;
          }

          $scope.time = minutes + ':' + seconds;
        }

        this.stop = function () {
          $scope.onStop();
          $interval.cancel(timer);
          timer = null;
          $scope.time = startTime;
        };

        $scope.$on('after-start-activity', function () {
          $scope.time = startTime;
          timer = $interval(function () {
            updateTimer();
          }, 1000);
        });

        $scope.$on('after-stop-activity', function () {
          $scope.time = startTime;
          $interval.cancel(timer);
          timer = null;
        });
      }]
    };
  });
