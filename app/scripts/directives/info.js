'use strict';

/**
 * @ngdoc directive
 * @name tomasApp.directive:info
 * @description
 * # info
 */
angular.module('tomasApp')
  .directive('info', function () {
    return {
      scope: {
        activity: '='
      },
      templateUrl: 'views/info.html',
      restrict: 'E',
      controllerAs: 'ctrl',
      controller: ['$scope', 'Activity', function ($scope, Activity) {
        this.isShow = function () {
          return $scope.activity && $scope.activity.type === Activity.TYPE.WORK;
        };
      }]
    };
  });
