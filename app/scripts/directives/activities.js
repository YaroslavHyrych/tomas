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
        $scope.activities = history.load();

        $scope.$watch('activity', function(oldValue, newValue) {
          $scope.activities = history.load();
        });
      }]
      // link: function postLink(scope, element, attrs) {
      //   element.text('this is the activities directive');
      // }
    };
  });
