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
        var self = this;
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
            checkTime('24:59', Activity.TYPE.WORK, 'You are working a lot...', 'warning', needBreakSound);
            checkTime('59:59', Activity.TYPE.WORK, 'Please make a break!', 'error', needBreakSound);
            checkTime('04:59', Activity.TYPE.BREAK, 'Break is so long...', 'warning', needWorkSound);
            checkTime('14:59', Activity.TYPE.BREAK, 'Go to work!', 'error', needWorkSound);

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

        this.stopAudio = function () {
          if ($scope.audio) {
            $scope.audio.stop();
          }
        };

        function checkTime(time, type, message, status) {
          if ($scope.time !== time || $scope.activity.type !== type) return;

          $scope.audio.play();
          $scope.message = message;
          $scope.status = status;
        }

        $scope.$watch('activity', function (activity) {
          if (!activity) return;

          $scope.audio = $scope.activity.type === Activity.TYPE.BREAK ? needWorkSound : needBreakSound;
        });

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
          self.stopAudio();
          $interval.cancel(timer);
          timer = null;
        });
      }]
    };
  });
