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
      controller: ['$scope', 'history', function($scope, history) {
        function loadToScope() {
          $scope.activities = history.load().reverse();
        }

        loadToScope();

        $scope.$on('stop-activity', function () {
          loadToScope();
        });
      }]
      // link: function postLink(scope, element, attrs) {
      //   element.text('this is the activities directive');
      // }
    };
  });
