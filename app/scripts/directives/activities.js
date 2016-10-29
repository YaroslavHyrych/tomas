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
      controllerAs: 'ctrl',
      controller: ['$scope', 'history', function($scope, history) {
        function loadToScope() {
          $scope.activities = history.load().reverse();
        }

        loadToScope();

        $scope.$on('stop-activity', function () {
          loadToScope();
        });

        this.makeDuration = function (activity) {
          var date = new Date(activity.stopDate - activity.startDate),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();

          return hours + ':' + minutes + ':' + seconds;
        };
      }]
      // link: function postLink(scope, element, attrs) {
      //   element.text('this is the activities directive');
      // }
    };
  });
