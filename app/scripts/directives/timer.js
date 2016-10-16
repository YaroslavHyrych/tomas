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
        var startTime = '00:00:00';

        $scope.time = startTime;

        function updateTimer() {
          var timeArr = $scope.time.split(':');
          var hours = timeArr[0];
          var minutes = timeArr[1];
          var seconds = timeArr[2];

          if (seconds == 59) {
            minutes++;
            seconds = 0;

            // Check every minute
            if ($scope.time == '00:24:59' && $scope.activity.type == Activity.TYPE.WORK) {
              console.log('Please make a break!');
            } else if ($scope.time == '00:04:59' && $scope.activity.type == Activity.TYPE.BREAK) {
              console.log('Break is so log...');
            }

            if (minutes == 59) {
              hours++;
              minutes = 0;
              if (hours < 10) {
                hours = '0' + hours;
              }
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

          $scope.time = hours + ':' + minutes + ':' + seconds;
        }

        this.stop = function () {
          $scope.onStop();
          $interval.cancel(timer);
          timer = null;
          $scope.time = '00:00:00';
        };

        $scope.$on('start-activity', function () {
          $scope.time = startTime;
          timer = $interval(function () {
            updateTimer();
          }, 1000);
        });

        $scope.$on('stop-activity', function () {
          $scope.time = startTime;
          $interval.cancel(timer);
          timer = null;
        });

        // $scope.$watch('activity', function (newValue, oldValue) {
        //   if (newValue && !oldValue) { // First activity
        //     timer = $interval(function () {
        //       updateTimer();
        //     }, 1000);
        //   } else if (newValue && oldValue) { // New activity
        //
        //   } else {
        //     $interval.cancel(timer);
        //     timer = null;
        //   }
        //
        //   $scope.time = '00:00:00';
        // });
      }]
    };
  });
