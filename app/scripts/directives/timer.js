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
      controller: ['$interval', '$scope', 'Activity', 'ngAudio', function ($interval, $scope, Activity, ngAudio) {
        var timer;
        var startTime = '00:00';

        var needBreakSound = ngAudio.load("audio/shake.mp3");
        var needWorkSound = ngAudio.load("audio/cooker.mp3");

        $scope.time = startTime;

        function updateTimer() {
          var timeArr = $scope.time.split(':');
          var minutes = timeArr[0];
          var seconds = timeArr[1];

          if (seconds === '59') {
            minutes++;
            seconds = 0;

            // Check every minute
            if ($scope.time === '24:59' && $scope.activity.type === Activity.TYPE.WORK) {
              needBreakSound.play();
              $scope.message = 'You are working a lot...';
              $scope.status = 'warning';
            } else if ($scope.time === '59:59' && $scope.activity.type === Activity.TYPE.WORK) {
              needBreakSound.play();
              $scope.message = 'Please make a break!';
              $scope.status = 'error';
            } else if ($scope.time === '04:59' && $scope.activity.type === Activity.TYPE.BREAK) {
              needWorkSound.play();
              $scope.message = 'Break is so long...';
              $scope.status = 'warning';
            } else if ($scope.time === '14:59' && $scope.activity.type === Activity.TYPE.BREAK) {
              needWorkSound.play();
              $scope.message = 'Go to work!';
              $scope.status = 'error';
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
          $scope.message = null;
          $scope.status = null;
          $scope.time = startTime;
          timer = $interval(function () {
            updateTimer();
          }, 1000);
        });

        $scope.$on('after-stop-activity', function () {
          $scope.message = null;
          $scope.status = null;
          $scope.time = startTime;
          $interval.cancel(timer);
          timer = null;
        });
      }]
    };
  });
