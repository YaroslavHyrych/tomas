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
      controller: ['$interval', '$scope', function ($interval, $scope) {
        var timer;

        $scope.time = '00:00:00';

        function updateTimer() {
          var timeArr = $scope.time.split(':');
          var hours = timeArr[0];
          var minutes = timeArr[1];
          var seconds = timeArr[2];

          if (seconds == 60) {
            minutes++;
            seconds = 0;
            if (minutes == 60) {
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

          console.log($scope.time);
        }

        this.stop = function () {
          $scope.onStop();
          $interval.cancel(timer);
          timer = null;
          $scope.time = '00:00:00';
        };

        $scope.$on('start-activity', function () {
          $scope.time = '00:00:00';
          timer = $interval(function () {
            updateTimer();
          }, 1000);
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
