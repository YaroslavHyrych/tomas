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
      controller: ['$scope', function ($scope) {
        var self = this;
        initFields();

        $scope.$on('after-save-activity', function () {
          initFields();
        });

        $scope.$on('before-stop-activity', function () {
          $scope.activity.name = self.name;
          $scope.activity.description = self.description;
        });

        function initFields() {
          self.name = '';
          self.description = '';
        }
      }]
    };
  });
